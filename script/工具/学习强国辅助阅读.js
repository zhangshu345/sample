auto();
auto.waitFor()

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
var today_order=0
var today_share=0
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

var app_xiaobailing=function(){
    app_go_home(2)
    const cs=['推荐','竖','炫','窗','藏','靓','秀','美食']
    if(textclick(cs[randomint(0,cs.length)])){
        sleep(2000)
    }
    let n=1
    doactionmaxtime(function(){
        toastLog("查看"+10*n+"秒")
        n=n+1
    },360000,10000)
}
var app_article=function(){

    function isarticlebottom(){
        if(id("cn.xuexi.android:id/no_content_text").visibleToUser().findOne(300)){
            return true
        }
        if(textStartsWith("责任编辑").visibleToUser().findOne(300)){
            return true
        }
        if(text("暂无观点 快来发表观点").visibleToUser().exists()){
            log("存在 暂无观点")
     
            return true
         }
        return false
    }
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
                    if(hdcs>5||isarticlebottom()){
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
                         back()
                        return true
                    }
                },20000)
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
    app_go_home(3)
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
            if(currentPackage()!=apppkg){
                app.launch(apppkg)
            }
            ca=currentActivity()
            show("回到主页："+index+"--"+ca)
            if(ca==apphomeactivity||idoneexist(["cn.xuexi.android:id/comm_head_xuexi_mine"])){
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
            }else if(ca=="android.app.Dialog")
            {
                back()
                sleep(300)
            }else{
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

          app_xiaobailing()
 app_run()
   