<template>
  <div class="carousel">
    <li v-for="(item, index) in yearVsEventCount" :key="index">
      <h2>{{ item.year }}</h2>
      <p>{{ item.count }} events</p>
    </li>
  </div>
</template>

<script>
export default {
  name: 'CurvedCarousel',
  props: {
    yearVsEventCount: {
      type: Array,
      required: true
    }
  },
}
</script>

<style>
.carousel {
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;

  margin: 0 5rem;
  padding: 1rem 0;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  list-style: none;

  &>li {
    scroll-snap-align: center;
    cursor: pointer;
  }

  & * {
    text-align: center;
  }
}
</style>