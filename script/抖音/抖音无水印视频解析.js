var jsoup=org.jsoup.Jsoup
const userAgent ='Mozilla/5.0 (Linux; Android '+device.release+' '+device.model+' Build/'+device.buildId+') AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.61 Mobile Safari/537.36';
log(userAgent)
// 短连接 通过网络 返回内容 获得长连接
function shorturl2longurl(url){
    let shorturl=url2shorturl(url)
    if(shorturl){
        let content = http.get(url);
        if(content&&content.statusCode != 200){
           log("请求失败: " + content.statusCode + " " + content.statusMessage);
        }else{
            return content.url+""
         }
    }
    return ""
}

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




function getwushuiyin(url){
    let shorturl=url2shorturl(url)
    let longurl=shorturl2longurl(shorturl)
    log(longurl)
    let  doc = jsoup.connect(longurl)
.header("Accept", "*/*")
.header("Accept-Encoding", "gzip, deflate")
.header("Accept-Language", "zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3")
.header("Referer", longurl)
.header("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0")
.ignoreContentType(true)
.maxBodySize(0)
.followRedirects(true)
.timeout(60000)
.get();

if(doc){
   let  ds=doc.toString();
    let playaddr=ds.substring(ds.indexOf("playAddr:")).trim().split("\"")[1].replace("playwm","play");

    log("播放地址:"+playaddr)
  
    return playaddr

}
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
        log("请求成功:"+res.url);
        
        return res
    }else{
        toastLog("请求失败:"+res.url +"---错误:"+ res.statusMessage);
        sleep(1000)
        return requestNotRedirect(url)
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

function parse(res_json) {
    var playwm = res_json.item_list ? res_json['item_list'][0]['video']['play_addr']['url_list'][0] : null
    if (playwm) {
        var tested = false;
        var try_count = 0;
        var paly_address = playwm.replace('playwm', 'play')
        var cover = res_json['item_list'][0]['video']['origin_cover']['url_list'][0];
        // 尝试5次 使得realAddress尽可能在downloadFile合法域名中
        for (var i = 1; i < 6; i++) {
            try_count += 1;
            var realAddress =  requestNotRedirect(paly_address);
            console.log(realAddress.url);
            var downloadFileUrls = [
                "http://v6.douyinvod.com",
                "http://v9.douyinvod.com",
                "http://v29.douyinvod.com",
                "http://v6-dy-cold.ixigua.com",
             "http://v3-dy-cold.ixigua.com", 
             "http://v5-dy-c.ixigua.com",
              "http://v95-dy-a.ixigua.com", 
              "http://v5-dy-j.ixigua.com",
               "http://v5-dy-g.ixigua.com",
                "http://v5-dy-e.ixigua.com",
                 "http://v5-dy-i.ixigua.com",
                  "http://v5-dy-b.ixigua.com",
                   "http://v92-dy.ixigua.com",
                    "http://v9-dy-cold.ixigua.com",
                     "http://v29-dy-cold.ixigua.com", 
                     "http://v5-dy-f.ixigua.com", 
                     "http://v95-dy.ixigua.com", 
                     "http://v5-dy-h.ixigua.com", 
                     "http://v26-dy-cold.ixigua.com",
                      "http://v27-dy-cold.ixigua.com"];
            for (var j = 0; j < downloadFileUrls.length; j++) {
                if (realAddress.search(downloadFileUrls[j]) !== -1) {
                    tested = true;
                    break
                }
            }
            if (tested==true) break;
        }
        return {
            'code': 1,
            'tryCount': try_count,
            'tested': tested,
            'playAddress': realAddress,
            'cover': cover
        }
    }
}


function getRealAddress(url) {
    const res =  requestNotRedirect(url);
    // console.log(res.body)
    var pattern = new RegExp('href=\"(.*?)\"');
    if (pattern.test(res.body)) {
        return RegExp.$1;
        // console.log(RegExp.$1)
    }
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
     content=content || getClip()
    if(content){
         log(content)
        if(copyhistory.includes(content)){
            toastLog("已经存在了")
        }else{
            copyhistory.push(content)
            url =url2shorturl(content)
    if(url.startsWith("https://v.douyin.com")){
        let res =  main(url);
        toastLog(res.name+"   "+res.url)
        setClip(res.name+"   "+res.url)
    }else{
         log("不是抖音链接")
    }
    }
 }else{
     log("content 为空")
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

while(true){
    let t1=new Date().getTime()
    log("1")
    抖音无水印(getClip())
    log("2")
    log("时间："+(new Date().getTime()-t1))
    sleep(5000)
}