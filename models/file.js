var fs = require("fs");
exports.AllDir = function(callback){
    fs.readdir("./uploads",function(err,data){
        if(err){return;}
        var arr = [];
        (function cb(i){
            if(i==data.length){
                callback(arr);
                return;
            }
            fs.stat("./uploads/"+data[i],function(err,data1){
                if(err){return;}
                if(data1.isDirectory()){
                    arr.push(data[i])
                }
                cb(i+1)
            })
        })(0)
    })
}
exports.Allfiles = function(dirName,callback){
    fs.readdir("./uploads/"+dirName,function(err,data){
        if(err){callback("文件夹不存在",null);return;}
        var arr = [];
        (function cb(i){
            if(i==data.length){
                callback(null,arr);
                return;
            }
            fs.stat("./uploads/"+dirName+"/"+data[i],function(err,data1){
                if(err){callback("图片不存在"+data[i],null);return}
                if(data1.isFile()){
                    arr.push(data[i])
                }
                cb(i+1)
            })
        })(0)
    })
}