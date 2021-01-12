

  
console.log("demo begin");
//sleep(5000);
auto();
events.observeKey();
 
var dir=engines.myEngine().cwd()?engines.myEngine().cwd():"/storage/emulated/0/脚本/scriptandorid94";
var kuaishou=require(dir+"/hzKuaiShou.js");

var HzDouyinClass=require(dir+"/hzDouyin.js");
var hzDyLow=require(dir+"/hzDyLow.js");
var hzDyJs=require(dir+"/hzDyJs.js");
var douyin = new HzDouyinClass();
var qdouyin = new hzDyJs();
var dlow = new hzDyLow();
var huoshan = require(dir+"/hzHuoshan.js");
var hz94 = require(dir+"/hz94.js");
var cptchaTool = require(dir+"/Captcha.js");
var NewsClass = require(dir+"/hzNews.js");
var global = require(dir+"/Global.js");
var news=new NewsClass();
var hasScreenPersion=false;
 //请求横屏截图
 //
//加载本地配置
var sto = storages.create("hzConfigData");
var config = sto.get("config",[]);
if(!config||config.length==0)
{
    log("没有配置使用默认配置");
    // 默认配置
    config = {
    packageName: "com.haozhuan.script",
    version: "1.0",

    dyUrl: "",
    quickFocus:false,
    doDyLike: true,
    doDyFocus: true,
    doHsLike: true,
    doHsFocus: true,
    // doKsLike: true,
     doKsFocus: true,
    bringBefore: true,
    bringOngoing: true,
    beforeVideoNum1: "3",
    beforeVideoNum2: "3",
    beforeVideoTime1: "5",
    beforeVideoTime2: "7", 
    androidVersion:8,
    ongoingVideoNum1: "1",
    ongoingVideoNum2: "2",
    ongoingVideoTime1: "2",
    ongoingVideoTime2: "15",
    restartByFinishNum1: "20",
    restartByFinishNum2: "30",
    taskInterval: "3",
    stopByFailNum: "10",
    stopByFinishNum: "1500",

};
}
else
{
    log(" 配置是");
    //log(config);
}
kuaishou.config=config;
kuaishou.ksUid="1065459667";
log("width:"+device.width+",height:"+device.height);
function testFollow()
{
    kuaishou.gotoUserProfile("1065459667"); 
    //var titleW = id("title").findOnce();
    sleep(3000);
    console.log("begin find follow" );
    var follow_btn=id("header_follow_button").findOnce();
    if(follow_btn!=null)
        {
            console.log("found follow" );
            console.log(follow_btn );
            follow_btn.click(); 
        }
    else
     console.log("not found follow" );  
}

