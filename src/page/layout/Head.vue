<template>
  <div style="border-radius: 3%;margin-bottom: 1%;">
    <el-menu :default-active="activeIndex" :router="true" @select="habl" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-demo" mode="horizontal" style="border-radius: 3%" text-color="#fff">
      <el-menu-item index="/page/productMange/ProductMange">商品管理</el-menu-item>
      <el-menu-item index="1">购物车管理</el-menu-item>
      <el-menu-item index="3">地址管理</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
      <el-menu-item index="/page/productType/ProductTypeMange">商品分类管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "Head",
      data(){
          return {
            activeIndex: "",
          }
      },
      methods: {
        habl(key, path){
          this.activeIndex = path;
        }
      }
    }
</script>

<style scoped>

</style>
