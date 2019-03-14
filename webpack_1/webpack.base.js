let Path= require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack= require('webpack');
//1) cleanWebpackPlugin 清除webpack已打包的文件（需要安装）
//2) copyWebpackPlugin  需要安装
//3) bannerPlugin 内置
module.exports={
    devServer: {
        port:5000,
        //1)重写的方式  把请求代理到express服务器上
        // proxy:{
        //     //'/api':'http://localhost:3000 //配置一个代理 解决跨域问题
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathReWirte:{'/api':''}
        //     }
        // }
        //2) 前端单纯的模拟数据
        // before(app) {
        //     app.get('/user',(req,res)=>{
        //         res.json({name:'珠峰架构'})
        //     })
        // }
        //3) 有服务端 不用代理来处理，能不能在服务端中启动webpack 端口用服务端端口
    },
    mode:'production',
    //多入口
    entry:{
        home:'./src/index.js',
    },
    output: {
        //[name] home ,other
        filename: "[name].js",
        path: Path.resolve(__dirname,'dist')
    },
    // 源码映射， 会单独生成一个sourcemap文件 出错了 会标识 当前报错的列和行 大而且全
    //1) devtool: "source-map", //增加映射文件 可以帮我们调试源代码
    //2) devtool: "eval-source-map", //不会产生单独的文件，显示可以显示行和列
    //3) devtool: "cheap-module-source-map", //增加映射文件 产生后可以保留起来
    //4) devtool: "cheap-module-eval-source-map",不会产生文件 集成在打包后的文件中 不会产生列
    devtool: "source-map", //增加映射文件 可以帮我们调试源代码 （常用1) 2)）
    resolve: { //解析 第三方包 common
        modules:[Path.resolve('node_modules')], //只在 node_modules目录下查找解析
        // alias: { //配置别名 直接去找bootstrap.css
        //     bootstrap:'bootstrap/dist/css/bootstrap.css'
        // }
        extensions:['.js','.css','.json','.vue'],//解析的顺序和格式
        mainFields:['style','main'], //入口的顺序
        mainFiles:['index'] //入口文件的名字，默认index.js
    },
    plugins: [
        new webpack.DefinePlugin({ //自定义插件
            DEV:JSON.stringify('production'),
            FLAG:'true',
            EXPRESSION:1+1
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            // filename:'home.html',
            filename:'index.html',
            // chunks:['home']
        }),
        //new CleanWebpackPlugin(), //打包前 删除dist文件夹
        // new CopyWebpackPlugin([  //拷贝插件 将制定的文件放入打包目录
        //     {form:'doc',to:'./'}
        // ]),
        //new webpack.BannerPlugin('make 2019 by lll')  //在打包的文件前面加上注释 文字（一般用于版权声明）
    ],
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },
    // watch: true, //更改文件后实时打包
    // watchOptions: {
    //     poll:1000, //每秒 问我1000次
    //     aggregateTimeout:500, //防抖 间隔500毫秒 打包一次
    //     ignored:/node_module/  //不需要监控哪个文件
    // }
}