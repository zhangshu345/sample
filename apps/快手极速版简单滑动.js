//----------------------------------快手子程序--------------------------------------------//
left = 0;
top = 0;
right = device.width;
buttom = device.height / 2;
var w = device.width;
var h = device.height;
function 快手上滑() {
    var w = device.width;
    var h = device.height;
    // swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    swipe(w * 0.6, h * 0.8, w * 0.6, h * 0.3, random(220, 235))
}
var alter=sync(function(txt,t,left,top,width,height){
    t=t||2000
    left= left ||device.width/20
    top =top || device.height/20
    width =width|| device.height/20*19
    height =height || device.height/15
    var fw=floaty.window(
        <frame gravity="center">
        <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">悬浮文字</text>
        </frame>
    );
    fw.setAdjustEnabled(false)
    fw.setTouchable(false)
    fw.setSize(1, 1)
    fw.setPosition(50,85)
      ui.run(function(){
          console.log(txt)
        fw.text.setText(txt)
        fw.setSize(device.width-100, 120)
        setTimeout(()=>{
            fw.close()
        },t)
     })
});



function httpget(url) {
    log("脚本url:"+url)
        var r = http.get(url);
           if (r.statusCode == 200) {
            return r.body.string()
        } else {
            return ""
        }
}


function 初始化() {
    alter("初始化")
    // 首页分享的ID
    while (true) {
     sleep(2000)
    
        var 首页标识控件 = id("circular_progress_bar").exists();
        
        if (首页标识控件) {
            alter("初始化完成");
            break
        }else{
            alter("未找到首页标识,返回");
            back()
        }
    }
}


function 弹窗() {
    sleep(200)
    if (id("btn_privacy_action").exists()) {
        alter("其中一个窗口")
        id("btn_privacy_action").findOne(1000).click()
    }
    if (id("close").exists()) {
        //要支持的动作
        alter('存在关闭按钮')
        id("close").findOne().click();
    }
    if (text("我知道了").exists()) {
        //要支持的动作
        alter('存在我知道了')
        text("我知道了").findOne().click();
    }
}
// 快手极速版 主函数
function 快手签到() {
    var 左上菜单是否存在 = id("left_btn").findOne(5000);
    if (!左上菜单是否存在) {
        return
    }
    弹窗()
    //  点击 左上角 菜单
    var 左上菜单是否存在 = id("left_btn").exists();
    log("左上角上菜单" + 左上菜单是否存在)
    if (左上菜单是否存在) {
        id("left_btn").findOne().click();
    }
    sleep(1000)
    //点击 去挣钱
    var 赚钱按钮否存在 = text("去赚钱").exists();
    log("赚钱按钮否存在" + 赚钱按钮否存在)
    if (赚钱按钮否存在) {
        log('去赚钱--------->' + text("去赚钱").findOne().clickable())
        //  去父控件点击
        text("去赚钱").findOne().parent().click();
    }
    num = 0
    while (true) {
        num += 1
        if (num > 5) {
            初始化()
            return
        }
        sleep(3000)
        result = desc("复制链接").exists()
        if (result) {
            break
        }
        result = text("复制链接").exists()
        if (result) {
            break
        }

    }
    sleep(3000)
    弹窗()
    var 立即签到是否存在 = text("立即签到").exists();
    log("立即签到是否存在" + 立即签到是否存在)
    if (立即签到是否存在) {
        // text("立即签到").findOne().clickable();
        text("立即签到").findOne().click();
        sleep(200)
        初始化()
        return
    }
    var 立即签到是否存在 = desc("立即签到").exists();
    log("立即签到是否存在" + 立即签到是否存在)
    if (立即签到是否存在) {
        desc("立即签到").findOne().click();
        sleep(200)
        初始化()
        return
    }
    sleep(200)

    //点击 去签到 
    num = 1
    while (true) {
        console.log("循环检测去签到按钮");
        num += 1
        if (num > 30) {
            初始化()
            return
        }
        sleep(1000)
        var 签到领金币1 = desc("签到领金币").boundsInside(left, top, right, device.height * 0.8).exists();
        var 签到领金币2 = text("签到领金币").boundsInside(left, top, right, device.height * 0.8).exists();
        if (签到领金币1 || 签到领金币2) {
            console.log();
            break
        }
        log("开始上滑")
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.6 + random(10, 30), random(220, 235))

    }
    var 去签到是否存在 = text("去签到").boundsInside(left, top, right, device.height * 0.8).exists();
    log("立即签到是否存在" + 去签到是否存在)
    if (去签到是否存在) {
        // text("立即签到").findOne().clickable();
        text("去签到").findOne().click();
        sleep(500)
        初始化()
        return
    }
    var 去签到是否存在 = desc("去签到").boundsInside(left, top, right, device.height * 0.8).exists();
    log("立即签到是否存在" + 去签到是否存在)
    if (去签到是否存在) {
        desc("去签到").findOne().click();
        sleep(500)
        初始化()
        return
    }
}
function 验证滑块(){
  if( id("com.kuaishou.nebula:id/title_tv").exists()){
      if(text("拖动滑块").exists()){
          hk=hk+1
          var c=0
          while(true){
            log("快手滑块验证")
            c=c+1
            if(device.width<=720){
                swipe(720, 645, w * 0.7, 650, random(1220, 1505)) 
            }else if(device.width<=1080){
                swipe(125, 980, w * 0.7, 980, random(1220, 1505))
            }else{
                swipe(135, 980, w * 0.7, 980, random(1220, 1505))
            }
        
            sleep(1000)
            if(text("发现").exists()||text("关注").exists()){
                hkc=hkc+1
                log("滑块验证成功:"+hk+":"+hkc)
                return
            }
          }
      }
  }
}
/*
var 公共函数url="https://gitee.com/zhangshu345012/sample/raw/v1/%E5%9F%BA%E7%A1%80/%E9%98%85%E8%AF%BB%E5%85%AC%E5%85%B1%E5%87%BD%E6%95%B0%E9%9B%86%E5%90%88.js"
var  公共函数文本=httpget(公共函数url)
log(公共函数文本)

if (公共函数文本 != "") {
    eval(公共函数文本)
    log("公共函数实例化成功")
}
else {
    log("公共函数实例化失败,程序返回")
}
*/

app.launch("com.kuaishou.nebula")
alter("开始")
    初始化()
    var i=0
    var hk=0
    var hkc=0
    while (true) {
        var c = random(10000, 15000)
        sleep(c)
        弹窗()
        验证滑块()
        log("快手开始上滑："+i+"--出现滑块次数："+hk+"--成功："+hkc)
        快手上滑();
        i=i+1
    }

