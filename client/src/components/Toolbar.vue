<template lang="pug">
  v-toolbar(app color="primary" dark fixed)
    v-toolbar-title.headline.text-uppercase
      span(v-html="appTitle.first")
      span.font-weight-light(v-html="appTitle.last")
    v-spacer
    v-toolbar-items
      v-btn(v-for="{ title, icon, route } in menu" :key="title" :to="route" flat raised) {{ title }}
        v-icon.pl-2(v-html="icon")
      v-btn(@click.native="signOut" flat raised) {{ user.name }}
        v-icon.pl-2 exit_to_app
</template>

<script>
import { swalMixin } from 'mixins'
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
  data: () => ({
    menu: [
      { icon: 'apps', route: HOME, title: 'Inicio' },
      { icon: 'assessment', route: DASHBOARD, title: 'Resultados' },
      { icon: 'assignment', route: SIGN_IN, title: 'Comentarios' }
    ]
  }),
  methods: {
    async signOut () {
      const confirmation = await this.confirmationSwal(
        '¿Estás seguro de finalizar la sesión?',
        'Todos tus datos serán guardados antes de finalizar'
      )
      
      if (confirmation) {
        this.$swal('Sesión finalizada correctamente', 'Gracias por utilizar NPSFrater-X', 'success')
        this.$store.dispatch('removeUser')
        this.$router.push(SIGN_IN)
      }
    }
  },
  name: 'Toolbar',
  mixins: [swalMixin]
}
</script>
