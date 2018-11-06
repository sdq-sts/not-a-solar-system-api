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
              :placeholder="placeholders.productName"
              :rules="rules.productName"
              single-line
              autofocus
              solo
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="internalCode"
              :placeholder="placeholders.internalCode"
              :rules="rules.internalCode"
              single-line
              solo
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="barCode"
              :placeholder="placeholders.barCode"
              :rules="rules.barCode"
              single-line
              solo
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-textarea
          :placeholder="placeholders.productDescription"
          v-model="productDescription"
          solo
        ></v-textarea>
      </v-flex>

      <v-flex xs12>
        <h2 class="header mb-4" v-text="text.details"></h2>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="weight"
          :placeholder="placeholders.weight"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="height"
          :placeholder="placeholders.height"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="width"
          :placeholder="placeholders.width"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs3>
        <v-text-field
          type="number"
          v-model="depth"
          :placeholder="placeholders.depth"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <h2 class="header mb-4" v-text="text.values"></h2>
      </v-flex>

      <v-flex xs6>
        <v-text-field
          type="number"
          v-model="costPrice"
          :placeholder="placeholders.costPrice"
          :rules="rules.costPrice"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs6>
        <v-text-field
          type="number"
          v-model="salePrice"
          :placeholder="placeholders.salePrice"
          :rules="rules.salePrice"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <h2 class="header mb-4" v-text="text.storage"></h2>
      </v-flex>

      <v-flex xs4>
        <v-text-field
          type="number"
          v-model="minStorage"
          :placeholder="placeholders.minStorage"
          :rules="rules.minStorage"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs4>
        <v-text-field
          type="number"
          v-model="maxStorage"
          :placeholder="placeholders.maxStorage"
          :rules="rules.maxStorage"
          single-line
          solo
        ></v-text-field>
      </v-flex>

      <v-flex xs4>
        <v-text-field
          type="number"
          v-model="currentStorage"
          :placeholder="placeholders.currentStorage"
          :rules="rules.currentStorage"
          single-line
          solo
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

      <v-flex xs3 offset-xs9 class="mb-5">
        <v-btn class="ma-0"
          :color="color"
          :dark="isDarkTheme"
          :loading="loading"
          block
          large
          type="submit"
          @submit.prevent="registerProduct"
        >{{ text.register }}</v-btn>
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
      formHeader: 'CADASTRAR NOVO PRODUTO',
      details: 'DETALHES',
      values: 'VALORES',
      storage: 'ESTOQUE',
      register: 'CADASTRAR'
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
    clearForm: async function (v) {
      if (v) {
        await this.$refs.form.reset()
        this.changeInStorage = true
        this.activeProduct = true
        this.$emit('formIsReset', true)
        this.$refs.nameInput.focus()
        window.scrollTo(0,0)
      }
    }
  },

  methods: {
    registerProduct () {
      const data = {
        name: this.productName,
        code: this.internalCode,
        code: this.barCode,
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

      this.$emit('registerProduct', data)
    }
  }
}
</script>

<style>

</style>
