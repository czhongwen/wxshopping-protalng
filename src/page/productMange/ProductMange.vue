<template>
  <div>
    <!--头部导航-->
    <div style="width: 100vw;text-align: right;">
      <el-cascader size="mini" expand-trigger="hover" :options="primaryClassification" v-model="search.searchType" @change="handleChange">
      </el-cascader>
      <el-input v-bind="search.searchKey" placeholder="请输入关键字" size="mini" style="width: 10%;"></el-input>
      <el-button size="mini" style="width: 8%;margin-right: 2%;" type="primary" icon="el-icon-search" @click="getProductList">搜索</el-button>
    </div>

    <!--表格信息-->
    <div>
      <el-table :data="tableData" class="tableView" :header-cell-style="{'text-align':'center'}">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img @click="productDetail(scope.row)" :src="'http://localhost:8081' + scope.row.image1" style="width: 50%;height: 50%;cursor:pointer"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" style="overflow: hidden"></el-table-column>
        <el-table-column prop="info" label="简介" style="overflow: hidden"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="descount" label="折扣"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="obtained(scope.row)" size="mini" type="danger">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount">
      </el-pagination>
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
        limit: 10,
        offset: 0,
        totalCount: 1,
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
        offset: _this.page.offset,
        limit: _this.page.limit,
        order: _this.page.order === "" ? null : _this.page.order,
      }).then((res) => {
        if (res.data.flag) {
          if (res.data.result.list.length > 0) {
            _this.tableData = [];
            _this.tableData = res.data.result.list;
            _this.page.totalCount = res.data.result.count;
          } else {
            this.$message.error('对不起！未查询到信息！');
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    /**
     * 商品详情页
     */
    productDetail(row){
      console.log(row.id);
      this.$message.info("" + row.id);
    },

    /**
     * 选择分类
     */
    handleChange(value){
      this.search.searchType = value;
      this.page.offset = 0;
      this.getProductList();
    },
    /**
     * 修改每页的数量
     */
    handleSizeChange(val) {
      this.page.limit = val;
      this.page.offset = 0;
      this.getProductList();
    },

    /**
     * 分页当前页
     */

    handleCurrentChange(val) {
      this.page.offset = (val - 1) * this.page.limit;
      this.getProductList();
    },

    /**
     * 下架商品
     */
    obtained(info){
      let _this = this;
      this.$confirm("确定要下架" + info.name + "这件商品吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        _this.$http.post("/api/product/updateProduct", {
          id: info.id,
          status: 0,
        }).then((res) => {
          if (res.data.flag) {
            if (res.data.result) {
              _this.$message.success("下架成功!");
              _this.getProductList();
            } else {
              _this.$message.error("下架失败！");
            }
          } else {
            _this.$message.error(res.data.msg);
          }
        })
      })
    }
  },
  created () {
    this.getPrimaryClassification();
    this.getProductList();
  }
}
</script>

<style>
  .tableView.el-table .cell{
    text-align: center!important;
  }
  .el-message-box {
    text-align: center;
  }
  .el-message-box__btns{
    text-align: center;
  }
</style>
