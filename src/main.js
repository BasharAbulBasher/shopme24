import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import filters from '@/filters'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import coreJs from 'core-js'

Vue.config.productionTip = false
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
