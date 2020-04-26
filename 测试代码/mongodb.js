var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://192.168.1.2:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  var dbase = db.db("hongshuyuedu");
  dbase.createCollection('site', function (err, res) {
      if (err) throw err;
      console.log("创建集合!");
      db.close();
  });
});