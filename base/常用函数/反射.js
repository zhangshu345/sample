// log(device)
log("runtime:class:"+runtime.getClass())
function clearconfig(){
    var config=runtime.accessibilityBridge.getConfig();
// log("accessibilityBridge:class:"+runtime.accessibilityBridge.getClass())
// log("config：class："+config.getClass())
// var fields=runtime.accessibilityBridge.getConfig().getClass().getFields()
var fields=runtime.accessibilityBridge.getConfig().getClass().getDeclaredFields()
fields.forEach(f => {
    f.setAccessible(true);
    type=f.getGenericType().toString()
    // log("config 属性："+f.getName()+"--"+type)
    if(type=="java.util.List<java.lang.String>"){
        var ss=f.get(config);
        // log("数组"+  f.get(config))
        ss.clear()
    //   log("数组"+  f.get(config))
    }
 });
}

function logallfileds(name,ob){
    let name=name|| ob.getClass().getSimpleName()
    var fields=ob.getClass().getDeclaredFields();
    fields.forEach(f => {
        f.setAccessible(true);
        type=f.getGenericType().toString()
        log(name+"属性："+f.getName()+"--"+type)
    });
}

function logallfun(name,ob){
    let name=name||ob.getClass().getSimpleName()
    var funs=ob.getClass().getMethods()
    // var funs=ob.getClass().getDeclaredMethods();
funs.forEach(f =>{
    log(name+"函数："+f)
})

}

function logconfig(){
    var config=runtime.accessibilityBridge.getConfig();
var fields=runtime.accessibilityBridge.getConfig().getClass().getDeclaredFields()
fields.forEach(f => {
    f.setAccessible(true);
    type=f.getGenericType().toString()
    // log("config 属性："+f.getName()+"--"+type)
    if(type=="java.util.List<java.lang.String>"){
        var ss=f.get(config);
        log("第二次数组"+  f.get(config))
    }
 });
}

function clicknode(node){
    if(node){
        r=node.bounds()
        click(r.centerX(),r.centerY())
    }
}

function textclick(ss){
    let s=text(ss).findOne(300)
    if(s){
       clicknode(s)
       log(ss)
    }else{
        log(ss+"没有找到")
    }
}

//autopro 取消包名限制 

function clearuiselectconfig(){
    var selector=runtime.selector();
    log("uiselector:"+selector.getClass())
    var fields=selector.getClass().getDeclaredFields();
    fields.forEach(f => {
        f.setAccessible(true);
        type=f.getGenericType().toString()
        // log("uiselector 属性："+f.getName()+"--"+type)
        // if(type=="java.util.List<java.lang.String>"){
        //     var ss=f.get(config);
        //     // log("数组"+  f.get(config))
        //     ss.clear()
        // //   log("数组"+  f.get(config))
        // }

    });
    var bridge=selector.mAccessibilityBridge
    // log("bridge："+bridge.getClass())
    var config=bridge.getConfig();
    var fields=config.getClass().getDeclaredFields()
    fields.forEach(f => {
    f.setAccessible(true);
    type=f.getGenericType().toString()
    if(type=="java.util.List<java.lang.String>"){
        log("config 属性："+f.getName()+"--"+type)
        var ss=f.get(config);
        log("数组"+  f.get(config))
        ss.clear()
      log("清理之后数组"+  f.get(config))
    }
    });
log(bridge.getClass().getName())
bridge.setWindowFilter(function filter(w){
    // log(w)
    return true
})

}

clearuiselectconfig()
// setInterval(function(){
//     log("根布局:"+bridge.windowRoots())
//     textclick("我")
// },2000)
const wx=app.getPackageName("微信")
app.launchApp("微信")
waitForPackage(wx)
sleep(2000)
textclick("微信")
sleep(1000)
textclick("华清分享")
