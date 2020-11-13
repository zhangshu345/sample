// var host = "http://www.onenovel.top:8081";
var host = "http://192.168.3.2:8081";

function httppost(url,postdata){
    var res = http.post(url, postdata);
    var html = res.body.string();
     toastLog(html);

}

function insertone(){
    httppost(host+"/yuedu/api/insertone", {db:"yuedu",collect:"share",insertobj:"你好sss"})
}


function share(){
    var url = host+"/yuedu/api/share";
    r = http.post(url, {db: "yuedu",
    collect:"share",
    user: "2",
    app:"快手极速版",
    url:"http://www.qq.com",
    type:1
    });
    toastLog(r.body.string());
}

function getusershare(){
    var url = host+"/yuedu/api/getusershare";
    r = http.post(url, {
    db: "yuedu",
    collect:"share",
    user: "1",
    });
    toastLog(r.body.string());
}


function seeurl(){
    var url = host+"/yuedu/api/seeurl";
    r = http.post(url, {
    db: "yuedu",
    collect:"share",
    url: "http://www.qq.com",
    });
    toastLog(r.body.string());
}
// insertone()
// share()
// getusershare()
seeurl()