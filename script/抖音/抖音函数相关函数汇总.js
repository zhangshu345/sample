//用户id 就是长连接的那个
function 抖音到用户页(userId){
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "snssdk1128://user/profile" + "/" + userId,
        packageName: "com.ss.android.ugc.aweme"
    });
}

function 抖音到视频页(awemeId){
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "snssdk1128://aweme/detail/" + awemeId,
        packageName: "com.ss.android.ugc.aweme"
    });
}


//通过长连接 获取用户id 
function parseUserIdWithLongUrl(url)
{
    urlRegex = /share\/user\/(\d+)\?/;
    var items=urlRegex.exec(url);
    urlRegexSecid =/sec_uid=(.*?)(?=&|$)/;
    var itemsSecid=urlRegexSecid.exec(url);
    if(itemsSecid&& itemsSecid.length>1)
    {
        this.secUid=itemsSecid[1];
    }
    if(items&& items.length>1)
    {
        log("用户ID:"+items[1]);
        return items[1];
    }
    else
    {
        log("正则未匹配到用户ID");
        log("url:"+url);
    }     
    return "";
}



//短连接转化为 长连接
function  parseUserIdWithShortUrl(url)
{
   let shorturl = shorturl()
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

//https://www.iesdouyin.com/share/user/70934775922?did=60115118309&iid=3095873727762179&sec_uid=MS4wLjABAAAAGGRvXZO3LKrK5CkcEH-pe6xyl2Wr4bBzuVDdLE10z0A&u_code=187md2c6m&timestamp=1609236301&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_app_name=douyin
// secUid secid 通过 只有 用户分享的链接 才有 secuid
function getsecUidWithLongUrl(longurl){
    let keylist=longurl.split("&")
    let secuid=""
    keylist.forEach(kv => {
        if(kv.startsWith("sec_uid")){
            let ss=kv.split("=")
            log("ss："+ss.length)
        log(ss[0])
        log(ss[1])
        secuid=ss[1]
        return  secuid
        }
    });
    return secuid;
}

function getsecUidWithShortUrl(shorturl){
   let longurl =shorturl2longurl(shorturl)
   return getsecUidWithLongUrl(longurl)
}


function getUserInfo(secuid){
    let url= "https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid=" + secuid
    log(url)
    var res = httpget(url);
    log(res)
    var userInfoJson = JSON.parse(res);
    log(userInfoJson)
}

抖音到用户页("2774765041882787")