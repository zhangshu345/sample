
settinguiurl="https://gitee.com/zhangshu345012/sample/raw/v2/script/快捷方式/系统快捷设置.js"
liburl="https://gitee.com/zhangshu345012/sample/raw/v2/base/allfunction2.js"
// com.hongshu.androidjs.core.script.Scripts.INSTANCE.runUrlScript(settinguiurl)
log(device)
for(i=0;i<10;i++){
    com.hongshu.androidjs.core.script.Scripts.INSTANCE.addDailyTask("测试定时",settinguiurl,2,17,37+i)
}
sleep(5000)
  com.hongshu.androidjs.core.script.Scripts.INSTANCE.delectAllTask()