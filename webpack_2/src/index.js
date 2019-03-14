//webpack 引入react DllPlugin
import React from 'react';
import { render } from 'react-dom';

render(<h1>jsx</h1>,window.root);

// //webpack 引入外部插件IgnorePlugin
// import  $ from 'jquery';
// import moment from 'moment';
// //设置语言
//
// //手动引入所需要的语言
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn');
// let r = moment().endOf('day').fromNow(); //距离现在多少天
// console.log(r);


// //webpack自带优化
// import calc from './test';
// //import 在生产环境下（production） 会自动去除掉没用的代码
// //tree-shaking 会把没用到的代码 自动删除掉
// // es6模块会把结果放到defalut上 (let calc = require('./test');)
//
// //scope hosting作用域提升
// let a = 1;
// let b = 2;
// let c = 3;
// let d = a+b+c;
// console.log(d,'-------');//打包后只输出这一句结果。 因为webpack打包后会自动省略，简化代码
//
// console.log(calc.sum(1,2));

//抽离公共代码
import './a';
import './b';
console.log('index.js');

import $ from 'jquery';
console.log($);

//懒加载
let button = document.createElement('button');
button.innerHTML='hello';
button.addEventListener('click',function () {
    console.log('click');
    //es6 草案中的语法 jsonp实现动态加载文件 懒加载的应用
    import('./source.js').then(data=>{
        console.log(data.default);
    })
})

document.body.appendChild(button);

//热更新
import str from './source';
console.log(str);
if(module.hot) {
    module.hot.accept('./source',()=>{
        let str = require('./source')
        console.log(str);
    })
}