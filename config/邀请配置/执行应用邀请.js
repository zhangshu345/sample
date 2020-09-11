
function execappinvite(appname,channel){
    if(!appname){
        return false
    }
    channel=channel||"defualt"
    let appinvitecodeurl="https://gitee.com/zhangshu345012/sample/raw/v2/config/邀请配置/"+channel+"_appinvite.json"
    let 
}


function httpget(url) {
    var r = http.get(url);
    if (r.statusCode == 200)
     { return r.body.string(); 
    } else { toastLog("五秒后重试");
    sleep(5000);  return "";}  
}
