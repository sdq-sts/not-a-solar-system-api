<template>
  <v-list>
    <template v-for="(item, i) in items">
      <v-list-group
        v-if="item.children"
        v-model="item.model"
        :key="i"
        :group="item.pathName"
        :prepend-icon="item.model ? item.prependIcon : item.prependIconAlt"
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="(child, i) in item.children"
          :key="i"
          @click="changePath(child)"
        >
          <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ child.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>

      <v-list-tile v-else :key="item.text" @click="changePath(item)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: 'Dashboard', icon: 'assessment', pathName: 'dashboard.index' },
      { text: 'Vendas', icon: 'trending_up', pathName: 'manage.sales' },
      { text: 'Compras', icon: 'credit_card', pathName: 'manage.purchases' },
      { text: 'Produtos', icon: 'view_module', pathName: 'manage.products' }
    ]
  }),

  methods: {
    changePath (item) {
      const { pathName } = item
      this.$router.push({ name: pathName })
    }
  }
}
</script>

<style>

</style>
