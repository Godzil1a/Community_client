import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:8080/api'
Vue.prototype.$axios = axios

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
