// 公共路由
import Router from 'vue-router'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/myView/myLogin.vue'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/myView/myRegister.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/home',
    redirect: '/combo',
    component: () => import('@/views/myView/home.vue'),
    children: [
      {
        path: '/user',
        component: () => import('@/views/myView/userPage.vue')
      },
      {
        path: '/combo',
        component: () => import('@/views/myView/comboPage.vue')
      },
      {
        path: '/service',
        component: () => import('@/views/myView/servicePage.vue')
      }
    ]
  }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push
let routerReplace = Router.prototype.replace
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
