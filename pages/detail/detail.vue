
<template>
	<view>
		<view class="pageTitle">个人信息</view>
		<view class="infoList">
			<view class="infoItem">
				<view class="left">性别:</view>
				<view class="right">
					女
				</view>
			</view>
			<view class="infoItem">
				<view class="left">出生年月:</view>
				<view class="right">
					1983-05
				</view>
			</view>
			<view class="infoItem">
				<view class="left">身高:</view>
				<view class="right">
					183
					厘米
				</view>
			</view>
			<view class="infoItem">
				<view class="left">体重:</view>
				<view class="right">
					76
					公斤
				</view>
			</view>
			<view class="infoItem">
				<view class="left">属相星座:</view>
				<view class="right">
					
					属猪金牛座
				</view>
			</view>
			<view class="infoItem">
				<view class="left">学历：</view>
				<view class="right">
					本科
				</view>
			</view>
			<view class="infoItem">
				<view class="left">工作:</view>
				<view class="right">
					国企
				</view>
			</view>
			<view class="infoItem">
				<view class="left">年收入:</view>
				<view class="right">
					12万
				</view>
			</view>
			<view class="infoItem">
				<view class="left">是否有房:</view>
				<view class="right">
					有房
				</view>
			</view>
			<view class="infoItem">
				<view class="left">房屋描述:</view>
				<view class="right">
					三室两厅，05年后的新房
				</view>
			</view>
			<view class="infoItem">
				<view class="left">是否有车:</view>
				<view class="right">
					有车
				</view>
			</view>
			<view class="infoItem">
				<view class="left">车辆描述:</view>
				<view class="right">
					凯迪拉克
				</view>
			</view>
			<view class="infoItem">
				<view class="left">家乡地区:</view>
				<view class="right">
					青岛
				</view>
			</view>
			<view class="infoItem">
				<view class="left">工作地区:</view>
				<view class="right">
					青岛
				</view>
			</view>
			<view class="infoItem">
				<view class="left">父母情况:</view>
				<view class="right">
					退休
				</view>
			</view>
			<view class="infoItem">
				<view class="left">独生子女:</view>
				<view class="right">
					是独生子女
				</view>
			</view>
			<view class="infoItem">
				<view class="left">家庭成员描述:</view>
				<view class="right">
					有弟弟，在读研
				</view>
			</view>
			<view class="infoItem">
				<view class="left">婚姻情况:</view>
				<view class="right">
					未婚
				</view>
			</view>
			<view class="infoItem">
				<view class="left">补充说明:</view>
				<view class="right">
					跟前男友同居过
				</view>
			</view>
			<view class="infoItem">
				<view class="left">个人介绍:</view>
				<view class="right">
					热情开朗大方
				</view>
			</view>
			<view class="infoItem">
				<view class="left">择偶要求:</view>
				<view class="right">
					身高165以上，体重50公斤左右，美丽善良，性格温柔，有稳定收入，有车房优先。会多种才艺音乐跳舞，会多种棋类，会陪我打游戏，不是购物狂
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
			sex: '',
			itemsSex: [
				{
					value: '男',
					name: '男',
					checked: false
				},
				{
					value: '女',
					name: '女',
					checked: true
				}
			],
			edu: '',
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
			itemsOnlyChild:[
				{
					value:'1',
					name:'是独生子女',
					checked:false
				},
				{
					value:'2',
					name:'非独生子女',
					checked:false
				}
			],
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
			filelist:[]
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
	methods: {
		
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
		radioChangeOnlyChild: function(evt) {
			for (let i = 0; i < this.itemsOnlyChild.length; i++) {
				if (this.itemsOnlyChild[i].value === evt.target.value) {
					this.current = i;
					this.sex = evt.target.value;
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
					break;
				}
			}
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
					this.edu = evt.target.value;
					break;
				}
			}
		},
		radioChangePhotoPublic: function(evt) {
			for (let i = 0; i < this.itemsPhotoPublic.length; i++) {
				if (this.itemsPhotoPublic[i].value === evt.target.value) {
					this.current = i;
					this.edu = evt.target.value;
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

		submitEvent: async function() {
			var params = {
				sex: this.sex,
				year: this.date,
				shengao: this.shengao,
				tizhong: this.tizhong,
				sxxz: this.sxxz,
				edu: this.edu,
				imglist: this.imglist
			};
			
			console.log(params);
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
	border:2upx solid #999
}
</style>
