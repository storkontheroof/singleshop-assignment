<template>
  <div class="card product-card">
    <div class="product-colors">
      <ul>
        <li v-for="color in product.colors" :key="color">
          <span> {{ color }}</span>
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
      <strong> {{ product.manufacturer }} </strong>
      <span> {{ product.model }} </span>
    </h3>
  </div>
</template>

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

<style scoped>
.product-image {
  height: 240px;
}
</style>
