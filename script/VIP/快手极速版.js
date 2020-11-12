auto.waitFor()
auto.setMode("normal")
device.wakeUpIfNeeded()
function httpget(url) {
    var r = http.get(url);
       if (r.statusCode == 200) {
        return r.body.string()
    } else {
        toastLog("请检测网络是否畅通,五秒后再次尝试")
        sleep(5000)
        return httpget(url)
    }
}

//快手极速版自动刷金币  签到 和 滑块验证 引流 自动私信 评论 
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v2/script/VIP/yuedulib2.js"
var  公共函数文本=httpget(公共函数url)
if (公共函数文本 != "") {
eval(公共函数文本)
show("公共函数实例化成功")
}else{
show("公共函数实例化失败,程序返回")
}

/*---------------------------------lib-------------------------------*/
/*明明标准为 作者昵称 简称+app全拼 */
var apppkg="com.kuaishou.nebula"
var appname="快手极速版"
var apphomeactivity="com.yxcorp.gifshow.HomeActivity"
var appsignactivity="com.yxcorp.gifshow.webview.KwaiWebViewActivity" //金币展示页
var appliveactivity="com.yxcorp.gifshow.detail.PhotoDetailActivity"  //直播页
var invite=true
var tomoney=false
var onlyscript=true
var todaysign=今日签到(appname)
var coin=上次今日金币(appname)
var money=上次余额(appname)
var like=true
var minlike=3000000  //仅点赞百万喜欢的视频
var maxlike=10000000  //千万 超级热门 视频
var keepappnewer=true
var lastdesc=""
var loopn=今日滑动次数(appname)

/** 
 * 识别滑块位置
 * 
 * 传入值img，ratio
 * img为要识别的图片
 * ratio为识别图片的分辨率（暂时只可选择720或1080）
 * 
 * 返回值x
 * 识别出方块位置的左端横坐标
 */
function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else if (ratio==1440){
        log("分辨率2k")
        checknumber()
    }else{
        log("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);
    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x+65
                    }
                } catch (error) {
                    //出错
                    console.log("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        console.log("识别失败，错误原因：" + error);
    }
    return -1;
}

/*返回*/
function findMultiColorss(img,first,arr,option){
    var temp_img
    if (option.region) {
        temp_img = images.clip(img,option.region.x,option.region.y,option.region.width,option.region.height)
        for (let  img_height= 0; img_height < temp_img.getHeight()-165; img_height+=5) {
            for (let img_width = 0; img_width < temp_img.getWidth()-165; img_width+=5) {
                if (colors.equals(temp_img.pixel(img_width,img_height), first)) {
                    var flag=true
                    for (let index = 0; index < arr.length; index++) {
                        if ( ! colors.equals(temp_img.pixel(img_width+arr[index][0],img_height+arr[index][1]),arr[index][2])) {
                            flag=false
                        } 
                    }
                    if (flag) {
                        return {x:img_width+option.region.x,y:img_height+option.region.y}
                    }
                }
            }
        }    
    }
}

function checknumber() {
    var  ime = captureScreen();
    ime=images.cvtColor(ime,"BGR2GRAY",3)
    ff = images.threshold(ime,110,255,"BINARY")
    
    var dd= findMultiColorss(ff,"#000000",_G_arr0,{region:{x:820,y:550,width:550,height:650}})
    randomSwipe(300,1400,dd.x+85,1400)
    var err=text("请控制拼图块对齐缺口").findOne(3000)
    if (err) {
        var dd = idContains("reload").depth(24).findOne(1000)
        if (dd) {
            log("刷新滑块验证")
            dd.click()
            sleep(3000)
        }
    }
    return 
}

/*将当前截屏重置尺寸为1080
*/ 
function imgBy1080(){
    var img=captureScreen()
    return images.resize(img,[1080,device.height*1080/device.width])
}
var hk=0
var hkc=0
function 滑块验证尝试(){
        w=device.width
             hk=hk+1
            var c=0
            while(text("拖动滑块").exists()){
              clicktexts(["允许","确定"])
              show("快手滑块验证")
              c=c+1
              if(device.width<=720){
                  swipe(720, 645, w * 0.63, 650, random(1220, 1505)) 
              }else if(device.width<=1080){
                  swipe(125, 980, w * 0.62, 980, random(1220, 1505))
              }else{
                  swipe(135, 980, w * 0.63, 980, random(1220, 1505))
              }
              sleep(1000)
              if(idoneexist(快手极速版首页标志)){
                  hkc=hkc+1
                  show("滑块验证成功:"+hk+":"+hkc)
                  return
              }
            }
}

