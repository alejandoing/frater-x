<template lang="pug">
  router-link.test(:to="route")
    img.elevation-12(:src="require(`@/assets/dashboard/${src}`)" width="100%")
</template>

<script>

export default {
  name: 'Item',
  props: ['src', 'route']
}
</script>

<style lang="stylus" scoped>
a
  max-width: 100%
  max-height: 100%
img
  cursor pointer
  max-width: 100%
  max-height: 100%
  //image-size(20em, 24em)
  &:hover
    filter(grayscale(1))

+tablet-adjust(600px, 1024px)
  image-size(18em, 22em)
</style>
