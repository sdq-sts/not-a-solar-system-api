<template>
  <v-card @keydown.prevent.alt.n="addProduct">
    <v-form v-model="isValid" ref="form" @submit.prevent="submitForm">
      <v-container grid-list-xl>
        <h2 class="headline text-xs-center">{{ text.newPurchase }}</h2>
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
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
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
              v-model="status"
              :items="statusItems"
              :label="labels.status"
              hide-selected
            ></v-combobox>
          </v-flex>
        </v-layout>

        <h2 class="subheading text-xs-center">PRODUTOS</h2>
        <v-layout row>
          <v-flex xs12>
            <PurchaseFormProduct
              v-model="products[i]"
              v-for="(p, i) in products"
              :key="i"
              @removeItem="removeProduct(i)"
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

        <h2 class="subheading text-xs-center">TOTAL DOS PRODUTOS</h2>
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

        <h2 class="subheading text-xs-center">OBSERVAÇÃO</h2>
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
          >{{ purchaseToEdit ? 'EDITAR' : 'CADASTRAR' }}</v-btn>
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
    rules: {},
    product: null,
    dateMenu: false,
    products: {
      '1': { product: '', amount: 1, cost: 0 }
    },
    status: { text: 'Pendente', value: 'pending' },
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
      addProduct: 'Adicionar produto',
      newPurchase: 'NOVA COMPRA'
    },
    form: {
      provider: '',
      issueDate: new Date().toISOString().substr(0, 10),
      nfe: '',
      tax: 0,
      discount: 0,
      status: '',
      products: [
        { product: '', amount: 1, cost: 0 }
      ],
      note: ''
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
      const productsTotal = Object.values(this.products).reduce(reducer, 0)
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
        this.form.tax = parseFloat(this.form.tax) || 0
        this.form.discount = parseFloat(this.form.discount) || 0
        this.form.products = Object.values(this.products)
        this.form.issueDate = new Date(this.form.issueDate).toISOString()
        this.$emit('submit', JSON.stringify(this.form))
      }
    },
    removeProduct (index) {
      const hasMoreThanOneItem = Object.keys(this.products).length > 1

      if (hasMoreThanOneItem) {
        this.$delete(this.products, `${index}`)
      }
    },
    cancelBtn () {
      this.$emit('cancel')
      this.$refs.form.reset()
      this.$set(this.form, 'issueDate', new Date().toISOString().substr(0, 10))
    },
    reset () {
      this.$refs.form.reset()
      this.$set(this.form, 'issueDate', new Date().toISOString().substr(0, 10))
    },
    focus () {
      this.$refs.providerInput.focus()
    },
    addProduct () {
      const newProduct = { product: '', amount: 1, cost: 0 }
      const nextIndex = Math.max(...Object.keys(this.products)) + 1

      this.products = { ...this.products, [nextIndex]: newProduct }
    },
    watchPurchaseToEdit (purchase) {
      if (purchase) {
        this.status = this.transformStatus(purchase.status)
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
