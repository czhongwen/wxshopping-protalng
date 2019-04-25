<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="序号" prop="typeId"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="'http://localhost:8081' + scope.row.typeImage" @click="productDetail(scope.row)" style="width: 50%;height: 50%;cursor:pointer"/>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="typename"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateProductType(scope.row)" size="mini" type="success">修改</el-button>
          <el-button @click="" size="mini" type="success">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="productTypeVisible" center title="修改一级分类" width="30%">
      <span style="line-height: 100%">
        <label style="line-height: 50%">图片</label>
        <img :src="'http://localhost:8081' + typeImage" style="width: 50%;height: 50%;"/>
      </span>
      <span class="dialog-footer" slot="footer">
        <el-button @click="productTypeVisible = false"  size="mini">取 消</el-button>
        <el-button @click="productTypeVisible = false" size="mini" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "ProductTypeMange",
      data(){
          return{
            tableData:[],
            productTypeVisible:false,
            id:0,
            typeName:"",
            typeImage: "",
          }
      },
      methods:{
        getTypeList(){
          let _this = this;
          this.$http.post("/api/productType/getAllType").then((res) => {
            console.log(res);
            if (res.data.flag) {
              if (res.data.result.length > 0) {
                _this.tableData = []
                _this.tableData = res.data.result
              } else {
                _this.$message.error("数据为空!");
              }
            } else {
              _this.$message.error(res.data.msg);
            }
          })
        },
        updateProductType(info) {
          let _this = this;
          _this.typeName = info.typename;
          _this.typeImage = info.typeImage;
          _this.productTypeVisible = true;
        },
      },
      created() {
        this.getTypeList();
      }
    }
</script>

<style>
  .el-table .cell{
    text-align: center!important;
  }
  .el-message-box {
    text-align: center;
  }
  .el-message-box__btns{
    text-align: center;
  }
</style>
