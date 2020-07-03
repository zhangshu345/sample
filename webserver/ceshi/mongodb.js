var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://zhangshuhong888.iask.in:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hongshuyuedu");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});