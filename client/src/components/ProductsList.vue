<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="productsList"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.internalCode }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.salePrice | currencyBRL }}</td>
          <td class="text-xs-center">{{ props.item.currentStorage }}</td>
          <td class="text-xs-center">{{ props.item.createdAt | formatedDate}}</td>
          <td>
            <v-layout row>
              <v-icon @click="editItem(props.item)" v-text="`edit`"></v-icon>
              <v-spacer></v-spacer>
              <v-icon  @click="deleteItem(props.item)" v-text="`delete`"></v-icon>
            </v-layout>
          </td>
      </template>
    </v-data-table>
  </div>
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
      { text: 'Código', sortable: false, value: 'internal_code' },
      { text: 'Nome', align: 'left', sortable: false, value: 'name' },
      { text: 'Valor de venda', align: 'center', sortable: false, value: 'sale_price' },
      { text: 'Estoque', align: 'center', sortable: false, value: 'storage' },
      { text: 'Cadastrado em', align: 'center', sortable: false, value: 'created_at' },
      { text: 'Ações', align: 'center', sortable: false, value: 'actions' }
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
