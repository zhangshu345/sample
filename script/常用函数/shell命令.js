var enableshizuku=function(){
    try {
        if(!app.getPackageName("shizuku")){
            return false
        }
        apppkg=app.getPackageName("相册")
        if(apppkg){
            var result=   shell("am force-stop "+apppkg,{adb:true,root:false})
            console.log("result:"+JSON.stringify(result))
            return result.code==0
        }
    } catch (error) {
        log("shizuku 无法使用")
        return false
    }
}

function shellcmd(cmd){
    try {
        let re= shell(cmd,{adb:true,root:false})
        log(JSON.stringify(re))
        return re.code==0
    } catch (error) {
        return false
    }
}

console.log("shizuku 是否可用:"+enableshizuku())

// forcestopapp("相册")
// let pkg=app.getPackageName("拼多多")
// console.log("拼多多:"+pkg)
// log("结果："+shellcmd("am force-stop "+pkg))
// forcestopapp("支付宝")
