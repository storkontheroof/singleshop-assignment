<template>
  <Container class="section-phones">
    <Heading> Telefoons </Heading>

    <ProductFilters> </ProductFilters>
    <ProductGrid>
      <ProductGridItem v-for="product in products" v-bind:key="product.id">
        <ProductCard :product="product" />
      </ProductGridItem>
    </ProductGrid>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      intialized: false,
    }
  },
  mounted() {},
  computed: {
    products() {
      return this.$store.state.products.filteredProducts
    },
  },
  methods: {
    ...mapActions({
      getProducts: 'products/getProducts',
      applySortAndFilters: 'products/filterProducts',
      setSort: 'products/setSort',
      setFilters: 'products/setFilters',
    }),
  },
  async fetch() {
    await this.getProducts()

    this.setSort({
      sortBy: this.$route.query.sortBy || 'sort_order',
      sortDir: this.$route.query.sortDir || 'ASC',
    })

    this.setFilters({
      manufacturer: this.$route.query.merk && this.$route.query.merk.split(','),
      colors: this.$route.query.kleur && this.$route.query.kleur.split(','),
      has_5g: this.$route.query.vijfg && this.$route.query.vijfg.split(','),
      operating_system:
        this.$route.query.besturingssysteem &&
        this.$route.query.besturingssysteem.split(','),
      has_esim: this.$route.query.esim && this.$route.query.esim.split(','),
    })

    this.applySortAndFilters()

    this.intialized = true
  },
}
</script>
