import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import DiscussPosts from '../components/Discuss/DiscussPosts'
import Register from '../components/Register/Register'
import Redirect from '../components/Redirect'
import Activation from '../components/Register/Activation'
import Login from '../components/Login/Login'
import Poem from '../components/Poem'
import Info from '../components/User/Info'
import PostDetail from '../components/Discuss/PostDetail'
import Message from '../components/Message/Message'
import MessageDetail from '../components/Message/MessageDetail'
import state from '../store/state'

var axios = require('axios')
// axios.defaults.baseURL = 'http://localhost:8080/api'
Vue.prototype.$axios = axios

Vue.use(Router)

const router = new Router({
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
          path: 'message',
          name: 'Message',
          component: Message
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
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'activation/:userId/:code',
          name: 'Activation',
          props: true,
          component: Activation
        },
        {
          path: 'info',
          name: 'Info',
          component: Info,
          meta: {requireAuth: true}
        },
        {
          path: 'message/detail/:convsersationId',
          name: 'MessageDetail',
          props: true,
          component: MessageDetail
        },
        {
          path: 'post/:id',
          name: 'PostDetail',
          component: PostDetail
        },
        {
          path: '',
          redirect: 'forum'
        }
      ]
    },
    {
      path: '/poem',
      component: Poem
    }
  ]
})

router.beforeEach((to, from, next) => {
  const islogin = state.loginStatus

  if (to.path === '/login' || to.path === '/register') {
    if (islogin) {
      next({
        name: 'Redirect',
        params: {
          msg: '您已登录！',
          url: '/forum'
        }
      })
    } else {
      next()
    }
  } else if (to.meta.requireAuth) {
    if (islogin) {
      next()
    } else {
      next({
        name: 'Redirect',
        params: {
          msg: '请先登录！',
          url: '/login'
        }
      })
    }
  } else {
    next()
  }
})

export default router
