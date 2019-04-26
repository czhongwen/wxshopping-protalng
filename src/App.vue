<template>

  <div>
    <el-container>
      <el-header>
        <Head></Head>
      </el-header>
      <el-main>
        <div id="app">
          <router-view/>
        </div>
      </el-main>
      <!--<el-footer>-->
        <!--<Bottom></Bottom>-->
      <!--</el-footer>-->
    </el-container>
  </div>
</template>

<script>
  import Head from './page/layout/Head.vue'
  import Bottom from './page/layout/Bottom.vue'
export default {
  name: 'App',
  components:{Head, Bottom}
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
