"ui";
var form = {
    isLongRead: false,
    isLongWatch: false
}
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="强国助手 V1.0.1"/>
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
        <ScrollView>
        <vertical>
        <frame height="40" gravity="center">
            <text text="*注意*" gravity="center" textSize="18sp" textColor="red" textStyle="bold"/>
        </frame>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="项目说明文档: (请留意新版本的发布)" textColor="#222222" textSize="14sp"/>
                <text autoLink="web" text="https://github.com/zhangshu345/LearnChinaHelper "/>
            </vertical>
            </ScrollView>
            <View bg="#f44336" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="1.首次安装请先开启无障碍服务和截图与允许通知权限" textColor="#222222" textSize="14sp"/>
                <text text="2.若未开启通知权限,首次使用建议打开↗的悬浮窗权限" textColor="#222222" textSize="14sp"/>
                <text text="3.开始运行前请先关闭学习强国,由脚本运行后自动启动" textColor="#222222" textSize="14sp"/>
                <text text="4.脚本执行过程中请勿操作手机" textColor="#222222" textSize="14sp"/>
            </vertical>
            </ScrollView>
            <View bg="#f44336" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="当前版本强国助手支持的功能包括：(以下任务预计花费7分钟)" textColor="#222222" textSize="14sp"/>
                <text text="阅读文章、视听学习、收藏、分享、订阅、评论、本地频道" textColor="#999999" textSize="14sp"/>
            </vertical>
            </ScrollView>
            <View bg="#4caf50" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="坚持把学习贯彻习近平总书记系列重要讲话精神作为重大政治任务，认真学习党的先进理论与指导思想，请勿利用本软件投机取巧." textColor="#222222"/>
            </vertical>
            </ScrollView>
            <View bg="#4caf50" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="是否执行文章学习时长任务：(预计最多花费12分钟)" textColor="#222222"/>
                <radiogroup id="long_read">
                        <radio id="yes_read"  text="是"></radio>
                        <radio  id="no_read" text="否" checked = "true"></radio>
                </radiogroup>
            </vertical>
            </ScrollView>
            <View bg="#2196f3" h="*" w="10"/>
        </card>
        <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical">
            <ScrollView>
            <vertical padding="18 8" h="auto">
                <text text="是否执行视听学习时长任务：(建议在wifi环境下执行，预计最多花费18分钟)" textColor="#222222"/>
                <radiogroup id="long_watch">
                        <radio id="yes_watch"  text="是"></radio>
                        <radio id="no_watch" text="否" checked = "true"></radio>
                </radiogroup>
            </vertical>
            </ScrollView>
            <View bg="#2196f3" h="*" w="10"/>
        </card>
        <linear gravity="center">
            <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
            <button id="stop" text="停止运行"  w="auto"/>
        </linear>
        <frame height="20" gravity="center">
            <text text="---------------------------------------------------------------------------------------------------------------------------------" gravity="center"/>
        </frame>
        <frame height="50" gravity="center">
            <text text="Copyright©2020 by Txy 一岸流年1998" gravity="center"/>
        </frame>
        </vertical>
        </ScrollView>
    </vertical>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("启动悬浮窗");
    menu.add("运行日志");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "启动悬浮窗":
            var intent = new Intent();
            intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION");
            app.startActivity(intent);
            break;
        case "运行日志":
            app.startActivity('console');
            break;
        case "关于":
            alert("关于", "强国助手 v1.0.5\n1.新增悬浮窗日志显示功能\n2.解决阅读时长任务的bug\n3.新增选项菜单");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

ui.yes_read.on("check",function(check){
    if(check){
        form.isLongRead= true;
    }
});
ui.no_read.on("check",function(check){
    if(check){
        form.isLongRead= false;
    }
});
ui.yes_watch.on("check",function(check){
    if(check){
        form.isLongWatch= true;
    }
});
ui.no_watch.on("check",function(check){
    if(check){
        form.isLongWatch= false;
    }
});
ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toastLog("请先开启无障碍服务！");
        return;
    }
    main();
});

ui.stop.on("click",function(){
    threads.shutDownAll();
    engines.stopAll();
    exit();
    toast("已终止执行脚本");
});

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
var scriptname="学习强国辅助阅读"
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
var today_order=getintvalue(appname+"_ordern",0)
var today_share=getbooleanvalue(appname+"_share",false)
var articlenumber=10
var videonumber=10
var radiostarttime=nowdate().getTime()
var article_titles=[]

var readedarticle=getstrvalue(appname+"_article","")
if(readedarticle!=""){
    let as=JSON.parse(readedarticle)
    log(JSON.stringify(as))
}


var  showstopfloaty=function(){
    gsfw=floaty.rawWindow(
              <text id="stop" w="auto" h="40"  textSize="14sp" textColor="#000000"  background="#1C86EE" >停止</text>
    );
    gsfw.setSize(90,90)
    gsfw.setPosition(0,device.height/2)
    gsfw.stop.on("click",function(){
           engines.stopAllAndToast()
     
    })
  }


var 登录应用=function(name){
    app.launchApp(name)
}

//测试修改文件覆盖
log("开始")
showstopfloaty()
var app_run=function(){
    登录应用(appname)
    let i=0
    doactionmaxtime(function(){
      app_go_home(4)
        toastLog("等待进入学习强国主页,学习强国，学习富民，先富脑袋后福钱袋")
        ca=currentActivity()
        if(ca==apploginactivity){
            app_login()
        } else if(ca==apphomeactivity||ca=="android.widget.FrameLayout"){
              toastLog("进入主页了")
            return true
        }
        i=i+1
         log("等待"+i)
},10000,2000)
//
    点击主页积分()
    app_radio()
    app_article()
    app_video()
}


