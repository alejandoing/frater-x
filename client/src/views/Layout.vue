<template lang="pug">
  div
    Toolbar(v-if="visible")
    v-content
      router-view
</template>

<script>
import Toolbar from '../components/Toolbar'

export default {
  components: { Toolbar },
  data: () => ({
    visible: window.location.pathname !== '/signIn'
  }),
  name: 'App'
}
</script>

<style lang="stylus" scoped>
</style>
