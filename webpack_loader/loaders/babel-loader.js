let babel = require('@babel/core');
let loaderUtils = require('loader-utils');
function loader(source) { //this loaderContext
    console.log(this.resourcePath.split('/').pop());
    let options = loaderUtils.getOptions(this);
    let cb =this.async(); //flag
    babel.transform(source,{
        ...options,
        sourceMap:true,
        filename:this.resourcePath.split('/').pop() //文件名
    },function (err,reslut) {
        cb(err,reslut.code,reslut.map); //异步
    })
}
module.exports = loader;

class Zfpx {
    constructor() {
        this.name = 'zfpx';
    }
    getName() {
        return this.name
    }
}
let zf = new Zfpx();
console.log(zf.getName());
