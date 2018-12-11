<template>
<v-card>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs6>
        <h1 class="heading">{{ headerText }}</h1>
      </v-flex>
      <v-flex xs6>
        <h1 class="heading text-xs-right">{{ purchase.issueDate | ddmmaaDate }}</h1>
      </v-flex>

      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="productsList"
          class="elevation-1"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.index + 1 }}</td>
            <td>{{ props.item.product.name }}</td>
            <td class="text-xs-center">{{ props.item.amount }}</td>
            <td class="text-xs-right">{{ props.item.cost | currencyBRL }}</td>
            <td class="text-xs-right">{{ calcTotalProduct(props.item) | currencyBRL }}</td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex xs6>
        <h1>{{ totalText }}</h1>
      </v-flex>
      <v-flex xs6>
        <h1 class="text-xs-right">{{ purchase.total | currencyBRL }}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</v-card>
</template>

<script>
export default {
  props: {
    purchase: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    headerText: 'PEDIDO DE COMPRA',
    totalText: 'TOTAL',
    headers: [
      { text: 'Item', sortable: false, value: 'item' },
      { text: 'Produto', sortable: false, value: 'product' },
      { text: 'Quantidade', align: 'center', sortable: false, value: 'amount' },
      { text: 'Valor', align: 'center', sortable: false, value: 'value' },
      { text: 'Total', align: 'center', sortable: false, value: 'total' }
    ]
  }),

  computed: {
    productsList () {
      return (this.purchase && this.purchase._id)
        ? this.purchase.products
        : []
    }
  },

  methods: {
    calcTotalProduct (purchase) {
      return purchase.amount * purchase.cost
    }
  }
}
</script>

<style>

</style>
