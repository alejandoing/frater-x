<template lang="pug">
  v-app
    router-view
</template>

<script>
export default {}
</script>

<style lang="stylus">
body
  font-family: Helvetica Neue, Arial, sans-serif
  
.pointer
  cursor: pointer

.hidden
  display: none

.custom-loader
  animation loader 1s infinite
  display flex

@-moz-keyframes loader
  from
    transform: rotate(0)
  to
    transform: rotate(360deg)

@-webkit-keyframes loader
  from
    transform: rotate(0)
  to
    transform: rotate(360deg)

@-o-keyframes loader
  from
    transform: rotate(0)
  to
    transform: rotate(360deg)

@keyframes loader
  from
    transform: rotate(0)
  to
    transform: rotate(360deg)
</style>
