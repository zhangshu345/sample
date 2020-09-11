
function execappinvite(appname,channel){
    if(!appname){
        return false
    }
    channel=channel||"defualt"
    let appinvitecodeurl="https://gitee.com/zhangshu345012/sample/raw/v2/config/邀请配置/"+channel+"_appinvite.json"
    let res=httpget(appinvitecodeurl)
    if(res!=null){
        appconfig=JSON.parse(res)
        log(appconfig.appname)

        if(appconfig.appname!=null){
            log(appconfig.appname)
        }else{
            log(appname+"渠道:"+channel+"--邀请配置为空")
        }
    }
}


function httpget(url) {
    var r = http.get(url);
    if (r.statusCode == 200)
     { return r.body.string(); 
    } else { toastLog("五秒后重试");
    sleep(5000);  return "";}  
}

execappinvite(快手极速版)