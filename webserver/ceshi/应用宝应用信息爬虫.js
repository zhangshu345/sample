var request = require('request');
var url=require("url");
let txappsearchurl="https://sj.qq.com/myapp/searchAjax.htm?kw="
async function getAppInfo(appname,apppkg){
    let ss=encodeURI(txappsearchurl+appname)
    let icon=""
    await  request(ss,(error,res,body)=>{
        // console.log(error)
        // console.log(res)
        // console.log(body)
        let appinfo=getAppInfofromJson(appname,apppkg,body)
     //   console.log(appinfo)
      //  console.log(appinfo.appDetail.appName+"--"+appinfo.appDetail.iconUrl)
        icon= appinfo.appDetail.iconUrl
    })

   
}

var getAppInfofromJson=function(appname,apppkg,appinfos){
  //  console.log("应用宝查找app:"+appname+"--"+apppkg)
 //   console.log("获取成功")
        data=JSON.parse(appinfos)
        let obj=data.obj
          if(obj){
            let items=obj.items
            if(items){
                i=0
                while(i<items.length){
                    let e=items[i]
                    if(apppkg){
                        if(e.pkgName==apppkg){
                            console.log(e.pkgName+"=="+apppkg)
                            return e
                        }else{
                            console.log(e.pkgName+"<>"+apppkg)
                        }
                    }else{
                        appDetail=e.appDetail
                        if(appDetail.appName==appname){
                            return e
                        }
                    }
                    i=i+1
                }
            }else{
                console.log("items为空")
            }
        }else{
            console.log("obj为空")
        }        

}

getAppInfo("趣头条").then(function(value){
    console.log(value);
  })



