<template>
    <div
        :class="{ 'noBoxShadow': !boxShadow, 'noPadding': !padding }"
        class="box"
    >
        <slot name="top"/>
        <div class="boxInner">
            <slot/>
        </div>

    </div>
</template>

<script>
export default {
  props: {
    boxShadow: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.box {
  box-shadow: var(--shadow);
  border-radius: var(--borderRadius);
  background-color: #fff;
  &.noBoxShadow {
    box-shadow: none;
  }
}
.boxInner {
  padding: 50px;
  @media (--laptop) {
    padding: 35px 30px;
  }
}
.noPadding .boxInner {
  padding: 0;
}
</style>
