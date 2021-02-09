<template>
  <Container class="section-phones">
    <Heading>
      <span class="font-weight-light">Kies uit</span>
      {{ filteredProducts.length }} smartphones
    </Heading>

    <ProductFilters />
    <ProductGrid>
      <ProductGridItem v-for="product in filteredProducts" :key="product.id">
        <ProductCard :product="product" />
      </ProductGridItem>
    </ProductGrid>
  </Container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async fetch() {
    await this.getProducts()

    await this.setFilters(this.$route.query)

    await this.setSort({
      sortBy: this.$route.query.sortBy || 'sort_order',
      sortDir: this.$route.query.sortDir || 'ASC',
    })
  },
  computed: {
    filteredProducts() {
      return this.$store.state.products.filteredProducts
    },
  },
  methods: {
    ...mapActions({
      getProducts: 'products/getProducts',
      applySortAndFilters: 'products/filterProducts',
      setSort: 'products/setSort',
      setFilters: 'products/setFiltersFromQuery',
    }),
  },
}
</script>
