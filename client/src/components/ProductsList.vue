<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="productsList"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.internal_code }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.sale_price | currencyBRL }}</td>
          <td class="text-xs-center">{{ props.item.current_storage }}</td>
          <td class="text-xs-center">{{ props.item.created_at | formatedDate}}</td>
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
      { text: 'Cadastrado em', align: 'center', sortable: false, value: 'created_at' }
    ]
  })
}
</script>

<style>

</style>
