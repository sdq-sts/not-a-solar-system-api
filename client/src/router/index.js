import Vue from 'vue'
import Router from 'vue-router'
import { handleAuthentication } from '@/utils/handleAuthentication'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false },
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
    }
  ]
})

router.beforeEach(handleAuthentication)

export default router
