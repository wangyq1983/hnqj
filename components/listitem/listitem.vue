<template>
	<view class="xqitem">
		<div class="xq1">
			{{itemcon.number}}<text>/</text>{{gender}}<text>/</text>{{itemcon.birthYear}}年<text>/</text>{{itemcon.height}}厘米<text>/</text>{{itemcon.bodyWeight}}公斤
		</div>
		<div class="xq2">
			{{itemcon.education}}<text>/</text> {{itemcon.job}} <text>/</text> 年收入{{itemcon.income}}
		</div>
		<div class="xq3">
			{{house1}}/{{car1}}<text>/</text>工作区域{{itemcon.workArea}}<text>/</text> {{marriage1}} 
		</div>
		<div class="xq4">
			个人描述：{{itemcon.introduction}}
		</div>
		<div class="actionWarp">
			<view class="enterdetail" @tap = "viewDetail" :data-number = "itemcon.number">
				<image src="/static/view.png" mode=""></image>
				<text>查看详情</text>
				
			</view>
			<view class="">
				<image src="/static/glz.png" mode=""></image>
				<text>请红娘递橄榄枝</text>
			</view>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemcon:{}
			}
		},
		props: {
			info: Object
		},
		created() {
			console.log('detailinfo');
			console.log(this.info);
			this.itemcon = this.info;
		},
		computed: {
			gender() {
				return (this.itemcon.gender == 1)?'男':'女';
			},
			house1(){
				return (this.itemcon.house == 0)?"无房":((this.itemcon.house == 1)?"有房无贷款":'有房有贷款');
			},
			car1(){
				return (this.itemcon.car == 1)?"有车":'无车';
			},
			onlyChild1(){
				return (this.itemcon.onlyChild == 1)?'独生子女':'非独生子女'
			},
			marriage1(){
				return (this.itemcon.marriage == 0)?'未婚':((this.itemcon.marriage == 1)?'离异无孩子':'其他')
			}
		},
		methods: {
			viewDetail(e){
				console.log(e.currentTarget.dataset.number);
				uni.navigateTo({
					url:'/pages/detail/detail?number='+e.currentTarget.dataset.number
				})
			}
		}
	}
</script>

<style lang="scss">
.xqitem{
	background: #fff;
	width:700upx;
	padding:25upx;
	margin: 25upx 0;
	text{
		padding:0 5upx;
		opacity: 0.3;
	}
	.xq1{
		font-size: 32upx;
		font-weight: bold;
		line-height: 64upx;		
	}
	.xq1_man{
		font-size: 32upx;
		font-weight: bold;
		color: #305ff3;
		line-height: 64upx;		
	}
	.xq1_woman{
		font-size: 32upx;
		font-weight: bold;
		color: #ff4443;
		line-height: 64upx;	
	}
	.xq2,.xq3,.xq4{
		font-size: 30upx;
		border-bottom:1upx solid #eee;
		line-height: 64upx;
	}
	.actionWarp{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding:20upx 20upx 0 20upx;
		view{
			border: 2upx solid #333;
			border-radius: 10upx;
			padding:12upx 25upx;
			background: #e9e9e9;
			display: flex;
			flex-direction: row;
			justify-content:flex-start;
			align-items: center;
			image{
				width:40upx;
				height:40upx;
				margin-right:20upx;
			}
			text{
				padding:0;
				opacity: 1;
			}
		}
	}
}
</style>
