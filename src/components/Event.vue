<template>
  <div>
    <h2>{{ event.title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
