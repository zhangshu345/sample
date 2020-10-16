const fs=require("fs");
const path = require('path');
var iconv = require('iconv-lite');

function loadjson(filepath)
{
    var data;
     try{
         var jsondata = iconv.decode(fs.readFileSync(filepath, "binary"), "utf8");
         data = JSON.parse(jsondata);
         console.log(data);
    }
    catch(err)
    {
        console.log(err);
    }
     return data;
}
  
function savejson(filepath, data)
{
    var datastr = JSON.stringify(data, null, 4);
     if (datastr)
    {
        try{
            fs.writeFileSync(filepath, datastr);
        }
        catch(err)
        {
            
        }
    }
}

var modes=[]

var class_modeljson  ={name:"模块名",url:"网页指南链接",level:0,type:0,summary:"模块简介",properties:[]}

//
var class_propertie={
    key:"函数名",url:"网页指南链接",summary:"函数简介",level:0,type:0,variable:false,global:false,content:"",params:[]
}

var class_param={
    name:"参数名",type:"参数类型",summary:"",must:false,defulatkey:"默认值"
}

function createActionjsonfile(filedir,filename,data){
    console.log("dir:"+filedir)
    console.log("filename:"+filename)
    console.log(data)
    var filepath=path.resolve(filedir+filename)
    console.log("filepath:"+JSON.stringify(data))
    fs.writeFileSync(filepath,JSON.stringify(data))
    console.log("结束")
}

function makeActionfiles(dir){
    var dir=dir||"./"
    var scriptnames=fs.readdirSync(path.join(path.resolve(dir),"allaction.json"))
    var Action=[]
    var scriptpath="App"
    scriptnames.forEach(name=>{
        name=name.replace('.js','')
        let newscript=JSON.parse(JSON.stringify(scriptobj))
        newscript.name=name;
        newscript.desc.summary="网友共享："+name+"阅读自动赚金币"
        newscript.password="123456781234567812345678"
        newscript.key="1234567887654321"
        newscript.path="https://gitee.com/zhangshu345012/sample/raw/v2/script/"+scriptpath+"/"+name+".js"
        scripts.push(newscript)
    }
    )
   // console.log(JSON.stringify(scripts))
    fs.writeFileSync(path.resolve("./config/scripts/阅读.json"),JSON.stringify(scripts),{encoding:"utf8"})
}




function oldactionconfig2new(oldfile,newfile){
    oldfile="./config/action/alloldaction.json"
    newfile="./config/action/allaction.json"
    let oldcontent= fs.readFileSync(path.resolve(oldfile),'utf8')
//    console.log(oldcontent)
     let oldmodels=JSON.parse(oldcontent)
     var newscripts=[]
     var scriptpath="App"
     oldmodels.forEach(oldmodel=>{
         console.log(oldmodel.name)
         let newmodel=JSON.parse(JSON.stringify(class_modeljson))
         newmodel.name=oldmodel.name;
         newmodel.url=oldmodel.url
         newmodel.summary=oldmodel.summary
         if(oldmodel.properties){
             oldmodel.properties.forEach(propertie =>{
                 let newpropertie=JSON.parse(JSON.stringify(class_propertie))
                 newpropertie.key=propertie.key
                 newpropertie.url=propertie.url;
                 newpropertie.summary=propertie.summary
                 newpropertie.global=propertie.global
                 if(propertie.global){
                    newpropertie.content=propertie.key+"()"
                 }else{
                    newpropertie.content=newmodel.name+"."+propertie.key+"()"
                 }
                 newpropertie.params=[]
                 newpropertie.params.push(class_param)
               //  key:"函数名",url:"网页指南链接",summary:"函数简介",global:flase,content:"",params:[]
                //  name:"参数名",type:"参数类型",summary:"",must:false,defulatkey:"默认值"
                newmodel.properties.push(newpropertie)
             })
         }
         newscripts.push(newmodel)
     })
    // console.log(JSON.stringify(newscripts))
     if(newfile){
         fs.writeFileSync(path.resolve(newfile),JSON.stringify(newscripts),{encoding:"utf8"})
     }
 }
 


oldactionconfig2new()

//updateoldscriptconfig2newfromdir("./config/scripts/")

// oldscriptconfig2new("./config/scripts/会员.json","./config/scripts/新会员.json")
//oldpasswordscriptconfig2new("./config/scripts/阅读.json","./config/scripts/新阅读.json","123456781234567812345678","1234567887654321")
// makepasswordscriptfiles()
 //createconfigjsonfile("./","测试生成json.json",{name:"你好",ls:["1","2"],ns:"字符串2",zs:2})