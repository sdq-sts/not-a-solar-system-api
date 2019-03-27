<template>
  <v-data-table
    :headers="headers"
    :items="productsList"
    class="elevation-1"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.internalCode }}</td>
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.salePrice | currencyBRL }}</td>
      <td class="text-xs-center">{{ props.item.currentStorage }}</td>
      <td class="text-xs-center">{{ props.item.createdAt | formatedDate}}</td>
      <td>
        <v-layout row>
          <v-icon @click="editItem(props.item)" v-text="`edit`" small></v-icon>
          <v-spacer></v-spacer>
          <v-icon  @click="deleteItem(props.item)" v-text="`delete`" small></v-icon>
        </v-layout>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    productsList: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    headers: [
      { text: 'Código'.toUpperCase(), sortable: false, value: 'internal_code' },
      { text: 'Nome'.toUpperCase(), align: 'left', sortable: false, value: 'name' },
      { text: 'Valor de venda'.toUpperCase(), align: 'center', sortable: false, value: 'sale_price' },
      { text: 'Estoque'.toUpperCase(), align: 'center', sortable: false, value: 'storage' },
      { text: 'Cadastrado em'.toUpperCase(), align: 'center', sortable: false, value: 'created_at' },
      { text: 'Ações'.toUpperCase(), align: 'center', sortable: false, value: 'actions' }
    ]
  }),

  methods: {
    editItem (item) {
      this.$emit('editItem', item)
    },
    deleteItem (item) {
      this.$emit('deleteItem', item)
    }
  }
}
</script>

<style>

</style>
