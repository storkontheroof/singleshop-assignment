<template>
  <div class="card product-card">
    <div class="product-colors">
      <ul>
        <li
          v-for="variant in product.variants"
          v-bind:key="variant.attributes.color"
        >
          <span v-html="variant.attributes.color" />
        </li>
      </ul>
    </div>

    <picture class="product-picture">
      <img
        :src="getImageUrl(product.variants[0].id)"
        :alt="product.title"
        class="product-image"
      />
    </picture>

    <h3 class="product-title">
      <strong v-html="product.manufacturer" />
      <span v-html="product.model" />
    </h3>
  </div>
</template>

<style scoped>
.product-image {
  height: 240px;
}
</style>

<script>
const imageUrl =
  'https://www.kpn.com/shop/cdn/products/_/product_##SRC##_main.png'

export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    colors: {
      type: Array,
      default: null,
    },
  },
  methods: {
    getImageUrl(src) {
      return imageUrl.replace('##SRC##', src)
    },
  },
}
</script>
