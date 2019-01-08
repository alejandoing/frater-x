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
  }
}
</script>
