"ui";
let advancedEngines=require("advancedEngines")
let showMonth=new Date().getMonth()+1
let showDay=new Date().getDate()
let RM=new refreshManager()

activity.getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
ui.statusBarColor("#ffffff")
ui.layout(
  <vertical fitsSystemWindows="true">
    <linear id="toolbar" clipChildren="false" elevation="1" bg="#ffffff" gravity="center"> 
       <img id="back" w="38" h="38" padding="5" margin="8" tint="#555555" foreground="?selectableItemBackgroundBorderless" src="file://back_arrow.png"/>
       <text textColor="#333333" gravity="center" margin="12" layout_weight="1" textSize="19" text="历史上的今天"/> 
       <img id="selectTime" w="38" h="38" padding="5" margin="8" tint="#555555" foreground="?android:attr/selectableItemBackgroundBorderless" src="file://calendar.png"/>
    </linear>
    <frame>
    <androidx.swiperefreshlayout.widget.SwipeRefreshLayout id="srl">
       <list id="list" h="*" w="*">
          <linear w="*">
             <frame w="30" h="*">
                <View h="*" w="3" layout_gravity="center" bg="#19000000"/>
                <card w="20" h="20" visibility="{{nodeVisibility}}" cardCornerRadius="10" cardElevation="0" cardBackgroundColor="{{nodeColor}}" layout_gravity="center_horizontal" marginTop="10"/>                            
             </frame>
             <vertical w="*">
                <linear visibility="{{nodeVisibility}}" w="*">
                   <View h="3" w="12" layout_gravity="center_vertical" bg="#19000000"/>
                   <text text="{{year+'-'+showMonth+'-'+showDay}}" h="40" marginLeft="5" gravity="center_vertical" textSize="22" textColor="#333333"/> 
                </linear>
                <card id="card" foreground="?selectableItemBackground" margin="8 0 8 12" w="*" h="wrap_content" cardElevation="4" cardCornerRadius="12">                     
                   <linear h="wrap_content" w="*">
                      <img minHeight="110" radiusTopRight="6" radiusBottomRight="6" w="140" visibility="{{(desc!=''?'gone':'visible')}}" h="*" src="{{image}}" scaleType="centerCrop"/>
                      <vertical h="*" gravity="center_vertical">
                         <text size="16" padding="10 10 8 10" textColor="#dd000000" text="{{title}}" w="*"/>
                         <text size="14" padding="12 0 8 10" visibility="{{(desc==''?'gone':'visible')}}" textColor="#99000000" text="{{desc}}" w="*"/>
                      </vertical>
                   </linear>
                </card>                         
             </vertical>                       
          </linear>
       </list>
    </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
    <View id="mask" bg="#77000000" w="*" h="*" clickable="true" visibility="gone"/>
    <com.stardust.theme.widget.ThemeColorFloatingActionButton
         layout_gravity="bottom|right"
         id="fab"
         w="auto" h="auto"
         layout_margin="16dp"
         src="@drawable/ic_expand_more_black_48dp"
         backgroundTint="#468bee"
         rippleColor="#22000000"
         tint="#ffffff"/>
    </frame>
  </vertical>  
)
initPop()

ui.fab.hide()
ui.back.click(()=>{ui.finish()})
ui.list.setOverScrollMode(2)

