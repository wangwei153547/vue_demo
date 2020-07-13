// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/styles/index.scss' // global css
import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons/index.js'
import http from '@/utils/http.js'
import session from '@/utils/session.js'
Vue.prototype.$http=http
Vue.prototype.$session=session
import Table from '@/components/Table/index'
import Lov from '@/components/Lov/index'

// register globally
Vue.component('el-table2', Table)
Vue.component('el-lov', Lov)
/*import axios from 'axios'
import axios2 from 'axios'
axios.defaults.headers['Authorization']='Basic dXNlci1jbGllbnQ6dXNlci1zZWNyZXQtODg4OA=='
//axios.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded'
axios.defaults.headers['Content-Type'] ='application/json'
axios.interceptors.request.use(config=> {

  config.headers.access_token = window.sessionStorage.getItem('access_token')
 return config

})
axios2.defaults.headers['Authorization']='Basic dXNlci1jbGllbnQ6dXNlci1zZWNyZXQtODg4OA=='
//axios.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded'
axios2.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded'
axios2.interceptors.request.use(config=> {

  config.headers.access_token = window.sessionStorage.getItem('access_token')
  return config

})
//axios.defaults.baseURL='http://49.234.99.107:8768'
axios.defaults.baseURL='http://localhost:8768'
Vue.prototype.$http=axios
axios2.defaults.baseURL='http://localhost:8768'
Vue.prototype.$http2=axios2*/
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

