let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils'); //校验
let fs = require('fs');
function loader(source) { //this loaderContext
   let options = loaderUtils.getOptions(this);
   let cb = this.async();
   let schema = {
       type:'object',
       properties:{
           text:{
               type:'string',
           },
           filename:{
               type:'string'
           }
       }
   }
   validateOptions(schema,options,'banner-loader');
   if(options.filename) {
       fs.readFile(options.filename,'utf8',function (err,data) {
           cb(err,`/**${data}**/${source}`)
       })
   }else {
       cb (null,options.text);
   }
}
module.exports = loader;