require('@babel/polyfill');  //引入插件
let str = require('./a.js');

console.log(str); //zfpx

require('./index.css');

require('./index.less');

let fn = ()=>{
    console.log('log'); //log
}
fn();

@log
class A{
 a= 1;
}
let a =new A();
console.log(a.a);  //function A

function log(target) {
    console.log(target); //1
}

function  * gen(params) {
    yield  1;
}
console.log(gen().next());

'aaa'.includes('a'); //'aaa'包含a

console.log($); //引入jquery
$("div").css("border", "1px solid @000");

//weboack打包图片
//file-loader 默认会在内部生成一张图片到 build目录下
//生成的图片的名字返回回来
//1) 在js中引入图片
import './index.css';
import logo from './logo.png';
let image = new Image();
image.src= logo;
document.body.appendChild(image);
 //2) 在css中引入
//3) html中标签引入