<template>
  <!-- 最外层容器 -->
  <el-container>
    <!-- 侧边栏容器 -->
    <el-aside class="rq-aside">
      <!-- 左侧菜单 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 嵌套大容器 -->
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 中间内容 -->
      <el-main style="padding:0 0;">
        <!-- 二级路由的容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    // 'layout-aside': layoutAside,
    // 'layout-header': layoutHeader
  }
}
</script>

<style lang="less" scoped>
  .rq-aside{
    width: 200px;
    min-height: 100vh;
    background-color: #323745;
  }
</style>
