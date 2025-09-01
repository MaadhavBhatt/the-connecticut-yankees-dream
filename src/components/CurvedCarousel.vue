<template>
  <div class="carousel">
    <li>
      <h2>2016</h2>
      <p>30 events</p>
    </li>
    <li>
      <h2>2015</h2>
      <p>25 events</p>
    </li>
    <li>
      <h2>2014</h2>
      <p>20 events</p>
    </li>
    <li>
      <h2>2013</h2>
      <p>15 events</p>
    </li>
  </div>
</template>

<script>
export default {
  name: 'CurvedCarousel'
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