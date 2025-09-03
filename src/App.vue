<template>
  <div id="app">
    <header>
      <h1>The Connecticut Yankee's Dream</h1>
      <p>Welcome to the future, Hank Morgan!</p>
    </header>

    <CurvedCarousel :yearVsEventCount="yearVsEventCount" />
  </div>
</template>

<script>
import CurvedCarousel from './components/CurvedCarousel.vue'

export default {
  name: 'App',
  components: {
    CurvedCarousel
  },
  data() {
    return {
      yearVsEventCount: [
        { year: 2024, count: 5 },
        { year: 2023, count: 10 },
        { year: 2022, count: 15 },
        { year: 2021, count: 20 },
        { year: 2020, count: 25 },
        { year: 2019, count: 30 },
        { year: 2018, count: 35 },
        { year: 2017, count: 40 },
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
