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

export default {
  name: 'App',
  components: {
    CurvedCarousel,
    YearCard
  },
  data() {
    return {
      displayedYear: null,
      yearVsEventCount: [
        { year: 2024, events: ["Event 1", "Event 2"] },
        { year: 2023, events: ["Event 3"] },
        { year: 2022, events: ["Event 4"] },
        { year: 2021, events: ["Event 5"] },
        { year: 2020, events: ["Event 6"] },
        { year: 2019, events: ["Event 7"] },
        { year: 2018, events: ["Event 8", "Event 9"] },
        { year: 2017, events: ["Event 10", "Event 11"] },
      ]
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
