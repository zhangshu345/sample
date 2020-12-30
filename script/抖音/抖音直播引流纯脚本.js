"ui";
var color = "#009688";
function showui(){
    ui.layout(
        <drawer id="drawer">
            <vertical>
                <appbar>
                    <toolbar id="toolbar" title="抖音直播引流"/>
                    <tabs id="tabs"/>
                </appbar>
                <button id="bt_run" text="开始运行"/>
                <viewpager id="viewpager">
                    <vertical>
                        <button id="bt_save1" text="保存本页配置"></button>
                        <text text="输入搜索直播商品名称，输入多个名称时，以 - 分割。 举例 酒-白酒-红酒-葡萄酒" textColor="black" textSize="16sp"/>
                        <input id="in_spm" hint="在此输入商品分类" ></input>
                        <text  text="单一直播间引流时间设置 最长时间(以分钟为单位)。举例 10分钟 输入数字 10"></text>
                        <input id="in_onelivetime" inputType="number" hint="在此输入时间 （分钟）" ></input>
                        <text  text="直播间观看人数最小起,低于该数字直接跳过，切换下一直播间"></text>
                        <input id="in_livepersonmin" inputType="number" hint="在此输入人数"  text="50"></input>
                    </vertical>
                    <vertical>
                         <button id="bt_save2" text="保存本页配置"></button>
                        <text text="输入私信内容名称，输入多条话语。以 | 分割， 举例 引流话语1|引流话语2|引流 " textColor="black" textSize="16sp"/>
                        <input id="in_chatcontent" hint="在此输入引流语" ></input>
                    </vertical>
                    <vertical>
                        <webview id="web" w="*" h="*" margin="10 10 10 10" />
                    </vertical>
                </viewpager>
            </vertical>
            <vertical layout_gravity="left" bg="#ffffff" w="280">
                <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
                <list id="menu">
                    <horizontal bg="?selectableItemBackground" w="*">
                        <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                        <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                    </horizontal>
                </list>
            </vertical>
        </drawer>
    );
    
    //创建选项菜单(右上角)
    ui.emitter.on("create_options_menu", menu=>{
        // menu.add("设置");
        // menu.add("主页");
        menu.add("关于");
    });
    //监听选项菜单点击
    ui.emitter.on("options_item_selected", (e, item)=>{
        switch(item.getTitle()){
            case "设置":
                toast("还没有设置");
                break;
             case "主页":
                aroutergourl("\/script\/usermain") 
                break;
            case "关于":
                alert("关于", "抖音引流v1.0.0");
                break;
        }
        e.consumed = true;
    });
    activity.setSupportActionBar(ui.toolbar);

    //设置滑动页面的标题
    ui.viewpager.setTitles(["引流配置", "引流术语", "教程"]);
    //让滑动页面和标签栏联动
    ui.tabs.setupWithViewPager(ui.viewpager);
    
    //让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);
    
    ui.menu.setDataSource([
      {
          title: "选项一",
          icon: "@drawable/ic_android_black_48dp"
      },
      {
          title: "选项二",
          icon: "@drawable/ic_settings_black_48dp"
      },
      {
          title: "选项三",
          icon: "@drawable/ic_favorite_black_48dp"
      },
      {
          title: "退出",
          icon: "@drawable/ic_exit_to_app_black_48dp"
      }
    ]);
    
    ui.menu.on("item_click", item => {
        switch(item.title){
            case "退出":
                ui.finish();
                break;
        }
    })

    getSaveConfig()

    ui.in_spm.setText(商品内容)
    ui.in_chatcontent.setText(引流内容)
    ui.in_onelivetime.setText(""+onelivetime)
    ui.in_livepersonmin.setText(""+livepersonmin)
    ui.bt_run.on("click",function(v){
        run()
    })
    ui.web.loadUrl("https://hao.360.com/?src=lm&ls=n7303c05692")
    
    ui.bt_save1.on("click",function(v){
        //
        saveconfig1()
    })
    
    ui.bt_save2.on("click",function(v){
        //保存话术
        savehuashu()
    })

}
   
    //获取保存的脚本
    function getSaveConfig(){
        引流内容=storage.get("yinliucontent")
        if(引流内容){
           let 内容数组= 引流内容.split("|")
            if(内容数组){
                引流话语=[]
                内容数组.forEach(s=>{
                    if(s.trim()){
                        引流话语.push(s.trim())
                    }
                })
            }
        }else{
            引流内容="引流话语1|引流话语2|引流话语3"
            toastLog("引流话语为空")
        }
         商品内容=storage.get("shangpincontent")
        if(商品内容){
                let sps=商品内容.split("-")
                if(sps){
                    商品名=[]
                    sps.forEach(s=>{
                        if(s.trim()){
                            商品名.push(s.trim())
                        }
                    })
                }
        }else{
            商品内容="商品1-商品2-商品3"
            toastLog("搜索商品为空") 
        }
        onetime=storage.get("onelivetime")
        if(onetime){
            onelivetime = parseInt(onetime);
        }else{
            onelivetime=10;
        }
        
        personmin = storage.get("livepersonmin")
        if(livepersonmin){
            livepersonmin = parseInt(personmin);
        }else{
            livepersonmin =50;
        }
    }


