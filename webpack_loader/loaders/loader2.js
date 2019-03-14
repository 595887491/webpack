function loader(source) { //loader的参数 就是代码
    console.log('loader2');
    return source;
}
module.exports=loader;