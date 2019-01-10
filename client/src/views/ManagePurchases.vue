<template>
  <v-container grid-list-xl>
    <v-layout row wrap>

      <v-dialog width="60%" v-model="formPurchaseDialog" no-click-animation>
        <PurchaseForm
          :purchaseToEdit="purchaseToEdit"
          @cancel="closeFormDialog"
          @submit="createNewPurchase"
          @edit="modifyPurchase"
          ref="purchaseForm"
        />
      </v-dialog>

      <v-dialog width="800" v-model="showPurchaseDialog" no-click-animation>
        <PurchaseShow :purchase="purchaseToShow"/>
      </v-dialog>

      <v-dialog width="400" persistent v-model="deletePurchaseDialog" no-click-animation>
        <PurchaseDelete
          :item="purchaseToDelete"
          :loading="deleteLoading"
          @cancelDeletion="closeDeleteDialog"
          @confirmDeletion="deletePurchase"
        />
      </v-dialog>

      <v-flex xs6 offset-xs3>
        <v-layout row wrap justify-end>
          <v-btn
            color="primary"
            @click="openNewPurchaseDialog"
          >{{ text.newPurchase }}</v-btn>
        </v-layout>
      </v-flex>

      <v-flex xs6 offset-xs3>
        <PurchaseList
          :purchasesList="purchases"
          @editPurchaseStatus="editPurchaseStatus"
          @deletePurchase="openDeletePurchaseDialog"
          @showPurchase="openShowPurchaseDialog"
          @editPurchase="openEditPurchaseDialog"
        />
      </v-flex>

      <v-flex xs6 offset-xs3>
        <v-layout justify-center>
          <v-pagination
            v-if="Math.ceil(purchasesCount / limit)"
            class="mt-2"
            color="primary"
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
    formPurchaseDialog: false,
    deletePurchaseDialog: false,
    showPurchaseDialog: false,
    deleteLoading: false,
    purchaseToShow: {},
    purchaseToDelete: {},
    purchaseToEdit: null,
    page: 1,
    limit: 3,
    text: {
      newPurchase: 'Nova compra'
    }
  }),

  watch: {
    page: {
      handler: 'getPurchases'
    }
  },

  computed: {
    ...mapGetters('purchases', [
      'purchases',
      'purchasesCount'
    ])
  },

  methods: {
    ...mapActions([ 'showSnackbar' ]),
    ...mapActions('purchases', [
      'fetchPurchasesMeta',
      'fetchPurchases',
      'createPurchase',
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
    async createNewPurchase (purchase) {
      try {
        await this.createPurchase(purchase)
        this.showSnackbar({ color: 'success', text: `Compra cadastrada` })
        this.$refs.purchaseForm.reset()
        this.$refs.purchaseForm.focus()
      } catch (err) {
        this.showSnackbar({ color: 'danger', text: `Compra não cadastrada` })
      }
    },
    async modifyPurchase (value) {
      const res = await this.editPurchase(value)
      console.log('EDIT PURCHASE', res)
    },
    getPurchases (page) {
      const limit = this.limit
      this.fetchPurchases({ page, limit })
    },
    openNewPurchaseDialog (purchase) {
      this.purchaseToEdit = null
      this.formPurchaseDialog = true
    },
    openEditPurchaseDialog (purchase) {
      this.purchaseToEdit = purchase
      this.formPurchaseDialog = true
    },
    openDeletePurchaseDialog (purchase) {
      this.purchaseToDelete = purchase
      this.deletePurchaseDialog = true
    },
    openShowPurchaseDialog (purchase) {
      this.purchaseToShow = purchase
      this.showPurchaseDialog = true
    },
    closeDeleteDialog () {
      this.deletePurchaseDialog = false
    },
    closeFormDialog () {
      this.formPurchaseDialog = false
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
