import Vue from 'vue'
import 'normalize.css'
import './assets/style/main.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