function 抖音直播引流(){
    var storage = storages.create("hd_dyyl");
    var 引流话语=[]
    var 引流内容=""
    var 商品内容=""
    var 商品名=[]  // 
    const dypkg="com.ss.android.ugc.aweme"
    const dyhome="com.ss.android.ugc.aweme.main.MainActivity"
    const dylive="com.ss.android.ugc.aweme.live.LivePlayActivity"
    const dychat ="com.ss.android.ugc.aweme.im.sdk.chat.ChatRoomActivity" //  私信对话框页
    var onelivetime=10
    var livepersonmin= 50;  //直播间最小在线人数 才去引流
    var searchword=false; // 代表精确查找输入的文字  false  表示 点击出现的推荐文字
    var yinliutype=1;  //
    
    //获取保存的脚本
function getSaveConfig(){
    引流内容=storage.get("yinliucontent")
    if(引流内容){
       let 内容数组= 引流内容.split("|")
        if(内容数组){
            引流话语=[]
            内容数组.forEach(s=>{
                if(s.trim()){
                    引流话语.push(s.trim())
                }
            })
        }
    }else{
        引流内容="引流话语1|引流话语2|引流话语3"
        toastLog("引流话语为空")
    }
     商品内容=storage.get("shangpincontent")
    if(商品内容){
            let sps=商品内容.split("-")
            if(sps){
                商品名=[]
                sps.forEach(s=>{
                    if(s.trim()){
                        商品名.push(s.trim())
                    }
                })
            }
    }else{
        商品内容="商品1-商品2-商品3"
        toastLog("搜索商品为空") 
    }
    onetime=storage.get("onelivetime")
    if(onetime){
        onelivetime = parseInt(onetime);
    }else{
        onelivetime=10;
    }
    
    personmin = storage.get("livepersonmin")
    if(livepersonmin){
        livepersonmin = parseInt(personmin);
    }else{
        livepersonmin =50;
    }
}

    function 进入直播页(){
        回到抖音首页(1)
        let node_live = packageName("com.ss.android.ugc.aweme").className("android.widget.ImageView").depth(17).drawingOrder(1).findOne(300)
        if(node_live){
            clicknode(node_live)
            sleep(2000)
        }
    }
    function 直播页搜索(){
        while(true){
            toastLog("回到抖音主页")
            if(currentActivity()!=dylive){
                进入直播页()
            }
            if(textclick("更多直播")){
                sleep(1000)
                let n_search=packageName('com.ss.android.ugc.aweme').className('android.widget.ImageView').visibleToUser(true).depth(12).drawingOrder(1).findOne(300)
                if(n_search){
                    clicknode(n_search)
                    sleep(300)
                }
                break
            }else{
             sleep(3000)
            }
        }
        editable().waitFor()
    
        sleep(1000)
        editable().findOne().click()
        while(true){
            let spm=商品名[random(0,商品名.length-1)]
            let et= editable().findOne(300)
            if(et){
                clicknode(et)
                sleep(1000)
                et= editable().findOne(300)
                et.setText(spm+"直播")
                let b =et.bounds()
                sleep(1000)
                log(b)
                if(searchword){
                    textclick("搜索|提交")
                }else{
                    // 点击出现的提醒词
                    click(device.width*2/5,b.bottom+50)
                }
                sleep(3000)
               
                if(textoneexist("搜索无结果，猜你想看以下内容")){
                    商品名.pop(spm)
                }else{
                    click(device.width*2/5,b.bottom+50)
                     log("进入直播")
                     return
                }
            }
        }
     }


     function 单一直播引流(){
        doactionmaxtime(function(){
            log("抓取")
            let liven = 直播间获取直播观看人数()
            if(liven){
                if(liven>livepersonmin){
                   
                    观众列表私信(liven)
                }else{
                    log("直播间人数过少 切换下一直播间 目前设置最小:"+livepersonmin) 
                }
               
                rswipe(20,10,17,10,3,500,300)
            }
            sleep(3000)
        },onelivetime*60*1000)
    }

    function 观众列表私信(currentperson){
        let n_liveman=  packageName("com.ss.android.ugc.aweme").className('android.widget.TextView').clickable(true).depth(18).drawingOrder(1).findOne(300)
        clicknode(n_liveman)
        let i=0
        let authorname=""
        doactionmaxnumber(function(){
            i=i+1
        if(text("在线观众").depth(12).drawingOrder(2).className('android.widget.TextView').findOne(300)){
          let n_b=  packageName('com.ss.android.ugc.aweme').className('android.widget.Button').visibleToUser().depth(13).findOne(300)
           if(n_b){
               //判断是否设置不可见
               if(n_b.desc().indexOf("***")>-1){
                    toastLog("主播设置了不可见切换下一个")
                    back()
                    sleep(1000)
                    return true
               }else  if(n_b.desc()!=authorname){
                   log(n_b.desc()+"--"+authorname)
                authorname=n_b.desc()
                clicknode(n_b)
                sleep(1000)
                if(textclick("主页")){
                    直播间私信(authorname)
                }
               }
           }
           //用户的下滑
            rswipe(20,10,17,10,15,500,300)
        }
        if(i>currentperson){
            return true
        }
        },200)
}
    
function 直播间获取主播信息(){
    while(true){
        if(currentActivity()!=dylive){
            进入直播页()
        }
   
      let tname=  packageName('com.ss.android.ugc.aweme').className('android.widget.TextView').drawingOrder(1).depth(19).findOne(300)
        if(tname){
         let authorname= tname.text()
            clicknode(tname)
            sleep(1500)
        textclick("主页")
        sleep(2000)
        waitForActivity("com.ss.android.ugc.aweme.profile.ui.UserProfileActivity",500)
        let n_dyzh=  textStartsWith("抖音号：").className('android.widget.TextView').depth(20).findOne(300);
        if(n_dyzh){
           let dyzh=n_dyzh.replace("抖音号：","")
        }

        }else{
         sleep(3000)
        }
    }
    return ""
}



function 直播间获取直播观看人数(){
    let n_liveman=  packageName("com.ss.android.ugc.aweme").className('android.widget.TextView').clickable(true).depth(18).drawingOrder(1).findOne(300)
   if(n_liveman){
        log("直播人数:"+n_liveman.text())
       return parseInt(n_liveman.text())
   }
  }

// 一次私信 传入username
function 直播间私信(username){


    textclick("主页")
    sleep(2000)
    descclick("更多")
    sleep(1000)
    textclick("发私信")
    sleep(2000)
    if(currentActivity()==dychat){
        editable().findOne(300).click()
        sleep(1000)
        let jz=引流话语[random(0,引流话语.length-1)]
        editable().findOne(300).setText(jz)
        sleep(500)
        clicknode(className("android.widget.FrameLayout").depth(11).drawingOrder(7).clickable(false).findOne(300))
        sleep(1000)
        back()
        sleep(1000)
        back()
        sleep(1000)
        back()
        sleep(1000)
        back()
        sleep(1000)
    }

}


function 回到抖音首页(index){
    while(true){
        let cp=currentPackage()
        log("包名:"+cp)
        if(cp==dypkg){
            let ca=currentActivity();
            log("活动页:"+ca)
            if(ca==dyhome){
            let bt=  packageName(dypkg).className("android.widget.FrameLayout").depth(11).clickable().drawingOrder(index).findOne(300)
            if(bt){
                bt.click();
                return  
              }else{
                back()
              }
            }else{
                back()
              }
            sleep(2000)
        }else{
            back()
            back()
            app.launch(dypkg)
            sleep(5000)
           
        }
        
    }
}
//通过长连接 获取用户id 
function parseUserIdWithLongUrl(url)
{
    urlRegex = /share\/user\/(\d+)\?/;
    var items=urlRegex.exec(url);
    urlRegexSecid =/sec_uid=(.*?)(?=&|$)/;
    var itemsSecid=urlRegexSecid.exec(url);
    if(itemsSecid&& itemsSecid.length>1)
    {
        this.secUid=itemsSecid[1];
    }
    if(items&& items.length>1)
    {
        log("用户ID:"+items[1]);
        return items[1];
    }
    else
    {
        log("正则未匹配到用户ID");
        log("url:"+url);
    }     
    return "";
}



//短连接转化为 长连接
function  parseUserIdWithShortUrl(url)
{
   let shorturl = shorturl()
}

//分享出来的链接 获取 链接
function url2shorturl(url){
    let urlRegex = /(https:\/\/v.douyin.com.*)/;

    let items=urlRegex.exec(url);
    if(items.length>1)
    {
        let weburl=items[1];
        if(weburl.trim()){
            return weburl.trim();
        }
    }
    return "";
}

// 短连接 通过网络 返回内容 获得长连接
function shorturl2longurl(url){
    let shorturl=url2shorturl(url)
    if(shorturl){
        let content = http.get(url);
        if(content&&content.statusCode != 200){
           log("请求失败: " + content.statusCode + " " + content.statusMessage);
        }
    else
    {
        return content.url+""
    }
    }
    return ""
}

//https://www.iesdouyin.com/share/user/70934775922?did=60115118309&iid=3095873727762179&sec_uid=MS4wLjABAAAAGGRvXZO3LKrK5CkcEH-pe6xyl2Wr4bBzuVDdLE10z0A&u_code=187md2c6m&timestamp=1609236301&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_app_name=douyin
// secUid secid 通过 只有 用户分享的链接 才有 secuid
function getsecUidWithLongUrl(longurl){
    let keylist=longurl.split("&")
    let secuid=""
    keylist.forEach(kv => {
        if(kv.startsWith("sec_uid")){
            let ss=kv.split("=")
            log("ss："+ss.length)
        log(ss[0])
        log(ss[1])
        secuid=ss[1]
        return  secuid
        }
    });
    return secuid;
}

function getsecUidWithShortUrl(shorturl){
   let longurl =shorturl2longurl(shorturl)
   return getsecUidWithLongUrl(longurl)
}


function getUserInfo(secuid){
    let url= "https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid=" + secuid
    log(url)
    var res = httpget(url);
    log(res)
    var userInfoJson = JSON.parse(res);
    log(userInfoJson)
}

getSaveConfig()

    toastLog("开始抖音引流")
    auto.waitFor()
        直播页搜索()
    //
    doactionmaxnumber(function(){
        log("一次循环")
        单一直播引流()
    },100)

}




