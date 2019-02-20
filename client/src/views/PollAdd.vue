<template lang="pug">
  v-form
    v-container.pt-5
      v-layout(row wrap)
        v-flex.pb-3(xs12)
          span.display-1(v-html="text.main")
          v-divider
        v-flex(md6 xs12)
          v-text-field(
            v-model.trim="question"
            :error-messages="questionErrors"
            label="Pregunta Principal"
            required
          )
        v-flex(md6 xs12)
          v-select(
            v-model="zone"
            :error-messages="zoneErrors"
            :items="localsSelect"
            label="Elegir una Zona"
            multiple
            required
          )
        v-flex(md6 xs12)
          v-select(
            v-model="local"
            :error-messages="localErrors"
            :items="localsSelect"
            label="Elegir un Local"
            multiple
            required
          )
        v-flex(xs12 md6)
          v-text-field#background.hidden(type="file" @change.native="writeFile($event)")
          v-btn(
            @click="uploadClick('background')"
            v-html="background.name || text.buttons[0]"
            block
            color="primary"
          )
        v-flex(xs12 v-if="background.src")
          img(height="500" width="100%" :src="background.src")
        v-flex(xs12)
          Level(
            @update-flow="updateFlow"
            v-for="(level, key) in flow"
            :key="key"
            :levelKey="key"
          )
          .text-xs-right
            v-btn(@click="addFlow" color="primary" dark fab slot="activator")
              v-icon(dark) add
            v-btn(v-if="flow[1]" @click="removeFlow" color="primary" dark fab slot="activator")
              v-icon(dark) remove
      .text-xs-center.pt-5.pb-3
        v-btn(
          @click="addPoll"
          :disabled="loading"
          :loading="loading"
          color="primary"
          large
        ) Crear encuesta
          span.custom-loader(slot="loader")
            v-icon(light) cached
</template>

<script>
import Level from 'components/Level.vue'
import { customValidationMixin, dynamicMixin, loaderMixin, uploadMixin } from 'mixins'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  components: { Level },
  data: () => ({
    background: {},
    flow: {},
    local: null,
    localsSelect: [1, 2, 3, 4, 5, 6, 7],
    question: null,
    text: { main: 'Nueva Encuesta', buttons: ['Elegir background'] },
    zone: null
  }),
  created () {
    this.$set(this.flow, 0, this.dynamicFlow(0))
  },
  methods: {
    updateFlow (level) {
      this.flow[level.key] = level
    },
    addFlow () {
      const index = Object.keys(this.flow).length
      this.$set(this.flow, index, this.dynamicFlow(index))
    },
    removeFlow () {
      const index = Object.keys(this.flow).length
      this.$delete(this.flow, (index - 1))
    },
    addPoll () {
      this.loader = 'loading'
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$swal('¡Atención!', 'No ha completado todos los campos necesarios', 'warning')
      } else {
        this.$swal('¡Excelente!', 'Se ha creado la encuesta satisfactoriamente', 'success')
      }
    }
  },
  mixins: [customValidationMixin, dynamicMixin, loaderMixin, validationMixin, uploadMixin],
  validations: {
    background: { required },
    flow: { required },
    local: { required },
    question: { required },
    zone: { required }
  }
}
</script>
