<template lang="pug">
  v-layout(row wrap transition="scale-transition")
    v-flex.pb-5(xs12)
      span.display-1.my-5(v-html="level.title")
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
              v-tooltip(bottom v-for="(btn, i) in buttons['flat']" :key="i")
                v-btn(
                  @click="enableOption(i, key)"
                  :id="dynamicID('flow-option-type', [key])"
                  color="primary"
                  dark fab large
                  slot="activator"
                )
                  v-icon(dark v-html="btn.icon")
                span(v-html="btn.tooltip")
              template(v-if="type === STRING")
                v-flex(xs12)
                  v-text-field.pb-3(
                    v-model.trim="level.faces[key].question"
                    label="Pregunta principal"
                    required
                  )
                  div(v-for="(option, i) in 4")
                    v-text-field(
                      :label="'Opción ' + (i + 1)"
                      :required="i <= 1"
                      v-model.trim="level.faces[key].options[i]"
                    )
              template(v-if="type === IMAGE")
                v-container(grid-list-md)
                  v-layout(wrap)
                    v-flex(v-for="(value, index) in 4" :key="index" md3 xs12)
                      v-text-field.hidden(
                        @change.native="writeFile($event, IMAGE, [key, index])"
                        :id="dynamicID(OPTION_IMAGE, [levelKey, key, index])"
                        type="file"
                      )
                      v-card.d-flex.align-center.pointer(
                        @click="uploadClick(dynamicID(OPTION_IMAGE, [levelKey, key, index]))"
                        dark
                        height="200"
                      )
                        img(
                          v-if="selectedFiles[key][index]"
                          :src="selectedFiles[key][index]"
                          height="200"
                          width="200"
                        )
                        v-scroll-y-transition(v-else)
                          .display-3.text-xs-center
                            v-icon(dark large) cloud_upload
              .text-xs-center.py-1(v-show="type")
                v-btn(@click="replicateOptions(key)" color="green" dark) Replicar Opciones
                  v-icon(dark right) style
                v-btn(@click="clearOptions(key)" color="red" dark) Limpiar
                  v-icon(dark right) cancel
</template>

<script>
import { dynamicMixin, uploadMixin } from 'mixins'

export default {
  computed: {
    faces () {
      return this.$store.getters.faces
    }
  },
  data: () => ({
    buttons: {
      flat: {
        string: { icon: 'text_format', tooltip: 'Modelo escrito' },
        image: { icon: 'image', tooltip: 'Modelo gráfico' }
      }
    },
    level: {},
    selectedFiles: { excellent: {}, good: {}, regular: {}, bad: {} },
    type: "string"
  }),
  methods: {
    enableOption (type, key) {
      this.type = type
      this.clearOptions(key)
    },
    replicateOptions (selected) {
      const { type, level, IMAGE, OPTIONS_IND } = this
      const { options } = level.faces[selected]

      if (options.length) {
        for (let face in level.faces) {
          this.level.faces[face].options = options
          if (type === IMAGE) {
            for (let index of OPTIONS_IND) {
              this.$set(this.selectedFiles[face], index, this.selectedFiles[selected][index])
            }
          }
        }
      }
      this.$emit('update-flow', this.level)
    },
    clearOptions (selected) {
      const { getElementById, type, level, levelKey, IMAGE, OPTION_IMAGE, OPTIONS_IND } = this

      this.level.faces[selected].options = []
      
      if (type === IMAGE) {
        for (let face in level.faces) {
          for (let index of OPTIONS_IND) {
            this.$delete(this.selectedFiles[face], index, null)
          }
        }
      }
      this.$emit('update-flow', this.level)
    }
  },
  created () {
    this.level = this.dynamicFlow(this.levelKey)
  },
  mixins: [dynamicMixin, uploadMixin],
  name: 'Level',
  props: { levelKey: String }
}
</script>
