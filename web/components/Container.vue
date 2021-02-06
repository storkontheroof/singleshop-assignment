<template>
  <v-container :class="classes">
    <slot />
  </v-container>
</template>

<script>
export default {
  props: {
    fullHeight: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const classes = ['px-4', 'py-12', this.fullHeight && 'fill-height']
      return classes
    },
  },
}
</script>
