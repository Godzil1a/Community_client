// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.filter('dateFormat', function (input) {
  let date = new Date(input)

  let y = date.getFullYear()
  let m = (date.getMonth() + 1).toString().padStart(2, '0')
  let d = date.getDate().toString().padStart(2, '0')

  let hh = date.getHours().toString().padStart(2, '0')
  let mm = date.getMinutes().toString().padStart(2, '0')
  let ss = date.getSeconds().toString().padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('unescape', function (html) {
  return html
    .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
