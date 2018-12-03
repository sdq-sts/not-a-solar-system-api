<template>
  <div>
    <h1>COMPRAS</h1>
      <v-dialog width="400" persistent v-model="deleteDialog" no-click-animation>
        <ConfirmDeletion
          :item="purchaseToDelete"
          :loading="deleteLoading"
          @cancelDeletion="closeDialogDelete"
          @confirmDeletion="removePurchase"
        />
      </v-dialog>

    <TableList :purchasesList="purchases" @deleteItem="openDeleteDialog"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableList from '@/components/Purchases/TableList'
import ConfirmDeletion from '@/components/Shared/ConfirmDeletion'

export default {
  components: {
    TableList,
    ConfirmDeletion
  },

  data: () => ({
    deleteDialog: false,
    deleteLoading: false,
    purchaseToDelete: {}
  }),

  computed: {
    ...mapGetters('purchases', [
      'purchases'
    ])
  },

  methods: {
    ...mapActions('purchases', ['fetchPurchases']),
    async removePurchase (item) {
      this.deleteLoading = true
      await this.$store.dispatch('purchases/removePurchase', item)
      this.deleteLoading = false
      this.deleteDialog = false
      this.fetchPurchases()
    },
    closeDialogDelete () {
      this.deleteDialog = false
    },
    openDeleteDialog (payload) {
      this.purchaseToDelete = payload
      this.deleteDialog = true
    }
  },

  beforeCreate () {
    this.$store.dispatch('purchases/fetchPurchases')
  }
}
</script>

<style>

</style>
