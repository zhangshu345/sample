//想看自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
auto.waitFor()
auto.setMode("normal")
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var 数据库= storages.create("hongshuyuedujihe");
var apppackage="com.xiangkan.android"
var appname="想看"
var date=new Date()
var today=function(){
    return date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate()
}
var starttime=date.getTime()
var islogin=true





if(!getPackageName("想看")){
    downloadandinstallapp("快手极速版")
    islogin=false
}

firstrunapp("快手极速版")

if(今日签到()){
    快手极速签到()
}
快手极速视频滑动操作()



