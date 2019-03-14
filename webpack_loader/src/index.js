console.log('hello');
//-!不会让文件 再去通过pre + normal loader来处理
//! 没有normal
//!! 什么都不要 只要行内
let str = require('-!inline_loader!./a.js'); //将a.js 导入line-loader 行内loader

//loader 默认是由两部分组成 pitch normal