auto.waitFor()
auto.setMode("normal")
engines.stopOther()
i=0
while(true){
    sleep(6000)
  //  id("af").findOne().scrollBackward()

 vp=  id("com.kuaishou.nebula:id/slide_play_view_pager").findOne()
// vp=id("com.kuaishou.nebula:id/view_pager").findOne()  //快手极速版  这个是那个
//vp=classNameEndsWith("RecyclerView").scrollable().findOne()
  if(vp){
      toastLog("找到快手滑动vp")
      //vp.scrollBackward()
      vp.scrollForward()
  }
    i=i+1
    toastLog("第"+i+"次上滑")
}