function 滑块验证精确() {
   show("当前宽 ："+device.width+":"+device.height)
      var y = 650
    while (true) {
        img = images.captureScreen();
        if (img) {
            log("截图成功。进行识别滑块！");
            break;
        } else {
            log('截图失败,重新截图');
        }
        clicktexts(["确定","允许"])
    }
    var x
    if(device.width<=720){
        x = discernSlidingblock(img,720)
    }else if(device.width==1080){
        x = discernSlidingblock(img,1080)
    }else if(device.width>1080){
        x = discernSlidingblock(imgBy1080,1080)
    }
    show("识别结果滑块X坐标：" + x);
    if (x > -1) {
        if(device.width<=720){
            randomSwipe(80, 650, x-10, 650)
        }else if(device.width==1080){
            randomSwipe(135, 980, x, 980)
        }else if(device.width>1080){
            randomSwipe(140,980,x,980)
        }
        //滑动完成
    } else {
       log("识别有误，请确认是否在滑块界面");
    }
}

var 滑块验证=function(){
    log("滑块验证开始")
    n_hkyz=0
    while(text("拖动滑块").findOne(100)){
        log("滑块验证")
       checkscreencapture()
         sleep(1000)
        滑块验证精确()
        n_hkyz= n_hkyz+1
        if( n_hkyz>3){
            滑块验证尝试()
        }
         sleep(1500)
    }
    log("滑块验证结束")
}

var 快手极速首次协议同意并继续id ="com.kuaishou.nebula:id/positive" //  text 同意并继续 点击 
var 快手极速首次立即领取id="com.kuaishou.nebula:id/negative"   //text 立即领取  点击之后 选择登陆 选择 微信登录吧 
var 快手极速登录微信登录按钮id="com.kuaishou.nebula:id/wechat_login_view" //
var 快手极速一键登录按钮id="com.kuaishou.nebula:id/btn_onekey_login" //本机一键登录
var 快手极速协议勾选框id="com.kuaishou.nebula:id/cb_verify_service_line"  // 勾选上就是同意
var 快手极速微信登录显示标题id="com.kuaishou.nebula:id/qm"   //显示登录app 的名称 这里是快手极速版   当前活动 com.tencent.mm.plugin.webview.ui.tools.SDKOAuthUI
var 快手极速微信确认登录按钮id="com.tencent.mm:id/d17"  //确认登录  包名是com.tencent.mm  "com.kuaishou.nebula:id/wechat_login_view"
var 快手极速微信关闭按钮id="android:id/text1"  //关闭 
var 快手极速弹窗文本集合=["同意并继续","立即领取","我知道了"] //,"点击重播"
var 快手极速弹窗id集合=["com.kuaishou.nebula:id/btn_privacy_action","com.kuaishou.nebula:id/close"]
var 快手极速首次登录点击id集合=[快手极速首次立即领取id,快手极速登录微信登录按钮id,快手极速微信确认登录按钮id]
var 快手极速摄像头图标id="com.kuaishou.nebula:id/home_shot_view"
var 快手极速左边框按钮id="com.kuaishou.nebula:id/left_btn"
var 快手极速左边作者名称id="com.kuaishou.nebula:id/tab_name"  //text 是作者的昵称
var 快手极速左边设置按钮id="com.kuaishou.nebula:id/tab_settings" //设置
var 快手极速版喜欢数量id="com.kuaishou.nebula:id/like_count_view" //获取喜欢数量
var 快手极速版喜欢按钮id="com.kuaishou.nebula:id/like_button"  // 
var 快手极速版评论数量id="com.kuaishou.nebula:id/comment_count_view"// 评论数量
var 快手极速版视频作者名id="com.kuaishou.nebula:id/user_name_text_view"  //作者用户名  @
var 快手极速版视频标题id="com.kuaishou.nebula:id/label"   //视频标题
var 快手极速版评论按钮id="com.kuaishou.nebula:id/comment_button" //评论数量
var 快手极速版首页顶部搜索按钮id="com.kuaishou.nebula:id/home_search_entrance" //搜索按钮id
var 快手极速首页="com.yxcorp.gifshow.HomeActivity" 
var 快手极速版首页奖励悬浮id="com.kuaishou.nebula:id/red_packet"   //悬浮按钮
var 快手极速版视频页奖励id="com.kuaishou.nebula:id/redFloat"  
var 快手极速版首页标志=[快手极速版首页奖励悬浮id,快手极速版喜欢按钮id,快手极速版评论按钮id,快手极速版评论数量id]

