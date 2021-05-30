import Vue from 'vue'
import VueRouter from 'vue-router'
// import Nprogress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 如果有默认子路由, 不需要给父路由设置name
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // path为空, 会作为默认子路由渲染
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article')
      },
      {
        path: '/publish',
        name: 'publish',
        component: () => import('@/views/publish')
      },
      {
        path: '/image',
        name: 'image',
        component: () => import('@/views/image')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫配置
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条特效
  // Nprogress.start()

  // 如果要访问的页面不是login, 校验登录状态

  // 从localStorage中获取登录用户信息
  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 用户已登录, 允许通过
      next()
    } else {
      // 用户未登录, 跳转到登录页面
      next('/login')
    }
  } else {
    // 访问登录页面, 允许通过
    next()
  }
})

export default router
