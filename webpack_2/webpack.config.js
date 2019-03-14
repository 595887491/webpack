let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
// let Happypack =require('happypack');  //多线程打包
module.exports={
    optimization:{ //优化项
        splitChunks:{ //分割代码块
            cacheGroups:{  //缓存组
                common:{  //公共的模块
                    chunks:'initial',  //从入口处提取代码
                    minSize:0, //大于0字节
                    minChunks:2  //引用次数
                },
                vendor:{
                    priority:1, //权重高一点，相当于z-index
                    test:/node_modules/,  //从node_modules抽离出来
                    chunks:'initial',
                    minSize:0,
                    minChunks:2
                }
            }
        }
    },
    mode:'development',
    // entry:'./src/index.js',
    entry:{
        index:'./src/index.js',
        other:'./src/other.js'
    },
    devServer: {
        hot:true, //启用热更新
        port:3000,
        open:true, //自动打开浏览器
        contentBase:'./dist' //打包后的结果 放到dist目录
    },
    module: {
        noParse: /jquery/, //不去解析jquery中的依赖库
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/, //排除node_mo
                include: path.resolve('src'), //包含dist
                // use:'Happypack/loader?id=js' //多线程打包
                use:{
                    loader: "babel-loader", //解析js 的loader
                    options: {
                        presets:[ //预设
                            '@babel/preset-env',  //解析 es6语法
                            '@babel/preset-react'  //解析react 语法
                        ],
                        plugins:[
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                exclude: /node_modules/, //排除node_mo
                include: path.resolve('src'), //包含dist
                use:'Happypack/loader?id=css' //多线程打包
            }
        ]
    },
    output:{
        // filename:'bundle.js',
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins: [
        // new Happypack({
        //     id:'css',
        //     use:['style-loader','css-loader']
        // }),
        // new Happypack({
        //     id:'js',
        //     use:[{
        //         loader:'babel-loader',
        //         options:{
        //             presets:[
        //                 '@babel/preset-env',
        //                 '@babel/preset-react'
        //             ]}
        //     }]
        // }),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist','manifest.json')
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/monet/), //忽略掉locale文件
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new webpack.NamedModulesPlugin(),  //打印热更新的模块路劲
        new webpack.HotModuleReplacementPlugin() //热更新插件
    ]
}