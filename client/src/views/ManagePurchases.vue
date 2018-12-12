<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>COMPRAS</h1>
      </v-flex>
      <!-- ADD COMBOBOX -->

      <v-dialog width="800" v-model="formPurchaseDialog" no-click-animation>
        <PurchaseForm/>
      </v-dialog>

      <v-dialog width="800" v-model="showPurchaseDialog" no-click-animation>
        <PurchaseShow :purchase="purchaseToShow"/>
      </v-dialog>

      <v-dialog width="400" persistent v-model="deletePurchaseDialog" no-click-animation>
        <PurchaseDelete
          :item="purchaseToDelete"
          :loading="deleteLoading"
          @cancelDeletion="closeDialogDelete"
          @confirmDeletion="deletePurchase"
        />
      </v-dialog>

      <v-flex xs6 offset-xs3>
        <PurchaseList
          :purchasesList="purchases"
          @editPurchaseStatus="editPurchaseStatus"
          @deleteItem="openDeleteDialog"
          @showPurchase="openShowPurchaseDialog"
        />
      </v-flex>

      <v-flex xs6 offset-xs3>
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
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PurchaseList from '@/components/Purchases/PurchaseList'
import PurchaseShow from '@/components/Purchases/PurchaseShow'
import PurchaseForm from '@/components/Purchases/PurchaseForm'
import PurchaseDelete from '@/components/Shared/ConfirmDeletion'

export default {
  components: {
    PurchaseList,
    PurchaseShow,
    PurchaseForm,
    PurchaseDelete
  },

  data: () => ({
    formPurchaseDialog: true,
    deletePurchaseDialog: false,
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
      this.deletePurchaseDialog = false
      await this.fetchPurchases()
    },
    getPurchases (page) {
      const limit = this.limit

      this.fetchPurchases({ page, limit })
    },
    closeDialogDelete () {
      this.deletePurchaseDialog = false
    },
    openDeleteDialog (payload) {
      this.purchaseToDelete = payload
      this.deletePurchaseDialog = true
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
