"ui";

var jsoup=org.jsoup.Jsoup
const userAgent ='Mozilla/5.0 (Linux; Android '+device.release+' '+device.model+' Build/'+device.buildId+') AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.61 Mobile Safari/537.36';
var storage = storages.create("hs_dyqxgz");
var lastsavedir=storage.get("lastsavedir")
var autosetclip =storage.get("autosetclip")

function 抖音取消关注(){
auto.waitFor()
toastLog("按压音量下键即可停止抖音取消关注")
while(true){
    if(currentActivity()=="com.ss.android.ugc.aweme.following.ui.FollowRelationTabActivity"){
        if( textclick("已关注")){
            sleep(100)
        }else{
            比例滑动(20,10,18,10,4,500,300)
        }
    }else{
        sleep(3000)
    }
}
}

//显示界面
function showUI(){
    ui.layout(
        <scroll>
        <vertical h="*"  margin="0 50">
            <text  w="*"  color="#111111" gravity="center" size="16" >抖音取消关注</text>
             <checkbox id="white" marginLeft="4" marginRight="6"  text="白名单（名单中的人不取关）：举例  某号1|某号2|某号3" />
             <input id="white" w="*" h="auto"/>
             <checkbox id="white" marginLeft="4" marginRight="6"  text="黑名单（名单中的人取关）：举例 某号1|某号2|某号3" />
             <input id="black" w="*" h="auto"/>
             <checkbox id="yiguanzhu" marginLeft="4" marginRight="6"  text="已关注" />
             <checkbox id="huxiangguanzhu" marginLeft="4" marginRight="6"  text="互相关注" />
            <linear gravity="center">

            <button id="whiterun" text="白名单模式运行"/>
             <button id="blackrun" text="黑名单模式运行"/>
             <button id="run" text="运行"/>
          </linear>
          <text >使用方式:先点击允许后手动运行抖音 进入 抖音关注页 取关到最后 按压音量下键即可停止该工具</text>
        </vertical>
        </scroll>
     
    );
    if(lastsavedir){
        ui.dir.text(lastsavedir)
    }
    ui.getclip.on("click",() =>{
        ui.clip.text(getClip())
    })

    if(autosetclip){

    }else{

    }
    ui.autosetclip.setChecked()
    ui.autosetclip.on("check", function (checked) {
        //设置或取消中划线效果
        autosetclip=checked
       
    });
    ui.change.on("click", () => {
      threads.start(function(){
          let content=ui.clip.getText()
        if(content){
            // log(content)
                url =url2shorturl(content)
        if(url.startsWith("https://v.douyin.com")){
            let res =  main(url);
            ui.run(function(){
                ui.novideo.setText(""+res.url)
            })
            toastLog(res.name+"   "+res.url)
            if(autosetclip){
                setClip(res.name+"   "+res.url)
            }
        }else{
           
        }
      }});
    });
    
    function downloadfile(){
      let dir=ui.dir.text()
      if(!dir){
        alter("请填写好文件保存目录")
        return 
      }
      let filename=ui.filename.text()
      if(!filename){
          alert("请填写好文件保存名")
          return
      }
      let videourl=ui.novideo.text()
      if(!videourl){
          alert("请先获取无水印地址后再下载")
          return
      }
      threads.start(function(){
          下载文件(videourl, "/sdcard/"+dir+"/",filename+".mp4")
      })
    }

    ui.download.on("click", () => downloadfile());
    
    //当离开本界面时保存todoList
    ui.emitter.on("resume", () => {
        ui.clip.text(getClip())
    });

   //当离开本界面时保存数据
    ui.emitter.on("pause", () => {
        storage.put("lastsavedir", ui.dir.text());
        storage.put("autosetclip", ui.autosetclip.isChecked());
    });

}

showUI()