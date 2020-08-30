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

var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/yuedulib.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
toastLog("公共函数实例化成功")
}else {
toastLog("公共函数实例化失败,程序返回")
}

// /*配置  放置在公有库初始化之后避免被公有库公用变量覆盖 */
var appname="学习强国"
var apppkg="cn.xuexi.android"
var apphomeactivity="com.jifen.open.framework.biz.main.MainActivity"
var appcleanactivity="com.xiaoqiao.qclean.base.view.guide.GuidePageViewActivity"
var applaunchactivity="com.alibaba.android.rimet.biz.SplashActivity"
var apploginactivity="com.alibaba.android.user.login.SignUpWithPwdActivity"
var apprewardactivity="com.alibaba.lightapp.runtime.activity.CommonWebViewActivity"
var apparticleactivity="com.alibaba.android.uc.base.navi.window2.Window2Activity"
var appvideoactivity="com.alibaba.android.uc.base.navi.window2.Window2Activity"
var tomoney=false  
var invite=false // 邀请
var logintype="weixin"  //登录使用微信
var onetime=30 // 一次的时间
var maxtime=60 //一天最长时间  
var minmoney=0.3 // 最小提现余额
var mintodaycoin=3000  //最小今天的赚的金币
var islogin=false
var onlyscript=true  //仅允许当前一个脚本运行 
// //关闭最新的app
var loopn=0
var lasttitle=""
var today_coin=上次今日金币(appname)
var today_order=getbooleanvalue(appname+"_order",false)

var 登录应用=function(name){
    app.launchApp(name)
}



//测试修改文件覆盖
toastLog("开始")
var app_run=function(){
    toastLog("开始运行")
登录应用(appname)
doactionmaxtime(function(){
    app_go_home(4)
    toastLog("等待进入学习强国主页,学习强国，学习富民，先富脑袋后福钱袋")
    ca=currentActivity()
    if(ca==apploginactivity){
        app_login()
    } else if(ca==apphomeactivity){
        return true
    }
},10000,2000)
//
    
    点击主页积分()
    app_video()
    app_article()
}

var videotitles=[]
var app_video=function(){
    app_go_home(4)
    doactionmaxnumber(function(){
        上滑()
        let no_title=id("cn.xuexi.android:id/general_card_title_id").visibleToUser().findOne(300)
        if(no_title){
            toastLog(no_title.text())
            if(videotitles.indexOf(no_title.text())>-1){
                上滑()
                sleep(1000)
            }else{
                videotitles.push(no_title.text())
                clicknode(no_title)
                sleep(3000)
                let c=12
                doactionmaxtime(function(){
                    sleepr(2000,4000)
                    c=c-1
                  toastLog("看视频中:"+c)
                  if(c==0){
                      return true
                  }
                },12000)
                if(text("点赞").visibleToUser().exists()){
                    textclick("点赞")
                    sleep(1000)
                    back()
                }
            }
        }else{
            sleep(1000)
            app_go_home(4)
        }
    },6)
}
var article_titles=[]
var app_article=function(){
    app_go_home(3)
    doactionmaxnumber(function(){
        上滑()
        let no_title=id("cn.xuexi.android:id/general_card_title_id").visibleToUser().findOne(300)
        if(no_title){
            toastLog(no_title.text())
            toastLog(JSON.stringify(article_titles))
            if(article_titles.indexOf(no_title.text())>-1){
                上滑()
                sleep(1000)
            }else{
                clicknode(no_title)
                sleep(3000)
                let radio=false
                article_titles.push(no_title.text())
                doactionmaxtime(function(){
                    if(!today_order){
                        if(textclick("订阅")){
                            today_order=true
                            spt.put(appname+"_order",true)
                        }
                    }
                    滑动(20,13,17,10,4,600,100);
                    sleepr(2500,4000)
                    if(text("点赞").visibleToUser().exists()){
                        textclick("点赞")
                        sleep(1000)
                        back()
                    }
                },20000)
            }
          
        }else{
            sleep(1000)
        }
     },6)
}


var 点击主页积分=function(){
    idclick("cn.xuexi.android:id/comm_head_xuexi_score")
    doactionmaxtime(function(){
        textContains("今日已累积").waitFor()
        let node=textContains("今日已累积").findOne();
        let txt=node.text()
        toastLog(txt)
        txt=txt.replace("今日已累积","").replace("积分","")
        let reward=parseInt(txt)
        log("今日积分:"+reward)
        if(reward>=30){

        }
        if(reward>=0){
            记录今日金币(appname,reward)
            return true;
        }
    },10000,1000)
}

var dati_today=function(){
    textclick("查看提示")

}

var app_go_home=function(index){
    try {
        index=index||3
        if(doactionmaxtime(function(){
            closeappundostate()
            if(isadviceactivity()>-1){
                seead()
            }
            ca=currentActivity()
            show("回到主页："+index+"--"+ca)
            if(ca==apphomeactivity||ca=="android.widget.FrameLayout"){
                sleep(500)
                if(index==1){
                    selectnavi(1)
                    return true
                }else if(index==2){
                        selectnavi(2)
                        return true
                }else if(index==3){
                        selectnavi(3)
                        return true
                }else if(index==4){
                       selectnavi(4)
                        return true
                }else{
                    return true
                }
            }else if(ca==apprewardactivity){
                back()
                sleep(1000)
            }else if(ca==apparticleactivity){
                back()
                sleep(1000)
            }
        },30000)){
            return true
        }else{
            app.launch(apppkg)
            sleep(3000)
            app_go_home(index)
        }
    } catch (error) {
        log(appname+"回到主页出错："+index+error)
    }
}

var selectnavi=function(index){
    show(appname+"选择导航:"+index)
    if(index==1){
        idclick("cn.xuexi.android:id/home_bottom_tab_button_message")
    }else if(index==2){
        idclick("cn.xuexi.android:id/home_bottom_tab_button_ding")
    }else if(index==3){
        idclick("cn.xuexi.android:id/home_bottom_tab_button_work")
    }else if(index==4){
        idclick("cn.xuexi.android:id/home_bottom_tab_button_contact")
    }else if(index==5){
        idclick("cn.xuexi.android:id/home_bottom_tab_button_mine")
    }
}

var app_login=function(){
    toastLog("请先登录后运行该辅助阅读，工具等待登录操作完成")
    doactionmaxtime(function(){
        if(currentActivity==apphomeactivity){
            return true
        }
    },300000)
}

        toastLog("总调度运行："+appname)
        if(!app.getPackageName(appname)){
            show("未找到指定应用:"+appname+"将自动查找应用并下载安装")

              downloadandinstallapp(appname,apppkg)
      
          }
        app_run()
   