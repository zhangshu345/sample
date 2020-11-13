engines.stopOther()
var runscriptIntent=function(apppkg,scriptsurl){
    let i = app.intent({
        packageName:apppkg,
        className:"com.hongshu.androidjs.external.open.RunIntentActivity",
           flags:["activity_new_task"],
        // data: "file:///sdcard/1.png"
        extras:{
            "source":2,
            "path":scriptsurl
            }
        }
    );
    context.startActivity(i);
}
appkg="com.xiaobai.bqcalendar"
scripturl="https://gitee.com/zhangshu345012/sample/raw/v2/script/快捷方式/系统快捷设置.js"
runscriptIntent(appkg,scripturl)
sleep(5000)
text("创意视频").findOne(5000).click()
