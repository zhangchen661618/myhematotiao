<template>
  <el-card>
      <bread-crumb slot="header">
          <template slot="title">发布文章</template>
      </bread-crumb>
      <el-form ref="myForm" :rules="rules" :model="formData" class="publish-form" label-width="80px">
          <el-form-item prop="title" label="标题">
              <el-input v-model="formData.title" style="width:400px;"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
              <quill-editor
              style="width:800px;height:400px;margin-bottom:100px;"
                v-model="formData.content"
                type="textarea"
                :rows="4"
                placeholder="请输入内容">
              </quill-editor>
          </el-form-item>
          <el-form-item label="封面">
              <el-radio-group @change="changeType" v-model="formData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="formData.channel_id">
                <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in channels"
                :key="item.id">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publish(false)" type="primary">发布</el-button>
              <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0, // 类型
          images: [] // 图片数组 随着 type变化而变化
        } // 默认给个无图
      },
      rules: {
        title: [{ required: true, message: '标题内容不得为空' },
          { min: 5, max: 30, message: '标题内容必须5到30个字符' }],
        content: [{ required: true, message: '文章内容不得为空' }],
        channel_id: [{ required: true, message: '频道不得为空' }]
      }
    }
  },
  methods: {
    // 点击图片类型
    changeType () {
      // 可以获取到最新的封面类型 去改变当前的images 类型
      console.log(this.formData.cover.type)
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 当类型为单图时，要为数组生成一个地址
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 当类型为单图时，要为数组生成一个地址
      } else {
        this.formData.cover.images = []
      }
    },
    // 发布内容
    publish (draft) {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          let{ articleId } = this.$route.params
          let method = articleId ? 'put' : 'post' // 根据文章id 确定是编辑还是新增
          let url = articleId ? `/articles/${articleId}` : '/articles' // 根据id确定当前的请求地址
          this.$axios({
            method: method,
            url: url,
            params: { draft: draft }, // 是否为草稿
            data: { ...this.formData }
          }).then(() => {
            // 如果发送成功 就会跳转到内容列表
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        method: 'get',
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 通过文章id获取文章信息
    getArticleById () {
      let { articleId } = this.$route.params
      this.$axios({
        method: 'get',
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    let { articleId } = this.$route.params
    // 加载数据 如果id 存在 就认为是编辑 如果不存在认为是新增
    articleId && this.getArticleById()
    // if (articleId) { this.getArticleById() }

    this.getChannels() // 获取频道列表
  }
}
</script>

<style lang='less' scoped>
.publish-form{
    margin-left: 50px;
}
</style>
