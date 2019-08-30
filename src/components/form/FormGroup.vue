<template>
    <div class="formGroup">
        <label
            :for="labelFor"
            class="label"
        >
            {{ label }}
        </label>
        <slot/>
    </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="postcss" scoped>
.formGroup {
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0;
  }
}
.label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 16px;
  @media (--laptop) {
    font-size: 15px;
  }
}
</style>
