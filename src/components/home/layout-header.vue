<template>
    <!-- 用 el-row 和 el-col 布局 -->
    <el-row class="box-row" type="flex" justify="space-between">
        <el-col class="box-row-col1" :span="6">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3" class="box-row-col2" >
            <img  :src="user.photo ? user.photo : defaultImg" alt="">
            <el-dropdown trigger="click">
                <!-- 匿名插槽 -->
                <span class="el-dropdown-link">
                    {{user.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 具名插槽 -->
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >个人信息</el-dropdown-item>
                    <el-dropdown-item >git地址</el-dropdown-item>
                    <el-dropdown-item >退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      defaultImg: require('../../assets/img/avatar.jpg') // require的图片就变成了 base64
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      let userInfo = window.localStorage.getItem('user-info')
      let token = userInfo ? JSON.parse(userInfo).token : null // 获取token
      token && this.$axios({
        method: 'get',
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` }// 将headers中赋值 后端需要的token身份信息 携带令牌
      }).then((result) => {
        // console.log(result.data.data)
        this.user = result.data.data // 获取到用户的最新资料，赋值给data中的数据
      })
    }
  },
  created () {
    this.getUserInfo() // 获取用户信息
  }
}
</script>

<style lang="less" scoped>
    .box-row{
        padding: 12px 0;
        .box-row-col1{
            display: flex;
            align-items: center;
            i{
                font-size: 20px;
                margin-right: 4px;
            }
        }
        .box-row-col2{
            display: flex;
            align-items: center;
            img{
                width:40px;
                height:40px;
                border-radius:50%;
                margin-right:10px;
            }
        }
    }
</style>
