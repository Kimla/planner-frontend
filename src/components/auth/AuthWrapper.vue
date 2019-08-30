<template>
    <div class="authWrapper">
        <div class="inner">
            <div class="logoHolder">
                <h1>Planner</h1>
            </div>
            <Box>
                <slot/>
            </Box>
            <slot name="below"></slot>
        </div>
    </div>
</template>

<script>
import Box from '../ui/Box.vue'

export default {
  components: {
    Box
  }
}
</script>

<style lang="postcss" scoped>
.authWrapper {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.inner {
  max-width: 100%;
  width: 550px;
  margin: 50px auto;
  margin-bottom: 10vh;
}
.logoHolder {
  width: 200px;
  margin: 0 auto 30px;
  text-align: center;
}
</style>