function testGetFollowNum()
{
    kuaishou.gotoMyProfile(); 
    sleep(3000);
    var follow_btn=id("following").findOnce();
    if(follow_btn!=null)
        {
            console.log("found follow" );
            console.log(follow_btn );
            console.log("关注数:"+follow_btn.getText() );
        }
    else
        console.log("not found follow" );  
}
function testEnterDetail()
{
    sleep(1000);
    var cover=id("player_cover").boundsInside(device.width*0.5-100, device.height*0.5-100, device.width, device.height).findOnce();
    if(cover!=null)
        {
            console.log("found cover" );
            // for(var i=0;i<cover.length;i++)
            // {
            //     console.log(cover[i] );
                
            //     console.log(cover[i].parent().parent() );
            // }
            console.log(cover.parent() );
            console.log(cover.parent().parent() );  
            cover.parent().click(); 
        }
    else
        console.log("not found cover" );  
}
function testFind()
{
    sleep(3000);
    var find_tab=desc("发现").clickable(true).findOnce();
    if(find_tab)
    {
        console.log(find_tab );
        if(!find_tab.selected())
        {
            console.log("press find"); 
            find_tab.click();
        }
        else
        {
            console.log(" find is select"); 
        }
    }
    else
    {
        console.log("not  find tab"); 
    }
}
function testKuaiShou( )
{
    kuaishou.openApp();  
    sleep(2000);
    var items=className("android.view.View").clickable(true).boundsInside(10, device.height*0.30, device.width*0.2, device.height*0.6).find();
    log("视图子控件:"+items.length);
    items.forEach(function(child)
    {
        log(child);
    }
    )

    return;
    var items=className("android.view.View").boundsInside(10, device.height*0.1, device.width-10, device.height*0.5).find();
    
    var image=className("Image").boundsInside(10, device.height*0.2, device.width*0.3, device.height*0.4).findOnce();
    log("图片");
    console.log(image);  
    log(image.bounds().left);
    log(image.bounds().top);
    log(image.bounds().right);
    log(image.bounds().bottom);
    log(image.bounds().width());
    log(image.bounds().height());
    log("视图子控件");
    items.forEach(function(child)
    {
        log(child);
    }
    )

    var slider=className("android.view.View").boundsInside(10, device.height*0.4, device.width*0.2, device.height*0.6).findOnce();
    log("slider");
    console.log(slider);  
    //log(image);
   var title_lbl=text("激活帐号").findOnce();
   if(title_lbl)
   {
       log(title_lbl);
   }
   else
   {
       log("没有找到激活"); 
   }
    return;
   // kuaishou.popToRootViewController(); 
    var items=className("android.view.View").clickable().find();
    if(items)
    {
        var find=items[2];
        log(find);
        find.click();
        find.children().forEach(function(child){
            log(child);
            
             
        });
    }
   
    //kuaishou.popToRootViewController();
}
function testHuoShan( )
{
     huoshan.openApp();
     sleep(1000);
     //huoshan.changeAccount("哇咔咔"); 
     var names=huoshan.getAccountList();
     log(names);
     return;
     var icon = className("android.view.ViewGroup").boundsInside(0, 0, device.width*0.3, device.height*0.2).clickable().findOnce();     
     if(icon)
     {
         log(icon);
        icon.click();
        sleep(3000);
        var setting_lbl= text("设置").findOnce(); 
        if(setting_lbl)
        {
            setting_lbl.parent().click(); 
            sleep(2000);
            var change_account=text("切换账号").findOnce();
            if(change_account)
            {
                log("find change_account");
                log(change_account);
                change_account.click();
                sleep(2000);
                var setting_lbl= text("哇咔咔").findOnce(); 
                if(setting_lbl)
                {
                    log(setting_lbl);
                    setting_lbl.parent().click();
                    sleep(2000);
                    if (text("不同意").exists()) {
                        log("切换失败,需要绑定手机号码才能切换");
                    }
                    else
                    {
                        log("切换成功");
                    }
                }
            }
        }
     }
     return;
    var layout=text("关注").find();
    
    if(layout)
    {
        //console.log(layout );
        log( "关注数:"+huoshan.getLb_focus().getText());  
        return;
        layout.forEach(function(child){
                log(child.parent().className());
                log(child.bounds());
                log(child.bounds().height());
                log(child.parent());
                if(child.parent().className()=="android.widget.LinearLayout")
                {
                    log("child");
                    child.parent().children().forEach(function(ele){
                        log(ele);
                    });
                }
            });
    }
    else
    {
        log("not found layout"); 
    }
}
function douyinFocunTemo()
{
    var cover=descStartsWith("视频").className("ImageView").clickable().findOnce();
        if(cover)
        {
            if(this.config.androidVersion >= 7)
            {
                swipe(device.width/2,device.height-300, device.width/2, 300, 300);
                sleep(2000);
                swipe(device.width/2,device.height-300, device.width/2, 300, 300);
                sleep(2000);
                var item=descStartsWith("视频").className("ImageView").clickable().findOnce();
                if(item)
                    cover=item;
            }
            cover.click();
            sleep(8000);
            var curAc = currentActivity();
            if(curAc!="com.ss.android.ugc.aweme.detail.ui.DetailActivity")
            {
                console.warn("进入作品页失败,跳过");
                return false;
            }
            else
            {
                var follow_btn=id("follow_text_container").findOnce();
                if(follow_btn)
                {
                    follow_btn.parent().click(); 
                    sleep(2000);
                }
                else
                {
                    console.warn("未找到关注控件");
                    return false;
                }
            }
        }
        else
        {
            sleep(1000);
            focusBtn.click();
            sleep(1000);
            console.show();
            sleep(2000);
            var douBtn = textContains("抖一下").findOnce();
            if(douBtn && this.config.androidVersion >= 7)
            {
    
                var b = douBtn.bounds();       
                click(b.centerX(), b.centerY())
                sleep(1000);
            }
        }
        
}
function testDouyin( )
{
     douyin.openApp();
     sleep(1000);
    var image=className("ImageView").findOnce();
    if(image)
    {
        log(image);
    }
    else
    {
        log("not image");
    }
    return;
     log("分隔线");
    var layout= className("LinearLayout").findOnce();
    if(focus)
    {
        log(layout);
        log(layout.parent());
        log(layout.parent().parent());
    }
    log("分隔线2");
    var imageview=desc("关注").clickable().findOnce();
    if(imageview)
    {
        log(imageview);
        log(imageview.parent());
        imageview.click();
    }
     return;
     var cover=descStartsWith("视频").className("ImageView").clickable().find();
     if(cover)
     {
         log(cover);
         log("以下子控件");
         cover.forEach(function(child){
            log(child);
            
             
        });
     }
     else
     {
         log("not found cover");
     }
}
function getCurrentBind(users)
{
    for (var i = 0; i < users.length; i++) 
    { 
        var user=users[i];
        if(user.id==88888)
            return user;
    } 
    return ""; 
}
function testAPI()
{
    
    var responce=hz94.getTaskWithNoBind("dy",2,""); 
    log(responce); 
    //var responce=hz94.upTaskWithNoBind("dy","96664","85923105388","1798790195021356","测试账号"); 
    return;
    //
    hz94.host="http://94hz.58huluwa.com/";
    hz94.cookieStr='JSESSIONID=47C87CE6925AA7B920FC2AB1AC9FCEA1; JSESSIONID=47C87CE6925AA7B920FC2AB1AC9FCEA1'; 
    var responce=hz94.getToken();
    //var responce=hz94.getTaskWithNoBind("hs",1,85923105388);
    log(responce.obj); 
    
    hz94.init(config);
    console.show();
    config.doHsFocus=true;
    
    if(config.doHsFocus||config.doHsLike)
    {
        log("获取火山绑定列表");
        var responce=hz94.getBindList("hs");
        log(responce.obj);
        if(responce.success&&responce.obj.length>1)
        {
            var curBind=this.getCurrentBind(responce.obj);
            if(curBind)
            {
                log("当前绑定账号为:"+curBind.bindName);
                var state=huoshan.changeAccount(curBind.bindName);
                if(state)
                    log("开始做任务")
                var index = responce.obj.indexOf(curBind); 
                if (index > -1) { 
                    responce.obj.splice(index, 1); 
                } 
            }
            for(var i=0;i<responce.obj.length;i++)
            {
                var user=responce.obj[i];
                var state=huoshan.changeAccount(user.bindName);  
                if(!state)
                    continue;
                var data=hz94.bindUser("hs",user.id);
                log(data.msg);
                if(!data.success)
                    continue;
                
                log("开始做任务")
            }
        }
        else
        {
            log(responce.msg);
            log("开始做任务")
        }
         
    }
    
}
function testImage()
{
    // cptchaTool.useFakeFrame();
    // cptchaTool.debug=0; 
    // var img = images.read("/storage/emulated/0/Pictures/Screenshots/Screenshot_20200730-145718.PNG");   
    // var slider_rect=cptchaTool.getCoordinate(img,140);  
    // log(slider_rect); 
    // if(slider_rect['endX']==-1)
    // {
    //     var slider_rect=cptchaTool.getCoordinate(img,70); 
    //     log(slider_rect); 
    // }
    
    
    if(!hasScreenPersion)
    {
        requestScreenCapture(false); 
        hasScreenPersion=true;
    }
    //kuaishou.openApp();  
    sleep(7000);  
    cptchaTool.close();

    return ;
    //return;
    cptchaTool.debug=1;  
    var state=cptchaTool.init();  
    
    if(state)
    {
        log("截图");
        
        captureScreen("1.png"); 
        var img = captureScreen(); 
       //var img = images.read(engines.myEngine().cwd()+"/1.png");
        
        sleep(1000);  
        var slider_rect=cptchaTool.getCoordinate(img,140);   
        log(slider_rect); 
        if(slider_rect['endX']==-1)
        {
            slider_rect=cptchaTool.getCoordinate(img,70); 
            log(slider_rect); 
        }
        if(slider_rect['endX']!=-1)
        {
            log("开始滑动");   
            swipe(slider_rect['x'],slider_rect['y'], slider_rect['endX'], slider_rect['endY'], 1000);
        }
        else
        {
            //var point=cptchaTool.refreshPoint();
           // click(point['x'],point['y']);
        }
    }
    else
    {
        log("未找齐划图控件");
    }
     

    //img.save(img, engines.myEngine().cwd()+"/1.jpg", "jpg", 50);
}
auto.setWindowFilter((info) => {
    return true;
});

