//自带express

let express = require('express');
let webpack = require('webpack');

//中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.base.js');
let comipler = webpack(config);
app.use(middle(comipler)); //node server.js 启动

let app = express();

app.get('./api/user',(req,res)=>{
    res.json({name:'珠峰架构'})
});
app.listen(3000);