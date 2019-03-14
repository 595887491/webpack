let fs = require('fs');
let path = require('path');
let babylon = require('babylon');
let t = require('@babel/types');
let traverse = require('@babel/traverse').default;
let generator = require('@babel/generator').default;
let  ejs = require('ejs');
//babylon 主要把源码转换成ast
//@babel/traverse
//@babel/types
//@babel/generator
class Compiler {
    constructor(config) {
        //entry output
        this.config = config;
        //需要保存入口文件的路径
        this.entryId; //'./src/index.js'
        //需要保存所有的模块依赖
        this.modules = {};
        this.entry = config.entry; //入口路径
        this.root = process.cwd();  //工作路径
    }
    getSource(modulePath) {
        let content =  fs.readFileSync(modulePath,'utf8');
        return content;
    }
    parse(source,parentPath) { //AST解析语法树
        let ast =babylon.parse(source);
        let dependencies = [];
        traverse(ast,{
            CallExpression(p) {
                let node =p.node;//对应节点
                if(node.callee.name  === 'require') {
                   node.callee.name = '__webpack_require__';
                   let moduleName = node.arguments[0].value; //去到模块的名字
                   moduleName = moduleName + (path.extname(moduleName)?'':'.js');
                   moduleName = './'+ path.join(parentPath,moduleName); //'src/a.js'
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        });
        let sourceCode = generator(ast).code;
        return {sourceCode, dependencies}
    }
    buildModule(modulePath,isEntry) {
        //拿到模块的内容
        let source = this.getSource(modulePath);
        //拿到模块的id modulePath  = modulePath - this.root  src/index.js
        let moduleName ='./'+ path.relative(this.root,modulePath);

        if(isEntry) {
            this.entryId = moduleName; //保存入口的名字
        }
        //解析需要把source源码进行改造 返回一个依赖列表
        let { sourceCode,dependencies } = this.parse(source,path.dirname(moduleName));
        //把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode;

        dependencies.forEach(dep => { //附模块的加载 递归加载
            this.buildModule(path.join(this.root,dep),false);
        })
    }
    emitFile() { //发射文件
        //用数据 渲染我们
        //拿到输出到哪个目录下  输出路径
        let main = path.join(this.config.output.path,this.config.output.filename);
        //模板路径
        let templateStr = this.getSource(path.join(__dirname,'main.ejs'));
        let code = ejs.render(templateStr,{entryId:this.entryId,modules:this.modules});
        this.assets = {}
        //资源中 路径对应的代码
        this.assets[main] =code;
        fs.writeFileSync(main,this.assets[main]);
    }
    run() {
        //执行 并且创建模块的依赖关系
        this.buildModule(path.resolve(this.root,this.entry),true);
        this.emitFile();
    }
}
module.exports= Compiler;