import router from './index'
import useUserStore from '@/stores/user.js'
import ROUTES_NAME from './routesName'

export function guard() {
  router.beforeEach((to, from, next) => {
    const store = useUserStore()

    if (store.userLogin) {
      next({ name: ROUTES_NAME.HOME })
    }

    //  Old Solution!
    // if (to.name === ROUTES_NAME.MANAGE) {
    //   next({ name: ROUTES_NAME.HOME })
    // }

    // new Solution for Check userLogin
    if (to.meta.requiresAuth && !store.userLogIn) {
      next({ name: ROUTES_NAME.HOME })
    }

    next()
  })
}
