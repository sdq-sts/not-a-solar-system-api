<template>
  <v-container grid-list-xl>
    <v-dialog
      width="50%"
      class="ma-0"
      v-model="formPurchaseDialog"
      no-click-animation
      persistent
    >
      <PurchaseForm
        ref="purchaseForm"
        :purchaseToEdit="purchaseToEdit"
        :isOpen="formPurchaseDialog"
        @cancel="closeFormDialog"
        @createPurchase="createNewPurchase"
        @editPurchase="modifyPurchase"
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

    <v-layout row wrap>
      <v-flex
        class="text-xs-right"
        xs12 xl10
        offset-xs0 offset-xl1
      >
        <v-btn
          color="primary"
          class="ma-0"
          @click="openNewPurchaseDialog"
        >{{ text.newPurchase }}</v-btn>
      </v-flex>

      <v-flex
        xs12 xl10
        offset-xs0 offset-xl1
      >
        <PurchaseList
          :purchasesList="purchases"
          :loading="loadingPurchases"
          @editPurchaseStatus="editPurchaseStatus"
          @deletePurchase="openDeletePurchaseDialog"
          @showPurchase="openShowPurchaseDialog"
          @editPurchase="openEditPurchaseDialog"
        />
      </v-flex>

      <v-flex xs6 offset-xs3>
        <v-layout justify-center>
          <v-pagination
            v-if="Math.ceil(totalPurchases / limit)"
            class="mt-2"
            color="primary"
            v-model="page"
            :length="Math.ceil(totalPurchases / limit)"
            circle
          ></v-pagination>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from '@/store'
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
    loadingPurchases: false,
    formPurchaseDialog: false,
    deletePurchaseDialog: false,
    showPurchaseDialog: false,
    deleteLoading: false,
    purchaseToShow: {},
    purchaseToDelete: {},
    purchaseToEdit: null,
    page: 1,
    limit: 10,
    text: {
      newPurchase: 'Cadastrar Compra'
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
      'totalPurchases'
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
        this.fetchPurchasesMeta()
        this.fetchPurchases()
      } catch (err) {
        this.showSnackbar({ color: 'danger', text: `Compra não cadastrada` })
      }
    },
    async modifyPurchase (value) {
      try {
        await this.editPurchase(value)
        this.showSnackbar({ color: 'success', text: `Compra editada com sucesso` })
        this.$refs.purchaseForm.reset()
        this.closeFormDialog()
        this.fetchPurchasesMeta()
        this.fetchPurchases()
      } catch (error) {
        this.showSnackbar({ color: 'danger', text: `Erro ao tentar editar compra` })
      }
    },
    async getPurchases (page) {
      const limit = this.limit
      this.loadingPurchases = true
      await this.fetchPurchases({ page, limit })
      this.loadingPurchases = false
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
      this.purchaseToEdit = null
    }
  },

  async beforeRouteEnter (to, from, next) {
    const promises = [
      store.dispatch('purchases/fetchPurchasesMeta'),
      store.dispatch('purchases/fetchPurchases', { page: 1, limit: 10 })
    ]

    try {
      await Promise.all(promises)
    } catch (error) {
      store.dispatch('showSnackbar', { color: 'error', text: `Houve um problema ao acessar a página.` })
    }

    next()
  }
}
</script>

<style>

</style>
