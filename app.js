const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser');
const keys = require("./config/keys");
const jwt = require("jsonwebtoken");
const autoIncrement = require('mongoose-auto-increment');
var cors = require('koa-cors');
//实例化对象
const app = new koa();
const router = new Router();
app.use(cors({
    origin: function(ctx) {
        // if (ctx.url === '/api/user/login') {
        //     return "*"; // 允许来自所有域名请求
        // }
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
//使用bodyparser中间件
app.use(bodyParser());

//获取数据库信息
const db = require('./config/keys').mongoURI;
//连接数据库
mongoose.set('useCreateIndex', true);
mongoose.connect(db,{ useNewUrlParser: true ,useUnifiedTopology: true} )
    .then(res => {
        console.log("mongodb connected")
    })
    .catch(err => {
        console.log(err);
    });
autoIncrement.initialize(mongoose.connection);

//全局拦截判断token
app.use(async(ctx, next) => {
    let url = ctx.request.url;
    let index=url.indexOf("?");
    url=url.slice(0,index);
    // 登录 不用检查
    let freeurl=["/api/users/login","/api/users/register","/api/users/head","/api/articles/find","/api/articles/findOne","/api/tags/all"];
    if (freeurl.indexOf(url)!=-1||ctx.request.method==="GET") {
        await next();
    }
    else {
        // 规定token写在header 的 'autohrization' 
        let token = ctx.request.headers["authorization"];
        if (!token) {
            ctx.body = {
                code: 500,
                message: '无权限'
            };
        } else {
            // 解码
            try {
                let payload = jwt.verify(token, keys.secretKey);
                if (payload) {
                    ctx.request.body.payload = payload;
                    await next();
                }

            } catch (err) {
                console.log(err);
                ctx.body = {
                    status: 500,
                    message: 'token异常'
                };
            }
        }
        // let { time, timeout } = payload;
        // let data = new Date().getTime();
        // if (data - time <= timeout) {
        //     // 未过期
        //     await next();
        // } else {
        //     //过期
        //     ctx.body = {
        //         status: 500,
        //         message: 'token 已过期'
        //     };
        // }
    }
})

//引入user接口
const users = require('./routes/api/users');
const articles= require("./routes/api/articles");
const tags=require("./routes/api/tags");
//配置路由地址,访问localhost:5000/api/users，就会进去users.js中寻找对应的接口
router.use("/api/users", users);
router.use("/api/articles", articles);
router.use("/api/tags",tags);
//配置路由
app.use(router.routes()).use(router.allowedMethods());


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on ${port}`)
})