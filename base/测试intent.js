var runscriptIntent=function(apppkg){
    let i = app.intent({
        packageName:apppkg,
        className:"com.hongshu.androidjs.external.open.RunIntentActivity",
           flags:["activity_new_task"],
        // data: "file:///sdcard/1.png"
        extras:{
            "source":2,
            "path":"https://gitee.com/zhangshu345012/sample/raw/v1/script/二维码/提醒.js"
            }
        }
    );
    context.startActivity(i);
}
appkg="com.dongdong.jiantie"

runscriptIntent(appkg)