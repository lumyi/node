
const express=require('express');
// 引入处理post数据的模块
const bodyParser=require('body-parser');
// 引入用户路由器
const userRouter=require('./routes/user.js');
//引入商品路由器
const productRouter=require('./routes/product.js');
// 引入ajax的demo路由
const demo=require('./routes/demo.js');
// 引入myPro路由
const myPro=require('./routes/myPro');

// 创建web服务器
var server=express();
server.listen(3000);

// 托管静态资源到public
server.use(express.static('./public'));
server.use(express.static('./ajax'));
server.use(express.static('./myPro'));

// 配置中间件
server.use(bodyParser.urlencoded({
    extended:false
}));

// 使用路由器管理路由
// 把用户路由器挂载到/user下  
server.use('/user',userRouter);
// 把商品路由器挂载到/product下  
server.use('/product',productRouter);
// 把demoajax路由挂载到/demo下
server.use('/demo',demo);
// 把myPro路由挂载到/myPro下
server.use('/myPro',myPro);







