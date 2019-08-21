<template>
  <div>
      <slot v-if="!loading"/>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data: () => ({
    data: null,
    loading: false
  }),
  watch: {
    url: {
      async handler (url) {
        this.fetchItems(url)
      },
      immediate: true
    }
  },
  methods: {
    async fetchItems (url) {
      this.loading = true

      const response = await fetch(this.url)
      this.data = await response.json()

      this.loading = false

      this.$emit('updated', this.data)
    }
  }
}
</script>
