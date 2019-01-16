<template lang="pug">
  v-toolbar(app color="primary" dark fixed)
    v-toolbar-title.headline.text-uppercase
      span(v-html="appTitle.first")
      span.font-weight-light(v-html="appTitle.last")
    v-spacer
    v-toolbar-items
      v-btn(v-for="{ title, icon, route } in menu" :key="title" flat raised :to="route") {{ title }}
        v-icon.pl-2(v-html="icon")
      v-btn(
        flat
        raised
        @click.native="dialog = true"
      ) {{ user.name }}
        v-icon.pl-2 exit_to_app

    v-dialog(
      v-model="dialog"
      max-width="500"
      persistent
    )
      v-card
        v-card-title.title ¿Estar seguro de finalizar la sesión?
        v-card-actions
          v-spacer
          v-btn(
            color="primary"
            flat="flat"
            @click="signOut"
          ) Aceptar
          v-btn(
            color="primary"
            flat="flat"
            @click="dialog = false"
          ) Cancelar
</template>

<script>
import { HOME, DASHBOARD, SIGN_IN } from 'router/constants'
export default {
  computed: {
    appTitle () {
      return this.$store.getters.appTitle
    },
    user () {
      return this.$store.getters.user
    }
  },
  data () {
    return {
      dialog: false,
      menu: [
        { icon: 'apps', route: HOME, title: 'Inicio' },
        { icon: 'assessment', route: DASHBOARD, title: 'Resultados' },
        { icon: 'assignment', route: SIGN_IN, title: 'Comentarios' }
      ]
    }
  },
  methods: {
    async signOut () {
      const response = await this.$axios.post('user/exit/')

      if (response) {
        this.$store.dispatch('removeUser')
        this.$router.push(SIGN_IN)
      }
    }
  },

  name: 'Toolbar'
}
</script>
