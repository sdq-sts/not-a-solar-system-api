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
      path: '/registrar',
      name: 'register',
      meta: { requiresAuth: false },
      component: () => import(/* webpackChunkName: "register" */ '@/views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    },
    {
      path: '/dashboard',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "wrapper" */ '@/views/Wrapper.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard.index',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
        },
        {
          path: '/produtos',
          name: 'manage.products',
          component: () => import(/* webpackChunkName: "manage.products" */ '@/views/ManageProducts.vue')
        },
        {
          path: '/compras',
          name: 'manage.purchases',
          component: () => import(/* webpackChunkName: "manage.purchases" */ '@/views/ManagePurchases.vue')
        },
        {
          path: '/vendas',
          name: 'manage.sales',
          component: () => import(/* webpackChunkName: "manage.sales" */ '@/views/ManageSales.vue')
        },
        {
          path: '/config',
          name: 'settings',
          component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue')
        }
      ]
    },
    {
      path: '*',
      meta: { requiresAuth: false },
      component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    }
  ]
})

router.beforeEach(handleAuthentication)

export default router
