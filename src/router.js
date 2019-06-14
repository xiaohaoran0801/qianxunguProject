import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import(/* webpackChunkName: "home" */ '@/components/home/home'),
      children:[
        {
          path:'dailyManage',name:'dailyManage',
          component:()=>import(/* webpackChunkName: "dailyManage" */ '@/components/dailyManage/dailyManage')
        },
        {
          path:'musicManage',name:'musicManage',
          component:()=>import(/* webpackChunkName: "musicManage" */ '@/components/musicManage/musicManage')
        },
        {
          path:'typeManage',name:'typeManage',
          component:()=>import(/* webpackChunkName: "typeManage" */ '@/components/typeManage/typeManage')
        },
        {
          path:'permissionManage',name:'permissionManage',
          component:()=>import(/* webpackChunkName: "permissionManage" */ '@/components/permissionManage/permissionManage')
        },
        {
          path:'roleManage',name:'roleManage',
          component:()=>import(/* webpackChunkName: "roleManage" */ '@/components/roleManage/roleManage')
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: ()=>import(/* webpackChunkName: "login" */ '@/components/login/login'),
    },
  ]
})
