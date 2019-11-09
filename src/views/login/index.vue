<template>
  <div class="login">
    <el-card class="login-card">

      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>

      <!-- 表单结构 el-form   el-form-item -->
      <el-form :model="formData" :rules="rules" ref="loginForm">
        <!-- el-form-item 的prop属性设置为需要校验的字段 -->
        <el-form-item prop="mobile">
          <!-- 手机号绑定 input-->
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码绑定 input-->
          <el-input v-model="formData.code" style="width:60%;" placeholder="请输入手机号"></el-input>
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <!-- checkbox绑定check -->
          <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var func = function (rule, value, callback) {
      // rule 当前校验规则没有用  value当前表单字段的值
      if (value) {
        // 满足校验
        callback()
      } else {
        // 不满足校验
        callback(new Error('必须点击同意协议'))
      }
    }
    return {
      // 定义表单数据对象
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
        ],
        check: [
          { message: '点击同意', validator: func }
        ]
      }
    }
  },
  methods: {
    login () {
      // validate 手动校验表单数据
      // console.log(this.$refs.loginForm.validate)
      this.$refs.loginForm.validate((isOk) => {
        if (isOk) {
          // 通过了校验
          console.log('前端校验成功')
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData // post 参数是在data 中写入的
          }).then(result => {
            console.log(result.data.data)
            // 把接收到的信息转为字符串放入本地存储中
            window.localStorage.setItem('user-info', JSON.stringify(result.data.data))
            this.$router.push('/home')
          }).catch(() => {
            // $message 是elementUI注入到vue实例的方法
            this.$message({
              message: '当前用户名或密码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/img/login_bg.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-card{
    width: 420px;
    height: 360px;
    .title{
      text-align: center;
      margin-bottom: 30px;

      img{
        width: 200px;
        height: 45px;
      }
    }
  }
}
</style>
