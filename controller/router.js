var file = require("../models");
var formidable = require("formidable");
var sd = require("silly-datetime");
var path = require("path");
var fs = require("fs");
exports.showIndex = function(req,res){
    file.AllDir(function(arr){
        res.render("index",{"dirnames":arr})
    })
}
exports.showDir = function(req,res,next){
    var dirName = req.params.dirName
    file.Allfiles(dirName,function(err,arr){
        if(err){
            next();
            console.log(err);
            return;
        }
        res.render("photos",{"dirname":dirName,"photos":arr})
    });
}
exports.upFiles = function(req,res){
    file.AllDir(function(arr){
        res.render("upfile",{"dirnames":arr})
    })
}

exports.upFilesOk = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./";
    form.multiples = true;
    /*    var files=[];
     form.on("file",function(name,file){
     files.push(file);
     })
     form.parse(req,function(err,fields,next){
     if(err){
     console.log(err);
     next();
     return;
     }
     var dirName = fields.dirname;
     for(var i = 0;i<files.length;i++){
     var extname = path.extname(files[i].name);
     var time = sd.format(new Date(),"YYYYMMDDHHmmss");
     var random = parseInt(Math.random()*1000)+999;
     var oldpath = files[i].path;
     var newpath = "./uploads/"+dirName+"/"+time+random+extname;
     fs.rename(oldpath,newpath,function(err){
     if(err){console.log("rename的错",err)}
     })
     }
     //console.log("dirname",dirName);
     res.redirect("/a");
     })*/
    form.parse(req,function(err,fields,files){
        if(err){console.log(err)};
        var dirName = fields.dirname;
        for(var i = 0;i<files.img.length;i++){
            var extname = path.extname(files.img[i].name);
            var time = sd.format(new Date(),"YYYYMMDDHHmmss");
            var random = parseInt(Math.random()*1000)+999;
            var oldpath = files.img[i].path;
            var newpath = "./uploads/"+dirName+"/"+time+random+extname;
            fs.rename(oldpath,newpath,function(err){
                if(err){console.log("rename的错",err)}
            })
        }
        res.redirect("/"+dirName);
    })

}