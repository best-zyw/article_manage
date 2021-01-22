<template>
	<div id="app">
		<el-container v-if="this.$route.name!='Home'">
			<el-header>

			<xhead ></xhead>
			</el-header>

			<el-container>
				<cb />

				<el-main>
					<router-view/>
				</el-main>
			</el-container>


		</el-container>
				<el-container v-else>
			<el-container>
				<el-main>
					<router-view/>
				</el-main>
			</el-container>


		</el-container>
	</div>
</template>

<script>

	import xhead from "./components/xhead";
	import cb from "./components/cb";
    export default {
		components:{xhead,cb},
		data(){
			return{
				// hh:this.$route.name
			}
		},
		// updated(){
		// 	this.hh=this.$route.name
		// }
    }
</script>

<style>

	html,body,#app{
		height: 100%;
		margin: 0;
	}
	.el-header{
		padding: 0!important;
	}
	.el-menu--horizontal>.el-submenu {
		float: right;
	}
	.el-submenu .el-menu-item{
		padding: 0 20px;
	}
	.el-container{
		height: 100%;
	}
	.el-menu{
		height:100%;
		background-color: rgb(84, 92, 100)!important;
	}
	#app .el-submenu__title{
		color: #fff;
	}
	#app .el-menu-item{
		color: #FFF;
	}
	a{
		text-decoration: none;
		color: #fff;
	}
	.el-menu--horizontal>.el-menu-item.is-active{
		border: none;
		font-size: 25px;
	}


</style>