var 快手极速版视频页标志集合id=[快手极速版视频页奖励id,快手极速版喜欢数量id,快手极速版视频作者名id]
var 快手极速设置密码=function(){
    if(打开快手极速左边框()){
        while(!idclick(快手极速左边设置按钮id)){}
    }
}
var  快手极速微信登录按钮id="com.kuaishou.nebula:id/wechat_login_view"

var 打开快手极速左边框=function(){
    if(app_go_home()){
       while(!idclick(快手极速左边框按钮id))
       return true
    }
    return false
}

//关闭弹窗
var app_close_alter=function(){
    log(appname+":关闭弹窗")
    clickids(快手极速弹窗id集合,200)
    clicktexts(快手极速弹窗文本集合,200)
    if(text("立即邀请").findOne(100)){
        back()
        sleep(1000)
    }
    if (textclick("立即重播",100)){
        app_swipe_up()
    }
    log(appname+"关闭弹窗完毕")
}

var app_sign=function(){
    show("快手签到")
    if(今日签到(appname)){return true}
    app_go_home(3)
    doactionmaxtime(function(){
        textclick("我知道了")
        log("快手签到内部")
        if(clickids([快手极速版首页奖励悬浮id,快手极速版视频页奖励id])){
            sleep(1500)
        }
        if(textclick("立即签到")){
            今日已签到(appname)
        }
          if(text("去补签").exists()){
               今日已签到(appname)
          }
        滑块验证()
       if(app_get_coin_money()){
            滑动(20,10,18,10,3,500,200)
            sleep(1000)
            doactionmaxnumber(function(){
                if(textclick("立即签到")){
                  }
                //   packageName("com.kuaishou.nebula").className("android.view.View").clickable().depth(11).drawingOrder(0).findOne(300).click()
                //   packageName("com.kuaishou.nebula").className("android.view.View").clickable().depth(12).drawingOrder(0).findOne(300).click()
                if(app_getrewardnum()>=10){
                  return true
                }
                if(maytextclick("福利",500)){
                    sleep(3000)
                    close_ad_kk(apppkg)
                    sleep(2000)
                }
                if(text("明日再来").exists()){
                    return true
                }
                if(isadviceactivity()>-1){
                    close_ad_kk(apppkg)
                }
                sleep(1000)
                今日已签到(appname)
            },12)
       }
        if(invite){
            if(text("填写邀请码").exists()){
                log("找到填写邀请码，是新用户")
                if(textclick("去填写")){
                   if (app_invite()){
                       back()
                       return  true
                   }
                }
            }
        }
        if(textclick("立即签到")){
            今日已签到(appname)
              sleep(1000)
              back()
              return true
          }
   
          if(text("去补签").exists()){
               今日已签到(appname)
              back()
              sleep(300)
              back()
              sleep(1000)
          return true
          }

        if(text("签到领金币").exists()){
            if(textclick("去签到")){
                log("去签到 ")
            }
            if(text("去查看").exists()){
                log("去查看 ")
                back()
                return true
            }
        }
        app_close_alter()
    },60000)
}

var app_getrewardnum=function(){
    title_node=textStartsWith("每次100金币").depth(9).findOne(1000)
    if(title_node){
        txt_n=title_node.text().replace("每次100金币，每天1000金币","").replace("/10","")
        log(appname+"已经福利次数:"+txt_n)
        return parseInt(txt_n)
    }
    if(text("明天看视频继续领取1000金币").exists()){
        toastLog("看广告视频已经全部完成")
     return 10    
    }
    return 0;
}

