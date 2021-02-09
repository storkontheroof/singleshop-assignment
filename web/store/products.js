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
          acc.push(textFilter(f.selected, p[f.name]))
          break
        case 'array':
          acc.push(arrayFilter(f.selected, p[f.name]))
          break
        case 'bool':
        case 'boolean':
          acc.push(boolFilter(f.selected, p[f.name]))
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
}

export const actions = {
  async getProducts({ commit, state }) {
    await this.$axios.$get('/phones').then((res) => {
      commit('setProducts', res.products)
    })
  },
  setFiltersFromQuery({ commit, state }, query) {
    const filters = state.filters.map((filter) => {
      if (query[filter.name]) {
        filter.selected = query[filter.name]
      }
      return filter
    })
    commit('setFilters', filters)
  },

  setSort({ commit, state }, { sortBy = 'sort_order', sortOrder = 'ASC' }) {
    commit('setSort', {
      sortBy,
      sortOrder: sortOrder.toUpperCase() === 'DESC' ? -1 : 1,
    })
  },
  filterProducts({ commit, state }) {
    // filter products
    const filteredProducts = getFilteredProducts(state.products, state.filters)

    // apply sort
    const sortedFilteredProducts = filteredProducts.sort(sortBy(state.sort))

    // commit
    commit('setFilteredProducts', sortedFilteredProducts)

    // items per filter
    const filters = state.filters.map((filter) => {
      const products = getFilteredProducts(
        sortedFilteredProducts,
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

      filter.items = Object.keys(items).map((key) => {
        return {
          title: key,
          count: items[key],
        }
      })

      return filter
    })

    commit('setFilters', filters)
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
    state.filters = filters
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
