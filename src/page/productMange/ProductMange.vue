<template>
  <div>
    <!--头部导航-->
    <div style="width: 100vw">
      <el-cascader expand-trigger="hover" :options="primaryClassification" v-model="search.searchType" @change="handleChange">
      </el-cascader>
    </div>

    <!--表格信息-->
    <div>
      <el-table :data="tableData" class="tableView">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="info" label="简介"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="descount" label="折扣"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductMange',
  data () {
    return {
      //商品一级分类
      primaryClassification: [],
      selectedOptions: null,
      search: {
        searchType: [],
        searchKey: "",
      },
      page: {
        pageSize: 18,
        pageTotalCount: 0,
        currentPage: 1,
        order:"",
      },
      tableData:[],
    }
  },
  methods: {
    //获得商品已经分类
    getPrimaryClassification() {
      let _this = this;
      this.$http.post("api/productType/getAllType")
        .then((res) => {
          if (res.data.flag) {
            if (res.data.result.length > 0) {
              _this.primaryClassification = [];
              let arr = res.data.result;
              for (let i = 0; i < arr.length; i++) {
                let details = [];
                for (let j = 0; j < arr[i].detail.length; j++) {
                  let detailObj = {
                    value: arr[i].detail[j].id,
                    label: arr[i].detail[j].name,
                  };
                  details.push(detailObj);
                }
                let obj = {
                  value: arr[i].typeId,
                  label: arr[i].typename,
                  children: details,
                }
                _this.primaryClassification.push(obj);
              }
            }
          }
      })
    },
    //获得商品列表
    getProductList() {
      let _this = this;
      let typeId = 1;
      if (_this.search.searchType == null || _this.search.searchType.length <= 0) {
        typeId = 1;
      } else {
        typeId = _this.search.searchType[1];
      }
      this.$http.post("/api/product/getProductListV1", {
        typeId: typeId,
        offset: _this.page.currentPage,
        limit: _this.page.pageSize,
        order: _this.page.order,
      }).then((res) => {
        if (res.data.flag) {
          if (res.data.result.list.length > 0) {
            _this.tableData = [];
            _this.tableData = res.data.result.list;
            console.log(_this.tableData)
          } else {
            this.$message.error('对不起！未查询到信息！');
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    handleChange(value){
      console.log(value);
    },
  },
  created () {
    this.getPrimaryClassification();
    this.getProductList();
  }
}
</script>

<style scoped>
  .tableView.el-table .cell{
    text-align: center!important;
  }
</style>
