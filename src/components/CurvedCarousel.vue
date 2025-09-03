<template>
  <div class="carousel">
    <li v-for="(item, index) in yearVsEventCount" :key="index" @click="$emit('year-selected', item.year)"
      :class="{ 'selected': item.year === $parent.displayedYear }">
      <h2>{{ item.year }}</h2>
      <p>{{ item.events.length }} event{{ item.events.length !== 1 ? 's' : '' }}</p>
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
  gap: 1rem;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;

  margin: 0 4rem;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  list-style: none;

  &>li {
    scroll-snap-align: center;
    cursor: pointer;

    padding: 1rem 0.5rem;
    border-radius: 1rem;
  }

  &>li.selected {
    background: #444;
  }

  & * {
    text-align: center;
  }
}
</style>