//电台
var  app_radio=function(){
    app_go_home(5)
    sleep(2000)
    if(textclick("听原著")){
        sleep(2000)
        click(device.width/2,device.height/3)
        sleep(2000)
            if(textclick("全部播放")){
                sleep(2000)
                idclick("cn.xuexi.android:id/v_next")
                sleep(1000)
                idclick("cn.xuexi.android:id/btn_back")
                radiostarttime=nowdate().getTime()
                return true
            }else{
               app_go_home(5)
            }
        
    }
    if(textclick("听新闻广播")){
        sleep(2000)
       if( idclick("cn.xuexi.android:id/v_paused")){

       }
       if(id("cn.xuexi.android:id/v_playing").visibleToUser().exists()){
        radiostarttime=nowdate().getTime()
        return true
       }

    }
    if(textclick("听理论")){
        sleep(2000)
        click(device.width/2,device.height/3)

        if(textclick("全部播放")){
            sleep(2000)
            idclick("cn.xuexi.android:id/v_next")
            sleep(1000)
            idclick("cn.xuexi.android:id/btn_back")
            radiostarttime=nowdate().getTime()

            return true
        }else{
        
            app_go_home(5)
        }

    }
}
var app_radio_stop=function(){
    doactionmaxtime(function(){
        if(nowdate().getTime()-radiostarttime>300000){
            return true
        }
        toastLog("电台时间:"+(nowdate().getTime()-radiostarttime)/1000+"秒")
    },300000,3000)
 var radiofloaty=   packageName("cn.xuexi.android").className("android.widget.FrameLayout").clickable(true).depth(1).findOne(1000)
 if(radiofloaty){
    clicknode(radiofloaty)
    sleep(1000)
   if(packageName("cn.xuexi.android").className("android.widget.ImageView").clickable(true).depth(2).drawingOrder(6).findOne(1000).click()){
    log("关闭电台成功")
       return true
   }else{
       
   }
 }
 log("关闭电台失败")
 return false
}


var videotitles=[]
var app_video=function(){
    app_go_home(4)
    doactionmaxnumber(function(){
        上滑()
        let no_title=id("cn.xuexi.android:id/general_card_title_id").visibleToUser().findOne(300)
        if(no_title){
            toastLog(no_title.text())
            toastLog(JSON.stringify(videotitles))
            if(videotitles.indexOf(no_title.text())>-1){
                上滑()
                sleep(1000)
            }else{
                videotitles.push(no_title.text())
                clicknode(no_title)
                sleep(3000)
                let c=12
                doactionmaxtime(function(){
                    sleep(2000)
                    c=c-3
                  toastLog("看视频中:"+c)
                  if(!today_share){
                        
                  }
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
            
        }
    },videonumber)
}


var app_article=function(){
   let readnum=0;
    app_go_home(3)
    doactionmaxnumber(function(){
        滑动(20,13,17,10,10,600,500);
        let no_title=id("cn.xuexi.android:id/general_card_title_id").visibleToUser().findOne(300)
        if(no_title){
            toastLog(no_title.text())
            log(JSON.stringify(article_titles))
            if(article_titles.indexOf(no_title.text())>-1){
                log("已经阅读过了")
                滑动(20,13,17,10,10,600,500);
                sleep(1000)
            }else{
                clicknode(no_title)
                sleep(3000)
                let radio=false
                article_titles.push(no_title.text())
                let hdcs=0
                doactionmaxtime(function(){
                    if(today_order<5){
                        if(textclick("订阅")){
                            today_order=today_order+1
                            spt.put(appname+"_ordern",today_order)
                        }
                    }
                    滑动(20,13,17,10,4,600,500);
                    hdcs=hdcs+1
                    sleepr(1500,3000)
                    if(hdcs>8){
                        if(text("点赞").visibleToUser(true).exists()){
                            log("存在 点赞")
                            if(textclick("点赞",500)){
                                log("点赞成功")
                                sleep(1000)
                                back()
                                return true
                            }
                        }else{
                            log("不存在 点赞")
                        }
                        if(text("暂无观点 快来发表观点").visibleToUser().exists()){
                               log("存在 暂无观点")
                               back()
                               return true
                        }else{
                               log("不存在 暂无观点")
                        }
                    }
                },30000)
            }
        }else{
            sleep(1000)
        }
        if(readnum>=articlenumber){
            return true
        }
     },100)
}


var 点击主页积分=function(){
    idclick("cn.xuexi.android:id/comm_head_xuexi_score")
    doactionmaxtime(function(){
        textContains("今日已累积").waitFor()
        let node=textContains("今日已累积").findOne();
        let txt=node.text()
        log(txt)
        txt=txt.replace("今日已累积","").replace("积分","")
        let reward=parseInt(txt)
        log("今日积分:"+reward)
        if(reward>=30){
            log("积分大于30："+reward)
        }else{
            log("积分小于30："+reward)
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
            if(ca==apphomeactivity||ca=="android.widget.FrameLayout"||ca=="android.app.Dialog"){
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
                }else if(index==5){
                    selectnavi(5)
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

        toastLog("运行："+scriptname)
        if(!app.getPackageName(appname)){
            show("未找到指定应用:"+appname+"将自动查找应用并下载安装")

              downloadandinstallapp(appname,apppkg)
      
          }
        app_run()
   