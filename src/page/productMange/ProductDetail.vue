<template>
  <div>
    <div style="width: 100%">
      <div style="width: 43%;float: left;margin-left: 1%;">
        <el-carousel style="width: 100%;height: 25%;background-color: gainsboro;display: inline-block" type="card">
          <el-carousel-item v-for="item in pics" interval="1000" :key="item" style="background-color: gainsboro;width: 50%">
            <img :src="'http://localhost:8081' + item " style="width: 100%; height: 100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="display: inline-block;margin-left: 1%;width: 52%">
        <el-switch style="display: block;margin-top: 4%" @change="updateStatus" v-model="status" active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="下架">
        </el-switch>
        <el-input v-model="name" size="medium" placeholder="商品名称" style="width: 60%;margin-top: 4%">
          <template slot="prepend">商品名称:</template>
        </el-input>
        <el-input v-model="info" size="medium" placeholder="商品名称" style="width: 60%;margin-top: 4%">
          <template slot="prepend">商品信息:</template>
        </el-input><br/>
        <el-input v-model="price" style="margin-top: 4%;width: 25%;" size="medium">
          <template slot="prepend">价格:</template>
        </el-input>
        <el-input v-model="num" style="margin-top: 4%;width: 25%;" size="medium">
          <template slot="prepend">数量:</template>
        </el-input>
        <el-input v-model="discount" style="margin-top: 4%;width: 25%;" size="medium">
          <template slot="prepend">折扣:</template>
        </el-input><br/>
        <el-button style="margin-top: 4%;width: 18%;" size="small" type="primary" round>主图片</el-button>
        <el-button style="margin-top: 4%;width: 18%;" size="small" type="primary" round>副图片1</el-button>
        <el-button style="margin-top: 4%;width: 18%;" size="small" type="primary" round>副图片2</el-button>
        <el-button style="margin-top: 4%;width: 18%;" size="small" type="primary" round>副图片3</el-button>
        <el-button style="margin-top: 4%;width: 18%;" size="small" type="primary" round>副图片4</el-button>
      </div>
    </div>

    <div style="width: 100%;display: block;margin-top: 4%;">
      12121
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      id: null,
      pics:[],
      name:"",
      info:"",
      price:0,
      num:0,
      discount:0,
      status: true,
      time:"",
    }
  },
  methods: {
    getProductInfo(id) {
      let _this = this;
      this.$http.post("/api/product/getById", {
        id:id,
      }).then((res) => {
        if (res.data.flag) {
          if (res.data.result != null) {
            let data = res.data.result
            _this.pics = []
            _this.pics.push(data.image1);
            _this.pics.push(data.image2);
            _this.pics.push(data.image3);
            _this.pics.push(data.image4);
            _this.pics.push(data.image5);
            _this.price = data.price
            _this.name = data.name
            _this.info = data.info
            _this.num = data.num
            _this.discount = data.descount
            _this.status = data.status === 1 ? true : false;
          } else {
            _this.$message.error({
              message: "数据有误!",
              center: true,
              showClose: true
            })
          }
        } else {
          _this.$message.error({
            message: res.data.msg,
            center: true,
            showClose: true
          })
        }
      })
    },

    //修改状态
    updateStatus(){
      let _this = this;
      let status = 1
      let txt = ""
      if (!_this.status) {
        console.log(_this.status);
        status = 0;
        txt = "下架"
      } else {
        console.log(_this.status);
        status = 1
        txt = "上架"
      }
      _this.$confirm("你确定要" + txt + "吗?随便点击是要背锅的哟！", "温馨提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
      }).then(() => {
        _this.$http.post('/api/product/updateProduct', {
          id: _this.id,
          status: status
        }).then((res) => {
          if (res.data.flag) {
            if (res.data.result) {
              _this.$message.success(txt + '成功!')
            } else {
              _this.$message.error(txt + '失败！')
            }
            _this.getProductInfo(_this.id);
          } else {
            _this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {
        _this.status = !_this.status
      })
    }
  },
  created () {
    this.id = this.$route.params.id;
    this.getProductInfo(this.$route.params.id);
  }
}
</script>

<style>

</style>
