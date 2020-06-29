var kugouselectnavi=function(index){
    node_tabs=className("android.widget.RelativeLayout").depth(9).drawingOrder(index).findOne(200)
    if(node_tabs){
       node_tabs.click()
    }
}
gfw=floaty.rawWindow(
    <horizontal>
        <text  id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
    </horizontal>
);
gfw.setSize(device.width, 120)
gfw.setTouchable(false)
gfw.setPosition(0,80)


sleep(10000)