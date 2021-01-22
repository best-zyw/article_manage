<template>
  <div class="home">
   <p>用户名：<input type="text" v-model="user.username"></p>
  <p> 密码：<input type="text" v-model="user.password"></p>
  <button @click="login">登入</button>
  </div>
</template>

<script>
export default {
 data(){
   return{
     user:{     username:"",
     password:"",}
   }
 },
 methods:{
    login(){
      this.axios.post(`/login`,this.user).then(res=>{
        console.log(res.data.token)
        localStorage.token=res.data.token
        if(res.data.success){
          this.$router.push({name:"Categories"})
        }
      })
    }
 }
}
</script>
