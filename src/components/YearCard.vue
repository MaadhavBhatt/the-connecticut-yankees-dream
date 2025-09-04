<template>
  <div class="year-card">
    <ul class="event-list">
      <li v-for="(event, index) in events" :key="index">
        <a target="_blank" :href="event.link || '#'">{{ event.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'YearCard',
  props: {
    year: {
      type: Number,
      required: true
    },
    events: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.year-card {
  width: 100%;
  padding: 2rem;
  border-radius: 1rem;
  background-color: #444;
}

.event-list {
  list-style: none;
  padding: 0;

  & li {
    background: #333;
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    width: fit-content;
  }
}
</style>