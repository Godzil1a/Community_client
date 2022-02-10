import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import DiscussPosts from '../components/Discuss/DiscussPosts'
import Register from '../components/Register/Register'
import Redirect from '../components/Redirect'
import Activation from '../components/Register/Activation'

var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:8080/api'
Vue.prototype.$axios = axios

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: 'forum',
          name: 'DiscussPosts',
          component: DiscussPosts
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
        {
          path: 'redirect',
          name: 'Redirect',
          component: Redirect
        },
        {
          path: 'activation/:userId/:code',
          name: 'Activation',
          props: true,
          component: Activation
        },
        {
          path: '',
          redirect: 'forum'
        }
      ]
    }
  ]
})
