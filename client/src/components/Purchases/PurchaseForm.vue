<template>
  <v-card>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs4>
          <v-text-field
            :label="labels.nfe"
          ></v-text-field>
        </v-flex>

        <v-flex xs4 offset-xs4>
          <v-combobox
            v-model="selectedStatus"
            :items="statusItems"
            :label="labels.status"
          ></v-combobox>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    rules: {},
    labels: {
      nfe: 'NFE',
      status: 'Situação'
    },
    selectedStatus: { text: 'Pendente', value: 'pending' },
    statusItems: [
      { text: 'Cancelado', value: 'canceled' },
      { text: 'Pendente', value: 'pending' },
      { text: 'Aprovado', value: 'aproved'}
    ]
  })
}
</script>

<style>

</style>
