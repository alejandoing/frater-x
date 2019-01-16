import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { VAlert, VTabs, VTooltip } from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VAlert,
    VTabs,
    VTooltip
  },
  iconfont: 'md',
  theme: {
    primary: colors.shades.black,
    secondary: colors.indigo,
    accent: colors.shades.black,
    error: colors.red.accent3,
    excellent: colors.lightGreen.accent3,
    good: colors.green.darken1,
    regular: colors.yellow.darken1,
    bad: colors.red.accent4
  }
})
