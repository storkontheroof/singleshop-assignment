<template>
  <div>
    <h1>Filter telefoons</h1>
    <div class="d-flex d-sm-none my-6">
      <v-btn block @click="toggle">Filters</v-btn>
    </div>
    <div :class="classes">
      <div class="d-flex d-sm-none my-6">
        <v-btn block @click="toggle">Close</v-btn>
      </div>
      <div v-for="filter in filters" :key="filter.name">
        <ProductFilter
          :items="filter.items"
          :title="filter.title"
          :value="filter.selected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters({ filters: 'products/filters' }),
    classes() {
      const classes = [
        this.$vuetify.breakpoint.width >= 600
          ? 'd-flex flex-row mb-6'
          : 'd-flex flex-column mb-6 fixed',
        this.isOpen ? 'is-open' : '',
      ]

      return classes
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 320px;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  padding: 24px;
  transform: translateX(-100%);
  transition: all 0.25s ease-out;

  &.is-open {
    transform: translateX(0);
    transition: all 0.25s ease-out;
  }
}
</style>
