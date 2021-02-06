<template>
  <component :is="tag" :class="classes" v-bind="$attrs" v-on="$listeners">
    <template v-if="title">
      {{ title }}
    </template>

    <slot v-else />
  </component>
</template>

<script>
export default {
  inject: {
    theme: {
      default: () => ({ isDark: false }),
    },
    heading: {
      default: () => ({ align: 'left' }),
    },
  },

  provide() {
    return {
      heading: {
        align: this.align,
      },
    }
  },

  props: {
    align: {
      type: String,
      default() {
        return this.heading.align
      },
    },
    size: {
      type: Number,
      default: 3,
    },
    space: {
      type: [Number, String],
      default: 4,
    },
    mobileSize: {
      type: Number,
      default: 4,
    },
    mobileBreakpoint: {
      type: [Number, String],
      default: 768,
    },
    tag: {
      type: String,
      default: 'h1',
    },
    title: String,
    weight: {
      type: String,
      default: 'black',
    },
  },

  computed: {
    classes() {
      const classes = [
        this.fontSize,
        `font-weight-${this.weight}`,
        `mb-${this.space}`,
        `text-${this.align}`,
        this.theme.isDark && 'white--text',
      ]

      return classes
    },
    fontSize() {
      const size =
        this.$vuetify.breakpoint.width >= this.mobileBreakpoint
          ? this.size
          : this.mobileSize
      return `text-h${size}`
    },
  },
}
</script>
