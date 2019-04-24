<template>
  <div style="border-radius: 3%;margin-bottom: 1%;">
    <el-menu :default-active="activeIndex" :router="true" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-demo" mode="horizontal" style="border-radius: 3%" text-color="#fff">
      <el-menu-item index="ProductMange">商品管理</el-menu-item>
      <el-menu-item index="">购物车管理</el-menu-item>
      <el-menu-item index="3">地址管理</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
      <el-menu-item index="5">商品分类管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "Head",
      data(){
          return {
            activeIndex: "ProductMange",
          }
      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