var app_getreward=function(){
    show("快手查看视频广告")
    if(今日签到(appname)){return true}
    app_go_home(3)
    doactionmaxtime(function(){
        log("快手签到内部")
        if(clickids([快手极速版首页奖励悬浮id,快手极速版视频页奖励id])){
            sleep(1500)
        }
        滑块验证()
       if(app_get_coin_money()){
            滑动(20,10,18,10,3,500,300)
            sleep(1000)
       }
        if(text("签到领金币").exists()){
            if(textclick("去签到")){
                log("去签到 ")
            }
            if(text("去查看").exists()){
                log("去查看 ")
                back()
                return true
            }
        }
        app_close_alter()
    },60000)
}

var selectnavi=function(index){
   node_tab= className("android.view.View").depth(9).drawingOrder(index).clickable().findOne(300)
    if(node_tab){
        if(!node_tab.selected()){
            show(appname+"点击导航："+index)
           clicknode(node_tab)
        }else{
            show(appname+"导航已经选中："+index)
        }
    }else{
        show(appname+"没有找到导航"+index)
    }

}

var app_go_home=function(index){
    show(appname+"回到主页:"+index)
        index=index||-1
        doactionmaxtime(function(){
            ca=currentActivity()
            if(ca==apphomeactivity){
                if(index==1){
                    //同城
                    selectnavi(1)
                    return true
                }else if(index==2){
                    selectnavi(2)
                    return true
                }else if(index==3){
                    selectnavi(3)
                   return true
                }else{
                    selectnavi(3)
                    return true
                }
            }else if(ca==appliveactivity){
                textclick("退出")
            }else{
                app_close_alter()
                back()
                sleep(500)
            }
            if(currentPackage()!=apppkg){
                app.launch(apppkg)
                sleep(3000)
            }
        },10000)
}



var app_invite=function(){
    i=0
    while(i<10){
        if(text("填邀请码领现金").exists()){
            v= className("EditText").findOne()
            if(v){
                 v.setText(getrandforstrs(快手极速版邀请码))
                 sleep(100)
                if( textclick("提交领现金")){
                    sleep(1000)
                }
            }
             sleep(100)
             if(textContains("填写邀请码成功").exists()){
                 back()
                 sleep(1000)
                 back()
                 return true
              }
        }else{
            sleep(1500)
        }
       i=i+1
    }
   return false
}

var app_swipe_up=function(){
    if(enablegenius){
        滑动(20,10,15+randomint(2,3),10,randomint(0,1)+3,666,300)
    }else{
         vp=  id("com.kuaishou.nebula:id/slide_play_view_pager").findOne(200)
         if(vp){
                log("找到快手滑动vp")
                vp.scrollForward()
         }
    }
 }

 var 快手极速版获取视频点赞数=function(){
     text_n=getTextfromid(快手极速版喜欢数量id)
     if(text_n){
         if(text_n.indexOf("w")>-1){
            let n_f=parseFloat(text_n.substr(0,text_n.length-1))
             log("喜欢人数："+n_f+"万")
             return n_f*10000
         }else{
            log("喜欢人数："+text_n)
           return  parseInt(text_n)
         }
     }else{
         return -1
     }
 }


 var app_swipe_down=function(){
    if(enablegenius){
        滑动(20,10,3,10,18,400,400)
    }else{
            vp=  id("com.kuaishou.nebula:id/slide_play_view_pager").findOne(300)
            if(vp){
                log("找到快手滑动vp")
                vp.scrollBackward()
            }
    }
}
var 滑动次数=今日滑动次数(appname)
var islogin=false


