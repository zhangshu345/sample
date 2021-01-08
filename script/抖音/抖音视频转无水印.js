var jsoup=org.jsoup.Jsoup
const userAgent ='Mozilla/5.0 (Linux; Android '+device.release+' '+device.model+' Build/'+device.buildId+') AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.61 Mobile Safari/537.36';


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
        setClip(res.name+"   "+res.url)
    }else{
        // log("不是抖音链接")
    }
    
 }
}

events.observeClip()
events.on("clip",function(c){
    // log(c)
    threads.start(function(){
        抖音无水印(c)
    })
})
setInterval(function(){},10000)