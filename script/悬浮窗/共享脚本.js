var w = floaty.rawWindow(
    <com.hongshu.autotools.core.widget.ScriptMarketView w="*" h="*" gravity="center" bg="#FFFFFF"/>
);

w.setSize(-1, -1);
w.setTouchable(false);

setTimeout(()=>{
    w.close();
}, 60000);