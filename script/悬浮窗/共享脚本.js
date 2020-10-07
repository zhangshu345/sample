var w = floaty.rawWindow(
    <com.hongshu.autotools.core.widget.ScriptMarketView w="*" h="*" gravity="center" bg="#44ffcc00"/>
);

w.setSize(-1, -1);
w.setTouchable(false);

setTimeout(()=>{
    w.close();
}, 60000);