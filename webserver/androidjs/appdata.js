function Appdata(){
    var MongoClient = require('mongodb').MongoClient;
    var mongodburl = "mongodb://localhost:27017/";

    this.insertone=function(respon,dbname,collectionname,insertobj){
        console.log("阅读数据插入开始");
        console.log("数据库："+dbname)
        console.log("集合:"+collectionname)
        console.log("insertobj:"+JSON.stringify(insertobj))
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).insertOne(insertobj, function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据插入失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true}))
                    console.log("阅读数据插入成功");
                }
            });
        });
    }

    this.insertmany=function(respon,dbname,collectionname,insertobj){
        console.log("阅读数据插入开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).insertMany(insertobj, function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据插入失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true,"num":res.insertedCount}))
                    console.log("阅读数据插入成功");
                }
          
               
            });
        });
    }

    this.find=function(respon,dbname,collectionname,findwhere){
        console.log("阅读数据查找开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).find(findwhere).toArray( function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据查找失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify(res))
                    console.log("阅读数据查找成功");
                }
            });
        });
    }


    this.updateone=function(respon,dbname,collectionname,updatewhere,updateobj){
        console.log("阅读数据更新开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).updateOne(updatewhere,updateobj, function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据更新失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true}))
                    console.log("阅读数据更新成功");
                }
          
               
            });
        });
    }

    this.updatemany=function(respon,dbname,collectionname,updatewhere,updateobj){
        console.log("阅读数据更新开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).updateMany(updatewhere,updateobj, function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据更新失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true,"num":res.result.nModified}))
                    console.log("阅读数据更新成功");
                }
          
               
            });
        });
    }

    this.deleteone=function(respon,dbname,collectionname,deletewhere){
        console.log("阅读数据插入开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).deleteOne(deletewhere, function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据插入失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true}))
                    console.log("阅读数据插入成功");
                }
            });
        });
    }

    this.deletemany=function(respon,dbname,collectionname,delectobj){
        console.log("阅读数据插入开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).deleteMany(insertobj, function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据插入失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true,"num":res.result.n}))
                    console.log("阅读数据插入成功");
                }

            });
        });
    }

    this.drop=function(respon,dbname,collectionname){
        console.log("阅读数据插入开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
           
            dbo.collection(collectionname).drop(function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据集合删除失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true}))
                    console.log("阅读数据集合删除成功");
                }

            });
        });
    }

    this.insertshare=function(respon,dbname,collectionname,username,ip,app,url,type){
        console.log("阅读数据插入开始");
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
                  var dbo = db.db(dbname);
            var myobj = { username: username, ip : ip ,app :app, url: url ,type:type };
            dbo.collection(collectionname).insertOne(myobj, function(err, res) {
                if (err) {
                    respon.end(JSON.stringify({"result":false}))
                    console.log("阅读数据插入失败");
                    throw err;
                }else{
                    respon.end(JSON.stringify({"result":true}))
                    console.log("阅读数据插入成功");
                }
          
               
            });
        });
    }
    this.getshare= function(respon,dbname,collectionname,username,ip,app,type){
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var whereStr = { "username":{$ne:username}, "ip" : {$ne:ip} ,app :app,"type":type };
            dbo.collection(collectionname).find(whereStr).toArray(function(err, res) {
                if (err) {throw err;
                }else{
                    respon.end(JSON.stringify(res))
                    console.log("阅读数据插入成功");
                }
            });
        });
    }
    

    this.getusershare= function(respon,dbname,collectname,username){
        console.log("阅读用户分享数据")
        console.log("db:"+dbname)
        console.log("collectname:"+collectname)
        MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbname);
            var whereStr = { "username":username};
            dbo.collection(collectname).find(whereStr).toArray(function(err, res) {
                if (err) {throw err;
                }else{
                    respon.end(JSON.stringify(res))
                    console.log("阅读用户分享数据获取");
                }
            });
        });
    }

    this.seeurl=async function(respon,dbname,collectionname,url){
        var db =null;
             db= await MongoClient.connect(mongodburl, { useNewUrlParser: true ,useUnifiedTopology: true })
            console.log("数据库已连接")
            var dbo =  db.db(dbname);
            var whereStr = { "url":url};
            var arr =await dbo.collection(collectionname).find(whereStr).toArray()
            console.log(arr);
            respon.end(JSON.stringify(arr))
    }

    this.addtask=async function(respon,dbname,collectname,username,taskname,app,rewardcoin,summary){
        
     }
    
    this.gettask=async function(respon,dbname,collectname,taskwhere){
       find(respon,dbname,collectname,taskwhere)
    }
}


module.exports = Appdata;