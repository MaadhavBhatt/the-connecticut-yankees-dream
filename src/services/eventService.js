import yaml from 'js-yaml';

// A service to fetch content from the YAML file and convert it into a format for the Vue files to handle and display on the webpage.

const eventService = {
  async getYAMLText(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch file text: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error fetching file text:', error);
      throw error;
    }
  },

  processRawEvents(
    rawEvents,
    options = { chronological: true, sortByYear: true }
  ) {
    if (!rawEvents || !Array.isArray(rawEvents)) {
      return [];
    }

    rawEvents = rawEvents.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
      link: event.link,

      year: event.date ? new Date(event.date).getFullYear() : null,
    }));

    rawEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!options.sortByYear) {
      return rawEvents;
    }

    // Convert rawEvents from an Array of Objects to a Map from years to Arrays of event Objects
    let eventsByYear = new Map();
    rawEvents.forEach((event) => {
      if (event.year) {
        if (!eventsByYear.has(event.year)) {
          eventsByYear.set(event.year, []);
        }
        eventsByYear.get(event.year).push(event);
      }
    });

    // Sort years chunks in chronological or reverse chronological order
    eventsByYear = new Map(
      [...eventsByYear.entries()].sort((a, b) =>
        options.chronological ? a[0] - b[0] : b[0] - a[0]
      )
    );

    // Sort events within years
    eventsByYear.forEach((events) => {
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return eventsByYear;
  },

  async _fetchEventsFromFile(filePath, options) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const yamlText = await response.text();
      const events = yaml.load(yamlText);
      console.log(events);

      // Process events
      return this.processRawEvents(events, options);
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async fetchEvents(
    dirPath,
    options = {
      chronological: true,
      sortByYear: true,
      isDirectory: false,
      fileNames: [],
    }
  ) {
    // If directory and no file names provided, return empty array
    if (options.isDirectory && options.fileNames.length === 0) {
      return [];
    }

    // Ensure all file names have .yaml extension
    options.fileNames.forEach((fileName, index) => {
      if (!fileName.endsWith('.yaml') && !fileName.endsWith('.yml')) {
        options.fileNames[index] = `${fileName}.yaml`;
      }
    });

    if (options.isDirectory) {
      // Combine all YAML texts
      const allYAMLTexts = await Promise.all(
        options.fileNames.map((fileName) =>
          this.getYAMLText(`${dirPath}/${fileName}`)
        )
      );
      // Parse each YAML file separately and flatten the results
      let allEvents = [];
      allYAMLTexts.forEach((yamlText) => {
        const events = yaml.load(yamlText);
        if (Array.isArray(events)) {
          allEvents.push(...events);
        } else if (events) {
          allEvents.push(events);
        }
      });
      return this.processRawEvents(allEvents, options);
    } else {
      return this._fetchEventsFromFile(dirPath, options);
    }
  },
};

export default eventService;
