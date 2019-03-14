function loader(source) { //loader的参数 就是代码
    console.log('loader3');
    return source;
}
module.exports=loader;