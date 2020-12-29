var w = floaty.rawWindow(
    <vertical w="*" h="*" >
        <button id="idclose"  text="关闭"></button>
        <com.hongshu.autotools.core.widget.ScriptMarketView w="*" h="*" gravity="center" bg="#FFFFFF"/>
    </vertical>
    
);

w.setSize(-1, -1);
w.setTouchable(true);
w.idclose.on("click",function(v){
    exit()
})
setTimeout(()=>{
    w.close();
}, 60000);