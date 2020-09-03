var forcestopapp=function(appname){
    apppkg=app.getPackageName(appname)
    if(apppkg){
        var result=   shell("am force-stop "+apppkg,{adb:true,root:false})
        console.log("result:"+JSON.stringify(result))
    }
}

forcestopapp("快手极速版")