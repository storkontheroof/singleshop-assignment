export const state = () => ({
  products: [],
  filteredProducts: [],
})

export const actions = {
  async getProducts({ commit, state }) {
    await this.$axios.$get('/phones').then((res) => {
      commit('setProducts', res.products)
    })
  },
  setFilter({ commit, state }) {},
}

export const mutations = {
  setProducts(state, products) {
    state.products = products
    state.filteredProducts = products
  },
}
