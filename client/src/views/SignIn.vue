<template lang="pug">
  v-container(fill-height fluid)
    v-layout(align-center justify-center)
      v-flex(md3 sm4 xs12)
        v-card.elevation-12
          v-toolbar(color="primary" dark)
            v-toolbar-title
              span(v-html="appTitle.first")
              span.font-weight-light(v-html="appTitle.last")
          v-card-text
            v-form(autocomplete="nope")
              v-text-field(
                @keydown.enter="signIn"
                v-model.trim="email"
                :error-messages="emailErrors"
                label="Email"
                prepend-icon="email"
                type="text"
              )
              v-text-field(
                @keydown.enter="signIn"
                v-model="password"
                :error-messages="passwordErrors"
                label="Contraseña"
                prepend-icon="lock"
                type="password"
              )
          v-card-actions.justify-center.px-5
            v-btn#submit(
              @click.native="signIn"
              :disabled="loading"
              :loading="loading"
              color="primary"
            ) Iniciar Sesión
              span.custom-loader(slot="loader")
                v-icon(light) cached
</template>

<script>
import { customValidationMixin, loaderMixin, swalMixin } from 'mixins'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { HOME } from 'router/constants'

export default {
  computed: {
    appTitle () {
      return this.$store.getters.appTitle
    }
  },

  data: () => ({
    email: null,
    password: null
  }),

  methods: {
    async signIn () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loader = 'loading'
        const { email, password } = this
        const user = await this.$axios.post('users/auth/', { email, password })

        if (this.feedBackSwal('AUTH', user.data)) {
          this.$store.dispatch('saveUser', user.data)
          this.$router.push(HOME)
        }
      }
    }
  },

  mixins: [customValidationMixin, loaderMixin, swalMixin, validationMixin],

  validations: {
    email: { email, required },
    password: { required }
  }
}
</script>

<style lang="stylus" scoped>
.container
  background url('../assets/background-auth.png') no-repeat bottom
  background-size cover
</style>
