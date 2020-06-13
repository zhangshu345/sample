var clickonetexts=function(texts,t,st){
    log("开始点击文本集合:"+texts)
      st=st || 500
      t=t || 500
      for(i=0;i<texts.length;i++){
          if(textclick(texts[i],t)){
              sleep(st)
              return true
          }
      }
      return false
  }


  
//文本点击
function textclick(i,t,left,top,right,bottom){
    t=t || 100
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(t);
    if(!f){
        log("text："+i+":没找到了")
        return false
    }
    log("text："+i+":找到了")
    return clicknode(f)
}

var checkscreencapture=function(){
    //    captureScreen("/sdcard/screencapture" + i + ".png");
  // engines.execScript("requestscreencapture",httpget("https://gitee.com/zhangshu345012/sample/raw/v1/base/requestscreencapture.js"),{})
  threads.start(function() {
    n_t=0
      while(n_t<5){
          n_t=n_t+1
        if(clickonetexts(["立即开始","允许","始终允许"],100,100)){
            return
        }
        sleep(1500)
      }
})
if (!requestScreenCapture()) {
   toastLog("请求截图权限失败！");
}else{
    toastLog("请求截图权限成功！");
    captureScreen("/sdcard/ce.png");
}
}




//node 执行点击 
var clicknode=function(v){
    if(!v){return false; }
    if(v.clickable()){ return  v.click();}
    if(enablegenius){
        b=v.bounds()
        if(b.centerX()>0&&b.centerY()>0){
            return click(b.centerX(),b.centerY())
        }else{  return false }
     }else{ 
         if(clickparents(v)){ return true  }
         if(clickchilds(v)){  return true}
         r=v.bounds()
          var w = boundsContains(r.left, r.top, r.right, r.bottom).clickable().findOne()
          if(w){ return w.click() ;}
         else{ return false;  }
    }
}

//一直找到可以点击控件向上查找
var clickparents=function(v,n){
    let i=0
    n=n||15
    while(i<n){  p=v.parent();
        if(p&&p.clickable()){log("找到可点击控件"+toString(p));  return p.click(); }
        else{ i=i+1; log("向上查找层数："+i); v=p }    }
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


importClass(com.hongshu.androidjs.core.debug.DevPluginService)
DevPluginService.getInstance().debugtoip("192.168.3.2");

checkscreencapture()
n=1
while(n<1000){
    toastLog("截屏："+n)
    captureScreen("/sdcard/"+n+".png");
    sleep(10000)
    n=n+1
}