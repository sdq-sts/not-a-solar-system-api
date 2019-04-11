<template>
  <v-list>
    <v-list-tile
      v-for="(item, i) in items"
      :key="i"
      :to="item.path"
    >
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: 'Dashboard', icon: 'assessment', path: '/dashboard' },
      { text: 'Vendas', icon: 'trending_up', path: '/vendas' },
      { text: 'Compras', icon: 'credit_card', path: '/compras' },
      { text: 'Produtos', icon: 'view_module', path: '/produtos' },
      { text: 'Configurações', icon: 'settings', path: '/config' }
    ]
  })
}
</script>

<style>

</style>
