import Vue from 'vue'
import VueRouter from 'vue-router'
// import Films from '@/views/Films'
// import Cinemas from '@/views/Cinemas'
// import Center from  '@/views/Center'
// import Detail from '@/views/Detail'
// import Nowplaying from '@/views/films/Nowplaying'
// import Comingsoon from '@/views/films/Comingsoon'

Vue.use(VueRouter)

// 配置表
const routes = [
  {
    path: '/films',
    component: ()=>import('@/views/Films'),  // 路由懒加载
    children: [
      {
        path: '/films/nowplaying',
        component: ()=>import('@/views/films/Nowplaying')
      },
      {
        path: '/films/comingsoon',
        component: ()=>import('@/views/films/Comingsoon')
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    path: '/cinemas',
    component: ()=>import('@/views/Cinemas')
  },
  {
    path: '/cinemas/search',
    component: ()=>import('@/views/Search')
  },{
    path: '/city',
    component: ()=>import('@/views/City')
  },
  {
    path: '/center',
    component: ()=>import('@/views/Center'),
    meta: {
      isRequired: true
    }
  },{
    name: 'Detail',
    path: '/detail/:id',  // 动态二级路由
    component: ()=>import('@/views/Detail')
  },{
    path: '/order',
    component: ()=>import('@/views/Order'),
    beforeEach: (to,from,next) => {  // 局部拦截
      if (localStorage.getItem('token')) {  // 授权通过
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        }) // 授权不通过跳转到登录页
      }
    }
  },{
    path: '/login',
    component: ()=>import('@/views/Login')
  },
  {// 重定向
    path: '*',
    redirect: '/films'
  }
  
]

const router = new VueRouter({
  mode: 'hash', // 路由模式 默认：hash , history
  routes
})

// 全局路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.isRequired) {
    if (localStorage.getItem('token')) {  // 授权通过
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      }) // 授权不通过跳转到登录页
    }
  } else {
    next() // 放行
  }
})

export default router
