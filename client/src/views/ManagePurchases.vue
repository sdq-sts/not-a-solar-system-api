<template>
  <div>
    <h1>COMPRAS</h1>
    <!-- ADD COMBOBOX -->

    <v-dialog width="800" v-model="showPurchaseDialog" no-click-animation>
      <ShowPurchase :purchase="purchaseToShow"/>
    </v-dialog>

    <v-dialog width="400" persistent v-model="deleteDialog" no-click-animation>
      <ConfirmDeletion
        :item="purchaseToDelete"
        :loading="deleteLoading"
        @cancelDeletion="closeDialogDelete"
        @confirmDeletion="deletePurchase"
      />
    </v-dialog>

    <TableList
      :purchasesList="purchases"
      @editPurchaseStatus="editPurchaseStatus"
      @deleteItem="openDeleteDialog"
      @showPurchase="openShowPurchaseDialog"
    />

    <v-flex xs8 offset-xs2>
      <v-layout justify-center>
        <v-pagination
          v-if="Math.ceil(purchasesCount / limit)"
          class="mt-2"
          :color="appMainColor"
          v-model="page"
          :length="Math.ceil(purchasesCount / limit)"
          circle
        ></v-pagination>
      </v-layout>
    </v-flex>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableList from '@/components/Purchases/TableList'
import ShowPurchase from '@/components/Purchases/ShowPurchase'
import ConfirmDeletion from '@/components/Shared/ConfirmDeletion'

export default {
  components: {
    TableList,
    ShowPurchase,
    ConfirmDeletion
  },

  data: () => ({
    deleteDialog: false,
    showPurchaseDialog: false,
    deleteLoading: false,
    purchaseToShow: {},
    purchaseToDelete: {},
    page: 1,
    limit: 3
  }),

  watch: {
    page: {
      handler: 'getPurchases'
    }
  },

  computed: {
    ...mapGetters([
      'appMainColor',
      'isDarkTheme'
    ]),
    ...mapGetters('purchases', [
      'purchases',
      'purchasesCount'
    ])
  },

  methods: {
    ...mapActions('purchases', [
      'fetchPurchasesMeta',
      'fetchPurchases',
      'editPurchase',
      'removePurchase'
    ]),
    async editPurchaseStatus (payload) {
      await this.editPurchase(payload)
      this.fetchPurchasesMeta()
      this.fetchPurchases()
    },
    async deletePurchase (item) {
      this.deleteLoading = true
      await this.removePurchase(item)
      this.deleteLoading = false
      this.deleteDialog = false
      await this.fetchPurchases()
    },
    getPurchases (page) {
      const limit = this.limit

      this.fetchPurchases({ page, limit })
    },
    closeDialogDelete () {
      this.deleteDialog = false
    },
    openDeleteDialog (payload) {
      this.purchaseToDelete = payload
      this.deleteDialog = true
    },
    openShowPurchaseDialog (purchase) {
      this.purchaseToShow = purchase
      this.showPurchaseDialog = true
    }
  },

  beforeCreate () {
    this.$store.dispatch('purchases/fetchPurchasesMeta')
    this.$store.dispatch('purchases/fetchPurchases')
  }
}
</script>

<style>

</style>
