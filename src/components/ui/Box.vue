<template>
    <div class="box">
        <slot name="top"/>
        <div class="boxInner">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss" scoped>
.box {
  box-shadow: var(--shadow);
  border-radius: var(--borderRadius);
  background-color: #fff;
}
.boxInner {
  padding: 35px 30px;
}
</style>