RM.refresh()
ui.srl.setOnRefreshListener({
    onRefresh:function(){RM.refresh()}
})
ui.fab.click(()=>{
    RM.refresh(true)
})
ui.list.on("item_bind",(itemView,itemHolder)=>{
    itemView.card.click(callback)
    
    function callback(){
        advancedEngines.execScriptFile("detail.js",{
            url:itemHolder.getItem().url,
            date:itemHolder.getItem().year+"-"+showMonth+"-"+showDay
        })
    }
})
ui.list.addOnScrollListener(new Packages.androidx.recyclerview.widget.RecyclerView.OnScrollListener({
    onScrolled:function(view,dx,dy){
        if(view.computeVerticalScrollExtent()+view.computeVerticalScrollOffset()>=view.computeVerticalScrollRange()){
            if(RM.noMore()){
                showSnack("没有更多数据")
                return
            }
            else ui.fab.show()
        }else if(ui.fab.isShown()){
            ui.fab.hide()
        }
    }
}))
function refreshManager(){
    let DATA=null
    let refreshThread=null
    let NowPage=0
    let noMore=false
    this.refresh=function(isMore){
        if(refreshThread&&refreshThread.isAlive()){
            showSnack("请等待当前加载完毕")         
            return
        }
        refreshThread=threads.start(function(){
            
            if(isMore){
               NowPage++
               let data=todayOnHistory(showMonth,showDay,NowPage)              
               if(!data)return
               data=parseHistoryData(data)
               if(data.length==0){
                   showSnack("没有更多了数据")
                   ui.run(()=>{ui.fab.hide()})
                   noMore=true
                   return
               }
               for(let ad of data)
                  DATA.push(ad)
               showSnack("加载成功")
               ui.run(()=>{ui.fab.hide()})
            }else{
               NowPage=0
               ui.run(()=>{ui.srl.setRefreshing(true)})
               let data=todayOnHistory(showMonth,showDay,NowPage) 
               if(!data)return
               DATA=parseHistoryData(data)              
            }
            noMore=false
            ui.run(()=>{
               ui.list.setDataSource(DATA)
               if(isMore)return
               ui.srl.setRefreshing(false)
               ui.list.smoothScrollToPosition(0);
            })
            
        })
    }
    this.noMore=function(){return noMore}
}
function initPop() {
    global.blankImg="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
    let popView = ui.inflate(
        <frame>
            <img src="{{blankImg}}" tint="#ffffff" scaleType="centerCrop" radiusBottomLeft="20dp" radiusBottomRight="20dp"/>
            <vertical>
                <linear gravity="center">
                    <NumberPicker w="60" marginRight="30" id="npMonth"/>
                    <NumberPicker w="60" id="npDay"/>
                </linear>
                <linear>
                    <button id="backtoday" text="回到今天" textColor="#468bee" layout_gravity="start" style="Widget.AppCompat.Button.Borderless.Colored"/>
                    <View h="0" layout_weight="1"/>
                    <button id="sure" text="确定" textColor="#468bee" layout_gravity="start" style="Widget.AppCompat.Button.Borderless.Colored"/>
                </linear>
            </vertical>
        </frame>,ui.inflate(<linear/>))
    //设置不可循环
    //popView.npMonth.setWrapSelectorWheel(false);
    //popView.npDay.setWrapSelectorWheel(false);
    //设置不可编辑
    popView.npMonth.setDescendantFocusability(android.widget.NumberPicker.FOCUS_BLOCK_DESCENDANTS);
    popView.npDay.setDescendantFocusability(android.widget.NumberPicker.FOCUS_BLOCK_DESCENDANTS);
    popView.npMonth.setMinValue(1);
    popView.npMonth.setMaxValue(12);
    popView.npDay.setMinValue(1)
    popView.npDay.setMaxValue(30)
    setShowValue()
    let popWin = new android.widget.PopupWindow(popView, -1, -2)
    let is=new android.transition.Slide(android.view.Gravity.TOP)
    is.setDuration(250)
    popWin.setEnterTransition(is)
    
    let os=new android.transition.Slide(android.view.Gravity.TOP)
    os.setDuration(250)
    os.setMode(android.transition.Visibility.MODE_OUT)
    popWin.setExitTransition(os)
    
    ui.selectTime.click(() => {
        setShowValue()
        if (!popWin.isShowing()){
            popWin.showAsDropDown(ui.toolbar)
            setMaskShow(true)
        }else{
            setMaskShow(false)
            popWin.dismiss()
        }
    })
    ui.mask.click(()=>{
        if(popWin.isShowing()){
            setMaskShow(false)
            popWin.dismiss()
        }
    })
    popView.backtoday.click(()=>{
        backToToday()
        RM.refresh()
        setMaskShow(false)
        popWin.dismiss()
    })
    popView.sure.click(()=>{
        showMonth=popView.npMonth.getValue()
        showDay=popView.npDay.getValue()
        RM.refresh()
        setMaskShow(false)
        popWin.dismiss()
    })
    popView.npMonth.setOnValueChangedListener(function(np,oldI,newI){
        popView.npDay.setMaxValue(getCountDays(newI))
    })
    function backToToday(){
        showMonth=new Date().getMonth()+1
        showDay=new Date().getDate() 
        setShowValue()
    }
    function setMaskShow(isShow){
        ui.mask.attr("visibility",isShow?"visible":"gone")
    }
    function setShowValue(){
        popView.npMonth.setValue(showMonth)
        popView.npDay.setValue(showDay)
    }
    function getCountDays(month) {
       var curDate = new Date();
       curDate.setMonth(month);
       if(month==1)curDate.setMonth(0)
       curDate.setDate(0)
       return curDate.getDate();
    }
}
function showSnack(str){
   com.google.android.material.snackbar.Snackbar.make(ui.srl,str,1000).show()
}
function parseHistoryData(data){
    let nodeColors=["#FFFF0000","#FF972EFF","#FF5290E7","#FFFE6D68","#FFFEC52D","#FF75C228","#FF40B3BA"]
    let lastColor=null
    let year=null
    for(let ad of data){
        if(year==ad.year)ad.nodeVisibility="gone"
        else{
            ad.nodeVisibility="visible"            
            year=ad.year
        }
        
        let color=nodeColors[random(0,nodeColors.length-1)]
        while(color==lastColor)color=nodeColors[random(0,nodeColors.length-1)]      
        if(ad.nodeVisibility=="visible")lastColor=color
        ad.nodeColor=color
    }
    return data
}
function todayOnHistory(month, day, index) {
  try{
    let ret=[]
    if (index == 0) {
        let str = http.get("http://www.todayonhistory.com/"+month+"/"+day).body.string()
        let mat = str.match(/\<div\sclass\=\"((pic)|(text\spr))\"\>([\s\S]*?)\<\/div\>/g)
        for (let at of mat) {
           
            let data={}           
            data.title = at.match(/title\=\"(.*?)\"/)[1]
            data.year = at.match(/\<span\>(.*?)\<\/span\>/)[1].split("年")[0]
            
            if(at.indexOf("text pr")==-1){
               data.url = at.match(/\<a\shref\=\"(.*?)\"\sclass\=\"txt\"/)[1]
               
               let image = at.match(/data\-original\=\"(.*?)\"/)[1]
               if (image[0] == "/") image = "http://www.todayonhistory.com" + image
               data.image=image           
               data.desc=""
            }else{
               data.url = at.match(/\<a\shref\=\"(.*?)\"\stitle\=/)[1]
               data.image="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
               data.desc=at.match(/\<p\>(.*?)\<\/p\>/)[1]              
            }
            ret.push(data)
        }
    } else {
        let hg=http.get("http://www.todayonhistory.com/index.php?a=json_event&page="+index+"&pagesize=40&month="+month+"&day="+day).body.string()
        if(hg!=0){
            hg=JSON.parse(hg)
            for(let at of hg){
                let image=at.thumb[0]=="/"?"http://www.todayonhistory.com"+at.thumb:at.thumb
                let data={
                   image: image,
                   year: at.solaryear,
                   url: at.url,
                   title: at.title,
                   desc:""
                }
                if(data.image==""){
                   data.image="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
                   data.desc=at.description
                }
                ret.push(data)
            }
        }
    }
    return ret
  }catch(e){
    showSnack("加载失败:"+e.toString())
    return null
  }
}