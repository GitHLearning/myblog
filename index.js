var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

var app = express();
//设置模板目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为 ejs
app.set('views engine', 'ejs');

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//session 中间件
app.use(session({
	name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
	secert: config.session.secert, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
	cookie: {
		maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({ // 将 session 存储到 mongodb
		url: config.mongodb // mongodb 地址
	})
}));
app.use(flash()); //falsh中间件，用于显示通知

routes(app); //路由

app.listen(config.port, function(){
	console.log(`${pkg.name} listening on port ${config.port}`);
});