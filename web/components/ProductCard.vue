<template>
  <div class="product-card">
    <picture class="product-picture">
      <img :src="imageUrl" :alt="product.title" class="product-image" />
    </picture>

    <h3 class="product-title py-4">
      {{ product.manufacturer }}
      <span class="font-weight-light"> {{ product.model }} </span>
    </h3>

    <div class="product-colors">
      <v-select
        :items="product.colors"
        v-model="color"
        dense
        hide-details
        @change="setVariant"
      ></v-select>
    </div>
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
  data() {
    return {
      color: this.product.variants[0].attributes.color,
      variant: this.product.variants[0],
    }
  },
  computed: {
    imageUrl() {
      return imageUrl.replace('##SRC##', this.variant.id)
    },
  },
  methods: {
    getImageUrl(src) {
      return imageUrl.replace('##SRC##', src)
    },
    setVariant() {
      this.variant = this.product.variants.find(
        (variant) => variant.attributes.color === this.color
      )
    },
  },
}
</script>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.product-colors {
  width: 90px;
}
.product-title {
  min-height: 5rem;
}
.product-image {
  height: 240px;
}
</style>
