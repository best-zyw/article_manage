<template>
  <div class="recycle">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item width="80px">
        <el-input v-model="form.title" placeholder="title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.categoryId" clearable placeholder="类型">
          <el-option v-for="category in categorys" :key="category.id" :label="category.name" :value="category.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
       <el-form-item>
        <el-button type="danger" @click="new_">删除所有</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
              <el-table-column label="标题" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
       <el-table-column label="缩略图" width="180">
        <template slot-scope="scope">
           <img :src="scope.row.image" alt="" width="50%" style="border-radius:50%"/>
        </template>
      </el-table-column>
                    <el-table-column label="所属分类" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.Category.name }}</span>
        </template>
      </el-table-column>
        <el-table-column label="内容" width="260">
        <template slot-scope="scope">
          <span v-html="scope.row.content"></span>
        </template>
      </el-table-column>
        <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
          <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">还原</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="page.pageSize"
      :total="page.total"
      :current-page="page.current_page"
      @current-change="fy"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Cx:false,
       tableData: [],
       categorys:[],
      form: {
        categoryId: "",
        title: "",
      },
      new_form:{
        categoryId: "",
        title: "",
      },
      page: {
        current_page: 1,
        total: 0,
        pageSize: 0,
      },
    };
  },
  filters:{
      Sex(val){
        return val==1?"男":"女"
      }
  },
  created() {
    this.init();
    this.axios.get(`http://localhost:3000/categories`).then(res=>{
        console.log(res)
         this.categorys=res.data.data.category.rows
    })
  },
  methods: {
       handleEdit(index, row) {
    this.axios.post(`http://localhost:3000/recycle/${row.id}`).then(res=>{
                   this.init();
              })
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log(row)
           this.axios.delete(`http://localhost:3000/recycle/${row.id}`).then(res=>{
                   this.init();
              })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    onSubmit() {
      // this.Cx=true
      this.new_form={
        categoryId:this.form.categoryId,
         title:this.form.title,
      }
      //让查询的值只有在点击查询后才生效
      this.page.current_page=1
        this.axios.get(`http://localhost:3000/recycle?current_page=${this.page.current_page}&categoryId=${this.new_form.categoryId}&title=${this.new_form.title}`).then(res=>{
            let Data=res.data.data
          this.tableData=Data.articles
          this.page={
            total:Data.pagination.total,
            current_page:Data.pagination.current_page,
            pageSize:Data.pagination.pageSize
          }
        })
    },
    init() {
      this.axios
        .get(`http://localhost:3000/recycle?current_page=${this.page.current_page}`)
        .then((res) => {
          console.log(res);
          let Data=res.data.data
          this.tableData=Data.articles
          this.page={
            total:Data.pagination.total,
            current_page:Data.pagination.current_page,
            pageSize:Data.pagination.pageSize
          }
        });
    },
    fy(val) {
     this.page.current_page=val;
    // if(this.Cx){
       this.axios.get(`http://localhost:3000/recycle?current_page=${this.page.current_page}&categoryId=${this.new_form.categoryId}&title=${this.new_form.title}`).then(res=>{
          let Data=res.data.data
          this.tableData=Data.articles
          this.page={
            total:Data.pagination.total,
            current_page:Data.pagination.current_page,
            pageSize:Data.pagination.pageSize
          }
        })
    // }else{
      // this.init();
    // }    
    },
    new_(){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.axios.delete(`http://localhost:3000/recycle`).then(res=>{
                   this.init();
              })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },
};
</script>
<style >
.recycle .el-breadcrumb {
  padding: 20px;
}
.recycle .el-input {
  width: 120px;
}
.recycle .el-range-editor.el-input__inner{
  width: 350px;
}
 .recycle .el-pagination{
    display: flex;
    justify-content: center;
  }
  .recycle .el-table td, .el-table th{
    text-align: center;
  }
  .recycle .el-table th>.cell{
      text-align: center;
  }
</style>