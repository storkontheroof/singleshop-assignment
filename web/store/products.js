export const state = () => ({
  products: [],
  filteredProducts: [],
  filters: [
    {
      name: 'manufacturer',
      title: 'merk',
      slug: 'merk',
      type: 'text',
      value: [],
    },
    {
      name: 'colors',
      title: 'kleur',
      slug: 'kleur',
      type: 'array',
      value: [],
    },
    {
      name: 'has_5g',
      title: '5g',
      slug: 'vijfg',
      type: 'boolean',
      value: [],
    },
    {
      name: 'operating_system',
      title: 'besturingssyteem',
      slug: 'os',
      type: 'text',
      value: [],
    },
    {
      name: 'has_esim',
      title: 'esim',
      slug: 'esim',
      type: 'boolean',
      value: [],
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
    filterValues.some(
      (val) => val.toUpperCase() === productValue.toString().toUpperCase()
    )
  )
}

const getFilteredProducts = (products, filters, current) => {
  const filteredProducts = products.filter((p) => {
    const result = filters.reduce((acc, f) => {
      // current is used for counting
      if (current && current === f.name) {
        acc.push(true)
        return acc
      }

      switch (f.type) {
        case 'text':
          acc.push(textFilter(f.value, p[f.name]))
          break
        case 'array':
          acc.push(arrayFilter(f.value, p[f.name]))
          break
        case 'bool':
        case 'boolean':
          acc.push(boolFilter(f.value, p[f.name]))
          break
        default:
          // eslint-disable-next-line
          console.error(`unknown filter type ${f.type}`)
          acc.push(true)
          break
      }

      return acc
    }, [])

    return !result.includes(false)
  })
  return filteredProducts
}

export const getters = {
  filters: (state) => state.filters,
  productsForFilter: (state) => (filter) => {
    const products = getFilteredProducts(
      [...state.products],
      state.filters,
      filter.name
    )

    // items will be {key: count, key2: count}
    const items = products.reduce((acc, p) => {
      switch (filter.type) {
        case 'boolean':
          acc[p[filter.name]] = acc[p[filter.name]] + 1 || 1
          break
        case 'text':
          acc[p[filter.name]] = acc[p[filter.name]] + 1 || 1
          break
        case 'array':
          p[filter.name].forEach((val) => (acc[val] = acc[val] + 1 || 1))
          break
      }

      return acc
    }, {})

    return Object.keys(items).map((key) => {
      return {
        title: key,
        count: items[key],
      }
    })
  },
}

export const actions = {
  async getProducts({ commit, state }) {
    await this.$axios.$get('/phones').then((res) => {
      commit('setProducts', res.products)
    })
  },

  async setFiltersFromQuery({ commit, state }, query) {
    const queryKeys = Object.keys(query)
    const filters = state.filters.map((filter) => {
      const slug = queryKeys.find((slug) => slug === filter.slug)

      if (slug) {
        filter.value = query[slug].includes(',')
          ? query[slug].split(',')
          : [query[slug]]
      }

      return filter
    })

    await commit('setFilters', filters)
    await commit('setFilteredProducts')
  },

  async setSort(
    { commit, state },
    { sortBy = 'sort_order', sortOrder = 'ASC' }
  ) {
    await commit('setSort', {
      sortBy,
      sortOrder: sortOrder.toUpperCase() === 'DESC' ? -1 : 1,
    })
    await commit('setSortedProducts')
  },

  async updateFilters({ commit, dispatch, state }, { name, values }) {
    await commit('updateFilters', { name, values })
    await commit('setFilteredProducts')
  },
}

export const mutations = {
  setProducts(state, products) {
    state.products = products
    state.filteredProducts = products
  },

  setFilteredProducts(state) {
    state.filteredProducts = getFilteredProducts(
      [...state.products],
      state.filters
    ).sort(sortBy(state.sort))
  },

  setSortedProducts(state) {
    state.filteredProducts = [...state.filteredProducts].sort(
      sortBy(state.sort)
    )
  },

  setFilters(state, filters) {
    state.filters = filters
  },

  setSort(state, sort) {
    state.sort = sort
  },

  updateFilters(state, { name, values }) {
    state.filters = state.filters.map((filter) => {
      if (filter.name === name) {
        filter.value = values
      }
      return filter
    })
  },
}
