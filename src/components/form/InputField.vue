<template>
    <div
        :class="{ 'isDisabled': disabled, hasIcon }"
        class="inputFieldHolder"
    >
        <div
            v-if="hasIcon"
            class="iconHolder"
        >
            <slot name="icon"></slot>
        </div>
        <input
            :type="type"
            :placeholder="placeholder"
            :name="name"
            :id="name"
            :value="value"
            :required="required"
            :autocomplete="autocomplete"
            :readonly="readonly"
            class="inputField"
            @input="$emit('input', $event.target.value)"
        >
    </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    readonly: {
      type: String,
      default: null
    }
  },
  computed: {
    hasIcon () {
      return this.$slots.icon
    }
  }
}
</script>

<style lang="postcss" scoped>
.inputFieldHolder {
  position: relative;
  &.isDisabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.6;
  }
}
.iconHolder {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  padding: 0 14px;
  color: var(--grey500);
  display: flex;
  align-items: center;
}
.icon {
  width: 22px;
  height: 22px;
  @media (--laptop) {
    width: 20px;
    height: 20px;
  }
}
</style>
