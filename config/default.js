module.exports = {
	port: 3000,//监听端口号
	session: {//express-session 配置信息
		secret: 'myblog',
		key: 'myblog',
    	maxAge: 2592000000
	},
	 mongodb: 'mongodb://localhost:27017/myblog'//mongodb 的地址，myblog 为 db 名
}