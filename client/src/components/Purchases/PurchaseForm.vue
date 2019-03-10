<template>
  <v-card @keydown.alt.n="addProduct">
    <v-form v-model="isValid" ref="form" @submit.prevent="submitForm">
      <v-container grid-list-xl>
        <h2 class="headline text-xs-center">{{ purchaseToEdit ? text.editPurchase : text.newPurchase }}</h2>
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              ref="providerInput"
              v-model="form.provider"
              :label="labels.provider"
              autofocus
            ></v-text-field>
          </v-flex>

          <v-flex xs2>
            <v-menu
              :close-on-content-click="false"
              v-model="dateMenu"
              transition="scale-transition"
              min-width="290px"
              full-width
              offset-y
              lazy
            >
              <v-text-field
                slot="activator"
                v-model="form.issueDate"
                :label="labels.issueDate"
                readonly
              ></v-text-field>
              <v-date-picker
                v-model="form.issueDate"
                color="primary"
                header-color="primary"
                locale="pt-BR"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs2>
            <v-text-field
              v-model="form.nfe"
              :label="labels.nfe"
            ></v-text-field>
          </v-flex>

          <v-flex xs2>
            <v-combobox
              v-model="form.status"
              :items="statusItems"
              :label="labels.status"
              hide-selected
            ></v-combobox>
          </v-flex>
        </v-layout>

        <h2 class="subheading text-xs-center">{{ text.products.toUpperCase() }}</h2>
        <v-layout row>
          <v-flex xs12>
            <PurchaseFormProduct
              v-for="(p, k) in form.products"
              v-model="form.products[k]"
              :isEditing="!!purchaseToEdit"
              :key="p._id"
              @removeItem="removeProduct(k)"
            />
          </v-flex>
        </v-layout>

        <v-layout row wrap justify-end>
          <v-flex xs2 justify-end>
            <v-btn
              tabindex="-1"
              color="primary"
              @click="addProduct"
              block
              small
            >{{ text.addProduct }}</v-btn>
          </v-flex>
        </v-layout>

        <h2 class="subheading text-xs-center">{{ text.productsTotal.toUpperCase() }}</h2>
        <v-layout row>
          <v-flex xs3>
            <v-text-field
              v-model="form.tax"
              :label="labels.tax"
              type="number"
            ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              v-model="form.discount"
              :label="labels.discount"
              type="number"
            ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              :label="labels.productsTotal"
              :value="productsTotal | currencyBRL"
              tabindex="-1"
              type="text"
              disabled
              readonly
            ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              :label="labels.purchaseTotal"
              :value="purchaseTotal | currencyBRL"
              tabindex="-1"
              type="text"
              disabled
              readonly
            ></v-text-field>
          </v-flex>
        </v-layout>

        <h2 class="subheading text-xs-center">{{ text.note.toUpperCase() }}</h2>
        <v-layout row>
          <v-flex xs12>
            <v-textarea
              v-model="form.note"
              :label="labels.note"
              counter="255"
              rows="3"
            ></v-textarea>
          </v-flex>
        </v-layout>

        <v-layout row class="mt-3">
          <v-btn flat @click="cancelBtn">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            color="primary"
            :loading="loading"
          >{{ purchaseToEdit ? text.edit : text.register }}</v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import PurchaseFormProduct from './PurchaseFormProduct'

