import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import error from '@/views/404.vue'
import about from '@/views/about.vue'
import manage from '@/views/manage.vue'
import ROUTES_NAME from './routesName'
import { guard } from './guard.js'
import useUserStore from '@/stores/user.js'

const routes = [
  {
    name: ROUTES_NAME.HOME,
    alias: '/home',
    path: '/',
    component: home
  },
  {
    name: ROUTES_NAME.ERROR,
    path: '/404',
    component: error
  },
  {
    name: ROUTES_NAME.ABOUT,
    path: '/about',
    component: about
  },
  {
    name: ROUTES_NAME.MANAGE,
    path: '/manage-music',
    component: manage,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage',
    redirect: { name: ROUTES_NAME.MANAGE }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: ROUTES_NAME.ERROR }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: '!text-rose-500'
})

export default router
guard()
