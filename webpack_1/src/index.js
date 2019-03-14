// let xhr =new XMLHttpRequest();
//
// //http:/localhost:5000 webpack-dev-server的服务-> 3000
// //http-proxy
// xhr.open('GET','/api/user',ture);
//
// xhr.onload = function () {
//     console.log(xhr.response);
// }
// xhr.send();

// import 'bootstrap';
// import './style' //不加后缀要配置
// console.log('撒大声地多sdsdsd1111111111111111');
//
// class Log{
//     constructor() {
//         console.log('出错了');
//     }
// }
// let log = new Log();
//
// console.log(log);

let url = '';
if(DEV == 'dev') {
    url='http://localhost:3000';
}else {
    url ='http://www.zhufengjiagou.cn';
}

console.log(url,'----------');
console.log(typeof FLAG);
console.log(EXPRESSION);