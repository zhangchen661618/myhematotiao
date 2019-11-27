<template>
    <!-- 用 el-row 和 el-col 布局 -->
    <el-row class="box-row" type="flex" justify="space-between">
        <el-col class="box-row-col1" :span="6">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3" class="box-row-col2" >
            <img  :src="user.photo ? user.photo : defaultImg" alt="">
            <el-dropdown trigger="click"  @command="commandAction">
                <!-- 匿名插槽 -->
                <span class="el-dropdown-link">
                    {{user.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 具名插槽 -->
                <!-- @command 绑定菜单项点击事件 -->
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>
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
      this.$axios({
        method: 'get',
        url: '/user/profile'
      }).then((result) => {
        // console.log(result.data.data)
        this.user = result.data.data // 获取到用户的最新资料，赋值给data中的数据
      })
    },
    // 点击菜单项，会触发的事件 command 是点击的菜单项中的command属性值
    commandAction (command) {
      if (command === 'acount') {
        // 账户信息
        this.$router.push('/home/account')
      } else if (command === 'git') {
        // git
        window.location.href = 'https://github.com/zhangchen661618/myhematotiao'
      } else if (command === 'out') {
        // 退出
        window.localStorage.clear() // 擦除本项目在浏览器上的所有前端缓存
        this.$router.push('/login')
      }
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
