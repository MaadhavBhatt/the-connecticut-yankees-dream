<template>
  <div id="app">
    <header>
      <h1>The Connecticut Yankee's Dream</h1>
      <p>Welcome to the future, Hank Morgan!</p>
    </header>

    <CurvedCarousel />
  </div>
</template>

<script>
import CurvedCarousel from './components/CurvedCarousel.vue'

export default {
  name: 'App',
  components: {
    CurvedCarousel
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
