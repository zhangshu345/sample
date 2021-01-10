auto.waitFor()
toastLog("按压音量下键即可停止抖音取消关注")
while(true){
        if(textclick("互相关注")){
            sleep(200)
            textclick("取消关注")
        }else{
            比例滑动(20,10,18,10,4,500,300)
        }
        if(textclick("取消关注")){
            sleep(500)
        }else{
            if(text("查找好友并关注").exists()){
                toastLog("已经运行到底了  抖音取消互相关注 执行完成")
               break
            }
        }

}