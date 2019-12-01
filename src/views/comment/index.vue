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
    <el-table :data="list" :stripe="true" border>
      <!-- prop 绑定的字段名称 -->
      <el-table-column prop="title" width="500" label="标题"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 作用域插槽 父组件写组件内容的时候 调用子组件的数据-->
        <!-- obj相当于 el-table-column下子组件给slot的属性集合 -->
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button @click="closeOrOpen(obj.row)" :style="{color:obj.row.comment_status ? '#E6A23C' :'#409EFF'}" type="text" >{{obj.row.comment_status ? "关闭评论":'打开评论'}}</el-button>
        </template>

      </el-table-column>
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
    // 点击打开或者关闭
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }// 状态是反着的
        }).then(() => {
          // 如果进去到then函数中一定是成功
          this.getComments()
        })
      })
    },
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
    },
    // row当条数据对象  column当前列的属性  cellValue当前单元格属性值  index索引
    // formatter 需要返回结果 需要根据当前值进行返回
    formatter (row, column, cellValue, index) {
      // if (cellValue) {
      //   return '正常'
      // }
      // return '关闭'
      return cellValue ? '正常' : '关闭'
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