var curName="郁桐12345678";
curName.substr(0,8);
douyin.userName="郁桐12345678910123";
hz94.host="http://8.129.210.98/";
config.quickTask=2;
hz94.config=config;
hz94.init(config);
huoshan.config=config;
douyin.dyUid=96362244738;
huoshan.dyUid=85923105388;
douyin.config=config;
qdouyin.config=config;
qdouyin.dyUid=85923105388;
qdouyin.global=global;
douyin.global=global;
huoshan.global=global;
douyin.focusTooFastNotifyCount=3;
douyin.secUid="MS4wLjABAAAAon5fSpXTwEItIUz3y38KixX221OA4yaKtuWuTNJXB7w";
douyin.dyUrl="https://v.douyin.com/JkUGRv5/";
//douyin.quickVersion=true;
var i=0;
/*
global.showCloseBtn();
global.showLogView();

global.updateLog();
global.info("im am test");
 
 

for(var i=0;i<5;i++)
{
    
    var count=global.tipView.list.getAdapter().getItemCount();
    global.info(count+"sldjflsdf"+i);
    sleep(i<10?500: 800);
}
*/
let flag = false;
console.log = function (base) {
    return function () 
    {
        console.warn(arguments );
        //!flag && base.apply(this, arguments);
    }
}(console.log);

