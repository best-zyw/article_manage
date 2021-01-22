<template>
    <div class="head">
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1"><i class="el-icon-loading"> </i>meimei</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">sunny管理员</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
            </el-menu>

    </div>
</template>

<script>
    export default {
        name: "xhead",
        data() {
            return {
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

            }
        }
    }
</script>

<style scoped>

</style>