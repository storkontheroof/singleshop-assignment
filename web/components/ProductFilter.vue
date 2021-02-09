<template>
  <div class="pa-2">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          {{ title }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title">
          <v-checkbox
            v-model="selected"
            hide-details
            :label="`${item.title} (${item.count})`"
            :value="item.title"
            :selected="selected.includes(item.title)"
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

    <!--    <v-select-->
    <!--        v-model="selected"-->
    <!--        :items="items"-->
    <!--        :menu-props="{ maxHeight: '400' }"-->
    <!--        :label="title"-->
    <!--        multiple-->
    <!--        item-text=""-->
    <!--    >-->
    <!--    </v-select>-->
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
}
</script>
