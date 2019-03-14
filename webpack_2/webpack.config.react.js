let path = require('path');
let webpack =require('webpack');
module.exports= {
    mode:'development',
    entry: {
        // test: './src/test.js'
        react:['react','react-dom'] //打包react 和react-dom
    },
    output:{
        filename:'_dll_[name].js', //产生的文件名
        path:path.resolve(__dirname,'dist'),
        library: "_dll_[name]" , //将打包的文件赋值给变量
        libraryTarget: "var"  //用何种方法声明该变量 （var commonjs this umd 。。。）
    },
    plugins:[
       new webpack.DllPlugin({
           name:'_dll_[name]',
           path:path.resolve(__dirname,'dist','manifest.json') //生成插件清单
       })
    ]

}