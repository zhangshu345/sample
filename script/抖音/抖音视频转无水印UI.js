"ui";
var jsoup=org.jsoup.Jsoup
const userAgent ='Mozilla/5.0 (Linux; Android '+device.release+' '+device.model+' Build/'+device.buildId+') AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.61 Mobile Safari/537.36';
var storage = storages.create("hs_dywsyxz");
var lastsavedir=storage.get("lastsavedir")
var autosetclip =storage.get("autosetclip")
//分享出来的链接 获取 链接
function url2shorturl(url){
    let urlRegex = /(https:\/\/v.douyin.com.*)/;
    let items=urlRegex.exec(url);
    if(items&&items.length>1)
    {
        let weburl=items[1];
        if(weburl.trim()){
            return weburl.trim();
        }
    }
    return "";
}

function requestNotRedirect(url){
    var options = {
        uri: url,
        headers: {
            'user-agent': userAgent
        },
        followRedirect: false,
        resolveWithFullResponse: true,
    };
    let res= http.get(url,options)
    if(res.statusCode == 200){
        // log("请求成功:"+res.url);
        
        return res
    }else{
        toastLog("请求失败:"+res.url +"---错误:"+ res.statusMessage);
        sleep(1000)
        return requestNotRedirect(url)
    }
}

function 下载文件(fileurl,savedir,savefile){
    //   log(typeof(fileurl))
    
        var r = http.get(fileurl);
        if(r.statusCode == 200){
        files.createWithDirs(savedir+savefile);
        files.writeBytes(savedir+savefile, r.body.bytes());
        media.scanFile(savedir);
        toastLog("下载成功");
        }
}
    

function getParam(url) {
    const res = requestNotRedirect(url)
    urlRegex =  urlRegex = /share\/video\/(\d+)\/\?/; 
    var item_id=urlRegex.exec(res.url);
    urlRegexmid = /mid=(.*?)&/;
    var mid=urlRegexmid.exec(res.url);
    return {
            'item_id': item_id[1],
            'mid': mid[1] }

}

 function getItemInfo(item_id, mid) {
    var url = "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids="+item_id
    // console.log(url)
    try {
        var options = {
            headers: {
                'authority': 'www.iesdouyin.com',
                'user-agent': userAgent,
                'content-type': 'application/x-www-form-urlencoded',
                'accept': '*/*',
                'referer': "https://www.iesdouyin.com/share/video/"+item_id+"/?region=CN&mid="+mid+"&u_code=15b9142gf&titleType=title&utm_source=copy_link&utm_campaign=client_share&utm_medium=android&app=aweme",
                'accept-language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7'
            }
        };
        // log(options)
        var res =  http.get(url,options)
        if(res.statusCode==200){
            // log("200")
            // log(res.body.string())
            return JSON.parse(res.body.string());
        }
       
    } catch (err) {
        console.log(err)
    }
}

function 解析获取无水印真实地址(res_json){
    // log(res_json)
    var playwm = res_json.item_list ? res_json['item_list'][0]['video']['play_addr']['url_list'][0] : null
    if (playwm) {
        var title = res_json['item_list'][0]['desc']
        var paly_address = playwm.replace('playwm', 'play')
        var cover = res_json['item_list'][0]['video']['origin_cover']['url_list'][0];
        var realAddress =  requestNotRedirect(paly_address);

        // console.log(realAddress.url);
        return {
            'name':title,
           'url': realAddress.url,
           'cover':cover
        } 
    }
    return {};
}

function main(url){
    var params=getParam(url)
    if(params){
        var res_json =  getItemInfo(params.item_id, params.mid)
        //  console.log(res_json)
        var result = 解析获取无水印真实地址(res_json);
        return result
    }else{
        // log("params 为空")
    }
}

// var res =  main('https://v.douyin.com/JJTDEKL');
//     console.log(res)

var copyhistory=[]
function 抖音无水印(content){
    // let content=getClip()
    if(content){
        // log(content)
            url =url2shorturl(content)
    if(url.startsWith("https://v.douyin.com")){
        let res =  main(url);
        toastLog(res.name+"   "+res.url)
        if(autosetclip){
            setClip(res.name+"   "+res.url)
        }
        
    }else{
        // log("不是抖音链接")
    }
 }
}

function obstart(){
    events.observeClip()
    events.on("clip",function(c){
        // log(c)
        threads.start(function(){
            抖音无水印(c)
        })
    })
    setInterval(function(){},10000)
}

//显示界面
function showUI(){
    ui.layout(
        <scroll>
        <vertical h="*"  margin="0 50">
            <text  w="*"  color="#111111" gravity="center" size="16" >抖音视频无水印地址获取</text>
             <text id="clip" w="*"  gravity="center" color="#111111" size="16" >剪贴板内容</text>
             <text  w="*"  color="#111111" size="16" >无水印地址</text>

             <input id="novideo" w="*" h="auto"/>
             <text  w="*" gravity="center" color="#111111" size="16" >视频保存目录</text>
             <input id="dir" w="*" h="40"/>
             <text  w="*" gravity="center" color="#111111" size="16" >视频保存文件名(自动添加后缀.mp4)</text>
             <input id="filename" w="*" h="40"/>
             <checkbox id="autosetclip" marginLeft="4" marginRight="6"  text="复制无水印链接到剪贴板" />
            <linear gravity="center">

            <button id="getclip" text="获取剪贴板内容"/>
             <button id="change" text="获取无水印"/>
             <button id="download" text="下载"/>
          </linear>
          <text >使用方式:先复制抖音分享链接到剪贴板，点击下方按钮 获取剪贴板内容，再点击 获取无水印 即可获取无水印地址 复制无水印地址到剪贴板 填写保存目录和保存文件名 点击下载自动下载视频到指定位置</text>

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
        ui.autosetclip.setChecked(true)
    }else{
        ui.autosetclip.setChecked(false)
    }
    
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
            // log("不是抖音链接")
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
ui.statusBarColor("#000000")