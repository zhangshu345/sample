var host = "http://192.168.3.2:8081";


function httppost(url,postdata){
    var res = http.post(url, postdata);
    var html = res.body.string();
     toastLog(html);

}

function insertone(){
    httppost(host+"/yuedu/api/insertone", {db:"yuedu",collect:"share",insertobj:"你好"})
}


function share(){
    var url = host+"/yuedu/api/share";
    r = http.post(url, {db: "yuedu",
    collect:"share",
    user: "1",
    app:"快手极速版",
    url:"http://www.baidu.com",
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
// share()
getusershare()