var app_login=function(){
    show(appname+"登录")
    doactionmaxtime(function(){
        if(!idContains(apppkg).findOne(300)){
            app.launch(apppkg)
            sleep(3000)
        }
      clicktexts(["查看协议","同意并继续","允许","立即领取","立即提现","立即提现","提取","登录领金币"],100,1500)
        if(idclick("com.kuaishou.nebula:id/protocol_checkbox")){
           if( textclick("手机号登录")){
             text("请输入手机号").waitFor()
             ph= text("请输入手机号").findOne(300)
             if(ph){
                 if(phonenumber()){
                  ph.setText(phonenumber())
                  sleep(500)
                  textclick("获取验证码")
                  m_code=get_phone_code("快手科技",/\d{4}/ig,"")
                 }else{
                     textclick("跳过")
                     show("请手动登录账号,暂停5分钟")
                     sleep(30000)
                 }
             }
           }
        }else{
            back()
            sleep(1000)
        }
        if(idoneexist(快手极速版首页标志)){
            show("快手极速版首页标志找到了")
            //快手actionbar "com.kuaishou.nebula:id/action_bar"
            if(id("com.kuaishou.nebula:id/tabs").exists()){
               log("点击首页的发现")
               id("com.kuaishou.nebula:id/tabs").findOne().child(0).child(2).click()
            }
           return true
       }
    },90000)
}

var app_tomoney=function(){
    n_tomoney=0
    while(n_tomoney<5){
        n_tomoney=n_tomoney+1
        if(idclick(快手极速版首页奖励悬浮id)){
            sleep(3500)
        }
    }
}

var app_video_swipe=function(){
let swipenumber=0
    doactionmaxnumber(function(n){
        show("视频滑动："+n)
        node_tab= className("android.view.View").depth(9).drawingOrder(3).clickable().findOne(300)
        if(node_tab){
            if(!node_tab.selected()){
               clicknode(node_tab,0,0,100,2,300)
            }
        }else{
            show("视频滑动 找不到nodetab")
            app_go_home(3)
        }
        app_swipe_up()
         swipenumber=swipenumber+1
         sleep(2000)
        if(textoneexist(["点击打开长图","点击打开图集"],200)){
            app_swipe_up()
            sleep(1000)
         }
         nowdesc=getTextfromid("com.kuaishou.nebula:id/label")
         if(nowdesc){
             if(nowdesc!=lastdesc){
                n_like=快手极速版获取视频点赞数()
                if(n_like >maxlike){
                    idclick(快手极速版喜欢按钮id)
                    //@快手千万喜欢视频
                   
                }else if(n_like >minlike){
                    idclick(快手极速版喜欢按钮id)
                     //@快手百万百万喜欢视频
                  
                }else if(n_like>500000){
               
                }else if(n_like>300000){
                
                 }else if(n_like>10000){
                
                 }else if(n_like>1000){
                  
                 }else{
                    app_video_swipe()
                }
                click(500,300)
                sleep(2000)
                ttxet=getTextfromid("com.kuaishou.nebula:id/player_duration")
                if(ttxet){
                    tt=ttxet.split(":")
                    if(tt.length==2){
                        zt=parseInt(tt[0])*60+parseInt(tt[1])
                        log(nowdesc+"总时长:"+zt+"--"+ttxet)
                        if(zt>13){
                            sleepr(9000,11000)
                        }else if(zt>4){
                            sleep((zt-3)*1000)
                        }
                    }
                }
                sleep(2000)
                swipenumber=0
                lastdesc=nowdesc
             }
           }
    },100)
}

var app_get_coin_money=function(){
    if(doactionmaxtime(function(){     
        ca=currentActivity() 
        log("当前activity:"+ca)
    if(ca!=appsignactivity){
        show("获取金币数和余额")
        sleep(2000)
        node_reward=id(快手极速版视频页奖励id).findOne(200)
        if(node_reward){
            let bds=node_reward.bounds()
            click(bds.centerX(),bds.centerY())
            show("点击奖励中心")
            sleep(5000)
        }
    }
        node_webkit= className("android.webkit.WebView").scrollable(true).findOne(100)
       if(node_webkit&&node_webkit.childCount()>3){
           node_coin_money_layout=node_webkit.child(2)
           if(node_coin_money_layout){
            //    if(node_coin_money_layout.className=="android.widget.ListView"){
            //         log("列表 sss"+node_coin_money_layout.className)
            //    }else{
            //        log("列表"+node_coin_money_layout.className)
            //    }
             //  log(node_coin_money_layout)
               node_coin=node_coin_money_layout.child(0).child(0)
               if(node_coin){
                    coin=node_coin.text()
                   log("金币数："+coin)
                   记录今日金币(appname,coin)
               }
               node_money=node_coin_money_layout.child(1).child(0)
               if(node_money){
                   money=node_money.text()
                   log("余额数："+money)
                   记录现在余额(appname,money)
               }
             return true
           }
       }
    sleep(2000)
   },10000)){
       return true
   }
   return false
}

