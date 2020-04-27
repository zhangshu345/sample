auto.waitFor()
auto.setMode("normal")
engines.stopOther()
i=0
var enablegenius=device.sdkInt>=24

//node 执行点击 
var clicknode=function(v){
    if(v.clickable()){
      return  v.click()
    }
    if(enablegenius){
      log("text "+i+"可手势 范围可点击" )
        b=v.bounds()
        if(b.centerX()>0&&b.centerY()>0){
            log("控件在屏幕上")
           if(click(b.centerX(),b.centerY())){
               return true
           }else{
               return clicknode(v)
           }
          
        }else{
            log("控件不在屏幕上")
            return false
        }
     }else{
        log("text "+i+"不可手势 范围可点击" )
        if(clickparents(v)){
            return true
        }
        if(clickchilds(v)){
            return true
        }
        r=f.bounds()
        var w = boundsContains(r.left, r.top, r.right, r.bottom).clickable().findOne()
        if(w){
            log("text "+i+"找到所在区域可点击控件"+w.toString())
            return w.click()
        }else{
            return false
        }
    }
  
}


//一直找到可以点击控件向上查找
var clickparents=function(v,n){
    i=0
    n=n||15
    while(i<n){
        p=v.parent()
        if(p&&p.clickable()){
            log("找到可点击控件"+toString(p))
            return p.click()
        }else{
            i=i+1
            log("向上查找层数："+i)
            v=p
        }
    }
    return false
}
//找到子类 点击下去
var clickchilds=function(v){
   if(v.childCount()>0){
       for(i=0;i<v.childCount();i++){
           c=i.child(i)
           if(c.clickable()){
               return c.click()
           }else{
             if(clickchilds(v.child(i))){
                return true
             }
           }
       }
   }else{
       return false
   }
   return false 
}



while(true){
    sleep(8000)
  //  id("af").findOne().scrollBackward()

 vp=  id("com.jm.video:id/list").findOne()   //刷宝是播放控件的播放开始计算
// vp=id("com.kuaishou.nebula:id/view_pager").findOne()  //快手极速版  这个是那个
//vp=classNameEndsWith("RecyclerView").scrollable().findOne()
  if(vp){
      toastLog("找到刷宝滑动vp")
      //vp.scrollBackward()
      vp.scrollForward()
      sleep(200)
       player= id("com.jm.video:id/mask_layer").findOne()
       if(player){
           clicknode(player)
       }
       i=i+1
       toastLog("第"+i+"次上滑")
  }
  
}