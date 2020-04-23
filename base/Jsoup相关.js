importClass(org.jsoup.Jsoup)
importClass(org.jsoup.nodes.Document)
importClass(org.jsoup.select.Elements)
importClass(org.jsoup.nodes.Element)

var getAppdownloadurlByAppName=function(appname){
    let searchurl="https://sj.qq.com/myapp/search.htm?kw="+appname
        log("搜索：应用"+appname+"--"+searchurl)
        try {
            let doc=  Jsoup.connect(searchurl).userAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3741.400 QQBrowser/10.5.3863.400")
            .timeout(3000)
            .get();
            log(doc)
            let elements=doc.select("#J_SearchDefaultListBox > li:nth-child(1) > div.search-boutique-data > div.data-box > div.name-line > div.name>a.appName")
             elements.forEach(e => {
              if(e.text()==appname){
                  let infourl=e.absUrl("href");
                  if(infourl){
                    log(appname+"详情页："+infourl)
                    return getAppdownloadurlbyInfopage(infourl)
                  }
              }
             });
        } catch (error) {
        }
}
var getAppdownloadurlByPackage=function(apppkg){
    return getAppdownloadurlbyInfopage("https://sj.qq.com/myapp/detail.htm?apkName="+apppkg)
}

var getAppdownloadurlbyInfopage=function(infourl){
    try {
        let doc=  Jsoup.connect(infourl).userAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3741.400 QQBrowser/10.5.3863.400")
        .timeout(3000)
        .get();
      
        let element=doc.selectFirst("#J_DetDataContainer > div > div.det-ins-container.J_Mod > div.det-ins-btn-box > a.det-down-btn");
        if(element!=null){
            return element.absUrl("data-apkurl");
        }
    
    } catch (error) {
        log("抓取出错"+error)
    }
}