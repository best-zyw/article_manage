<template>
  <div class="setting">
    站点名称：<el-input placeholder="请输入内容" v-model="setting.siteName" clearable> </el-input>
    备案号：<el-input placeholder="请输入内容" v-model="setting.copyright" clearable> </el-input>
    <el-button type="success" @click="change">修改</el-button>
  </div>
</template>
<script>
export default {
    data(){
        return{
            setting:{}
        }
    },
    created(){
        this.axios.get(`http://localhost:3000/settings`).then(res=>{
            console.log(res)
            this.setting=res.data.data.setting
        })
    },
    methods:{
        change(){
            this.axios.put(`http://localhost:3000/settings`,this.setting).then(res=>{

            })
        }
    }
}
</script>
<style scoped>
 .el-input--suffix .el-input__inner{
    margin-bottom:20px ;
}
</style>