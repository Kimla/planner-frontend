<template>
    <div class="authTop">
        <h3 class="heading">{{ heading }}</h3>
        <p class="text">{{ text }}</p>
    </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.authTop {
  margin-bottom: 25px;
  padding: 0 20px;
  text-align: center;
}
.heading {
  margin-bottom: 10px;
}
.text {
  font-size: 15px;
}
</style>
