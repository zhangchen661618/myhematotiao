<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">内容列表</template>
        </bread-crumb>
        <!-- 工具栏 表单 -->
        <el-form>
            <el-form-item label="文章状态" style="margin-left:40px;">
                 <el-radio-group @change="refreshList" v-model="formData.status">
                    <el-radio :label="5">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核成功</el-radio>
                    <el-radio :label="3">待审失败</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表">
                 <el-select @change="refreshList" v-model="formData.channel_id" placeholder="请选择">
                    <el-option
                    v-for="item in channels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间选择">
                <!--  value-format 是指定绑定值的格式 -->
                <el-date-picker
                    @change="refreshList"
                    value-format="yyyy-MM-dd"
                    v-model="formData.dataRange"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div class="total_title">共找到{{page.total}}条符合条件的内容</div>
        <!-- 内容列表 -->
        <div class="content-list">
            <!-- 循环项 -->
            <div class="content-item" v-for="(item,index) in list" :key="index">
                <!-- 左侧内容 -->
                <div class="left">
                    <img :src="item.cover.images[0]" alt="">
                    <!-- 内容信息 -->
                    <div class="info">
                        <span>{{item.title}}</span>
                        <el-tag style="width:60px;" :type="item.status | statusType">{{item.status | statusText}}</el-tag>
                        <span class="data">{{item.pubdate}}</span>
                    </div>
                </div>
                <!-- 右侧内容 -->
                <div class="right">
                    <span @click="goEdit(item)" style="cursor:pointer">
                        <i class="el-icon-edit"></i>
                        修改
                    </span>
                    <span @click="delItem(item)" style="cursor:pointer">
                        <i class="el-icon-delete"></i>
                        删除
                    </span>
                </div>
            </div>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" style="margin:20px 0;">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                @current-change="changePage">
                </el-pagination>
            </el-row>
        </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 搜索工具栏的数据
      formData: {
        status: 5, // 默认是全部
        channel_id: null, // 定义频道id 当前选择的频道
        dataRange: null // 时间范围
      },
      channels: [], // 频道列表数据
      list: [], // 内容列表
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    // 去编辑页面
    goEdit (item) {
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    // 删除方法
    delItem (item) {
      this.$confirm('您确定要删除此条文章吗', '提示').then(() => {
        // console.log(item.id) //大数字
        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          // 重新加载
          this.getArticles(this.getConditions())
        })
      })
    },
    // 获取所有条件 状态改变+频道切换+日期改变
    getConditions () {
      let { status, channel_id: cid, dataRange } = this.formData
      let params = {
        status: status === 5 ? null : status, // 由于默认给了5 如果是5不能传 所有特殊处理下
        channel_id: cid,
        begin_pubdate: dataRange && dataRange.length ? dataRange[0] : null,
        end_pubdate: dataRange && dataRange.length > 1 ? dataRange[1] : null
      }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize
      return params
    },
    //   页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 获取当前的最新页码
      // 如果点击了第二页，但是有条件 所以需要把所以条件都加到一起 发送给方法
      this.getArticles(this.getConditions()) // 查询数据
    },
    // 刷新列表数据 状态改变/频道切换/日期改变 都会触发
    refreshList () {
      // 当筛选条件改变时，应该将页码回归道第一页
      this.page.currentPage = 1
      this.getArticles(this.getConditions()) // 调用查询接口 传入参数
    },
    // 获取文章方法
    getArticles (params) {
      this.$axios({
        method: 'get',
        url: '/articles',
        params: { ...params }
      }).then(result => {
        this.list = result.data.results // 将当前数据赋值给data对象
        this.page.total = result.data.total_count // 当前总条数
      })
    },
    // 获取频道列表数据
    getChannels () {
      this.$axios({
        method: 'get',
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  // 过滤器
  filters: {
    statusText (value) {
      // value 是传过来的值
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 过滤tag标签啊状态类型
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    // 查询第一页参数
    let pageParams = { page: 1, per_page: 10 }
    this.getArticles(pageParams) // 获取文章列表
    this.getChannels()// 获取频道分类
  }
}
</script>

<style lang="less" scoped>
 .total_title{
     height: 60x;
     line-height: 60px;
     border-bottom: 1px solid #ccc;
 }
 .content-list{
     .content-item{
         padding: 10px;
         border-bottom: 1px solid #f2f3f5;
         display: flex;
         justify-content: space-between;
         .left{
             display: flex;
             align-items: center;
             img{
                 width: 150px;
                 height: 100px;
                 border-radius: 4px;
             }
             .info{
                 margin-left: 10px;
                 display: flex;
                 height: 100px;
                 padding: 5px 0;
                 flex-direction: column;
                 justify-content: space-between;
                 .data{
                     color: #999;
                     font-size: 12px;
                 }
             }
         }
         .right{
             span,span i{
                 font-size: 12px;
                 color: #333;
             }
             span{
                 margin-right: 5px;
             }
         }
     }
 }
</style>
