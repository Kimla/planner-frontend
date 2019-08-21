<template>
  <div
    class="event"
    @click="openEvent"
  >
    <h2 class="title">
      {{ event.title }}
    </h2>
    <p class="description" v-html="event.description">
    </p>
    <p class="date">
      {{ event.date }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  created () {
    const openEvent = Number(this.$route.query.open)

    if (openEvent === this.event.id) {
      this.openEvent()
    }
  },
  methods: {
    openEvent () {
      this.$emit('open', this.event)
    }
  }
}
</script>

<style scoped>
.event {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: 0.22s east-in;
  margin-bottom: 1rem;
}
.title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.description {
  margin-bottom: 0.5rem;
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
