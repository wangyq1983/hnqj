<template>
	<view>
		<view class="searchBox">
			<input type="text" placeholder="请输入编号进行搜索" v-model="searchTxt" />
			<view class="searchBtn" @tap = "searchEvent">
				搜索
			</view>
			<view class="typesearch" @tap="typeSearchEvent">
				<image src="../../static/sx.png" mode=""></image>
			</view>
		</view>

		<view class="typeSearch" v-if="showType">
			<view class="close" @tap="closeEvent">×</view>
			<view class="infoList" style="padding-top: 160upx;">
				<view class="infoItem">
					<view class="left">学历：</view>
					<view class="right">
						<picker class="pickerStyle" @change="bindChangeEdu" :value="edu_index" :range="edu_array">
						    <view class="picker">
						      {{edu_array[edu_index]}}
							  <!-- {{edu}} -->
						    </view>
						</picker>

					</view>
				</view>
				
				<view class="infoItem">
					<view class="left">年龄：</view>
					<view class="right">
						<picker class="pickerStyle" @change="bindChangeAge" :value="age_index" :range="age_array">
						    <view class="picker">
						      {{age_array[age_index]}}
							  <!-- {{age}} -->
						    </view>
						</picker>
						
						<!-- <radio-group @change="radioChangeEdu">
							<label v-for="(item, index) in itemsEdu" :key="item.value">
								<view><radio :value="item.value" :checked="item.checked" /></view>
								<view>{{ item.name }}</view>
							</label>
						</radio-group> -->
					</view>
				</view>
				<view class="infoItem" style="border: none;">
					<view class="left">家乡地区:</view>
					<view class="right">
						<radio-group @change="radioChangeAbroadHome">
							<label v-for="(item, index) in itemsAbroadHome" :key="item.value">
								<view><radio :value="item.value" :checked="item.checked" /></view>
								<view>{{ item.name }}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="infoItem" v-if="abroadHome == 1">
					<view class="left"></view>
					<view class="right">
						<input type="text" v-model="hometown" />
						<!-- <text>老家是哪里</text> -->
					</view>
				</view>
				<view class="infoItem" v-if="abroadHome == 0">
					<view class="left"></view>
					<view class="right">
						<picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem" class="pickerStyle">
						    <view class="picker">
						      {{region[0]}} {{region[1]}} {{region[2]}}
						    </view>
						</picker>
					</view>
				</view>
				<view class="infoItem" style="border:none">
					<view class="left">工作地区:</view>
					<view class="right">
						<radio-group @change="radioChangeAbroad">
							<label v-for="(item, index) in itemsAbroad" :key="item.value">
								<view><radio :value="item.value" :checked="item.checked" /></view>
								<view>{{ item.name }}</view>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="infoItem" v-if="abroad == 1">
					<view class="left"></view>
					<view class="right">
						<input type="text" v-model="workArea" />
					</view>
				</view>
				<view class="infoItem" v-if="abroad == 0">
					<view class="left"></view>
					<view class="right">
						<!-- <input type="text" v-model="workArea" /> -->
						<picker mode="region" @change="bindRegionWorkChange" :value="regionwork" :custom-item="customItem" class="pickerStyle">
						    <view class="picker">
						      {{regionwork[0]}} {{regionwork[1]}} {{regionwork[2]}}
						    </view>
						  </picker>
					</view>
				</view>
				
			</view>
			<view class="actionBox"><view class="btn" @tap="submitEvent">搜索</view></view>
		</view>
		<view class="xqlist" v-if="loginState">
			<listitem v-for="items in rwlist" :key="items.id" :info="items"></listitem>
		</view>
		<view v-if="isEmpty == 1"><nodata wordinfo="没有数据哦" type="1"></nodata></view>
		<view v-if="isEnd == true"><endLine></endLine></view>
		<view class="returnDefault" v-if="tsEvent == 'filter'" @tap="reloadDefault">
			<image src="../../static/return.png" mode=""></image>
			<view class="txt">刷新默认列表</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataStep:20,
				isEmpty: 0,
				isEnd: false,
				rwlist:[
					
				],
				nodatalist:[],
				searchTxt:'',
				loginState:true,
				showType:false,
				tsEvent:'default', // 点击触发了分类搜索   default为普通列表   filter为筛选列表
				edu: '',
				edu_index:0,
				edu_array:[
					'不限','博士','硕士','本科','专科','高中或职专','初中及以下'
				],
				age: '',
				age_index:0,
				age_array:[
					'不限','25岁以下','25-29岁','30-34岁','35-39岁','40及以上'
				],
				abroad:2, // 工作区域是否海外
				abroadHome:2,  // 生活区域是否海外
				region: ['北京市','',''],//生活区域
				regionwork: ['北京市','',''],//工作区域
				customItem: '全部',
				hometown:'',
				workArea:'',
				itemsAbroad:[
					{
						value:'0',
						name:'国内',
						checked:false
					},
					{
						value:'1',
						name:'海外',
						checked:false
					}
				],
				itemsAbroadHome:[
					{
						value:'0',
						name:'国内',
						checked:false
					},
					{
						value:'1',
						name:'海外',
						checked:false
					}
				]
			}
		},
		onLoad:function(options){
			this.init()
		},
		onShareAppMessage: function() {
			
		},
		onReachBottom: async function() {
			let params = {
				from: this.rwlist.length + 1,
				count: this.dataStep
			};
			if (this.isEnd !== true) {
				this.renderList(this.rwlist.length + 1, this.dataStep);
			}
		},
		methods: {
			closeEvent(){
				this.showType = false;
			},
			searchEvent(){
				console.log(this.searchTxt);
				if(this.searchTxt == ''){
					uni.showToast({
						title:'请输入查询编号',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'/pages/search/search?keyword='+this.searchTxt
					})
				}
			},
			typeSearchEvent(){
				this.showType = true;
			},
			reloadDefault(){
				uni.reLaunch ({
					url:'/pages/xqlist/xqlist'
				})
			}, 
			async init(){
				this.renderList(1, this.dataStep);
			},
			bindChangeEdu:function(e){
				this.edu_index = e.detail.value;
			},
			bindChangeAge:function(e){
				this.age_index = e.detail.value;
				// this.age = this.age_array[e.detail.value];
			},
			radioChangeAbroad: function(evt) {
				console.log(evt.target.value)
				for (let i = 0; i < this.itemsAbroad.length; i++) {
					if (this.itemsAbroad[i].value === evt.target.value) {
						this.current = i;
						this.abroad = evt.target.value;
						console.log('this_abroad is'+this.abroad);
						break;
					}
				}
			},
			radioChangeAbroadHome: function(evt) {
				console.log(evt.target.value)
				for (let i = 0; i < this.itemsAbroadHome.length; i++) {
					if (this.itemsAbroadHome[i].value === evt.target.value) {
						this.current = i;
						this.abroadHome = evt.target.value;
						console.log('this_abroad is'+this.abroadHome);
						break;
					}
				}
			},
			bindRegionChange: function (e) {
			    console.log('picker发送选择改变，携带值为', e.detail.value);
				this.region = e.detail.value;
				console.log(this.region)
			},	
			bindRegionWorkChange: function (e) {
			    console.log('picker发送选择改变，携带值为', e.detail.value);
				this.regionwork = e.detail.value;
				console.log(this.regionwork)
			},
			strReplace:function(strrep){
				//筛选条件过滤字符串
				var okstr = strrep.replace(/,全部/g, "");
				okstr = okstr.replace(/全部/g, "");
				okstr = okstr.replace(/不限/g, "");
				okstr = okstr.replace(/,,/g, "");
				return okstr
			},
			strundefined:function(obj){
				console.log(obj)
				if(obj.abroad == 2){
					delete obj.abroad
				}
				if(obj.abroadHome == 2){
					delete obj.abroadHome
				}
				if(obj.age == ""){
					delete obj.age
				}
				if(obj.education == ""){
					delete obj.education
				}
				if(obj.hometown == undefined || obj.hometown == ""){
					delete obj.hometown
				}
				if(obj.workArea == undefined || obj.workArea == ""){
					delete obj.workArea
				}
				return obj
			},
			filterParams:function(){
				// 过滤条件筛选参数
				var hometown,workArea;
				if(this.abroad == 0 || this.abroad == '0'){
					// 工作地非海外
					workArea = this.strReplace(this.regionwork.join(','));
				}
				if(this.abroad == 1 || this.abroad == '1'){
					// 工作地是海外
					workArea = this.workArea
				}
				if(this.abroadHome == 0 || this.abroadHome == '0'){
					// 家乡非海外
					hometown = this.strReplace(this.region.join(','));
				}
				if(this.abroadHome == 1 || this.abroadHome == '1'){
					// 家乡是海外
					hometown = this.hometown;
				}
				var paramsObj ={
					education:this.strReplace(this.edu_array[this.edu_index]),
					age:this.strReplace(this.age_array[this.age_index]),
					abroad:this.abroad, // 工作区域是否海外
					abroadHome:this.abroadHome,  // 生活区域是否海外
					hometown,
					workArea
				}
				var otherParam = this.strundefined(paramsObj);
				console.log(otherParam);
				return otherParam;
			},
			submitEvent:async function(){
				
				var param = {
					from:1,
					count:this.dataStep
				}
				var otherParam = this.filterParams();
				var newObj = {};
				var params = Object.assign(newObj,param,otherParam);
				this.rwlist = [];
				this.showType = false;
				this.tsEvent = 'filter';
				await this.$api.showLoading(); // 显示loading
				var cjlist = await this.$api.getData(this.$api.webapi.memberList, params);
				await this.$api.hideLoading();
				if(cjlist.resultCode == 4001 || cjlist.resultCode == 4000){
					this.loginState = false;
				}else{
					this.loginState = true;
					if (cjlist.data.length == 0) {
						this.isEmpty = 1;
						this.isEnd = false;
						this.rwlist = cjlist.data;
					} else {
						this.isEmpty = 0;
						this.isEnd = cjlist.data.length < this.dataStep ? true : false;
						this.rwlist = this.rwlist.length == 0 ? cjlist.data : this.rwlist.concat(cjlist.data);
					}
				}
			},
			async renderList(from, count) {
				if(this.tsEvent == 'default'){
					var params = {
						from,
						count
					};
				}else{
					this.isEmpty = 0
					var param = {
						from,
						count
					}
					var otherParam = this.filterParams();
					var newObj = {};
					var params = Object.assign(newObj,param,otherParam);
				}
				await this.$api.showLoading(); // 显示loading
				var cjlist = await this.$api.getData(this.$api.webapi.memberList, params);
				await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
				console.log(cjlist)
				if(cjlist.resultCode == 4001 || cjlist.resultCode == 4000){
					this.loginState = false;
				}else{
					this.loginState = true;
					if (cjlist.data.length == 0) {
						this.isEmpty = 1;
						this.isEnd = false;
						this.rwlist = cjlist.data;
					} else {
						this.isEmpty = 0;
						this.isEnd = cjlist.data.length < this.dataStep ? true : false;
						this.rwlist = this.rwlist.length == 0 ? cjlist.data : this.rwlist.concat(cjlist.data);
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.xqlist{
	width:750upx;
	padding-top: 100upx;
}
.nologin{
	padding-top: 100upx;
	width: 750upx;
}
.pleaseLogin{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.returnDefault{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	border: 1upx solid #ff4443;
	border-radius: 10upx;
	width:280upx;
	height: 60upx;
	margin: 50upx auto;
	image{
		width:40upx;
		height:40upx;
		padding-left: 10upx;
	}
	.txt{
		font-size: 30upx;
		color: #ff4443;
		padding-left: 30upx;
		padding-right: 20upx;
	}
}
</style>
