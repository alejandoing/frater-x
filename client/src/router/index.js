import Vue from 'vue'
import Router from 'vue-router'
import { HOME, DASHBOARD, POLLS_ADD, SIGN_IN, ALL, KIOSK_MODE } from './constants'
import { USER_STORAGE } from '../store/constants'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [{
    path: HOME,
    component: () => import('../views/Layout.vue'),
    beforeEnter: (to, from, next) => localStorage.getItem(USER_STORAGE) ? next() : next(SIGN_IN),
    children: [{
      path: '',
      component: () => import('../views/Home.vue')
    }, {
      path: DASHBOARD,
      component: () => import('../views/Dashboard.vue')
    }, {
      path: POLLS_ADD,
      component: () => import('../views/PollAdd.vue')
    }, {
      path: KIOSK_MODE,
      component: () => import('../views/KioskMode.vue')
    }]
  }, {
    path: SIGN_IN,
    component: () => import('../views/SignIn.vue')
  }, {
    path: ALL,
    redirect: HOME
  }]
})
