i=0
while(i<100){
    if(id("com.jt.hanhan.video:id/ga").findOne(300)){
        toastLog("找到了")
        id("com.jt.hanhan.video:id/ga").findOne(300).click()
    }else{sleep(1500)
        toastLog("没有找到："+i)
    }

    i=i+1
}
