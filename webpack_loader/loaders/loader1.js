function loader(source) { //loader的参数 就是代码
    console.log('loader1');
    return source;
}
module.exports=loader;