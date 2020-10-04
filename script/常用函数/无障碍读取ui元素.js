
var w = floaty.rawWindow(
    <frame w="*" h="*">
       <com.hongshu.automator.analy.layoutinfoview.UIAnalyView
       id="uianaly"
        w="*"  h="*"/> 
    
    </frame>
);
w.setPosition(-1, com.blankj.utilcode.util.BarUtils.getStatusBarHeight());
w.setSize(-1, -1);


let acc=com.hongshu.autojs.core.accessibility.AccessibilityService.Companion.getInstance()
log("ss")
log(acc)
let nos=acc.readNode()
log("是否为空"+(nos!=null))
w.uianaly.setNodes(nos)

// log(com.alibaba.fastjson.JSON.toJSONString(nos))
log("结束")

events.onceKeyUp("KEYCODE_BACK",function(event){
    w.close()
})
setTimeout(()=>{
    w.close();
}, 30000);

events.observeKey();

var keyNames = {
    "KEYCODE_VOLUME_UP": "音量上键",
    "KEYCODE_VOLUME_DOWN": "音量下键",
    "KEYCODE_HOME": "Home键",
    "KEYCODE_BACK": "返回键",
    "KEYCODE_MENU": "菜单键",
    "KEYCODE_POWER": "电源键",
};

events.on("key", function(code, event){
    var keyName = getKeyName(code, event);
    if(event.getAction() == event.ACTION_DOWN){
        toast(keyName + "被按下");
    }else if(event.getAction() == event.ACTION_UP){
        toast(keyName + "弹起");
        if(keyName=="返回键"){
            w.close()
        }
    }
});

loop();


function getKeyName(code, event){
    var keyCodeStr = event.keyCodeToString(code);
    var keyName = keyNames[keyCodeStr];
    if(!keyName){
        return keyCodeStr;
    }
    return keyName;
}