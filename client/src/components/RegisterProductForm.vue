<template>
  <v-form ref="form" @submit.prevent="registerProduct">
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="header mb-4 text-xs-center" v-text="text.formHeader"></h1>
      </v-flex>

      <v-flex xs8>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              ref="nameInput"
              v-model="productName"
              :label="labels.productName"
              :rules="rules.productName"
              autofocus
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="internalCode"
              :label="labels.internalCode"
              :rules="rules.internalCode"
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="barCode"
              :label="labels.barCode"
              :rules="rules.barCode"
              outline
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-textarea
          :label="labels.productDescription"
          v-model="productDescription"
          outline
        ></v-textarea>
      </v-flex>

      <v-flex xs12>
        <h2 class="header mb-4" v-text="text.details"></h2>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="weight"
          :label="labels.weight"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="height"
          :label="labels.height"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="width"
          :label="labels.width"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="depth"
          :label="labels.depth"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <h2 class="header mb-4" v-text="text.values"></h2>
      </v-flex>

      <v-flex xs6>
        <v-text-field
          type="number"
          v-model="costPrice"
          :label="labels.costPrice"
          :rules="rules.costPrice"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs6>
        <v-text-field
          type="number"
          v-model="salePrice"
          :label="labels.salePrice"
          :rules="rules.salePrice"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <h2 class="header mb-4" v-text="text.storage"></h2>
      </v-flex>

      <v-flex xs4>
        <v-text-field
          type="number"
          v-model="minStorage"
          :label="labels.minStorage"
          :rules="rules.minStorage"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs4>
        <v-text-field
          type="number"
          v-model="maxStorage"
          :label="labels.maxStorage"
          :rules="rules.maxStorage"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs4>
        <v-text-field
          type="number"
          v-model="currentStorage"
          :label="labels.currentStorage"
          :rules="rules.currentStorage"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-switch
          v-model="changeInStorage"
          :label="labels.changeInStorage"
          :color="color"
        ></v-switch>

        <v-switch
          v-model="activeProduct"
          :label="labels.activeProduct"
          :color="color"
        ></v-switch>
      </v-flex>

      <v-flex xs12 class="mb-5" justify-center>
        <v-layout row wrap>
          <v-flex xs3>
            <v-btn class="ma-0"
              tabindex="-1"
              large
              block
              flat
              @click="resetForm"
            >{{ text.resetForm }}</v-btn>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs3>
            <v-btn class="ma-0"
              :color="color"
              :dark="isDarkTheme"
              :loading="loading"
              large
              block
              type="submit"
              @submit.prevent="registerProduct"
            >{{ text.register }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    isDarkTheme: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    clearForm: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    rules: {
      productName: [v => !!v || 'Campo obrigatório'],
      internalCode: [v => !!v || 'Campo obrigatório'],
      costPrice: [v => !!v || 'Campo obrigatório'],
      salePrice: [v => !!v || 'Campo obrigatório'],
      minStorage: [v => !!v || 'Campo obrigatório'],
      maxStorage: [v => !!v || 'Campo obrigatório'],
      currentStorage: [v => !!v || 'Campo obrigatório']
    },
    text: {
      formHeader: 'CADASTRAR PRODUTO',
      details: 'DETALHES',
      values: 'VALORES',
      storage: 'ESTOQUE',
      register: 'CADASTRAR',
      resetForm: 'Cancelar'
    },
    placeholders: {
      productName: 'Nome do produto',
      internalCode: 'Código interno',
      productDescription: 'Descrição do produto',
      barCode: 'Código de barras',
      weight: 'Peso (kg)',
      height: 'Altura (cm)',
      width: 'Largura (cm)',
      depth: 'Comprimento (cm)',
      costPrice: 'Valor de custo',
      salePrice: 'Valor de venda',
      minStorage: 'Estoque mínimo',
      maxStorage: 'Estoque máximo',
      currentStorage: 'Quantidade atual'
    },
    labels: {
      productName: 'Nome do produto',
      internalCode: 'Código interno',
      productDescription: 'Descrição do produto',
      barCode: 'Código de barras',
      weight: 'Peso (kg)',
      height: 'Altura (cm)',
      width: 'Largura (cm)',
      depth: 'Comprimento (cm)',
      costPrice: 'Valor de custo',
      salePrice: 'Valor de venda',
      minStorage: 'Estoque mínimo',
      maxStorage: 'Estoque máximo',
      currentStorage: 'Quantidade atual',

      changeInStorage: 'O produto movimenta o estoque?',
      activeProduct: 'O produto está ativo?'
    },
    internalCode: '',
    barCode: '',
    productName: '',
    productDescription: '',
    weight: '',
    height: '',
    width: '',
    depth: '',
    costPrice: '',
    salePrice: '',
    minStorage: '',
    maxStorage: '',
    currentStorage: '',
    changeInStorage: true,
    activeProduct: true
  }),

  watch: {
    clearForm: function (v) {
      v ? this.resetForm() : false
    }
  },

  methods: {
    resetForm () {
      this.$refs.form.reset()
      this.$refs.nameInput.focus()
      setTimeout(() => {
        this.activeProduct = true
        this.changeInStorage = true
        this.$emit('formIsReset')
      }, 0)
    },
    registerProduct () {
      const data = {
        name: this.productName,
        internal_code: this.internalCode,
        bar_code: this.barCode,
        description: this.productDescription,
        weight: this.weight,
        width: this.width,
        height: this.height,
        depth: this.depth,
        cost_price: this.costPrice,
        sale_price: this.salePrice,
        min_storage: this.minStorage,
        max_storage: this.maxStorage,
        current_storage: this.currentStorage,
        change_storage: this.changeInStorage,
        is_active: this.activeProduct
      }

      if (this.$refs.form.validate()) {
        this.$emit('registerProduct', data)
      }
    }
  }
}
</script>

<style>

</style>
