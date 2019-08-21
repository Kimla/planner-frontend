<template>
  <div>
      <slot v-if="!loading"/>
  </div>
</template>

<script>
import axios from 'axios'

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

      const res = await axios(this.url)
      this.data = res.data

      this.loading = false

      this.$emit('updated', this.data)
    }
  }
}
</script>
