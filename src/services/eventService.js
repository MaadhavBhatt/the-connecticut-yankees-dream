import yaml from 'js-yaml';

// A service to fetch content from the YAML file and convert it into a format for the Vue files to handle and display on the webpage.

const eventService = {
  /**
   * Fetches events from a YAML file
   * @param {string} filePath - Path to the YAML file
   * @returns {Promise<Array>} - Array of event objects
   */
  async fetchEvents(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const yamlText = await response.text();
      const events = yaml.load(yamlText);

      // Process events if needed (e.g., formatting dates, adding IDs, etc.)
      return this.processEvents(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  /**
   * Process raw event data into the format needed by Vue components
   * @param {Array} rawEvents - Events from YAML file
   * @returns {Array} - Processed events
   */
  processEvents(rawEvents) {
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

    // Sort events within years
    eventsByYear.forEach((events) => {
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return eventsByYear;
  },
};

export default eventService;
