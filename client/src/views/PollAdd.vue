<template lang="pug">
  v-form.pt-5
    v-container(grid-list-md)
      v-layout(row wrap)
        v-flex(xs12)
          .pb-5
            span.display-1(v-html="titles.main")
            v-divider
        v-flex(md6 xs12)
          v-text-field(
            label="Pregunta Principal"
            required
            v-model.trim="question"
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
        v-flex(xs12)
          .pb-5
            span.display-1.my-5(v-html="titles.flow.first")
            v-divider
        v-flex(xs12)
          v-tabs(centered color="primary" dark fixed icons-and-text)
            v-tabs-slider(color="secondary")
            v-tab(v-for="(f, key) in faces" :href="'#' + key" :key="key")
              | {{ f.title }}
              v-icon(large v-html="f.icon" :color="key")
            v-tab-item(v-for="(f, key) in faces" :key="key" :value="key")
              v-card(flat)
                v-card-text
                  .text-xs-center.py-3
                    v-btn(
                      v-for="(icon, index) in flatIcons"
                      color="secondary"
                      dark fab large
                      :key="index"
                      @click="flowAction = index"
                    )
                      v-icon(dark v-html="icon")
                  template(v-if="flowAction === 0")
                    v-flex(xs12)
                      v-text-field(
                        :label="'Pregunta principal: ' + f.title"
                        v-model.trim="justificationsValues[key].question"
                        :id="justificationsValues[key].question"
                        required
                      )
                      div(v-for="(option, index) in 4")
                        v-text-field(
                          :label="'Opción ' + (index + 1)"
                          v-model.trim="justificationsValues[key].options[index]"
                          :required="index <= 1"
                        )
                      v-layout.pa-2(row child-flex justify-center align-center wrap)
                        v-flex(fill-height)
                          v-btn(
                            outline
                            :disabled=`!justificationsValues.excellent.options[0] || !justificationsValues.excellent.options[1]`
                            @click.native="duplicateOptions(0)"
                            color="primary"
                            ) Replicar Opciones
                  template(v-if="flowAction === 1")
                    v-container(grid-list-md)
                      v-layout(wrap)
                        v-flex(v-for="n in 4" :key="n" md3 xs12)
                          v-text-field.hidden(
                            @change.native="writeFile($event, dynamicID('option-image', n), 'image')"
                            :id="dynamicID('option-image', n)"
                            type="file"
                          )
                          v-card.d-flex.align-center.pointer(
                            @click="uploadClick(dynamicID('option-image', n))"
                            :id="dynamicID('option-image', n, suffixUp)"
                            dark
                            height="200"
                          )
                            img.hidden(
                              :id="dynamicID('option-image', n, suffixMe)"
                              height="200"
                              width="200"
                            )
                            v-scroll-y-transition
                              .display-3.text-xs-center(:id="dynamicID('option-image', n, suffixIc)")
                                v-icon(dark large) cloud_upload
</template>

<script>
import { dynamicMixin, uploadMixin } from '../mixins/'
export default {
  data: () => ({
    faces: {
      excellent: { icon: 'sentiment_very_satisfied', title: 'Excelente' },
      good: { icon: 'sentiment_satisfied', title: 'Bueno' },
      regular: { icon: 'sentiment_dissatisfied', title: 'Regular' },
      bad: { icon: 'mood_bad', title: 'Malo' }
    },
    flatIcons: ['text_format', 'image'],
    question: null,
    local: null,
    localsSelect: [1, 2, 3, 4, 5, 6, 7],
    justificationsValues: {
      excellent: { question: 'Nos alegra saberlo, ¿qué servicio utilizaste?', options: [ null, null ] },
      good: { question: 'Nos alegra saberlo, ¿qué servicio utilizaste?', options: [ null, null ] },
      regular: { question: 'Nos entristece saberlo, ¿qué servicio utilizaste?', options: [ null, null ] },
      bad: { question: 'Nos entristece saberlo, ¿qué servicio utilizaste?', options: [ null, null ] }
    },
    titles: {
      main: 'Nueva Encuesta',
      flow: {
        first: 'Primer Flujo',
        second: 'Segundo Flujo'
      }
    },
    flowAction: null,
    active: false
  }),
  mixins: [dynamicMixin, uploadMixin]
}
</script>