//douyin.gotoDetail("6831806161122053390"); 
//global.alert("当前选中任务连续失败个数达到当前设置值，停止运行"); 
 kuaishou.init(config);
 var text = "追加的文件内容";

 
events.onKeyDown("volume_down",function(event)
{
    i++;
    hz94.fakeParams(96362244755+i,config);  
    console.log("you press down4");  
    a++;
     
   log(device.width);
   log(device.height);
    // home();
    // sleep(200);
    // huoshan.openApp();
    // sleep(5000);
    //huoshan.openModuleUI(0);
    //dlow.focusWithoutTouch(true); 
    //function(type, taskId,userid,urlId,nickName,msgId,error)
    //hz94.upTaskWithNoBind('ks','870127','2163060018','5258515557187640524','phper','kslike','');
    //douyin.commentWithText("[微笑]",1);
   // var userid=qdouyin.updateNumByUI();
    //log("用户ID:"+userid);
    //var temp1=douyin.isFocusTooTast(2);
    //log("quick:"+temp1);

    
    //var focusW = text("关注").find();
    //log(focusW);
    
    //huoshan.quickFocus(111336176608,"6796935743626398989");
    //huoshan.doDyLike();
    //huoshan.getMyUserid(0);
    //huoshan.clickRightBarItem(0);
    // var times=0;
    //     while(true)
    //     {
    //         times++;
    //         var lbl1=packageName("com.ss.android.ugc.aweme").textContains("休息一下").findOnce();
    //         //var lbl1=text("关注太快了，先休息一下吧~").findOnce();
    //         if(lbl1)
    //         {
    //             log(lbl1);
    //             log("捕捉到关注太快了");
    //             return true;
    //         }
    //         else
    //             log("aaad");
    //     }
   // douyin.quickFocus(111336176608,6819836638374448398); 

    //huoshan.doFocusByShortId(615748125); 
   // var focus=text("关注").className("TextView").find();
    //log(focus);
    //app.launchPackage("org.autojs.autojspro");
     
    //news.gotoUserProfile(81450089095);//82596714185 
    //douyin.gotoUserProfile(82596714185);
    //var accounts=douyin.changeAccount('郁桐12345678910123');
   // log(accounts);
    //var res = http.get("https://m.toutiao.com/is/Jfb8cuM/" );
    //log(res);
    //var data=hz94.getTaskWithNoBind("dy", 3,"96362244738");
    //log(data);
    //huoshan.gotoDetail("6796935743626398989");
    //douyin.quickFocus(111336176608,"6796935743626398989");
    //douyin.quickFocus(102075435657);
    //hz94.getDyInfo("zyh547996854");
    //var data=hz94.getTaskWithNoBind("hs",1,"96362244738");
    //var data= hz94.upTaskWithNoBind("js","283474","zyh547996854","3839139275351800","郁桐12345678910123","","");
    //log(data);
    //testImage();  
    //app.launchPackage("com.haozhuan.scriptnew");
    //console.show();
    //testKuaiShou();
    //testGetFollowNum();
    
    //douyin.doFocusByProduct(96362244738);
    //kuaishou.ksUid="2000306942";
    //kuaishou.doLike("5224175593566016649");
    // var url="https://www.iesdouyin.com/share/video/6831806161122053390/?region=CN";
    // var content = http.get(url.trim());
    // var string = JSON.stringify(content);
    // var data =  JSON.parse(string);
    // log(data);
    //
  // var info=hz94.getDyInfo("l5282408067");
   //log(info);
    //douyin.quickVersion=true;
    //douyin.doFocusByUserId("59094552507","");
    //douyin.gotoDetail("6809937741514575117");
    //sleep(5000);
    //douyin.doLike("6809937741514575117");
    return; 
    var textfield=id("bmh").findOnce();

    if(textfield)
    {
        log("aaaa");
       
        log(textfield);
        log(textfield.parent());
        log(textfield.parent().parent());
    }

    
    setText(0,"测试");
    var textfield=className("EditText").clickable().findOnce();
    if(textfield)
    {
        textfield.click();
        sleep(1000);
        var icons=douyin.findSendBtn();
        log(icons);
        if(icons)
        {
            icons.click();
        }
    }

   
    var icon=className("LinearLayout").descStartsWith("评论").clickable().findOnce();
    if(icon)
        icon.click();

   
   
    //douyin.changeAccount("13750528276","a12345678"); 
    //testHuoShan();   
    //testDouyin();
     //log(config);
    //testAPI();
   // testImage();   
    //douyin.gotoDetail("6850649716372327680");
  // huoshan.changeAccount("sss"); 
   
   //log("粘贴板内容:"+getClip());
  //var userid=huoshan.getMyUserid();
  // var userid=kuaishou.getMyUserid();
  // var userid=douyin.getMyUserid(); 
   //log("用户ID:"+userid);
   
    //testFind();
    return;
    //
    //testEnterDetail();
    //kuaishou.gotoHome();
    //return;
    //kuaishou.doBringBefore();
   
    kuaishou.openApp();  
    sleep(2000);
    //kuaishou.gotoUserProfile("1065459667");
    //kuaishou.gotoHome(); 
    kuaishou.doBringBefore();      
    kuaishou.doFocusByUserId("1065459667");    
} );
 