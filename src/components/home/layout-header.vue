<template>
    <!-- 用 el-row 和 el-col 布局 -->
    <el-row class="box-row" type="flex" justify="space-between">
        <el-col class="box-row-col1" :span="6">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3" class="box-row-col2" >
            <img  src="../../assets/img/avatar.jpg" alt="">
            <el-dropdown trigger="click">
                <!-- 匿名插槽 -->
                <span class="el-dropdown-link">
                    我是用户名
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
