import { createRouter, createMemoryHistory } from 'vue-router'
import home from '@/views/home.vue'
import error from '@/views/404.vue'
import about from '@/views/about.vue'
import manage from '@/views/manage.vue'

const routes = [
  { path: '/', component: home },
  { path: '/404', component: error },
  { path: '/about', component: about },
  { path: '/manage', component: manage }
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-rose-400'
})

export default router
