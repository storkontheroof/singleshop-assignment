<template>
  <div class="pa-2">
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          {{ title }}
        </v-btn>
      </template>
      <v-list class="overflow-y-auto" max-height="350">
        <v-list-item v-for="item in items" :key="item.title">
          <v-checkbox
            v-model="selected"
            hide-details
            :label="`${item.title} (${item.count})`"
            :value="item.title"
            :selected="selected.includes(item.title)"
            @change="updateFilters"
          ></v-checkbox>
        </v-list-item>
      </v-list>
    </v-menu>
    <!--    <strong>{{ title }}</strong>-->
    <!--    <div v-for="item in items" :key="item.title">-->
    <!--      <v-checkbox-->
    <!--        v-model="selected"-->
    <!--        hide-details-->
    <!--        :label="`${item.title} (${item.count})`"-->
    <!--        :value="item.title"-->
    <!--        :selected="selected.includes(item.title)"-->
    <!--      ></v-checkbox>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
    }
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  created() {
    this.selected = this.value
  },
  methods: {
    updateFilters(values) {
      this.$store.dispatch('products/updateFilters', {
        values,
        name: this.name,
      })
    },
  },
}
</script>
