<template>
    <component
        :is="typeOfElement(url)"
        :class="{
            'isLoading': loading, 'isDisabled': disabled,
            'noMinWidth': !minWidth, 'isSmall': small
        }"
        v-bind="setUrlAttr(url)"
        class="appButton"
        @click="$emit('click')"
    >
        <div class="outer">
            <div class="inner">
                <slot name="icon"></slot>
                <div class="label smallTitle">{{ label }}</div>
            </div>
        </div>
        <div class="loading">
            <img
                svg-inline
                class="loadingIcon"
                src="../../assets/images/loader.svg"
                alt=""
            >
        </div>
    </component>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: null
    },
    buttonType: {
      type: String,
      default: 'button'
    },
    minWidth: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isRelative () {
      return !this.url.startsWith('http')
    }
  },
  methods: {
    setUrlAttr (url) {
      if (!url) {
        return { type: this.buttonType }
      }

      if (this.isRelative) {
        return {
          to: url,
          target: this.target
        }
      }

      return {
        href: url,
        target: this.target
      }
    },
    typeOfElement (url) {
      if (!url) {
        return 'button'
      }

      if (this.isRelative) {
        return 'router-link'
      }

      return 'a'
    }
  }
}
</script>

<style lang="postcss" scoped>
.appButton {
  background-color: var(--primary);
  padding: 12.5px 30px;
  min-width: 180px;
  display: inline-block;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: var(--borderRadius);
  transition: var(--normalTrans);
  @media (--laptop) {
    padding: 12px 20px;
    min-width: 170px;
  }
  &.isDisabled {
    cursor: default;
    opacity: 0.6;
    pointer-events: none;
  }
  &.noMinWidth {
    min-width: 0;
  }
}
.appButton:hover {
  background-color: var(--primary800);
}
.outer {
  display: flex;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  position: relative;
  z-index: 1;
  width: 100%;
  @media (--laptop) {
    min-height: 20px;
  }
}
.label {
  color: #fff;
  transition: var(--normalTrans);
}
.appButton >>> .icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  display: flex;
  flex-shrink: 0;
  color: #fff;
  @media (--laptop) {
    width: 20px;
    height: 20px;
  }
}
.loading {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -12px;
  margin-top: -12px;
  opacity: 0;
  @media (--laptop) {
    width: 22px;
    height: 22px;
    margin-left: -11px;
    margin-top: -11px;
  }
}
.loadingIcon {
  width: 100%;
  height: 100%;
}

.isLoading {
  pointer-events: none;
  & .inner {
    opacity: 0;
  }
  & .loading {
    opacity: 1;
  }
  & .loadingIcon {
    animation-name: rotate;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

.isSmall {
  padding: 10px 20px;
  min-width: 0;
  @media (--laptop) {
    padding: 9px 15px;
  }
  & .icon {
    width: 18px;
    height: 18px;
    @media (--laptop) {
      width: 16px;
      height: 16px;
    }
  }
  & .smallTitle {
    font-size: 13px;
    letter-spacing: 2px;
    @media (--laptop) {
      font-size: 12px;
    }
  }
}

.isOutlined {
  background-color: transparent;
  border: 1px solid var(--borderColor);
  &::before {
    display: none;
  }
  & .label {
    color: var(--primaryTextColor);
  }
  &:hover {
    background-color: var(--grey200);
    border-color: var(--grey200);
  }
}
.isDanger {
  background-color: var(--danger);
  &:hover {
    background-color: var(--danger700);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(360deg);
  }
}
</style>
