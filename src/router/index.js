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
