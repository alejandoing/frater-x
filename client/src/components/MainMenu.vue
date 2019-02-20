<template lang="pug">
  v-container
    Item(v-for="{ route, src } in menu['ADMINISTRATOR']" :key="src" :route="route" :src="src")
</template>

<script>
import Item from 'components/Item.vue'
import { POLLS_ADD } from 'router/constants'

export default {
  data: () => ({
    menu: {
      ADMINISTRATOR: [
        { route: POLLS_ADD, src: 'new-poll.png' },
        { route: '/polls/', src: 'my-polls.png' },
        { route: '/business/', src: 'my-business.png' },
        { route: '/users/', src: 'users.png' },
        { route: '/settings/', src: 'settings.png' },
        { route: '/poll-mode/', src: 'poll-mod.png' }
      ],
      ZONE: [
        { route: '/polls/', src: 'my-polls.png' },
        { route: '/zone/', src: 'my-business.png' },
        { route: '/users/', src: 'users.png' },
        { route: '/poll-mode/', src: 'poll-mod.png' }
      ]
    }
  }),
  components: { Item },
  name: 'MainMenu'
}
</script>

<style lang="stylus" scoped>
.container
  display grid
  gap $gap-default
  grid-template-repeat(2, 1fr, 3, 1fr)
  height: 90vh
  place-items center

+tablet-adjust-orientation(600px, 1024px, landscape)
  layout-structure(2, 3)

+tablet-adjust-orientation(600px, 1024px, portrait)
  layout-structure(3, 2)

+tablet-adjust(600px, 1024px)
  image-size(18em, 22em)
</style>
