import router from './router/index'

// 全局导航前置守卫
router.beforeEach(function (to, from, next) {
  // 如果是以home为起始就认为需要检查token的区域
  if (to.path.startsWith('/home')) {
    // 获取前端的token
    let result = window.localStorage.getItem('user-info')
    if (result) {
      let userInfoo = JSON.parse(result) // 将存储的支付串转换为对象
      if (userInfoo && userInfoo.token) {
        // 满足token存在的情形
        next()
      } else {
        next('/login') // 不满足跳转到login页面
      }
    } else {
      next('/login') // 跳转到login页面
    }
  } else {
    next() // 直接放行
  }
})

export default router
