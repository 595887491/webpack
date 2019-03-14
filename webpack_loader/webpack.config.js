let path = require('path');
module.exports= {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:path.resolve(__dirname,'dist')
    },
    resolveLoader: { //解析loader
        modules:['node_modules',path.resolve(__dirname,'loaders')], //3)
        //2) alias: { //别名
        //     loader1:path.resolver(__dirname,'loader','loader1')
        // }
    },
    devtool: "source-map",
    module: {
        //loader的分类 pre在前面的  post在后面 normal在中间

        //loader的顺序 pre->normal-> inline-> post
        // rules: [ //loader的顺序问题 从右向左 从上到下
        //     // {
        //     //     test:/\.js$/,
        //     //     use:['loader3','loader2','loader1']
        //     //     //2) use:'loader1'
        //     //     //1) use:path.resolver(__dirname,'loader','loader1')
        //     // },
        //     {
        //         test:/\.js$/,
        //         use:{
        //             loader: "loader1"
        //         },
        //         enforce:'pre'
        //     },
        //     {
        //         test:/\.js$/,
        //         use:{
        //             loader: "loader2"
        //         },
        //         enforce:'post'
        //     },{
        //         test:/\.js$/,
        //         use:{
        //             loader: "loader3"
        //         },
        //     }
        // ]
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader: 'banner-loader',
                    options: {
                        text:'珠峰',
                        filename:path.resolve(__dirname,'banner.js')
                    }
                }
            }
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader: "babel-loader",
            //         options: {
            //             presets:[
            //                 '@babel/preset-env'
            //             ]
            //         }
            //     }
            // }
        ]
    }
}