export default {
  components: { PurchaseFormProduct },

  props: {
    purchaseToEdit: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    isValid: false,
    product: null,
    dateMenu: false,
    labels: {
      provider: 'Fornecedor',
      nfe: 'NFE',
      status: 'Situação',
      amount: 'Quantidade',
      cost: 'Custo',
      total: 'Total',
      productsTotal: 'Total dos produtos',
      purchaseTotal: 'Total da compra',
      issueDate: 'Data de emissão',
      note: 'Observação',
      tax: 'Imposto (R$)',
      discount: 'Desconto (R$)'
    },
    text: {
      products: 'Produtos',
      productsTotal: 'Total dos produtos',
      note: 'Observação',
      addProduct: 'Adicionar produto',
      newPurchase: 'Nova compra',
      editPurchase: 'Editar compra',
      edit: 'Editar',
      register: 'Cadastrar'
    },
    form: {
      provider: '',
      issueDate: '',
      nfe: '',
      tax: 0,
      discount: 0,
      note: '',
      status: { text: 'Pendente', value: 'pending' },
      products: {
        '1': { product: '', amount: 1, cost: 0 }
      }
    },
    normalizedFormData: {
      provider: '',
      issueDate: '',
      nfe: '',
      tax: 0,
      discount: 0,
      note: '',
      status: '',
      products: []
    },
    statusItems: [
      { text: 'Cancelado', value: 'canceled' },
      { text: 'Pendente', value: 'pending' },
      { text: 'Aprovado', value: 'confirmed' }
    ],
    fetchedProducts: []
  }),

  computed: {
    productsTotal () {
      const reducer = (x, y) => (y.amount * y.cost) + x
      const productsTotal = Object.values(this.form.products).reduce(reducer, 0)
      return productsTotal
    },
    purchaseTotal () {
      const purchaseTotal = parseFloat(this.productsTotal) + parseFloat(this.form.tax) - parseFloat(this.form.discount)
      return purchaseTotal
    }
  },

  watch: {
    purchaseToEdit: {
      handler: 'watchPurchaseToEdit',
      immediate: true
    },
    status: {
      handler: 'watchStatus',
      immediate: true
    }
  },

  methods: {
    submitForm () {
      if (this.$refs.form.validate()) {
        const { _id } = (this.purchaseToEdit || {})
        this.normalizedFormData = this.normalizeFormData(this.form)

        this.purchaseToEdit
          ? this.$emit('editPurchase', { _id, ...this.normalizedFormData })
          : this.$emit('createPurchase', this.normalizedFormData)
      }
    },
    normalizeFormData (form) {
      return {
        provider: form.provider,
        issueDate: new Date(form.issueDate),
        nfe: form.nfe,
        status: form.status.value,
        tax: parseFloat(form.tax) || 0,
        discount: parseFloat(form.discount) || 0,
        products: Object.values(form.products),
        note: form.note
      }
    },
    removeProduct (index) {
      const hasMoreThanOneItem = Object.keys(this.form.products).length > 1

      if (hasMoreThanOneItem) {
        this.$delete(this.form.products, `${index}`)
      }
    },
    setFormDefaults () {
      this.$set(this.form, 'issueDate', new Date().toISOString().substr(0, 10))
      this.$set(this.form, 'products', { '1': { product: '', amount: 1, cost: 0 } })
      this.$set(this.form, 'status', { text: 'Pendente', value: 'pending' })
    },
    cancelBtn () {
      this.$emit('cancel')
      this.$refs.form.reset()
      this.setFormDefaults()
    },
    focus () {
      this.$refs.providerInput.focus()
    },
    reset () {
      this.$refs.form.reset()
      this.setFormDefaults()
    },
    addProduct () {
      const newProduct = { product: '', amount: 1, cost: 0 }
      const nextIndex = Math.max(...Object.keys(this.form.products)) + 1

      this.form.products = { ...this.form.products, [nextIndex]: newProduct }
    },
    productsListToObj (productsList) {
      const reducer = (obj, p, i) => ({ ...obj, [`${i + 1}`]: p })
      return productsList.reduce(reducer, {})
    },
    watchPurchaseToEdit (purchase) {
      if (purchase) {
        this.$set(this.form, 'products', this.productsListToObj(purchase.products))
        this.$set(this.form, 'issueDate', purchase.issueDate ? purchase.issueDate.substring(0, 10) : '')
        this.$set(this.form, 'nfe', purchase.nfe)
        this.$set(this.form, 'tax', purchase.tax)
        this.$set(this.form, 'discount', purchase.discount)
        this.$set(this.form, 'provider', purchase.provider)
        this.$set(this.form, 'note', purchase.note)
        this.$set(this.form, 'status', this.transformStatus(purchase.status))
      } else {
        this.setFormDefaults()
      }
    },
    watchStatus (status) {
      if (status) {
        switch (status.value) {
          case 'confirmed':
            this.form.status = 'confirmed'
            break
          case 'pending':
            this.form.status = 'pending'
            break
          case 'canceled':
            this.form.status = 'canceled'
            break
        }
      }
    },
    transformStatus (status) {
      switch (status) {
        case 'confirmed':
          return { text: 'Aprovado', value: 'confirmed' }
        case 'pending':
          return { text: 'Pendente', value: 'pending' }
        case 'canceled':
          return { text: 'Cancelado', value: 'canceled' }
      }
    }
  }
}
</script>

<style>

</style>
