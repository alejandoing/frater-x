<template lang="pug">
  v-layout(row wrap)
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
                    v-flex(v-for="i in 4" :key="i" md3 xs12)
                      v-text-field.hidden(
                        @change.native=`writeFile($event, IMAGE, [key, i])`
                        :id="dynamicID(OPTION_IMAGE, [level.key, key, i])"
                        type="file"
                      )
                      v-card.d-flex.align-center.pointer(
                        @click="uploadClick(dynamicID(OPTION_IMAGE, [level.key, key, i]))"
                        dark
                        height="200"
                      )
                        img.hidden(
                          :id="dynamicID(OPTION_IMAGE, [level.key, key, i, SUFFIX_ME])"
                          height="200"
                          width="200"
                        )
                        v-scroll-y-transition
                          .display-3.text-xs-center(
                            :id=`dynamicID(OPTION_IMAGE, [level.key, key, i, SUFFIX_IC])`
                          )
                            v-icon(dark large) cloud_upload
              .text-xs-center.py-1(v-show="type")
                v-btn(@click="replicateOptions(key)" color="green" dark) Replicar Opciones
                  v-icon(dark right) style
                v-btn(@click="clearOptions(key)" color="red" dark) Limpiar
                  v-icon(dark right) cancel
</template>

<script>
import { uploadMixin } from 'mixins'

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
    type: null
  }),
  methods: {
    enableOption (type, key) {
      this.type = type
      this.clearOptions(key)
    },
    replicateOptions (selected) {
      const {
        getElementById, hiddenToggle, type, level,
        IMAGE, OPTION_IMAGE, OPTIONS_IND, SUFFIX_ME, SUFFIX_IC
      } = this
      
      const { options } = level.faces[selected]

      if (options.length) {
        for (let face in level.faces) {
          this.level.faces[face].options = options
          if (type === IMAGE) {
            for (let index of OPTIONS_IND) {
              const base = [level.key, face, index]
              const $media = getElementById(OPTION_IMAGE, [level.key, selected, index, SUFFIX_ME])
              
              if ($media.src && $media.src !== window.location.href) {
                const $mediaRep = getElementById(OPTION_IMAGE, base.concat([SUFFIX_ME]))
                const $icon = getElementById(OPTION_IMAGE, base.concat([SUFFIX_IC]))

                $mediaRep.src = $media.src
                hiddenToggle($mediaRep, $icon)
              }
            }
          }
        }
      }
      this.$emit('update-flow', this.level)
    },
    clearOptions (selected) {
      const {
        getElementById, hiddenToggle, type, level,
        IMAGE, OPTION_IMAGE, OPTIONS_IND, SUFFIX_ME, SUFFIX_IC
      } = this

      this.level.faces[selected].options = []
      
      for (let face in level.faces) {
        if (type === IMAGE) {
          for (let index of OPTIONS_IND) {
            const base = [level.key, face, index]
            const $media = getElementById(OPTION_IMAGE, base.concat([SUFFIX_ME]))
            const $icon = getElementById(OPTION_IMAGE, base.concat([SUFFIX_IC]))
            const $input = getElementById(OPTION_IMAGE, base)
            
            if ($media) {
              $media.src = ''
              $input.value = null
              hiddenToggle($icon, $media)
            }
          }
        }
      }
      this.$emit('update-flow', this.level)
    }
  },
  mixins: [uploadMixin],
  name: 'Level',
  props: { level: Object }
}
</script>