function app_run(){
    if(invite && !应用登录(appname)){
        快手极速版邀请()
        show("快手极速版开始")
        app.launch(apppkg)
        sleep(3000)
        doactionmaxtime(function(){
            textclick("继续")
        },10000)
    }else{
        show("快手极速版开始")
        app.launch(apppkg)
        sleep(3000)
    }
    // if(今日签到(appname)!="true"){
    //     app_sign()
    // }
    todaysign=true
    loopn=0
    while(true){
        app_close_alter()
        device.wakeUpIfNeeded()
        loopn=loopn+1
        log("循环："+loopn)
        app_video_swipe()
        app_video_city()
        idclick("com.kuaishou.nebula:id/close")
        app_tomoney()
    }
}

//同城看视频
var app_video_city=function(){
    app_go_home(1)
    doactionmaxnumber(function(n){
        show(appname+"看同城视频")
        
    },100)
}

var app_go_live=function(){
    doactionmaxtime(function(){
        log(appname+"回到直播间")
        if(isappliveactivity()){
            return true
        }
        ca=currentActivity()
        if(ca==apphomeactivity){
            idclick("com.kuaishou.nebula:id/left_btn")
            sleep(2000)
            if( doactionmaxtime(function(){
                if(textclick("直播广场")){
                    sleep(2000)
                  return true
                }
                if(isappliveactivity()){
                    return true
                }
                滑动(20,7,13,7,6,500,300)
            },20000)){
                return true
            }
        }else if(ca==appliveactivity){
            return true
        }else{
            app_close_alter()
            back()
            sleep(500)
        }
        if(currentPackage()!=apppkg){
            app.launch(apppkg)
            sleep(3000)
        }
    },60000)
}

var canqianghongbao=function(coin,livenum,waittime){
    log(appname+"判断抢红包："+coin+"--直播人数--"+livenum+"--等待时间--"+waittime)
    if(coin<20){
        return false
    }
    if(waittime<20){
        return true
    }
    if(coin>10000){
        return true
    }else  if(coin>=1000){
        if(livenum<1000){
            return true
        }
    }else if(coin>100){
        if(coin>livenum&&waittime<coin){
            return true
        }
        return false
    }
}
var clickhongbao=function(sleeptime,cx,cy){
    try {
        // toastLog("等待时间"+sleeptime)
        // if(sleeptime>=60){
        //         while(app_hongbao_daojishi()>10){
        //             toastLog(appname+"抢红包等待中"+app_hongbao_daojishi())
        //             sleep(2000)
        //         }
        // }
       
        while(true){
                sleeptime=app_hongbao_daojishi()
                toastLog("等待："+sleeptime)
                if(sleeptime<=3){
                    doactionmaxtime(function(){
                        press(cx,cy,10)
                    },3000,20)
                    return true
                }
                sleep(1500)
            }
    } catch (error) {
        log(appname+"出错:点击红包")
    }
}
var app_hongbao_daojishi=function(){
    log("查找倒计时")
    node_count=id("com.kuaishou.nebula:id/count_down_view").findOne(1000)
    if(node_count||id("com.kuaishou.nebula:id/live_red_packet_coin_num_view").exists()){
        txt_time=node_count.text();
        coin=parseInt(getTextfromid("com.kuaishou.nebula:id/live_red_packet_coin_num_view","0",1000))
        if(txt_time!=""){
            log("找到的文本"+txt_time)
            if(txt_time.search("分钟")>-1){
                return parseInt(txt_time.replace("分钟后",""))*60
            }else{
                return parseInt(txt_time.replace("秒后",""))
            }
       }
    }else{
        return 10000
    }
}

