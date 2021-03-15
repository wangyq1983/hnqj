
<template>
	<view>
		<view class="pageTitle">个人信息</view>
		<view class="infoList">
			<view class="infoItem">
				<view class="left">性别:</view>
				<view class="right">
					<radio-group @change="radioChangeSex">
						<label v-for="(item, index) in itemsSex" :key="item.value">
							<view><radio :value="item.value" :checked="item.checked" /></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group>
					<text>*必填</text>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">出生年月:</view>
				<view class="right">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" fields="month" @change="bindDateChange" class="pickerStyle">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<text>*必填</text>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">身高:</view>
				<view class="right">
					<input type="text" style="width:180upx" v-model="shengao" />
					厘米
				</view>
			</view>
			<view class="infoItem">
				<view class="left">体重:</view>
				<view class="right">
					<input type="text" style="width:180upx" v-model="tizhong" />
					公斤
				</view>
			</view>
			<view class="infoItem">
				<view class="left">属相星座:</view>
				<view class="right">
					<input type="text" style="width:180upx" v-model="sxxz" />
					<text>例：属猪金牛座</text>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">学历：</view>
				<view class="right">
					<picker class="pickerStyle" @change="bindChangeEdu" :value="edu_index" :range="edu_array">
					    <view class="picker">
					      <!-- {{edu_array[edu_index]}} -->
						  {{edu?edu:edu_array[edu_index]}}
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
			<view class="infoItem">
				<view class="left">工作:</view>
				<view class="right">
					<input type="text" style="width:180upx" v-model="job" />
					<text>例如：国企、老师、私企</text>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">年收入:</view>
				<view class="right">
					<input type="text" style="width:180upx" v-model="income" @blur="checkmoney" />
					<text>万元（年收入）</text>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">是否有房:</view>
				<view class="right">
					<picker class="pickerStyle" @change="bindChangeHouse" :value="house_index" :range="house_array">
					    <view class="picker">
					      <!-- {{edu_array[edu_index]}} -->
						  {{house_array[house_index]}}
					    </view>
					</picker>
					<!-- <radio-group @change="radioChangeHouse">
						<label v-for="(item, index) in itemsHouse" :key="item.value">
							<view><radio :value="item.value" :checked="item.checked" /></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group> -->
				</view>
			</view>
			<view class="newinfoItem">
				<view class="title">
					<view class="infoItem">
						<view class="left1">
							房屋描述:
						</view>
					</view>
				</view>
				<view class="con">
					<textarea placeholder="房子信息描述" v-model="houseTxt"></textarea>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">是否有车:</view>
				<view class="right">
					<radio-group @change="radioChangeCar">
						<label v-for="(item, index) in itemsCar" :key="item.value">
							<view><radio :value="item.value" :checked="item.checked" /></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="newinfoItem">
				<view class="title">
					<view class="infoItem">
						<view class="left1">
							车辆描述:
						</view>
					</view>
				</view>
				<view class="con">
					<textarea placeholder="车辆描述" v-model="carTxt"></textarea>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">家乡地区是否海外:</view>
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
				<view class="left">家乡地区:</view>
				<view class="right">
					<input type="text" v-model="hometown" />
					<!-- <text>老家是哪里</text> -->
				</view>
			</view>
			<view class="infoItem" v-if="abroadHome == 0">
				<view class="left">家乡地区:</view>
				<view class="right">
					<picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem" class="pickerStyle">
					    <view class="picker">
					      {{region[0]}} {{region[1]}} {{region[2]}}
					    </view>
					</picker>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">工作地区是否海外:</view>
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
				<view class="left">工作地区:</view>
				<view class="right">
					<input type="text" v-model="workArea" />
				</view>
			</view>
			<view class="infoItem" v-if="abroad == 0">
				<view class="left">工作地区:</view>
				<view class="right">
					<!-- <input type="text" v-model="workArea" /> -->
					<picker mode="region" @change="bindRegionWorkChange" :value="regionwork" :custom-item="customItem" class="pickerStyle">
					    <view class="picker">
					      {{regionwork[0]}} {{regionwork[1]}} {{regionwork[2]}}
					    </view>
					  </picker>
				</view>
			</view>
			<view class="newinfoItem">
				<view class="title">
					<view class="infoItem">
						<view class="left1">父母情况:</view>
					</view>
				</view>
				<view class="con">
					<textarea v-model="parentsInfo"></textarea>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">独生子女:</view>
				<view class="right">
					<radio-group @change="radioChangeOnlyChild">
						<label v-for="(item, index) in itemsOnlyChild" :key="item.value">
							<view><radio :value="item.value" :checked="item.checked" /></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="newinfoItem">
				<view class="title">
					<view class="infoItem">
						<view class="left1">家庭成员:</view>
					</view>
				</view>
				<view class="con">
					<textarea v-model="family" placeholder="例如兄弟姐妹信息"></textarea>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">婚姻情况:</view>
				<view class="right">
					<picker class="pickerStyle" @change="bindChangeMarriage" :value="marriage_index" :range="marriage_array">
					    <view class="picker">
					      <!-- {{edu_array[edu_index]}} -->
						  {{marriage_array[marriage_index]}}
					    </view>
					</picker>
					
					<!-- <radio-group @change="radioChangeMarriage">
						<label v-for="(item, index) in itemsMarriage" :key="item.value">
							<view><radio :value="item.value" :checked="item.checked" /></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group> -->
					
				</view>
			</view>
			<view class="newinfoItem">
				<view class="title">
					<view class="infoItem">
						<view class="left">补充说明:</view>
					</view>
				</view>
				<view class="con">
					<textarea v-model="marriageTxt" placeholder="婚姻情况补充说明"></textarea>
				</view>
			</view>
			<view class="newinfoItem">
				<view class="title">
					<view class="infoItem">
						<view class="left1">个人介绍:</view>
					</view>
				</view>
				<view class="con">
					<textarea v-model="introduction" placeholder="个人优缺点"></textarea>
				</view>
			</view>
			<view class="newinfoItem">
				<view class="title">
					<view class="infoItem">
						<view class="left1">备注:</view>
					</view>
				</view>
				<view class="con">
					<textarea v-model="requirement" placeholder="备注"></textarea>
				</view>
			</view>
			
			<view class="imageArea" v-if="imglist.length > 0">
				<view class="bg-img" v-for="(item, index) in imglist" :key="index">
					<image :src="item" mode="aspectFill" :data-index="index" @tap="preview"></image>
					<view class="delimg" @tap = 'delimg' :data-fileid = "item">
						×
					</view>
				</view>
				<!-- <view v-for="items in imglist" :key = "items" class="imgwarp">
					<image :src="items" mode="aspectFit"></image>
					<view class="delimg" @tap = 'delimg' :data-fileid = "items">
						×
					</view>
				</view> -->
			</view>
			<view class="infoItem">
				<view class="left">传照片：</view>
				<view class="right">
					<view class="uploadimg" @tap="uploadImgalbum">+</view>
					<text>上传1-3张全身或半身照</text>
				</view>
				<helang-compress ref="helangCompress"></helang-compress>
			</view>
			<view class="infoItem">
				<view class="left">照片公开:</view>
				<view class="right">
					<radio-group @change="radioChangePhotoPublic">
						<label v-for="(item, index) in itemsPhotoPublic" :key="item.value">
							<view><radio :value="item.value" :checked="item.checked" /></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="infoItem">
				<view class="left">信息公开:</view>
				<view class="right">
					<radio-group @change="radioChangeInfoPublic">
						<label v-for="(item, index) in itemsInfoPublic" :key="item.value">
							<view><radio :value="item.value" :checked="item.checked" /></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="actionBox"><view class="btn" @tap="submitEvent">确认提交</view></view>
		</view>
	</view>
