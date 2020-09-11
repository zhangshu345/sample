function httpget(url) {
    var r = http.get(url);
    if (r.statusCode == 200)
     { return r.body.string(); 
    } else { toastLog("五秒后重试");
    sleep(5000);  return "";}  
}

function gaodegetcity(){
    let gaodeipurl="https://restapi.amap.com/v3/ip?key=19804f68e02ebef552b5046d4cc9e01f"
    let res= httpget(gaodeipurl) //{"status":"1","info":"OK","infocode":"10000","province":"山西省","city":"吕梁市","adcode":"141100","rectangle":"111.0129941,37.44078331;111.2348449,37.60177975"}
    if(res!=null){
        log(res)
        let loaction=JSON.parse(res)
        if(loaction.status=="1"){
            return loaction.city
        }
    }
    return "中国"
}

function gaodegetprovince(){
    let gaodeipurl="https://restapi.amap.com/v3/ip?key=19804f68e02ebef552b5046d4cc9e01f"
    let res= httpget(gaodeipurl) //{"status":"1","info":"OK","infocode":"10000","province":"山西省","city":"吕梁市","adcode":"141100","rectangle":"111.0129941,37.44078331;111.2348449,37.60177975"}
    if(res!=null){
        let loaction=JSON.parse(res)
        if(loaction.status=="1"){
            return loaction.province.replace("省");
        }
    }
    return "中国"
}

function baidugetlocation(ak,ip){
    let ak=ak||"ZdZGsywm0fyZTKyBpNWm7s85Y6yNYdtR"
    let ip=ip||""
    let baiduipurl="http://api.map.baidu.com/location/ip?ak="+ak+"&ip="+ip+"&coor=bd09ll"  // http://api.map.baidu.com/location/ip?ak=HF9KObWv1XPrnOPahB3jOVDRvvgC2AV2&coor=bd09ll
    let res= httpget(gaodeipurl) //{"status":"1","info":"OK","infocode":"10000","province":"山西省","city":"吕梁市","adcode":"141100","rectangle":"111.0129941,37.44078331;111.2348449,37.60177975"}
    if(res!=null){
        let loaction=JSON.parse(res)
        return loaction;
    }
    return null
}


function baidugetcity(ak,ip){
 let location=baidugetlocation(ak,ip)
 if(location!=null){
     return location.city
 }
 return "中国";
}

function baiduprovince(ak){
    let location=baidugetlocation(ak,ip)
    if(location!=null){
        return location.city
    }
    return "中国";
}

log(gaodegetcity())
log(gaodegetprovince())
