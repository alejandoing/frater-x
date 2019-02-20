import 'plugins/vuetify'
import 'plugins/axios'
import 'plugins/vue-swal'

import '@/registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue'
import router from 'router'
import store from 'store'
import App from '@/App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
