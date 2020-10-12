log(device)
log("runtime:class:"+runtime.getClass())
log("accessibilityBridge:class:"+runtime.accessibilityBridge.getClass())
log("config：class："+runtime.accessibilityBridge.getConfig().getClass())
// var fields=runtime.accessibilityBridge.getConfig().getClass().getFields()
var fields=runtime.accessibilityBridge.getConfig().getClass().getDeclaredFields()
fields.forEach(f => {
    f.setAccessible(true);
    type=f.getGenericType().toString()
    log("config 属性："+f.getName()+"--"+type)
});
var funs=runtime.accessibilityBridge.getConfig().getClass().getMethods()
funs.forEach(f =>{
    log("函数:"+f.toString())
})
// var conss=runtime.accessibilityBridge.getConfig().getClass().getConstructors();
// conss.forEach(c =>{
//     log("构造方法："+c.toString())
// })

// let ss =runtime.accessibilityBridge.getConfig().֏
// ss.forEach(s =>{
//     log(s)
// })
log(runtime.accessibilityBridge.getConfig().whiteListContains("你好"))