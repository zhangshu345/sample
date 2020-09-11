function appinvite(appname,channel){
    if(!appname){
        return false
    }
    channel=channel||"defualt"
    let appinvitecodeurl="https://gitee.com/zhangshu345012/sample/raw/v2/config/邀请配置/"+channel+"_appinvite.json"
    let res=httpget(appinvitecodeurl)
    if(res!=null){
        appconfigs=JSON.parse(res)
        if(appconfigs.length>0){
            appconfigs.forEach(config => {
                log(config.name)
                if(config.name==appname){
               
                        doappinvite(config)
                
                    return;
                }
            });
        }else{
            log(appname+"渠道:"+channel+"--邀请配置为空")
        }
    }
}
 
function doappinvite(inviteconfig){
    if(!inviteconfig){
        log("邀请配置为空")
        return false
    }
    if(inviteconfig.script){
        requireremoteurl(inviteconfig.script)
    }

}

//添加可以独立运行
function loadMyClassFile(yunurl){
    n = context.getCacheDir() + "/" + String((new Date).getTime()) + ".js"
    try {
        yunurl = yunurl || 'https://gitee.com/zhangshu345012/sample/raw/v2/script/应用/lib3.js'
        r = http.get(yunurl);
        if (r.statusCode == 200) {
            resutl = r.body.string()
        } else {
            resutl = ''
        }
    }catch (e) {
        resutl = ''
    }
    // log(resutl)
    files.write(n, resutl)
    return n
}

function requireremoteurl(url){
    n = loadMyClassFile(url)
    var func = require(n);
    classModule.func = func;
    files.remove(n)
}

function httpget(url) {
    var r = http.get(url);
    if (r.statusCode == 200)
     { return r.body.string(); 
    } else { toastLog("五秒后重试");
    sleep(5000);  return "";}  
}

appinvite("快手极速版")