<template>
    <div class="authLink">
        <router-link
            :to="link"
            class="link"
        >
            {{ label }}
        </router-link>
    </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.authLink {
  margin-top: 25px;
  text-align: center;
}
.link {
  font-size: 16px;
  color: var(--primary);
  &:hover {
    color: var(--primaryTextColor);
  }
}
</style>
