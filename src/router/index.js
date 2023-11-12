import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import error from '@/views/404.vue'
import about from '@/views/about.vue'
import manage from '@/views/manage.vue'

const routes = [
  {
    name: 'home',
    alias: '/home',
    path: '/',
    component: home
  },
  {
    name: 'error',
    path: '/404',
    component: error
  },
  {
    name: 'about',
    path: '/about',
    component: about
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: manage
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'error' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: '!text-rose-500'
})

router.beforeEach((to, from, next) => {
  console.log('guard')
  next()
})

export default router
