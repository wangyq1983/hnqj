import store from '@/store'
// 正式服务器
// var webhost = "https://task.vsclouds.com/";

// 开发服务器
// var webhost = "http://192.168.3.86:8081/";

// 开发服务器
//var webhost = "http://2378qm9101.51vip.biz/";  //tbl临时地址
//var webhost = "https://jielongtest.vsclouds.com/ceshi/";
// abroad   abroadHome   infoPublic

var webhost = "https://qingjie.vsclouds.com/qingjie/";
// 接口列表
var webapi = {
	//会员与微信用户绑定接口 post
	memberBind:webhost + 'member/number/bind',
	
	//会员资料创建 post
	memberCreate:webhost + 'member/create',
	
	//会员资料编辑接口 post
	memberUpdate:webhost + 'member/update',
	
	//会员查询自己资料详情接口 get
	memberInfo:webhost + 'member/info/detail/self',
	
	//根据编号查询 get eg:member/info/detail?number=A001
	memberInfoNum:webhost + 'member/info/detail',
	
	//会员列表查询 异性 get eg:member/single/info/list?from=1&count=10   from 从1开始
	memberList:webhost + 'member/single/info/list',
	
	//照片查看申请审核接口
	imgapply:webhost + 'member/picture/apply/check',
	
	// 牵线申请同意接口
	qianxianApply: webhost + 'member/introduce/apply/check',
	
	// 被动方同意接口
	agreeApply:webhost + 'member/introduce/apply/agree',
	
	//图片内容检查
	mediaCheck:webhost + 'media/check/url',
	
	//分组列表
	groupList:webhost + 'member/group/list',
	
	//获取分组要求码
	groupCode:webhost + 'member/group/code',
	
	//请求加入分组
	groupJoin:webhost + 'member/group/join', 
	
	// 退出分组
	groupQuit:webhost + 'member/group/quit',
	//
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
	//userInfo: webhost + "weixin/mp/common/user/info",
	userInfo: webhost + "common/c/user/info",
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

//时间是否超时
const timelock = (timedata) => {
	
} 


// 获取用户信息
const getUserinfo = async() => {
	// 获取用户信息
	var userRes = await getData(webapi.userInfo);
	if (reshook(userRes)) {
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
// 上传中
const uploading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '上传中...',
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
	if (code == 0 || code==4000 ) {
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
	uploading,
	hideLoading,
	getUserinfo,
	trim,
	timelock
}
