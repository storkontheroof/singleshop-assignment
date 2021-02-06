<template>
  <Container class="section-phones">
    <Heading> Telefoons </Heading>

    <ProductGrid>
      <ProductGridItem v-for="product in products" v-bind:key="product.id">
        <ProductCard :product="product" />
      </ProductGridItem>
    </ProductGrid>
  </Container>
</template>

<script>
export default {
  data() {
    return {
      filteredProducts: [],
      filters: { merk: [], kleur: [], besturingssysteem: [] },
      sort: {},
      activeFilters: [],
    }
  },
  mounted() {},
  computed: {
    products() {
      return this.$store.state.products.filteredProducts
    },
  },
  async fetch() {
    // await this.$axios
    //   .get('/phones')
    //   .then((res) => {
    //     this.$store.commit('products/setProducts', res.data.products)
    //   })
    //   .catch((e) => {
    //     console.error('TODO: Handle axios errors', { error: e })
    //   })
    await this.$store.dispatch('products/getProducts')
    // const response = await fetch('http://localhost:3001/phones').then((res) =>
    //   res.json()
    // )
    //
    // if (this.$route.query.merk) {
    //   this.filters.merk = this.$route.query.merk.split(',')
    // }
    //
    // this.$store.commit('products/setProducts', response.data.products)
  },
}
</script>
