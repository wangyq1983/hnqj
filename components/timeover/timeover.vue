<template>
	<view v-if="isover" class="timeover">
		您的会员权限已经过期，请及时联系
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mtime:'',
				isover:false
			};
		},
		created() {
			this.mtime = this.membertime;
			var nowtime = new Date(this.membertime.replace(/-/g,'/')).getTime();
			var endtime = new Date().getTime();
			if(nowtime >= endtime){
				this.isover = false
			}else{
				this.isover = true
			}
		},
		props: {
			membertime: String
		},
		methods:{
			
		}
	}
</script>

<style>
.timeover{
	width:100%;
	height:60upx;
	line-height: 60upx;
	text-align: left;
	background: #ffa82e;
	color: #fff;
	position: fixed;
	z-index: 99999;
	top:0;
	left:0;
	padding-left: 20upx;
}
</style>
