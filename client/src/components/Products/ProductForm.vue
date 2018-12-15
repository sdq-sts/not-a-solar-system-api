<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs8>
            <v-text-field
              ref="nameInput"
              v-model="name"
              :label="labels.name"
              :rules="rules.name"
              counter
              maxlength="100"
              autofocus
            ></v-text-field>

            <v-layout row>
              <v-flex xs6>
                <v-text-field
                  v-model="internalCode"
                  :label="labels.internalCode"
                  :rules="rules.internalCode"
                  counter
                  maxlength="20"
                ></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field
                  v-model="barCode"
                  :label="labels.barCode"
                  :rules="rules.barCode"
                  counter
                  maxlength="20"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-textarea
              :label="labels.description"
              v-model="description"
              counter
              maxlength="255"
              rows="2"
            ></v-textarea>
          </v-flex>

          <v-flex xs4>
            <v-layout row fill-height>
              <v-flex xs12>
                <slot name="img-upload"></slot>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12>
            <v-layout row>
              <v-switch
                v-model="changeStorage"
                :label="labels.changeStorage"
                :color="color"
              ></v-switch>

              <v-spacer></v-spacer>

              <v-switch
                v-model="isActive"
                :label="labels.isActive"
                :color="color"
              ></v-switch>
            </v-layout>
          </v-flex>

          <v-flex xs12>
            <h3 class="mb-2 text-xs-center font-weight-light" v-text="text.details"></h3>
            <v-layout row>
              <v-flex xs3>
                <v-text-field
                  type="number"
                  v-model="weight"
                  :label="labels.weight"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  type="number"
                  v-model="height"
                  :label="labels.height"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  type="number"
                  v-model="width"
                  :label="labels.width"
                ></v-text-field>
              </v-flex>

              <v-flex xs3>
                <v-text-field
                  type="number"
                  v-model="depth"
                  :label="labels.depth"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12>
            <h3 class="mb-2 text-xs-center font-weight-light" v-text="text.values"></h3>
            <v-layout row>
              <v-flex xs6>
                <v-text-field
                  type="number"
                  v-model="costPrice"
                  :label="labels.costPrice"
                  :rules="rules.costPrice"
                ></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field
                  type="number"
                  v-model="salePrice"
                  :label="labels.salePrice"
                  :rules="rules.salePrice"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12>
            <h3 class="mb-2 text-xs-center font-weight-light" v-text="text.storage"></h3>
            <v-layout row>
              <v-flex xs4>
                <v-text-field
                  type="number"
                  v-model="minStorage"
                  :label="labels.minStorage"
                  :rules="rules.minStorage"
                ></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-text-field
                  type="number"
                  v-model="maxStorage"
                  :label="labels.maxStorage"
                  :rules="rules.maxStorage"
                ></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-text-field
                  type="number"
                  v-model="currentStorage"
                  :label="labels.currentStorage"
                  :rules="rules.currentStorage"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-layout row>
          <v-btn flat @click="cancelBtn">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            :color="color"
            :dark="isDarkTheme"
            :loading="loading"
          >{{ productToEdit ? 'EDITAR' : 'CADASTRAR' }}</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: {
    productToEdit: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: ''
    },
    isDarkTheme: {
      type: Boolean,
      default: true
    },
    clearForm: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    focusForm: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    loading: false,
    rules: {
      name: [v => !!v || 'Campo obrigatório'],
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
      confirm: 'CONFIRMAR',
      resetForm: 'CANCELAR'
    },
    labels: {
      name: 'Nome do produto',
      internalCode: 'Código interno',
      description: 'Descrição do produto',
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
      changeStorage: 'O produto movimenta o estoque?',
      isActive: 'O produto está ativo?'
    },
    name: '',
    internalCode: '',
    barCode: '',
    description: '',
    weight: '',
    width: '',
    height: '',
    depth: '',
    costPrice: '',
    salePrice: '',
    minStorage: '',
    maxStorage: '',
    currentStorage: '',
    changeStorage: true,
    isActive: true
  }),

  watch: {
    productToEdit: {
      handler: 'watchProduct',
      immediate: true
    },
    focusForm: {
      handler: 'watchFocusForm'
    },
    clearForm: {
      handler: 'watchClearForm',
      immediate: true
    }
  },

  methods: {
    watchProduct (value) {
      if (!value && this.$refs.form) {
        this.loading = false
        this.$refs.form.reset()
        this.$nextTick(() => {
          this.setValuesToObj(this, this.formInitialState())
        })
      } else if (value) {
        this.setValuesToObj(this, value)
      }
    },
    watchFocusForm (v) {
      if (v) {
        this.$refs.nameInput.focus()
      }
    },
    watchClearForm (v) {
      if (v) {
        this.loading = false
        this.$refs.form.reset()
        this.$nextTick(() => {
          this.setValuesToObj(this, this.formInitialState())
          this.$refs.nameInput.focus()
        })
      }
    },
    cancelBtn () {
      if (!this.productToEdit) {
        this.$refs.form.reset()
        this.$nextTick(() => {
          this.setValuesToObj(this, this.formInitialState())
          this.$refs.nameInput.focus()
          this.$emit('cancel')
        })
      } else {
        this.$emit('cancel')
      }
    },
    formInitialState () {
      return {
        name: '',
        internalCode: '',
        barCode: '',
        description: '',
        weight: '',
        width: '',
        height: '',
        depth: '',
        costPrice: '',
        salePrice: '',
        minStorage: '',
        maxStorage: '',
        currentStorage: '',
        changeStorage: true,
        isActive: true
      }
    },
    setValuesToObj (targetObj, obj) {
      Object.keys(obj).forEach(x => { targetObj[x] = obj[x] })
    },
    editProduct (_id, payload) {
      this.loading = true
      this.$emit('submitEditForm', { _id, ...payload })
    },
    createProduct (payload) {
      this.loading = true
      this.$emit('submitRegisterForm', payload)
    },
    submitForm () {
      const id = this.productToEdit ? this.productToEdit._id : null
      const payload = {
        name: this.name,
        internalCode: this.internalCode,
        barCode: this.barCode,
        description: this.description,
        weight: this.weight,
        width: this.width,
        height: this.height,
        depth: this.depth,
        costPrice: this.costPrice,
        salePrice: this.salePrice,
        minStorage: this.minStorage,
        maxStorage: this.maxStorage,
        currentStorage: this.currentStorage,
        changeStorage: this.changeStorage,
        isActive: this.isActive
      }

      if (this.$refs.form.validate()) {
        this.productToEdit
          ? this.editProduct(id, payload)
          : this.createProduct(payload)
      }
    }
  }
}
</script>

<style>

</style>
