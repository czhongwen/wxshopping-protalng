<template>
  <div>

    <!--头部导航-->
    <div style="width: 100vw;text-align: right;">
      <el-cascader size="mini" expand-trigger="hover" :options="primaryClassification" v-model="search.searchType" @change="handleChange">
      </el-cascader>
      <el-button type="info" @click="getObtainedProducts" size="mini">已下架商品</el-button>
      <el-button type="info" size="mini">缺货商品</el-button>
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
            <el-button v-if="scope.row.status == 1" @click="obtained(scope.row)" size="mini" type="danger">下架</el-button>
            <el-button v-else-if="scope.row.status == 0" @click="obtained(scope.row)" size="mini" type="success">上架</el-button>
            <el-button @click="productDetail(scope.row)" size="mini" type="success">详情</el-button>
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
      // 商品一级分类
      primaryClassification: [],
      selectedOptions: null,
      search: {
        searchType: [],
        searchKey: '',
        status: 1
      },
      page: {
        limit: 10,
        offset: 0,
        totalCount: 1,
        order: ''
      },
      tableData: []
    }
  },
  methods: {
    // 获得商品已经分类
    getPrimaryClassification () {
      let _this = this
      this.$http.post('api/productType/getAllType')
        .then((res) => {
          if (res.data.flag) {
            if (res.data.result.length > 0) {
              _this.primaryClassification = []
              let arr = res.data.result
              for (let i = 0; i < arr.length; i++) {
                let details = []
                for (let j = 0; j < arr[i].detail.length; j++) {
                  let detailObj = {
                    value: arr[i].detail[j].id,
                    label: arr[i].detail[j].name
                  }
                  details.push(detailObj)
                }
                let obj = {
                  value: arr[i].typeId,
                  label: arr[i].typename,
                  children: details
                }
                _this.primaryClassification.push(obj)
              }
            }
          }
        })
    },
    // 获得商品列表
    getProductList () {
      let _this = this
      let typeId = 1
      if (_this.search.searchType == null || _this.search.searchType.length <= 0) {
        typeId = 1
      } else {
        typeId = _this.search.searchType[1]
      }
      this.$http.post('/api/product/getProductListV1', {
        IndexDetailId: typeId,
        status: _this.search.status,
        offset: _this.page.offset,
        limit: _this.page.limit,
        order: _this.page.order === '' ? null : _this.page.order
      }).then((res) => {
        console.log(res.data.result)
        if (res.data.flag) {
          if (res.data.result.count > 0) {
            _this.tableData = []
            _this.tableData = res.data.result.list
            _this.page.totalCount = res.data.result.count
          } else {
            this.$message.error({
              message: '对不起！未查询到信息',
              center: true,
              showClose: true
            })
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    /**
     * 商品详情页
     */
    productDetail (row) {
      this.$router.push({name: 'ProductDetail', params: {'id': row.id}})
    },

    /**
     * 选择分类
     */
    handleChange (value) {
      this.search.status = 1
      this.search.searchType = value
      this.page.offset = 0
      this.getProductList()
    },
    /**
     * 修改每页的数量
     */
    handleSizeChange (val) {
      this.page.limit = val
      this.page.offset = 0
      this.getProductList()
    },

    /**
     * 分页当前页
     */

    handleCurrentChange (val) {
      this.page.offset = (val - 1) * this.page.limit
      this.getProductList()
    },

    /**
     * 下架商品
     */
    obtained (info) {
      let _this = this
      let status = 0
      let txt = ''
      if (info.status === 0) {
        txt = '上架'
        status = 1
      } else if (info.status === 1) {
        txt = '下架'
        status = 0
      } else {
        return _this.$message.error({
          message: '出现了脏数据，请联系管理员小哥哥',
          center: true,
          showClose: true
        })
      }
      this.$confirm('确定要' + txt + info.name + '这件商品吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        _this.$http.post('/api/product/updateProduct', {
          id: info.id,
          status: status
        }).then((res) => {
          if (res.data.flag) {
            if (res.data.result) {
              _this.search.offset = 0
              _this.getProductList()
              _this.$message.success(txt + '成功!')
            } else {
              _this.$message.error(txt + '失败！')
            }
          } else {
            _this.$message.error(res.data.msg)
          }
        })
      })
    },
    // 查询已下架的商品
    getObtainedProducts () {
      let _this = this
      _this.search.status = 0
      _this.page.offset = 0
      _this.getProductList()
    }
  },
  created () {
    this.getPrimaryClassification()
    this.getProductList()
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
