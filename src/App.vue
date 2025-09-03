<template>
  <div id="app">
    <header>
      <h1>The Connecticut Yankee's Dream</h1>
      <p>Welcome to the future, Hank Morgan!</p>
    </header>

    <CurvedCarousel :yearVsEventCount="yearVsEventCount" @year-selected="displayedYear = $event" />
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
        events: events.map(event => event.title)
      }));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }
}
</script>

<style>
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
