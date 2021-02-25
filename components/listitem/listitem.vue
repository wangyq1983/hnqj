 <template>
	<view class="xqitem">
		<view class="" @tap="viewDetail" :data-number = "itemcon.number">
			<view class="xq1">
				{{itemcon.number}}<text>/</text>{{gender}}<text>/</text>{{itemcon.birthYear}}年<text>/</text>{{itemcon.height?itemcon.height:'-'}}厘米<text>/</text>{{itemcon.bodyWeight?itemcon.bodyWeight:'-'}}公斤
			</view>
			<view class="xq2">
				{{itemcon.education?itemcon.education:'-'}}<text>/</text> {{itemcon.job?itemcon.job:'-'}} <text>/</text> 年收入{{itemcon.income?itemcon.income:'-'}}
			</view>
			<view class="xq3">
				{{house1}}/{{car1}}<text>/</text>工作区域{{itemcon.workArea?itemcon.workArea:'-'}}<text>/</text> {{marriage1}} 
			</view>
			<view class="xq4">
				<text class="zd">个人描述：</text>{{itemcon.introduction?itemcon.introduction:'-'}}
			</view>
			<view class="xq5">
				<text class="zd">择偶要求：</text>{{itemcon.requirement?itemcon.requirement:'-'}}
			</view>
		</view>
		<view class="userimg" v-if="hasImg && itemcon.photoPublic == 1">
			<image :src="item" mode="aspectFill" v-for="(item, index) in imglist" :key="index"></image>
		</view>
		<view class="userimg" v-if="hasImg && (itemcon.photoPublic == 0) && itemcon.photoPermission == 1">
			<image :src="item" mode="aspectFill" v-for="(item, index) in imglist" :key="index"></image>
		</view>
		<view class="userimg" v-if="hasImg && (itemcon.photoPublic == 0) && itemcon.photoPermission == 0 && userType == 3">
			<image :src="item" mode="aspectFill" v-for="(item, index) in imglist" :key="index"></image>
		</view>
		<view class="userimg" v-if="hasImg && (itemcon.photoPublic == 0) && itemcon.photoPermission == 0">
			<text>用户已设置照片不公开</text>
		</view>
		
		<view class="actionWarp" v-if="btnevent == 'ok'">
			<view class="enterdetail" @tap = "viewDetail" :data-number = "itemcon.number">
				<image src="/static/view.png" mode=""></image>
				<text>查看详情</text>
				
			</view>
			<view class="" @tap="ganlanzhi" :data-number = "itemcon.number" v-if="showButton">
				<image src="/static/glz.png" mode=""></image>
				<text>请红娘递橄榄枝</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemcon:{},
				selfNumber:uni.getStorageSync('number'),
				userType:uni.getStorageSync('userType')
			}
		},
		props: {
			info: Object,
			showButton: {
				type: Boolean,
				default: true
			},
			btnevent:{
				type:String,
				default:'ok'
			}
		},
		created() {
			console.log('detailinfo');
			console.log('listitem debug is ---------------------------------------');
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
			},
			imglist(){
				if(this.itemcon.imageList){
					if(JSON.parse(this.itemcon.imageList).length > 0){
						return JSON.parse(this.itemcon.imageList)
					}else{
						return []
					}
				}else{
					return []
				}
			},
			hasImg(){
				if(this.itemcon.imageList){
					if(JSON.parse(this.itemcon.imageList).length > 0){
						return true;
					}else{
						return false;
					}
				}else{
					return false
				}
				
			},
			showImg(){
				if(this.itemcon.photoPublic == 0){
					return false
				}else{
					return true
				}
			}
		},
		methods: {
			viewDetail(e){
				console.log(e.currentTarget.dataset.number);
				if( this.btnevent == 'ok'){
					uni.navigateTo({
						url:'/pages/detail/detail?number='+e.currentTarget.dataset.number
					})
				}
				
			},
			ganlanzhi(e){
				var params = {
					applyNumber:this.selfNumber,
					responseNumber:e.currentTarget.dataset.number,
					eventType:'ganlanzhi',
				}
				uni.navigateTo({
					url:"/pages/examine/examine?"+this.$api.encodeData(params)
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
	border-top: 25upx solid #ededed;
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
	.xq2,.xq3,.xq4,.xq5{
		font-size: 30upx;
		border-bottom:1upx solid #eee;
		line-height: 64upx;
	}
	.userimg{
		padding-top: 10upx;
		 display: flex;
		 flex-direction: row;
		 justify-content: center;
		 align-items: center;
		 image{
			 width:200upx;
			 height:200upx;
		 }
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
.zd{
	font-weight: bold;
	font-size: 28upx;
	color: #333;
	opacity: 1 !important;
}
</style>
