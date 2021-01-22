<template>
  <div class="add1">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商城管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>编辑用户</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="textarea" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="cancelForm('ruleForm')">取消</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      tableData: [],
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入排序", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // description: [
        //   { required: true, message: '请填写品牌描述', trigger: 'blur' }
        // ]
      },
    };
  },
  created() {
    let id=this.$route.params.id
    this.axios.get(`http://localhost:3000/users/${id}`).then(res=>{
        console.log(res)
        this.ruleForm=res.data.data.user
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.axios
            .put(`http://localhost:3000/users/${this.$route.params.id}`, this.ruleForm)
            .then((res) => {
              // console.log(res)
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              this.$router.push({ name: "Users" });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancelForm(forName) {
      this.$router.push({ name: "Users" });
    },
    beforeUpload(file) {
      // console.log('111',file)
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const islt2M = file.size / 1024 / 1024 < 2;
      if (!isPNG && !isGIF && !isJPG) {
        this.$message.error("上传文件只能是jpg/gif/jpg");
        return false;
      }
      if (!islt2M) {
        this.$message.error("图片大小不能超过2m");
        return false;
      }
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.ruleForm.image = response.image_url;
    },
    Remove(file, fileList) {
      this.ruleForm.image = "";
    },
    fileExeced(files, fileList) {
      this.$message.error("只能上传一张图片，请先删除再上传");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>