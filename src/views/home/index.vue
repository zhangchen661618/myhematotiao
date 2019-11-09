<template>
  <!-- 最外层容器 -->
  <el-container>
    <!-- 侧边栏容器 -->
    <el-aside class="rq-aside">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 嵌套大容器 -->
    <el-container>
      <!-- 头部内容 -->
      <el-header>头部内容</el-header>
      <!-- 中间内容 -->
      <el-main>中间区域</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style lang="less" scoped>
  .rq-aside{
    width: 200px;
    height: 100vh;
    background-color: #323745;
  }
</style>
