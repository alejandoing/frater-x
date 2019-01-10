<template lang="pug">
  v-form.pt-5
    v-container(grid-list-md)
      v-layout(row wrap)
        v-flex.pb-5(xs12)
          span.display-1(v-html="titles.main")
          v-divider
        v-flex(md6 xs12)
          v-text-field(
            label="Pregunta Principal"
            required
            v-model.trim="flow.main.question"
          )
        v-flex(md6 xs12)
          v-select(
            label="Elegir un Local"
            multiple
            required
            v-model="local"
            :items="localsSelect"
        )
        v-flex(xs12 md6).mb-5
          v-text-field#background.hidden(type="file" @change.native="writeFile($event, 'background')")
          v-btn#background-up(block color="primary" @click="uploadClick('background')") Elegir background
        v-flex.pb-5(xs12)
          span.display-1.my-5(v-html="titles.flow.first")
          v-divider
        v-flex(xs12)
          v-tabs(centered color="primary" dark fixed icons-and-text)
            v-tabs-slider(color="secondary")
            v-tab(v-for="(f, key) in faces" :href="'#' + key" :key="key")
              | {{ f.title }}
              v-icon(v-html="f.icon" :color="key" large)
            v-tab-item(v-for="(f, key) in faces" :key="key" :value="key")
              v-card(flat)
                v-card-text.text-xs-center.py-4
                  v-btn(
                    v-for="(icon, index) in flatIcons"
                    @click="enableOption(index)"
                    :id="dynamicID('flow-option-kind', key)"
                    :key="index"
                    color="secondary"
                    dark fab large
                  )
                    v-icon(dark v-html="icon")
                  template(v-if="flowAction === 0")
                    v-flex(xs12)
                      v-text-field.pb-3(
                        v-model.trim="flow.first[key].question"
                        label="Pregunta principal"
                        required
                      )
                      div(v-for="(option, index) in 4")
                        v-text-field(
                          :label="'Opción ' + (index + 1)"
                          :required="index <= 1"
                          v-model.trim="flow.first[key].options[index]"
                        )
                    .text-xs-center.py-1
                      v-btn(@click="replicateOptions(key, 'first')" color="secondary") Replicar Opciones
                        v-icon(dark right) style
                      v-btn(color="secondary") Limpiar
                        v-icon(dark right) cancel
                  template(v-if="flowAction === 1")
                    v-container(grid-list-md)
                      v-layout(wrap)
                        v-flex(v-for="n in 4" :key="n" md3 xs12)
                          v-text-field.hidden(
                            @change.native="writeFile($event, dynamicID('option-image', key+n), 'image')"
                            :id="dynamicID('upload', key+n)"
                            type="file"
                          )
                          v-card.d-flex.align-center.pointer(
                            @click.native="uploadClick(dynamicID('upload', key+n))"
                            :id="dynamicID('option-image', key+n, suffixUp)"
                            dark
                            height="200"
                          )
                            img.hidden(
                              :id="dynamicID('option-image', key+n, suffixMe)"
                              height="200"
                              width="200"
                            )
                            v-scroll-y-transition
                              .display-3.text-xs-center(:id="dynamicID('option-image', key+n, suffixIc)")
                                v-icon(dark large) cloud_upload
</template>

<script>
import { dynamicMixin, uploadMixin } from '../mixins/'
export default {
  computed: {
    faces () {
      return this.$store.getters.faces
    }
  },
  data: () => ({
    flow: {
      main: { question: null },
      first: {
        excellent: { question: 'Nos alegra saberlo, ¿qué servicio utilizaste?', options: [] },
        good: { question: 'Nos alegra saberlo, ¿qué servicio utilizaste?', options: [] },
        regular: { question: 'Nos entristece saberlo, ¿qué servicio utilizaste?', options: [] },
        bad: { question: 'Nos entristece saberlo, ¿qué servicio utilizaste?', options: [] }
      }
    },
    flatIcons: ['text_format', 'image'],
    local: null,
    localsSelect: [1, 2, 3, 4, 5, 6, 7],
    titles: {
      main: 'Nueva Encuesta',
      flow: {
        first: 'Primer Flujo',
        second: 'Segundo Flujo'
      }
    },
    flowAction: null
  }),
  methods: {
    enableOption (type) {
      this.flowAction = type
    },
    replicateOptions (face, level) {
      const { options } = this.flow[level][face]
      this.flow[level].good.options = this.flow[level].regular.options = this.flow[level].bad.options = options
    }
  },
  mixins: [dynamicMixin, uploadMixin]
}
</script>
