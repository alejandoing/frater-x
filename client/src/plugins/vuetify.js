import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { VAlert } from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.shades.black,
    secondary: colors.yellow.accent2,
    accent: colors.shades.black,
    error: colors.red.accent3
  },
  components: {
    VAlert
  }
})
