<template>
    <form @submit.prevent="submit">
        <slot />
        <div class="buttonHolder">
            <AppButton
                :loading="loading"
                :label="buttonLabel"
                type="submit"
            />
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import AppButton from '../ui/AppButton.vue'

export default {
  components: {
    AppButton
  },
  props: {
    endpoint: {
      type: String,
      required: true
    },
    buttonLabel: {
      type: String,
      required: true
    },
    formData: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async submit () {
      this.loading = true

      try {
        const res = await axios.post(this.endpoint, {
          ...this.formData
        })

        if (res.status === 200 || res.status === 201) {
          this.$emit('callback', res.data)
        } else {
          console.log('error')
        }

        this.loading = false
      } catch (error) {
        this.loading = false
        console.log('error')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.buttonHolder {
  text-align: center;
}
</style>
