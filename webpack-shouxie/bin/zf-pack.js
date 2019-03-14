#! /usr/bin/env node

//1) 需要找到当前执行目录的路径 拿到webpack.config.js

let path = require('path');
//config 配置文件
let config = require(path.resolve('webpack.config.js'));

let Compiler  = require('../lib/Compiler.js');
let compiler = new Compiler(config);

//标识运行编译
compiler.run();