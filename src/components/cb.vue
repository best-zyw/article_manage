<template>
    <el-aside width="200px">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="/">登入</router-link></span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span>后台管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="categories"><i class="el-icon-location"></i><span slot="title">栏目管理</span></el-menu-item>
                    <el-submenu index="1-4">
          <template slot="title"><i class="el-icon-location"></i>文章管理</template>
           <el-menu-item index="1-2" @click="articles"><i class="el-icon-location"></i><span slot="title">文章管理</span></el-menu-item>
            <el-menu-item index="1-2" @click="recycle"><i class="el-icon-delete"></i><span slot="title">文章回收站</span></el-menu-item>
        </el-submenu>
                    <el-menu-item index="1-3" @click="settings"><i class="el-icon-location"></i><span slot="title">系统设置</span></el-menu-item>
                    <el-menu-item index="1-4" @click="users"><i class="el-icon-location"></i><span slot="title">管理员用户表</span></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "cb",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(){

            },
            handleClose(){

            },
            categories(){
                this.$router.push({name:"Categories"})
            },
            articles(){
                this.$router.push({name:"Articles"})
            },
            settings(){
                this.$router.push({name:"Settings"})
            },
            users(){
                this.$router.push({name:"Users"})
            },
            recycle(){
                this.$router.push({name:"Recycle"})
            }
        }

    }
</script>

<style>
.el-submenu__title{
    background: rgb(84, 92, 100);
}
</style>