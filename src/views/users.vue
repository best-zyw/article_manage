<template>
	<div>

        <el-button type="success"><i class="el-icon-edit"></i><router-link to="/addusers">新增</router-link></el-button>
    
    <el-button type="success"><i class="el-icon-edit"></i>导出</el-button>

      
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="id"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column
            label="名称"
            width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        tableData: [],
      }
    },
    filters: {
    check_show(val){
    // console.log(val,'wos')
    return  val ? 'el-icon-check':'el-icon-close'

  }
},
    created(){
      this.init();
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row);
        this.$router.push({name:'usersEdit',params:{id:row.id}})
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log(row)
           this.axios.delete(`http://localhost:3000/users/${row.id}`).then(res=>{
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
      init(){
          this.axios.get(`http://localhost:3000/users`).then(res=>{
                    console.log(res)
                    this.tableData=res.data.data.User
        })
      },
    }
  }
</script>
<style scoped>
 
</style>
