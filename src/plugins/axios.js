import axios from 'axios'
import store from '../store'
import router from '../router'

axios.defaults.baseURL = 'https://test.kimlarsson.se/api'

// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common.Authorization = `Bearer ${token}`
  }

  return request
})

// Response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response

    if (status >= 500) {
      console.log('error')
    }

    if (status === 401) {
      store.commit('auth/LOGOUT')
      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  }
)
