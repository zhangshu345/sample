auto.waitFor()
toastLog("按压音量下键即可停止该工具")
while(true){
    if(currentActivity()=="com.ss.android.ugc.aweme.following.ui.FollowRelationTabActivity"){
        if(textclick("已关注")){
            sleep(100)
        }else{
            比例滑动(20,10,18,10,4,500,300)
        }
    }else{
        sleep(3000)
    }
 
}