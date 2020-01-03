import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'
import Main from '../views/home/main.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: Main // 默认的二级路由
      },
      {
        path: '/home/comment', // 评论列表
        component: () => import('../views/comment/index.vue') // 按需加载的写法
      },
      {
        path: '/home/material', // 素材列表
        component: () => import('../views/material/index.vue') // 按需加载的写法
      },
      {
        path: '/home/articles', // 内容列表
        component: () => import('../views/articles/index.vue') // 按需加载的写法
      },
      {
        path: '/home/publish', // 发布文章
        component: () => import('../views/publish/index.vue') // 按需加载的写法
      },
      {
        path: '/home/publish/:articleId', // 编辑文章 动态路由 定义了一个参数 articleId
        component: () => import('../views/publish/index.vue') // 按需加载的写法
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
