//webpack是node.js 写出来的  需要node写法
let path = require('path'); //path是内置模块直接引入即可用
let HtmlWebpackPlugin = require('html-webpack-plugin'); //引入HtmlWebpackPlugin插件自动生成打包文件的html页面
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将所有css打包成一个文件
let OptimizeCss = require('optimize-css-assets-webpack-plugin');  //将打包的css文件压缩
let UglifyjsPlugin = require('uglifyjs-webpack-plugin');  //压缩js体积
let webpack = require('webpack');
module.exports= {
    devServer: {  //开发服务器的篇日志
       port:5000,  //端口
       progress:true, //打包进度条
       contentBase:'./build', //只想dist目录
       compress:true
    },
    // optimization:{ //优化项 压缩体积
    //     minimizer:[
    //         new UglifyjsPlugin({
    //             cache: true, //是否用缓存
    //             parallel: true, //是否并发打包（同时压缩多个）
    //             sourceMap: true //源码映射
    //         }),
    //         new OptimizeCss()
    //     ]
    // },
    mode:'development',//模式 默认两种 production生产环境（压缩）  development开发模式（不压缩）
    entry:'./src/index.js',//入口
    output:{
        //filename: "bundle.[hash:5].js", //打包后的文件名 文件名随机加入5位的hash戳，预防缓存
        filename: "bundle.js", //打包后的文件名
        path:path.resolve(__dirname,'build'),//路劲必须是一个绝对路劲 resolve()解析方法
       // publicPath:'http://www.baiodu.com.com' //引入资源前面都加上域名地址
    },
    plugins:[ //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html', //依赖的html的路径
            filename:'index.html',  //文件名
            minify:{  //html中的配置
                removeAttributeQuotes:true, //去掉html中的引号
                collapseWhitespace:true   //html显示一行
            },
            hash:true, //加入引入打包js路径加入hash戳
        }),
        new MiniCssExtractPlugin({
            filename:'css/main.css',
        }),
        new webpack.ProvidePlugin({ //在每个模块中注入$
            $:'jquery'
        })
    ],
    module:{ //模块
        rules: [
            //规则  css-loader  解析@import这种语法的
            //style-loader 他是把css插入到head标签中
            //loader特点  希望单一
            //loader用法 字符串只用一个loader
            //多个loader 需要[]
            //loader的顺序 默认是从右向左执行 从下往上执行
            //loader还可以写成 对象方式
            {  test:/\.html$/,  //在html中引入图片loader
                use:'html-withimg-loader'
            },
            {  test:/\.(png|jpg|gif)$/, //在css,js中引入图片loader
               use:{
                   loader: "url-loader",  //做一个限制当图片大于 200K 的时候用base64转化 ，否则产生真实的图片
                   options: {
                       // limit:200*1024,
                       limit:1,
                       outputPath:'/img/',  //打包到 img文件目录下
                       publicPath:'http://www.baiodu.com.com' //图片加上CDN路径
                   }
               }
            },

            // {test:/\.js$/,  //校验js代码 是否按照eslint规则编写
            //     use:{
            //         loader: "eslint-loader",
            //         options: {
            //             enforce:'pre'  //pre前面执行  post后面执行
            //         }
            //     }
            // },
            { test:/\.js$/,  //解析js es6 7 8 解析成es5
                use:{
                    loader: "babel-loader",
                    options: {  //用babel-loader 需要把es6-es5
                        presets:[
                            '@babel/preset-env',
                        ],
                        plugins:[
                            [
                                "@babel/plugin-proposal-decorators", //装饰器解析
                                { "legacy": true }],
                            [
                                "@babel/plugin-proposal-class-properties", //类解析
                                { "loose" : true }//宽松模式
                            ],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/
            },
            { test:/\.css$/, use:[  //处理css安装style-loader css-loader
                // {loader: "style-loader",  //插入到 style标签
                //     options: {
                //        insertAt:'top'  //将导入的css插入到顶部 这样原html中的css优先级就高于导入的css
                //     }
                // },
                    MiniCssExtractPlugin.loader,  //将样式抽离到link文件中去
                    'css-loader', // 解析路径
                    'postcss-loader',//给css加上兼容前缀
                ]
            },
            //处理less安装less less-loader  处理stylus安装stylus stylus-loader  处理sass安装node-sass sass-loader
            { test:/\.less$/, use:[
                    // {loader: "style-loader",  //插入到 style标签
                    //     options: {
                    //         insertAt:'top'  //将导入的css插入到顶部 这样原html中的css优先级就高于导入的css
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,  //将样式抽离到link文件中去
                    'css-loader', //解析@import
                    'postcss-loader',//给css加上兼容前缀
                    'less-loader' //解析less->css
                ]
            },

        ]
    }
}