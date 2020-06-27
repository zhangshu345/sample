var kugouselectnavi=function(index){
    node_tabs=className("android.widget.RelativeLayout").depth(9).drawingOrder(index).findOne(200)
    if(node_tabs){
       node_tabs.click()
    }
}
kugouselectnavi(5)