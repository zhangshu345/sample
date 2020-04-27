auto.waitFor()
auto.setMode("normal")
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/base/allfunction2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
show("公共函数实例化成功")
}
else {
show("公共函数实例化失败,程序返回")
}

/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var apppkg="com.kuaishou.nebula"
var appname="快手极速版"
var 强制关闭按钮文本集合=["强制停止","停止运行","强制关闭","强行停止","结束运行","确定"]
app.launcha

i=0
while(true){
    sleep(6000)
  //  id("af").findOne().scrollBackward()

 vp=  id("com.kuaishou.nebula:id/slide_play_view_pager").findOne()
// vp=id("com.kuaishou.nebula:id/view_pager").findOne()  //快手极速版  这个是那个
//vp=classNameEndsWith("RecyclerView").scrollable().findOne()
  if(vp){
      toastLog("找到快手滑动vp")
      //vp.scrollBackward()
      vp.scrollForward()
  }
    i=i+1
    toastLog("第"+i+"次上滑")
}