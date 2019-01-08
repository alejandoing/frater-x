import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/'
import store from './store/'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.5.106:8000/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