</template>

<script>
import helangCompress from '../../components/helang-compress/helang-compress';
export default {
	components: {
		helangCompress
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			id:null,
			number:'',
			isEdit:false,
			sex: '',
			itemsSex: [
				{
					value: '1',
					name: '男',
					checked: false
				},
				{
					value: '2',
					name: '女',
					checked: false
				}
			],
			edu: '',
			edu1:'',
			edu_index:2,
			edu_array:[
				'博士','硕士','本科','专科','高中或职专','初中及以下'
			],
			itemsEdu: [
				{
					value: '博士',
					name: '博士',
					checked: false
				},
				{
					value: '硕士',
					name: '硕士',
					checked: false
				},
				{
					value: '本科',
					name: '本科',
					checked: false
				},
				{
					value: '专科',
					name: '专科',
					checked: false
				},
				{
					value: '高中或职专',
					name: '高中或职专',
					checked: false
				},
				{
					value: '初中及以下',
					name: '初中及以下',
					checked: false
				}
			],
			house_array:['无房','有房无贷款','有房有贷款'],
			house_index:0,
			itemsHouse:[
				{
					value:'0',
					name:'无房',
					checked:false
				},
				{
					value:'1',
					name:'有房无贷款',
					checked:false
				},
				{
					value:'2',
					name:'有房有贷款',
					checked:false
				}
			],
			itemsCar:[
				{
					value:'0',
					name:'无车',
					checked:false
				},
				{
					value:'1',
					name:'有车',
					checked:false
				}
			],
			itemsAbroad:[
				{
					value:'0',
					name:'国内',
					checked:true
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
					checked:true
				},
				{
					value:'1',
					name:'海外',
					checked:false
				}
			],
			itemsOnlyChild:[
				{
					value:'1',
					name:'是',
					checked:false
				},
				{
					value:'2',
					name:'非',
					checked:false
				}
			],
			marriage_index:0,
			marriage_array:['未婚','离异无子女','离异有子女自己抚养','离异有子女对方抚养'],
			itemsMarriage:[
				{
					value:'0',
					name:'未婚',
					checked:false
				},
				{
					value:'1',
					name:'离异无孩子',
					checked:false
				},
				{
					value:'2',
					name:'离异有孩子',
					checked:false
				}
			],
			itemsPhotoPublic:[
				{
					value:'0',
					name:'不公开',
					checked:false
				},
				{
					value:'1',
					name:'公开',
					checked:false
				},
			],
			itemsInfoPublic:[
				{
					value:'0',
					name:'不公开',
					checked:false
				},
				{
					value:'1',
					name:'公开',
					checked:false
				}
			],
			date: currentDate,
			shengao: '',
			tizhong: '',
			sxxz: '',
			job:'',
			income:'',
			house:'',
			houseTxt:'',
			car:'',
			carTxt:'',
			hometown:'',
			workArea:'',
			parentsInfo:'',
			onlyChild:'',
			family:'',
			marriage:'',
			marriageTxt:'',
			introduction:'',
			requirement:'',
			photoPublic:'',
			state:0,
			infoLock:0,
			imglist: [],
			compressPaths: [],
			paths: [],
			curindex:0,
			filelist:[],
			abroad:0, // 工作区域是否海外
			abroadHome:0,  // 生活区域是否海外
			region: ['北京市','',''],  //生活区域
			regionwork: ['北京市','',''], //工作区域
			customItem: '全部',
			infoPublic:''// 公开资料
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	onLoad:function(option){
		this.init()
	},
	
	methods: {
		async init(){
			await this.$api.showLoading(); // 显示loading
			var searchRes = await this.$api.getData(this.$api.webapi.memberInfo);
			await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
			if(searchRes.resultCode == 0){
				var arr = Object.keys(searchRes.data);
				if(arr.length == 0){
					this.isEdit = false;
				}else{
					this.isEdit = true;
					var oldData = searchRes.data;
				  //this.initItem(this.itemsSex,this.sex);
					this.id = oldData.id;
					this.number = oldData.number;
					this.sex = oldData.gender;
					this.edu = oldData.education;
					this.car = oldData.car;
					this.onlyChild = oldData.onlyChild;
					this.abroad = oldData.abroad;
					this.abroadHome = oldData.abroadHome;
					this.photoPublic = oldData.photoPublic;
					this.infoPublic = oldData.infoPublic;
					// console.log('----------------------------------------------------------------------------------------')
					// console.log('工作地 abroad')
					// console.log(this.abroad)
					// console.log('----------------------------------------------------------------------------------------')
					if(this.abroad == 0 || this.abroad == '0' || this.abroad == undefined){
						// 工作地非海外
						if(oldData.workArea !== undefined){
							this.regionwork = oldData.workArea.split(',');
						}
						console.log(this.regionwork)
					}
					if(this.abroadHome == 0 || this.abroadHome == '0' || this.abroadHome == undefined){
						if(oldData.hometown !== undefined){
							this.region = oldData.hometown.split(',');
						}
						console.log(this.region);
					}
					if(this.abroad == 1 || this.abroad == '1'){
						this.workArea = oldData.workArea;
					}
					if(this.abroadHome == 1 || this.abroadHome == '1'){
						this.hometown = oldData.hometown;
					}
					
					this.house = oldData.house;
					this.marriage = oldData.marriage;
					
					var valItem = [this.sex,this.car,this.onlyChild,this.photoPublic,this.abroadHome,this.abroad,this.infoPublic];
					var arrItem = [this.itemsSex,this.itemsCar,this.itemsOnlyChild,this.itemsPhotoPublic,this.itemsAbroadHome,this.itemsAbroad,this.itemsInfoPublic];
					
					var valItem1 = [this.house,this.marriage];
					
					this.house_index = this.house;
					this.marriage_index = this.marriage;
					
					
					//this.initItem(this.itemsSex,this.sex);
					
					for(var i = 0; i < valItem.length; i++){
						// 初始化 radio 的数据
						this.initItem(arrItem[i],valItem[i]);
					}
					
					
					
					this.date = oldData.birthYear + '-' + (oldData.birthMonth?oldData.birthMonth:'');
					this.shengao = oldData.height;
					this.tizhong = oldData.bodyWeight;
					this.sxxz = oldData.zodiacConstellation;
					this.job = oldData.job;
					this.income = oldData.income;

					this.houseTxt = oldData.houseTxt;

					this.carTxt = oldData.carTxt;
					
					this.parentsInfo = oldData.parentsInfo;
					this.family = oldData.family;
					this.marriageTxt = oldData.marriageTxt;
					this.introduction = oldData.introduction;
					this.requirement = oldData.requirement;
					this.state = oldData.state;
					this.infoLock = oldData.infoLock;
					this.imglist = JSON.parse(oldData.imageList);
					
				}
			}
		},
		strReplace:function(strrep){
			//筛选条件过滤字符串
			var okstr = strrep.replace(/,全部/g, "");
			okstr = okstr.replace(/全部/g, "");
			okstr = okstr.replace(/不限/g, "");
			return okstr
		},
		delimg: function(e) {
			var delid = e.target.dataset.fileid;
			console.log(e);
			console.log(e.target.dataset.fileid);
			console.log(this.imglist);
			this.imglist = this.imglist.filter(item => item !== delid)
			console.log(this.imglist);
		},
		radioChangeSex: function(evt) {
			for (let i = 0; i < this.itemsSex.length; i++) {
				if (this.itemsSex[i].value === evt.target.value) {
					this.current = i;
					this.sex = evt.target.value;
					break;
				}
			}
		},
		initItem:function(arr,val){
			// 初始化单选框数据
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].value === String(val)) {
					arr[i].checked = true;
					break;
				}
			}
		},
		initItem1:function(arr,val){
			
		},
		checkmoney:function(e){
			console.log('blur event');
			console.log(e.detail.value);
			var reg = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;
			console.log(reg.test(e.detail.value))
			// return reg.test(e.detail.value)
			if(reg.test(e.detail.value) == true){
				
			}else{
				// console.log('sadsdfasdf')
				uni.showToast({
					title:'年收入请填写整数数字',
					icon:'none'
				})
			}
		},
		radioChangeOnlyChild: function(evt) {
			for (let i = 0; i < this.itemsOnlyChild.length; i++) {
				if (this.itemsOnlyChild[i].value === evt.target.value) {
					this.current = i;
					this.onlyChild = evt.target.value;
					break;
				}
			}
		},
		radioChangeHouse: function(evt) {
			for (let i = 0; i < this.itemsHouse.length; i++) {
				if (this.itemsHouse[i].value === evt.target.value) {
					this.current = i;
					this.house = evt.target.value;
					break;
				}
			}
		},
		radioChangeCar: function(evt) {
			for (let i = 0; i < this.itemsCar.length; i++) {
				if (this.itemsCar[i].value === evt.target.value) {
					this.current = i;
					this.car = evt.target.value;
					console.log('this_car is'+this.car)
					break;
				}
			}
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
		bindChangeEdu:function(e){
			this.edu = this.edu_array[e.detail.value];
		},
		bindChangeHouse:function(e){
			this.house_index = e.detail.value;
			this.house = e.detail.value;
		},
		bindChangeMarriage:function(e){
			this.marriage_index = e.detail.value;
			this.marriage = e.detail.value;
		},
		radioChangeEdu: function(evt) {
			for (let i = 0; i < this.itemsEdu.length; i++) {
				if (this.itemsEdu[i].value === evt.target.value) {
					this.current = i;
					this.edu = evt.target.value;
					break;
				}
			}
		},
		radioChangeMarriage: function(evt) {
			for (let i = 0; i < this.itemsMarriage.length; i++) {
				if (this.itemsMarriage[i].value === evt.target.value) {
					this.current = i;
					this.marriage = evt.target.value;
					break;
				}
			}
		},
		radioChangeInfoPublic:function(evt){
			for (let i = 0; i < this.itemsInfoPublic.length; i++) {
				if (this.itemsInfoPublic[i].value === evt.target.value) {
					this.current = i;
					this.infoPublic = evt.target.value;
					break;
				}
			}
		},
		radioChangePhotoPublic: function(evt) {
			for (let i = 0; i < this.itemsPhotoPublic.length; i++) {
				if (this.itemsPhotoPublic[i].value === evt.target.value) {
					this.current = i;
					this.photoPublic = evt.target.value;
					break;
				}
			}
		},
		bindDateChange: function(e) {
			//出生年月
			this.date = e.target.value;
		},
		getDate: function(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			// let day = date.getDate();

			if (type === 'start') {
				year = year - 100;
			} else if (type === 'end') {
				year = year;
			}
			month = month > 9 ? month : '0' + month;
			return `${year}-${month}`;
		},
		upimgfunc: function() {
			var that = this;
			wx.showActionSheet({
				itemList: ['直接拍照', '相册选取', '微信会话选取'],
				success(res) {
					console.log(res.tapIndex);
					if (res.tapIndex == 0) {
						console.log('直接拍照');
						that.uploadImgcamera();
					}
					if (res.tapIndex == 1) {
						console.log('相册选取');
						that.uploadImgalbum();
					}
					if (res.tapIndex == 2) {
						console.log('微信会话选取');
						that.uploadImgmsg();
					}
				},
				fail(res) {
					console.log(res.errMsg);
				}
			});
		},
		uploadImgalbum: function() {
			var _this = this;
			this.curindex = 0;
			uni.chooseImage({
				count: 3,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: res => {
					_this.paths = res.tempFilePaths;
					if (res.tempFiles.length > 0) {
						uni.showLoading({
							title: '上传中...'
						});

						let filePath = res.tempFiles[0].path;
						let filetype = filePath.split('.');
						let extname = Date.now() + Math.ceil(Math.random() * 100) + '.' + filetype.slice(-1);
						var imgtype = filetype.slice(-1);

						console.log('上传图片单张还是多张~~~~~~');
						console.log(res.tempFilePaths);

						if (res.tempFilePaths.length > 1) {
							// 批量图
							// var count = 0;
							// for(var i = 0 ; i<res.tempFilePaths.length; i++){
							// 	let filePath = res.tempFiles[i].path;
							// 	let filetype = filePath.split('.');
							// 	let extname = Date.now() + Math.ceil(Math.random() * 100) + '.' + filetype.slice(-1);
							// 	var imgtype = filetype.slice(-1);
							// 	_this.compress(filePath, extname, imgtype);
							// }
						
							_this.batchCompress(res.tempFilePaths, extname, imgtype);
						} else {
							// 单张图
							_this.compress(res.tempFilePaths, extname, imgtype);
						}
					}
				}
			});
		},

		cloudUpload(filePath, extname) {
			var _this = this;
			// 单张上传
			uniCloud.uploadFile({
				filePath: filePath,
				cloudPath: extname,
				fileType: 'image',
				async success(res) {
					console.log(res);
					let imageUrl = res.fileID; //云端返回的图片地址
					
					var params = {
						media_url:res.fileID,
						media_type:2
					}
					await _this.$api.showLoading(); // 显示loading
					let checkres = await _this.$api.postData(_this.$api.webapi.mediaCheck, params);
					await _this.$api.hideLoading();
					
					console.log(checkres)
					
					_this.imglist = _this.imglist.concat(res.fileID);
					console.log('this_imglist is =');
					console.log(_this.imglist);
					uniCloud.callFunction({
						//调用云端函数，把图片地址写入表
						name: 'addImage', //云函数名称
						data: {
							//提交给云端的数据
							imageUrl: imageUrl,
							createTime: Date.now()
						},
						success: res => {
							console.log('数据插入成功');
							console.log(res);
							uni.showToast({
								title: '上传成功',
								icon: 'none'
							});
						},
						fail: err => {
							console.log(err);
						},
						complete: () => {}
					});
				},
				fail(err) {
					console.log(err);
				},
				complete() {
					uni.hideLoading();
				}
			});
		},

		cloudUploads(filePath) { 
			console.log(filePath);
			var _this = this;
			// 多张上传
			var curindex = 0;
			this.filelist = [];
			this.filelist = filePath;
			
			function picUp(){
				var filePath = _this.filelist[curindex];
				var filetype = filePath.split('.');
				var extname = Date.now() + Math.ceil(Math.random() * 100) + '.' + filetype.slice(-1);
				var imgtype = filetype.slice(-1);
				uniCloud.uploadFile({
					filePath: filePath,
					cloudPath: extname,
					fileType: 'image',
					success(res) {
						console.log(res);
						let imageUrl = res.fileID; //云端返回的图片地址
						_this.imglist = _this.imglist.concat(res.fileID);
						console.log('this_imglist is =');
						console.log(_this.imglist);
						uniCloud.callFunction({
							//调用云端函数，把图片地址写入表
							name: 'addImage', //云函数名称
							data: {
								//提交给云端的数据
								imageUrl: imageUrl,
								createTime: Date.now()
							},
							success: res => {
								console.log('数据插入成功');
								console.log(res);
								if((curindex+1) < _this.filelist.length){
									curindex++;
									picUp();
								}else{
									uni.showToast({
										title: '上传成功',
										icon: 'none'
									});
								}
								
							},
							fail: err => {
								console.log(err);
							},
							complete: () => {}
						});
					},
					fail(err) {
						console.log(err);
					},
					complete() {
						uni.hideLoading();
					}
				});
			}
			
			
			picUp();
			
			
		},
		
		// 单张压缩
		compress(paths, extname, imgtype) {
			uni.showLoading({
				title: '压缩中',
				mask: true
			});

			this.$refs.helangCompress
				.compress({
					src: paths[0],
					maxSize: 750,
					fileType: imgtype,
					quality: 0.95,
					minSize: 640
				})
				.then(res => {
					uni.hideLoading();
					uni.showToast({
						title: '压缩成功',
						icon: 'success'
					});
					this.compressPaths = this.compressPaths.concat([res]);					
					this.cloudUpload(res, extname);
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: '压缩失败',
						icon: 'none'
					});
				});
		},
		// 批量压缩
		batchCompress(paths, extname, imgtype) {
			this.$refs.helangCompress
				.batchCompress({
					batchSrc: paths,
					maxSize: 750,
					fileType: imgtype,
					quality: 0.95,
					minSize: 640,
					progress: res => {
						uni.showLoading({
							title: `进度:${res.done + res.fail}/${res.count}`
						});
						console.log(res);
					}
				})
				.then(res => {
					uni.hideLoading();
					uni.showToast({
						title: '压缩完成',
						icon: 'success'
					});
					// this.compressPaths = res;
					console.log('批量压缩返回图片 ================= ');
					console.log(res);

					this.compressPaths = this.compressPaths.concat(res);

					this.cloudUploads(res);
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: '压缩失败',
						icon: 'none'
					});
				});
		},
		preview(e) {
			const index = e.currentTarget.dataset.index;
			uni.previewImage({
				current: this.imglist[index],
				urls: this.imglist
			});
		},
		
		submitSuccess(){
			setTimeout(function(){
				uni.reLaunch({
					url:'/pages/my/my'
				})
			},1500)
		},
		
		submitEvent: async function() {
			var that = this;
			console.log(this.sex);
			console.log(this.date)
			console.log(this.region);
			console.log(this.regionwork);
			if(this.sex == '' || this.sex == undefined || this.sex == 'undefined' || this.date == ''){
				uni.showToast({
					title:'请必须填写性别以及年龄',
					icon:'none'
				})
			}else{
				var yearmonth = this.date.split('-');
				var birthYear = yearmonth[0];
				var birthMonth = yearmonth[1];
				for (let i = 0; i < this.itemsInfoPublic.length; i++) {
					if (this.itemsInfoPublic[i].checked === true) {
						this.current = i;
						this.infopublic = this.itemsInfoPublic[i].value;
						break;
					}
				}
				var hometown,workArea;
				var that = this;
				function initParams(){
					if(that.abroad == 0 || that.abroad == '0' || that.abroad == undefined){
						// 工作地非海外
						if(that.workArea !== undefined){
							workArea = that.regionwork.join(',');
						}
						
					}
					if(that.abroad == 1 || that.abroad == '1'){
						// 工作地是海外
						workArea = that.workArea
					}
					if(that.abroadHome == 0 || that.abroadHome == '0' || that.abroadHome == undefined){
						// 家乡非海外
						if(that.hometown !== undefined){
							hometown = that.region.join(',');
						}
						
					}
					if(that.abroadHome == 1 || that.abroadHome == '1'){
						// 家乡是海外
						hometown = that.hometown;
					}
				} 
				initParams(); 
				if(this.isEdit == true){
					var params = {
						id:this.id,
						number:this.number,
						gender: this.sex?this.sex:'',
						birthYear: birthYear,
						birthMonth:birthMonth,
						zodiacConstellation:this.sxxz,
						height: this.shengao,
						bodyWeight: this.tizhong,
						education: this.edu,
						job:this.job,
						income:this.income,
						house:this.house,
						houseTxt:this.houseTxt,
						car:this.car,
						carTxt:this.carTxt,
						abroad:this.abroad,
						abroadHome:this.abroadHome,
						hometown:hometown,
						workArea:workArea,
						parentsInfo:this.parentsInfo,
						onlyChild:this.onlyChild,
						family:this.family,
						marriage:this.marriage,
						marriageTxt:this.marriageTxt,
						introduction:this.introduction,
						requirement:this.requirement,
						imageList:JSON.stringify(this.imglist),
						infoPublic:this.infoPublic,
						photoPublic:this.photoPublic
					};
					console.log(params);
					
					
					await this.$api.showLoading(); // 显示loading
					var memcreat = await this.$api.postData(this.$api.webapi.memberUpdate, params);
					await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
					if (this.$api.reshook(memcreat, this.$mp.page.route)) {
						// this.createSuccess(memcreat,true); 
						console.log(memcreat);
						
						if(that.infoLock == 1){
							uni.showToast({
								title:'提交成功,后台审核通过后自动发布此信息',
								icon:'none',
								duration:1500
							})
						}else{
							uni.showToast({
								title:'提交成功',
								icon:'none'
							})
						}
						
						
						that.submitSuccess()
					}
					
				}else{
					var params = {
						gender: this.sex?this.sex:'',
						birthYear: birthYear,
						birthMonth:birthMonth,
						zodiacConstellation:this.sxxz,
						height: this.shengao,
						bodyWeight: this.tizhong,
						education: this.edu,
						job:this.job,
						income:this.income,
						house:this.house,
						houseTxt:this.houseTxt,
						car:this.car,
						carTxt:this.carTxt,
						abroad:this.abroad,
						abroadHome:this.abroadHome,
						hometown:hometown,
						workArea:workArea,
						parentsInfo:this.parentsInfo,
						onlyChild:this.onlyChild,
						family:this.family,
						marriage:this.marriage,
						marriageTxt:this.marriageTxt,
						introduction:this.introduction,
						requirement:this.requirement,
						imageList:JSON.stringify(this.imglist),
						infoPublic:this.infopublic,
						photoPublic:this.photoPublic
					};
					console.log(params);
					
					await this.$api.showLoading(); // 显示loading
					var memcreat = await this.$api.postData(this.$api.webapi.memberCreate, params);
					await this.$api.hideLoading(); // 等待请求数据成功后，隐藏loading
					if (this.$api.reshook(memcreat, this.$mp.page.route)) {
						// this.createSuccess(memcreat,true); 
						console.log(memcreat);
						
						if(that.infoLock == 1){
							uni.showToast({
								title:'提交成功,后台审核通过后自动发布此信息',
								icon:'none',
								duration:1500
							})
						}else{
							uni.showToast({
								title:'提交成功',
								icon:'none'
							})
						}
						
						
						that.submitSuccess()
					}
				}
			}
		}
	}
};

