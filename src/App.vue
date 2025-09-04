<template>
  <div id="app">
    <span class="banner">Add events by submitting a <a
        href="https://github.com/MaadhavBhatt/the-connecticut-yankees-dream/edit/main/content.yaml"
        target="_blank">PR</a></span>

    <header>
      <h1>The Connecticut Yankee's Dream</h1>
      <p>Welcome to the future, Hank Morgan!</p>
    </header>

    <CurvedCarousel :yearVsEventCount="yearVsEventCount"
      @year-selected="displayedYear = displayedYear == $event ? null : $event" />
    <YearCard v-if="displayedYear" :year="displayedYear"
      :events="yearVsEventCount.find(y => y.year === displayedYear).events" />
  </div>
</template>

<script>
import CurvedCarousel from './components/CurvedCarousel.vue'
import YearCard from './components/YearCard.vue'
import eventService from './services/eventService.js'

export default {
  name: 'App',
  components: {
    CurvedCarousel,
    YearCard
  },
  data() {
    return {
      displayedYear: null,
      yearVsEventCount: []
    }
  },
  async created() {
    try {
      const events = await eventService.fetchEvents('/content.yaml');
      this.yearVsEventCount = Array.from(events.entries()).map(([year, events]) => ({
        year,
        events: events.map(event => ({ title: event.title, link: event.link }))
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap');

:root {
  --font-family: 'Fira Code', 'Courier New', monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-family);
}

a {
  color: #eee;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  min-height: 100vh;
  background-color: #333;
  color: #eee;
}

.banner {
  position: absolute;
  top: 0;

  padding: 1rem 0;
  width: 100%;

  background-color: rgb(163, 50, 50);
  text-align: center;

  & a {
    text-decoration: underline;
  }
}

header {
  text-align: center;

  & h1 {
    font-size: 3rem;
  }

  & p {
    font-size: 1.2rem;
  }
}
</style>
