<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="purchasesList"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.nfe }}</td>
          <td class="text-xs-center">{{ props.item.issueDate | formatedDate }}</td>
          <td class="text-xs-left">{{ props.item.status }}</td>
          <td class="text-xs-center">{{ props.item.total | currencyBRL }}</td>
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
    purchasesList: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    headers: [
      { text: 'NFE', sortable: false, value: 'nfe' },
      { text: 'Data de emissão', align: 'center', sortable: false, value: 'issueDate' },
      { text: 'status', align: 'left', sortable: false, value: 'status' },
      { text: 'Valor', align: 'center', sortable: false, value: 'value' },
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