</script>

<style lang="scss">
	
	.infoList {
		width: 700upx;
		padding: 25upx;
		.infoItem {
			width: 660upx;
			display: flex;
			padding: 25upx 20upx;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1upx solid #eee;
			.left {
				width: 160upx;
				text-align: right;
				padding-right: 40upx;
				font-weight: bold;
			}
			.left1 {
				width: 200upx;
				text-align: left;
				padding-right: 40upx;
				font-weight: bold;
				padding-left: 20px;
			}
			.right {
				width: 500upx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				text {
					color: #999;
					font-size: 24upx;
					padding-left: 20upx;
				}
			}
		}
	}
	.newinfoItem{
			.title{
				width:100%;
				display: block;
				background: #ececec;
				box-sizing: border-box;
			}
			.con{
				width:100%;
				height:120px;
				display: block;
			}
		}
	.actionBox {
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 60upx;
		.btn {
			width: 320upx;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			background: #fb4446;
			border-radius: 10upx;
			color: #fff;
		}
	}
	.uploadimg {
		width: 100upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		background: #efefef;
		border: 2upx solid #999;
		border-radius: 6upx;
		font-size: 70upx;
		font-weight: bold;
		color: #999;
	}
	.imageArea {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		.imgwarp,
		.bg-img {
			width: 200upx;
			height: 290upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image {
				width: 200upx;
				height: 200upx;
			}
		}
		.delimg {
			width: 50upx;
			height: 50upx;
			line-height: 50upx;
			text-align: center;
			background: #fd4344;
			color: #fff;
			font-size: 38upx;
		}
	}
	radio-group {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
	label {
		margin-right: 50upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 10upx 0;
	}
	input {
		width:180upx;
		border: 2upx solid #999;
		height: 60upx;
	}
	textarea{
		border:2upx solid #999;
		width:100%;
		height:120px;
		box-sizing: border-box;
	}
	.pickerStyle{
		width:100%;
		height:36px;
		line-height: 36px;
		background: url(../../static/arraw.png) right no-repeat;
		background-size: 32upx 32upx;
	}
</style>