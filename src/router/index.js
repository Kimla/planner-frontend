import Vue from 'vue'
import Router from 'vue-router'
import Events from '../views/Events.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'events',
      component: Events
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue')
    }
  ]
})

const guestRotues = ['login', 'forgotPassword', 'resetPassword', 'register']

async function checkAuth (to, from, next) {
  if (!store.getters['auth/check'] && store.getters['auth/token']) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (e) {
      store.commit('auth/LOGOUT')
      router.push({ name: 'login' })
    }
  }

  if (!guestRotues.includes(to.name) && !store.getters['auth/check']) {
    store.commit('auth/LOGOUT')
    router.push({ name: 'login' })
  } else if (guestRotues.includes(to.name) && store.getters['auth/check']) {
    router.replace({ name: 'home' })
  } else {
    next()
  }
}

router.beforeEach(checkAuth)

router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

export default router
