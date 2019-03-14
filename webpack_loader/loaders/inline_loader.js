function loader(source) { //loader的参数 就是代码
    console.log('inline-loader');
    return source;
}
module.exports=loader;