<template lang="pug">
  v-form.pt-5
    v-container(grid-list-md)
      v-layout(row wrap)
        v-flex.pb-5(xs12)
          span.display-1(v-html="text.main")
          v-divider
        v-flex(md6 xs12)
          v-text-field(
            label="Pregunta Principal"
            required
            v-model.trim="question"
          )
        v-flex(md6 xs12)
          v-select(
            label="Elegir una Zona"
            multiple
            required
            v-model="local"
            :items="localsSelect"
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
          v-text-field#background.hidden(type="file" @change.native="writeFile($event)")
          v-btn#background-up(
            @click="uploadClick('background')"
            v-html="text.buttons[0]"
            block
            color="primary"
          )
        Level(
          @update-flow="updateFlow"
          v-for="(level, key) in flow"
          v-if="level"
          :key="key"
          :level="flow[key]"
        )
    .text-xs-right.py-5.px-5
      v-tooltip(top)
        v-btn(@click="addFlow" color="primary" dark fab large slot="activator")
          v-icon(dark) add
        span Agregar flujo
      v-tooltip(top)
        v-btn(
          @click="removeFlow"
          v-if="flow[1]"
          color="primary"
          dark fab large
          slot="activator"
        )
          v-icon(dark) remove
        span Eliminar flujo
</template>

<script>
import { dynamicMixin, uploadMixin } from 'mixins'
import Level from 'components/Level.vue'

export default {
  components: { Level },
  data: () => ({
    question: null,
    flow: {},
    local: null,
    localsSelect: [1, 2, 3, 4, 5, 6, 7],
    text: {
      main: 'Nueva Encuesta',
      buttons: ['Elegir background']
    }
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
    }
  },
  mixins: [dynamicMixin, uploadMixin]
}
</script>
