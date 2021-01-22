<template>
  <div>
    <el-button type="success"
      ><i class="el-icon-edit"></i
      ><router-link to="/addcategory">新增</router-link></el-button
    >
    <el-button type="success"
      ><i class="el-icon-edit"></i
      ><router-link to="/">dengru</router-link></el-button
    >

    <!-- <el-button type="success"><i class="el-icon-edit"></i>展开</el-button> -->

    <el-table :data="tableData" style="width: 100%" :tree-props="{children:'children'}" row-key="id">
      <el-table-column label="id" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="url" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.url" alt="" width="100%" />
        </template>
      </el-table-column>
      <el-table-column label="名称" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
            <el-table-column label="内容" width="100">
        <template slot-scope="scope">
          <p v-html="scope.row.content"></p>
        </template>
      </el-table-column>
      <el-table-column label="type" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type | type_ }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="100">
        <template slot-scope="scope">
          <el-input
            style="margin-left: 10px"
            v-model="scope.row.sort"
            @change="sortchange(scope.row)"
          ></el-input>
        </template>
      </el-table-column>
          <el-table-column
      label="是否显示"
      width="100">
      <template slot-scope="scope">
          <!-- <el-tag size="medium">{{ scope.row.is_show }}</el-tag> -->
            <!-- <i :class="scope.row.is_show?'el-icon-check':'el-icon-close'"></i> -->
            <i :class="scope.row.show | check_show"></i>
      </template>
    </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
            <el-button
            size="mini"
            type="success"
            @click="handleDetail(scope.$index, scope.row)" v-if="scope.row.type==2 || scope.row.type==3"
            >详情</el-button
          >
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
    };
  },
  filters: {
    type_(val) {
      let x = ""
      switch (val) {
        case 1:
          x = "单页";
          break;
        case 2:
          x = "文字列表";
          break;
           case 3:
          x = "图片列表";
          break;
        default:
          x = "URL跳转";
          break;
      }
      return x;
    },
     check_show(val){
    // console.log(val,'wos')
    return  val ? 'el-icon-check':'el-icon-close'
  }
  },
  created() {
    this.init();
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({ name: "Edit", params: { id: row.id } });
    },
    handleDetail(index,row){
      console.log(row)
      this.$router.push({name:"Detail",params:{id:row.id}})
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row);
          this.axios
            .delete(`http://localhost:3000/categories/${row.id}`)
            .then((res) => {
              this.init();
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    init() {
      this.axios.get(`http://localhost:3000/categories`).then((res) => {
        console.log(res);
        this.tableData = res.data.data.category.rows;
      });
    },
    sortchange(row){
      console.log(row)
      this.axios.put(`http://localhost:3000/categories/${row.id}`,row).then(res=>{
        this.init()
      })
    }
  },
};
</script>
<style scoped>
</style>
