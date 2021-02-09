<template>
  <div v-if="loaded">
    <div v-if="!useDrawer" class="d-flex flex-row my-6">
      <div v-for="filter in filters" :key="filter.name">
        <ProductFilter
          :name="filter.name"
          :items="productsForFilter(filter)"
          :title="filter.title"
          :value="filter.value"
          @
        />
      </div>
    </div>

    <div class="d-flex my-6" v-if="useDrawer">
      <v-btn block @click.stop="toggleDrawer">Filters</v-btn>

      <v-navigation-drawer v-model="drawer" absolute top temporary>
        <div class="d-flex my-6">
          <v-btn block @click.stop="toggleDrawer">Close</v-btn>
        </div>
        <div v-for="filter in filters" :key="filter.name">
          <ProductFilter
            :name="filter.name"
            :items="filter.items"
            :title="filter.title"
            :value="filter.selected"
          />
        </div>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loaded: false,
      drawer: false,
    }
  },
  computed: {
    ...mapGetters({
      filters: 'products/filters',
      productsForFilter: 'products/productsForFilter',
    }),
    useDrawer() {
      return this.$vuetify.breakpoint.xs
    },
  },
  mounted() {
    this.loaded = true
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
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
  //transition: all 0.25s ease-out;

  &.is-open {
    transform: translateX(0);
    transition: all 0.25s ease-out;
  }
}
</style>
