import store from '@/store'
// 正式服务器
// var webhost = "https://task.vsclouds.com/";

// 开发服务器
// var webhost = "http://192.168.3.9:8080/";

// 开发服务器
var webhost = "https://jielongtest.vsclouds.com/ceshi/";

// 接口列表
var webapi = {
	// 任务类别创建
	cTaskType: webhost + 'type/create',

	// 分享作业任务
	shareTask: webhost + 'public/share/jobs',
	
	// 微信登陆
	// #ifdef MP-WEIXIN
	uniLogin: webhost + "public/weixin/mp/common/user/login/wx",
	// #endif
	
	// qq登录
	// #ifdef MP-QQ
	uniLogin:webhost + "public/qq/mp/common/user/login",
	// #endif
	
	
	// 游客登录
	visitLogin: webhost + "public/weixin/mp/common/tourist/login/wx",
	
	// #ifdef MP-WEIXIN 
	// 获取用户信息
	userInfo: webhost + "weixin/mp/common/user/info",
	//userInfo: webhost + "common/c/user/info",
	// #endif
	
	// #ifdef APP-PLUS || H5
	userInfo: webhost + "common/c/user/info",
	// #endif
	
	// #ifdef MP-QQ
	// 获取QQ用户信息
	userInfo:webhost + "qq/mp/common/user/info",
	// #endif
		
	// 修改用户昵称
	editName: webhost + "common/c/user/update",
	
	// 清空用户信息
	userclear: webhost + 'user/experience/clear',
		
	// 获取验证码
	getVerCode: webhost + 'public/common/user/code',
	
	// 手机号登录
	phoneLogin: webhost + 'public/weixin/mp/common/user/login/phone'
	
}

// request get 请求
const getData = (url, param) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'GET',
			data: param,
			timeout: 12000,
			header: {
				"content-type": "application/json",
				token: uni.getStorageSync("token")
			},
			success(res) {
				console.log(res);
				if (res.statusCode == 200 || res.statusCode == 401) {
					resolve(res.data);
				} else {
					if (res.statusCode == 404) {
						uni.showToast({
							title: '访问资源错误',
							icon: 'none',
							duration: 1000
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						})
					}
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/rwlist/rwlist',
						})
					}, 1000)
				}
			},
			fail(err) {
				console.log(err);
				reject(err)
			}
		})
	})
}

// request post 请求
const postData = (url, param) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'POST',
			data: param,
			timeout: 12000,
			header: {
				// 'content-type': 'application/x-www-form-urlencoded' // 默认值
				"content-type": "application/json",
				token: uni.getStorageSync("token")
			},
			success(res) {
				console.log(res)
				resolve(res.data);
			},
			fail(err) {
				console.log(err);

				reject(err)
			}
		})
	})
}


// 字符型的true false转换布尔型
const strbool = (str) =>{
  if(str == 'true'){
    return true
  }
  if (str == 'false') {
    return false
  }
  if (str == 'undefined') {
    return true
  }
}


// 获取用户信息
const getUserinfo = async() => {
	// 获取用户信息
	var userRes = await getData(webapi.userInfo);

	// console.log('token is');
	// console.log(uni.getStorageSync("token"))
	// console.log('userinfo is')
	// console.log(userRes)
	if (reshook(userRes)) {
		
		// userRes字段  currentExperience  、  totalExperienceForCurrentLevel
		var expProgress = parseInt((userRes.data.userLevelInfo.currentExperience / userRes.data.userLevelInfo.totalExperienceForCurrentLevel)*100); 
		// console.log('====================================================================================================================================')
		// console.log('currentExperience');
		// console.log(userRes.data.userLevelInfo.currentExperience);
		// console.log('totalExperienceForCurrentLevel');
		// console.log(userRes.data.userLevelInfo.totalExperienceForCurrentLevel);
		// console.log('exp Progress is = ');
		// console.log(expProgress)
		// console.log('获取状态开始--------------------------------------------------------------------------------')
		// console.log(store.state)
		// console.log('获取状态结束--------------------------------------------------------------------------------')
		
		if(uni.getStorageSync('level')){
			if(userRes.data.userLevelInfo.level == uni.getStorageSync('level')){
				store.commit('levelUpdata', false)
			}else{
				store.commit('levelUpdata', true)
			}
		}
		
		if(uni.getStorageSync('honor')){
			if(expTitle(userRes.data.userLevelInfo.level) == uni.getStorageSync('honor')){
				store.commit('honorUpdata', false)
			}else{
				store.commit('honorUpdata', true)
			}
		}
		
		uni.setStorage({
			key: 'level',
			data: userRes.data.userLevelInfo.level
		});
		store.commit('changeLevel', userRes.data.userLevelInfo.level)
		
		uni.setStorage({
			key: 'honor',
			data:expTitle(userRes.data.userLevelInfo.level)
		})
		store.commit('changeHonor', expTitle(userRes.data.userLevelInfo.level))
		
		
		uni.setStorage({
			key: 'progress',
			data: expProgress
		})
		store.commit('changeProgress', expProgress)
		
		uni.setStorage({
			key: 'starNum',
			data: userRes.data.starSummary.currentCount
		});
		store.commit('changeStar', userRes.data.starSummary.currentCount)
		return true
	}else{
		uni.showModal({
		  title: '用户信息获取失败',
		  content: uni.getStorageSync('token')?uni.getStorageSync('token'):'no token',
		  success (res) {
		    if (res.confirm) {
				console.log(userRes)
		      console.log('用户点击确定')
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
		// uni.showToast({
		// 	title:'用户信息获取失败',
		// 	icon:'none',
		// 	duration:1500
		// })
		return false
	}
}

// loading加载提示
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...',
			mask: true,
			success(res) {
				// console.log('显示loading')
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

// 关闭loading
const hideLoading = () => {
	return new Promise((resolve) => {
		uni.hideLoading()
		// console.log('隐藏loading')
		resolve()
	})
}

const checkCode = (code) => {
	// console.log(code);
	if (code == 0 ) {
		return true;
	} else {
		return false
	}
}

function trim(str){ //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 }

const reshook = (res, path) => {
	if (checkCode(res.resultCode)) {
		return true
	} else {
		if(res.resultCode == 4001) {
			var data = {
				url: path
			}
			var origin = encodeData(data);
			console.log('/pages/login/login?' + origin)
			uni.redirectTo({
				url: '/pages/login/login?' + origin
			})
		}
		if(res.resultCode == 87014 || res.resultCode == 7001){
		    uni.showToast({
		      title: res.message,
		      icon:"none",
		      duration:1500
		    })
			if(res.resultCode == 87014){
				setTimeout(function(){
					uni.reLaunch({
						url:'/pages/rwlist/rwlist'
					})
				},1500)
				
			 }
		  }
	}
	console.log('reshook')
	console.log(res)
	console.log(path)
	console.log(this)
}

const encodeData = (datadetail) => {
	var dataparams = Object.keys(datadetail).map(function(key) {
		return encodeURIComponent(key) + "=" + encodeURIComponent(datadetail[key]);
	}).join("&");
	return dataparams
}


/** 
 * new Date() ---> 转化为 年 月 日 时 分 秒
 * let date = new Date();
 * date: 传入参数日期 Date
*/
// 时间

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime = (date) => {	
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-') 
}


export default {
	encodeData,
	getData,
	postData,
	webapi,
	reshook,
	showLoading,
	hideLoading,
	getUserinfo,
	trim
}
