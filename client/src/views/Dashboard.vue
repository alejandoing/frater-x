<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ messages }}
  </div>
</template>

<script>

export default {
  data: () => ({
    messages: {}
  }),
  async created () {
    // const query = gql`query {
    //   messages { _id, text }
    // }`

    // const response = await this.$apollo.query({ query })
    // const { messages } = response.data

    // this.messages = messages
    // this.$store.dispatch('getMessages', messages)
  }
}
</script>
