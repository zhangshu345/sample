var 天天爱清理上滑=function(){
    node_rv=id("com.xiaoqiao.qclean:id/community_recycler_view").findOne(300)
    if(node_rv){
        node_rv.scrollBackward()
        return true
    }
    return false 
}
var 天天爱清理下滑=function(){
    node_rv=id("com.xiaoqiao.qclean:id/community_recycler_view").findOne(300)
    if(node_rv){
        node_rv.scrollForward()
        sleep(100)
       
        id("com.xiaoqiao.qclean:id/ll_task").findOne(100).click()
        sleep(200)
        id("com.xiaoqiao.qclean:id/ll_video").findOne(100).click()
        sleep(500)
        if(text("查看详情").exists()){
           back()
           back()
           sleep(1000)
           app.launchApp("天天爱清理")
           sleep(1000)
        }
        return true
    }
    return false 
}

i=0
while(i<2000){

if(天天爱清理下滑()){
    toastLog("下滑成功")


    sleep(7000)
}else{
    toastLog("下滑失败") 
}
i=i+1
}