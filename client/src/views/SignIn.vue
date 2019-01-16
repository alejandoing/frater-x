<template lang="pug">
  v-container(fill-height fluid)
    v-layout(align-center justify-center)
      v-flex(md4 sm8 xs12)
        v-card.elevation-12
          v-toolbar(color="primary" dark)
            v-toolbar-title
              span(v-html="appTitle.first")
              span.font-weight-light(v-html="appTitle.last")
          v-card-text
            v-form(autocomplete="nope")
              v-text-field(
                label="Email"
                prepend-icon="email"
                type="text"
                v-model.trim="email"
                :error-messages="emailErrors"
              )
              v-text-field(
                label="Contraseña"
                prepend-icon="lock"
                type="password"
                v-model="password"
                :error-messages="passwordErrors"
              )
          v-card-actions.justify-center.px-5
            v-btn#submit(
              @click.native="signIn"
              color="primary"
              :loading="loading"
              :disabled="loading"
            ) Iniciar Sesión
              span.custom-loader(slot="loader")
                v-icon(light) cached
        v-alert.mt-5(
          icon="new_releases"
          transition="scale-transition"
          :value="alert._self"
          :type="alert.type"
        ) {{ alert.message }}
</template>

<script>
import { buildAlert, submitKey, customValidations, loader } from 'mixins'
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
    alert: {
      _self: false,
      type: null,
      message: null
    },
    email: null,
    password: null
  }),

  methods: {
    async signIn () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loader = 'loading'
        const user = await this.$axios.post('user/auth/', {
          email: this.email,
          password: this.password
        })

        if (this.feedBack('AUTH', user.data)) {
          this.$store.dispatch('saveUser', user.data)
          this.$router.push(HOME)
        }
      }
    }
  },

  mixins: [buildAlert, customValidations, submitKey, validationMixin, loader],

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