//  直播页红包id =com.kuaishou.nebula:id/live_normal_red_pack_image_view   
//               com.kuaishou.nebula:id/live_normal_red_pack_image_view
var livename=""
var app_live_hongbao=function(){
    try {
        let livenum=0
    let coin=0
    let dtime=0
    let cx=device.width/2
    let cy=device.height*59/96
    doactionmaxtime(function(){
        show("直播间查找红包")
        if(text("直播已结束").exists()){
            return true
        }
        let cname=getTextfromid("com.kuaishou.nebula:id/live_name_text","",500)
        if(cname!=""&&cname==livename){
            //
           log("主播名:"+cname)
            livename=cname
            return true
        }
        //获取直播人数
        txt_livenum=getTextfromid("com.kuaishou.nebula:id/live_audience_count_text","0",2000)
        if(txt_livenum!=""){
            show(appname+"直播间人数:"+txt_livenum)
            if(txt_livenum.search("w")>-1){
                livenum=parseInt(txt_livenum.replace("w",""))*10000
            }else{
                livenum=parseInt(txt_livenum)
            }
        }
    
        if(text("看看大家手气").exists()){
            idclick("com.kuaishou.nebula:id/close_view")
            return true
        }
        if(idclick("com.kuaishou.nebula:id/live_arrow_red_packet_pendant_icon_view")){
            //
            show("点击倒计时红包")
            sleep(2000)
        }

        if(id("com.kuaishou.nebula:id/live_normal_red_pack_image_view").exists()){
            clicknode(id("com.kuaishou.nebula:id/live_normal_red_pack_image_view").findOne(2000))
            //普通红包
            sleep(2000)
        }

        node_count=id("com.kuaishou.nebula:id/count_down_view").findOne(1000)
        if(node_count||id("com.kuaishou.nebula:id/live_red_packet_coin_num_view").exists()){
            show(appname+"找到红包弹窗")
            txt_time=node_count.text();
            coin=parseInt(getTextfromid("com.kuaishou.nebula:id/live_red_packet_coin_num_view","0",1000))
            toastLog("时间:"+txt_time+"--金币数:"+coin)
          
            if(txt_time!=""){
                if(txt_time.search("分钟")>-1){
                    dtime=parseInt(txt_time.replace("分钟后",""))*60
                }else{
                    dtime=parseInt(txt_time.replace("秒后",""))
                }
                if(dtime<15){
                    clickhongbao(dtime,cx,cy)
                    return true
                }
            }
            if(canqianghongbao(coin,livenum,dtime)){
                textclick("i 关注")
                log("可以抢红包")
                clickhongbao(dtime,cx,cy)
                return true
            }else{
                idclick("com.kuaishou.nebula:id/live_red_packet_close_view")
                return true
            }
        }

      //倒计时的红包
        if(text("手慢了，红包派完了").exists()){
            idclick("com.kuaishou.nebula:id/live_red_packet_close_view")
            sleep(1000)
            return true
        }
        // com.kuaishou.nebula:id/live_red_packet_close_view  关闭
        //com.kuaishou.nebula:id/live_red_packet_coin_num_view  快币数量  1440
        //com.kuaishou.nebula:id/count_down_view 倒计时 5秒后 3分钟后
        // com.kuaishou.nebula:id/message_view  开抢
        // com.kuaishou.nebula:id/live_red_packet_pre_snatch_state_view  开
        // com.kuaishou.nebula:id/live_red_packet_message_view  // 没有抢到的结果   text = 手慢了，红包派完了

    },10000,1000)
    } catch (error) {
        log(appname+"出错:直播间抢红包"+error)
    }
}

var isappliveactivity=function(){
    return currentActivity()==appliveactivity||id("com.kuaishou.nebula:id/live_name_text").findOne(500)||id("com.kuaishou.nebula:id/count_down_view").findOne(500)
}

var app_see_live=function(){
    doactionmaxnumber(function(n){
        if(!isappliveactivity()){
            show(appname+"不在直播间")
            app_go_live()
        }
        app_live_hongbao()
        app_swipe_up()

    },1000)
}

var floatyx=0
var floatyy=0
var isshowsettingfloaty=false
var isdevicemanager=false
var iskeepappnewer=false
var isonlayscript=true
var appdownloadurl=null

toastLog("开始")

startapp(appname,apppkg,floatyx,floatyy, isshowsettingfloaty,isdevicemanager, iskeepappnewer,isonlayscript,appdownloadurl)