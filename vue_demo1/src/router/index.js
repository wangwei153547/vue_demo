import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login/index'
import index from '@/views/index/index'
import table from '@/views/table/table'
import table2 from '@/views/table/table2'
import zjcs from '@/views/zjcs/zjcs'
import moduleMenu from '@/views/sys/moduleMenu/index'
import roleModule from '@/views/sys/roleModule/index'
import user from '@/views/sys/user/index'
Vue.use(Router)

const router=new Router({

  routes: [

    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect:'/table',

      children:[
        {
          path: '/table',
          name: 'table',
          component: table

        },
        {
          path: '/table2',
          name: 'table2',
          component: table2
        },
        {
          path: '/zjcs',
          name: 'zjcs',
          component: zjcs
        },
        {
          path: '/moduleMenu',
          name: 'moduleMenu',
          component: moduleMenu
        },
        {
          path: '/roleModule',
          name: 'roleModule',
          component: roleModule
        }
        ,
        {
          path: '/user',
          name: 'user',
          component: user
        }
      ]
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path=='/login') return next()
  const access_token=window.sessionStorage.getItem('access_token')
  if( !access_token) return next('/login')
  return next()
})

export default router

