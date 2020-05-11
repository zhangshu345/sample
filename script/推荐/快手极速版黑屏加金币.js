auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
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
var 快手极速首次协议同意并继续id ="com.kuaishou.nebula:id/positive" //  text 同意并继续 点击 
var 快手极速首次立即领取id="com.kuaishou.nebula:id/negative"   //text 立即领取  点击之后 选择登陆 选择 微信登录吧 
var 快手极速登录微信登录按钮id="com.kuaishou.nebula:id/wechat_login_view" //
var 快手极速一键登录按钮id="com.kuaishou.nebula:id/btn_onekey_login" //本机一键登录
var 快手极速协议勾选框id="com.kuaishou.nebula:id/cb_verify_service_line"  // 勾选上就是同意
var 快手极速微信登录显示标题id="com.kuaishou.nebula:id/qm"   //显示登录app 的名称 这里是快手极速版   当前活动 com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI
var 快手极速微信确认登录按钮id="com.tencent.mm:id/d17"  //确认登录  包名是com.tencent.mm  "com.kuaishou.nebula:id/wechat_login_view"
var 快手极速微信关闭按钮id="android:id/text1"  //关闭 
var 快手极速弹窗文本集合=["同意并继续","立即领取","我知道了","点击重播"]
var 快手极速弹窗id集合=["btn_privacy_action","close"]
var 快手极速首次登录点击id集合=[快手极速首次立即领取id,快手极速登录微信登录按钮id,快手极速微信确认登录按钮id]
var 快手极速摄像头图标id="com.kuaishou.nebula:id/home_shot_view"
var 快手极速左边框按钮id="com.kuaishou.nebula:id/left_btn"
var 快手极速左边作者名称id="com.kuaishou.nebula:id/tab_name"  //text 是作者的昵称
var 快手极速左边设置按钮id="com.kuaishou.nebula:id/tab_settings" //设置
var 快手极速首页="com.yxcorp.gifshow.HomeActivity" 
var 快手极速首页奖励悬浮="com.kuaishou.nebula:id/red_packet"   //悬浮按钮
var 快手极速版首页标志=[快手极速首页奖励悬浮,快手极速摄像头图标id]
/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var apppkg="com.kuaishou.nebula"
var appname="快手极速版"


if(!app.getPackageName(appname)){
    toastLog("未找到指定应用:"+appname+"将自动查找应用并下载安装")
    downloadandinstallapp(appname,apppkg)
}

app.launch(apppkg)

i=0
while(true){
    if(!idContains(apppkg).findOne(1000)){
        show(appname+"不在前台")
        app.launch(apppkg)
        sleep(3000)
     }
    if(idoneexist(快手极速版首页标志)){
        log("找到快手首页悬浮标记")
        //快手actionbar "com.kuaishou.nebula:id/action_bar"
        if(i%15==0){
            if(id("com.kuaishou.nebula:id/tabs").exists()){
                childs= id("com.kuaishou.nebula:id/tabs").findOne().children()
                  childs.forEach(e => {
                      log(e.className())
                      if(e.className()=="android.widget.LinearLayout"){
                          e.child(2).click()
                      }
                  });
              }
        }

   }else{
        log("没有找到快手首页悬浮标记")
       back()
       sleep(1000)
   }

    sleep(8000)
  //  id("af").findOne().scrollBackward()

 vp=  id("com.kuaishou.nebula:id/slide_play_view_pager").findOne()

  if(vp){
      log("找到快手滑动vp")
      vp.scrollForward()
  }
    i=i+1
    show("第"+i+"次上滑")


}

// vp=id("com.kuaishou.nebula:id/view_pager").findOne()  //快手极速版  这个是那个
//vp=classNameEndsWith("RecyclerView").scrollable().findOne()
      //vp.scrollBackward()