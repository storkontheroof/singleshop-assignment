export const state = () => ({
  products: [],
  filteredProducts: [],
  filters: [
    {
      name: 'manufacturer',
      title: 'merk',
      slug: 'merk',
      type: 'text',
      selected: [],
      items: [],
    },
    {
      name: 'operating_system',
      title: 'besturingssyteem',
      slug: 'os',
      type: 'text',
      selected: [],
      items: [],
    },
    {
      name: 'colors',
      title: 'kleur',
      slug: 'kleur',
      type: 'array',
      selected: [],
      items: [],
    },
    {
      name: 'has_5g',
      title: '5g',
      slug: 'vijfg',
      type: 'boolean',
      selected: [],
      items: [],
    },
    {
      name: 'has_esim',
      title: 'esim',
      slug: 'esim',
      type: 'boolean',
      selected: [],
      items: [],
    },
  ],
  sort: {
    sortBy: 'sort_order',
    sortOrder: 1,
  },
})

const sortBy = ({ sortBy = 'sort_order', sortOrder = 1 }) => {
  return function (a, b) {
    const result = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
    return result * sortOrder
  }
}

const arrayFilter = (filterValues, productValues) => {
  return (
    !filterValues ||
    filterValues.length === 0 ||
    filterValues.some((val) =>
      productValues.join('|').toUpperCase().includes(val.toUpperCase())
    )
  )
}

const textFilter = (filterValues, productValue) => {
  return (
    !filterValues ||
    filterValues.length === 0 ||
    filterValues.join('|').toUpperCase().includes(productValue.toUpperCase())
  )
}

const boolFilter = (filterValues, productValue) => {
  return (
    !filterValues ||
    filterValues.length === 0 ||
    // eslint-disable-next-line eqeqeq
    filterValues.some((val) => val == productValue)
  )
}

export const actions = {
  async getProducts({ commit, state }) {
    await this.$axios.$get('/phones').then((res) => {
      commit('setProducts', res.products)
    })
  },
  setFilters({ commit, state }, filters) {
    commit('setFilters', filters)
  },
  setSort({ commit, state }, { sortBy = 'sort_order', sortOrder = 'ASC' }) {
    commit('setSort', {
      sortBy,
      sortOrder: sortOrder.toUpperCase() === 'DESC' ? -1 : 1,
    })
  },
  filterProducts({ commit, state }) {
    const filteredProducts = state.products.filter((product) => {
      const result = state.filters.reduce((acc, filter, n) => {
        switch (filter.type) {
          case 'text':
            acc.push(textFilter(filter.selected, product[filter.name]))
            break
          case 'array':
            acc.push(arrayFilter(filter.selected, product[filter.name]))
            break
          case 'bool':
          case 'boolean':
            acc.push(boolFilter(filter.selected, product[filter.name]))
            break
          default:
            console.error(`unknown filter type ${filter.type}`)
            acc.push(true)
            break
        }

        return acc
      }, [])

      return !result.includes(false)
    })

    // apply sort
    const sortedFilteredProducts = filteredProducts.sort(sortBy(state.sort))

    // commit
    commit('setFilteredProducts', sortedFilteredProducts)

    // TODO: count items per filter
  },
}

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setFilteredProducts(state, products) {
    state.filteredProducts = products
  },
  setFilters(state, filters) {
    state.filters = state.filters.map((filter) => {
      if (filters[filter.name]) {
        filter.selected = filters[filter.name]
      }
      return filter
    })
  },
  setSort(state, sort) {
    state.sort = sort
  },
  setFilter(state, filter) {
    state.filters = {
      ...state.filters,
      ...filter,
    }
  },
}
