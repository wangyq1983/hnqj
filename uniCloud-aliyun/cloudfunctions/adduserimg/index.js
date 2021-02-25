'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('---云函数日志输出---')
	const collection = db.collection('userdb') // 获取表'unicloud-test'的集合对象

	//const res = await collection.limit(10).get() // 获取表中的10条数据，结果为json格式
	
	console.log(event);
	console.log(context);
	
	const addres = await collection.add(event);

	//console.log(res);
	console.log('---云函数日志输出结束---')
	return addres // 返回json给客户端
};