function saveconfig1(){
   let sp= ui.in_spm.text()
   storage.put("shangpincontent",sp)
   let onetime=ui.in_onelivetime.text()||10
   storage.put("onelivetime", onetime)
   let personmin=ui.in_livepersonmin.text() || 50
     storage.put("livepersonmin",personmin)

   
}

//
function savehuashu(){
    let hs=ui.in_chatcontent.text()
    storage.put("yinliucontent",hs)
}



//启动一个悬浮窗开始
function run(){
    // threads.start(function(){
    //     //在新线程执行的代码
    //   start()
    //     // setInterval(function(){toast("你好")},1000)
    // });

    // log(抖音直播引流.toString()+";抖音直播引流();")
     engines.execScript("抖音直播引流",抖音直播引流.toString()+";抖音直播引流();")
}
// ------------------------------------------------------

var storage = storages.create("hd_dyyl");
var 引流话语=[]
var 引流内容=""
var 商品内容=""
var 商品名=[]  // 
const dypkg="com.ss.android.ugc.aweme"
const dyhome="com.ss.android.ugc.aweme.main.MainActivity"
const dylive="com.ss.android.ugc.aweme.live.LivePlayActivity"
const dychat ="com.ss.android.ugc.aweme.im.sdk.chat.ChatRoomActivity" //  私信对话框页
var onelivetime=10
var livepersonmin= 50;  //直播间最小在线人数 才去引流
var searchword=false; // 代表精确查找输入的文字  false  表示 点击出现的推荐文字
var yinliutype=1;  //
getSaveConfig()


//---------------------------------------------------


// 直播间获取主播信息()
// 直播间私信()

