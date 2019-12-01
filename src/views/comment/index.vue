<template>
  <el-card>
    <!-- el-card 具名插槽 header -->
    <bread-crumb slot="header">
      <!-- 面包屑插槽 具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格组件 -->
    <!-- <el-table :data="list">
      <el-table-column label="标识" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
    </el-table> -->
    <el-table :data="list">
      <!-- prop 绑定的字段名称 -->
      <el-table-column prop="title" width="500" label="标题"></el-table-column>
      <el-table-column prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // list: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]
      list: []
    }
  },
  methods: {
    // 查询评论列表数据
    // query参数是get参数 在url链接上  post参数是body参数
    // axios中有一个对象存储的就是query参数  params
    // axios中有一个对象存储的就是body参数  data
    getComments () {
      this.$axios({
        method: 'get',
        url: '/articles',
        params: {
          response_type: 'comment' // 查询评论相关的数据
        }
      }).then(result => {
        this.list = result.data.results // 获取列表数据给当前的数据对象
      })
    }
  },
  // 创建实例之后执行
  created () {
    this.getComments()
  }
}
</script>

<style>

</style>
