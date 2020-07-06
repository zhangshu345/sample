node_cishu=textMatches("今日还剩\\d+次机会").findOne(1000)
if(node_cishu){
    toastLog("找到今日还剩")

    
}else{
    toastLog("没有找到今日还剩")
}