var jsoup=org.jsoup.Jsoup

// 短连接 通过网络 返回内容 获得长连接
function shorturl2longurl(url){
    let shorturl=url2shorturl(url)
    if(shorturl){
        let content = http.get(url);
        if(content&&content.statusCode != 200){
           log("请求失败: " + content.statusCode + " " + content.statusMessage);
        }
    else
    {
        return content.url+""
    }
    }
    return ""
}

//分享出来的链接 获取 链接
function url2shorturl(url){
    let urlRegex = /(https:\/\/v.douyin.com.*)/;

    let items=urlRegex.exec(url);
    if(items.length>1)
    {
        let weburl=items[1];
        if(weburl.trim()){
            return weburl.trim();
        }
    }
    return "";
}


function getPhoneUserAgent(){
  let userAgent =
    'Mozilla/5.0 (Linux; Android '+device.release+' '+device.model+' Build/'+device.buildId+') AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.61 Mobile Safari/537.36';
    return userAgent;
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


    // let content = http.get(longurl,{
    //     headers: {
    //         'Accept-Language': 'zh-cn,zh;q=0.5',
    //         'User-Agent': getPhoneUserAgent()
    //     }
    // });
    // if(content&&content.statusCode != 200){
    //    log("请求失败: " + content.statusCode + " " + content.statusMessage);
    // }
// else
// {
//     let ul=content.url
//     let  body=content.body.string();
//     log(body)
// }

}
let c = getClip()
log(c)
getwushuiyin(c)







