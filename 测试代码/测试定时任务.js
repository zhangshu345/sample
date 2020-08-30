
settinguiurl="https://gitee.com/zhangshu345012/sample/raw/v2/script/快捷方式/系统快捷设置.js"
liburl="https://gitee.com/zhangshu345012/sample/raw/v2/base/allfunction2.js"
// Scripts.INSTANCE.runUrlScript(settinguiurl)
log(device)
for(i=0;i<10;i++){
    Scripts.INSTANCE.addDailyTask("测试定时",settinguiurl,2,17,37+i)
}
sleep(5000)
  Scripts.INSTANCE.delectAllTask()