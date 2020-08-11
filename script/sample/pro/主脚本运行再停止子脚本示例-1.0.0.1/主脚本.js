try{
    var e = engines.execScriptFile("/sdcard/脚本/主脚本运行再停止子脚本示例/子脚本.js");
  }catch(err){
    toastLog("请确认子脚本路径，"+err)
    }
    sleep(200)
var df = dialogs.confirm("停止子脚本吗？")

if(df){
    log(e)
    toastLog("停止子脚本");
    e.getEngine().emit("xi", "你好")
    }
//else{exit()}//停止主进程
while(true){
    sleep(5000);
    toastLog("主进程运行中")
    }   
         