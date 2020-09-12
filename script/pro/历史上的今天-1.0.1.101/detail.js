"ui";
activity.getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
ui.statusBarColor("#ffffff")
ui.layout(
    <vertical bg="#ffffff" fitsSystemWindows="true">
       <linear id="toolbar" clipChildren="false" elevation="1" bg="#ffffff" gravity="center"> 
          <img id="back" w="38" h="38" padding="5" margin="8" tint="#555555" foreground="?selectableItemBackgroundBorderless" src="file://back_arrow.png"/>
          <text textColor="#333333" gravity="center" margin="12" layout_weight="1" textSize="19" text="{{date}}"/> 
          <View w="38" h="38" margin="8"/>
       </linear>
       <View id="progress" w="*" h="2" bg="#468bee"/>      
       <webview id="web" h="*" w="*"/>
    </vertical>
)
ui.back.click(()=>{ui.finish()})
ui.web.setOverScrollMode(2)
ui.progress.setScaleX(0)
//let url="http://www.todayonhistory.com/11/30/YueZhanZhongDeMeiLaiCunDaTuShaBeiJieFa.html"

let a1=android.animation.ObjectAnimator.ofFloat(ui.progress, "scaleX", 0, 1.0);
a1.setRepeatCount(-1)
a1.setDuration(600)
a1.setInterpolator(new android.view.animation.DecelerateInterpolator())
a1.start()

ui.web.setWebViewClient(new JavaAdapter(android.webkit.WebViewClient,{
    onPageFinished:function(view,url){
        a1.end()
        ui.progress.setVisibility(8)
    }
}))


threads.start(function(){
    try{
       let hg=http.get(url).body.string()
       let hea=hg.match(/\<html\>[\s\S]*?\<body[\s\S]*?\>/)[0]
       let con=hg.match(/\<div\sclass\=\"content\"[\s\S]+class\=\"blue\"\>.*?\<\/a\>\s*?<\/div\>/)[0]
       
       let apiScript=hg.match(/(www.todayonhistory.com\/api.php.*?)\"/)[1]
       let t=http.get(apiScript).body.string()
       ui.run(function(){
         ui.web.loadDataWithBaseURL(url,hea+con+"<script>document.querySelector('.content').style.padding='8';document.querySelector('h1').style.color='Black';$('.keylink').click(()=>{return false});$('.blue').click(()=>{return false});document.querySelector('.time').style.display='none';"+t+"</script></body></html>","text/html","utf-8",null)
       })
    }catch(e){
        toast("解析失败，将加载原网页");
        ui.run(function(){ui.web.loadUrl(url)})
    }
});








