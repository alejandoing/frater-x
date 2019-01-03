<template lang="pug">
  div
    MainMenu
</template>

<script>
import MainMenu from '../components/MainMenu'

export default {
  components: {
    MainMenu
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
