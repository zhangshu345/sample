auto.waitFor()
toastLog("按压音量下键即可停止抖音回关")
while(true){
    if(currentActivity()=="com.ss.android.ugc.aweme.following.ui.FollowRelationTabActivity"){
        if(textclick("回关")){
            sleep(100)
        }else{
            if(text("查找好友并关注").exists()){
                toastLog("已经运行到底了  抖音互关粉丝 执行完成")
               break
            }
            比例滑动(20,10,18,10,4,500,300)

        }
    }else{
        sleep(3000)
    }

}