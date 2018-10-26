<template>
  <div>
    <h1>DASHBOARD PAGE</h1>
    <p>Protected by password</p>

    <v-btn @click="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>

</style>
