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
 
function testjson1(){
    //读
var data = loadjson(path.resolve('./test.json'));
 //修改数据
for(var i=0; i<data.class.length; i++)
{    if(data.class[i].name == "XiaoYao")
    {
        data.class[i].score = 100;
    }
}
//写，把XiaoYao同学的分数改为100
savejson('test.json', data)
}
var scriptobj={name:"脚本模板",
desc:{summary:"脚本模板简介",html:"",script:""},
tags:["推荐"],
devices:["xiaomi","samsung","HONOR","Meizu","OPPO"],
features:[],
open:true,
install:true,
keys:[{name:"测试",value:"值"},{name:"测试2",value:"值2"}],
layout:{type:1,orientation:1,width:0,height:0,back:"@color/red",fore:"",reverselayout:false,size:0,textsize:6,buttons:[{name:"下载",eventid:-1,script:"",uipath:"",icon:"",key:""}]},
pay:{coin:0,daycoin:0,monthcoin:0,yearcoin:0,money:0,daymoney:0.01,monthmoney:0.01,yearmoney:0.01},
download:false,
runconfig:{starttime:"5:24",endtime:"0:0",runtime:3600,seenews:0,seevideo:0,seeshortvideo:0,
sign:true,time:3000,devicemanager:false,accessibility:true,systemsetting:false,notificationmanager:false,
floatyposition:"0,120,400,220",showfloaty:true,checkbattery:30,onlyscript:false,scriptchannel:"all",
onetime:3600,maxtime:10000,logintype:"phone",tomoney:"weixin",tomoneyaccount:"zfb|姓名|提现账号",
daycashcondition:0.3,daycashcondition:0.3,daycoincondition:3000,bigmoneytomoneyday:7,bigmoney:5.1
},
root:false,password:"",key:"",code:"",
reward:{coin:0,"money":0,experience:10,achievement:"成就"},
money:{perhourmoney:0.3,perdaymoney:0.38,permonthmoney:60.1,peryearmoney:360.0},
path:"http://zhangshuhong888.iask.in:8989/加密脚本/加密推荐上滑.js",
source:1,
author:{name:"作者",id:"",icon:"",qq:"11226677",weixin:"jiajiajia",phone:"1871768888"},
level:0,
version:0,
appversioni:10,
requestapi:10,
icon:"",
app:{name:"",pkg:"",icon:"",downloadurl:"", version:"",versioni:0}
}

function createconfigjsonfile(filedir,filename,data){
    console.log("dir:"+filedir)
    console.log("filename:"+filename)
    console.log(data)
    var filepath=path.resolve(filedir+filename)
    console.log("filepath:"+JSON.stringify(data))
    fs.writeFileSync(filepath,JSON.stringify(data))
    console.log("结束")
}

function makescriptfiles(dir){
    var dir=dir||"./script/App"
    var scriptnames=fs.readdirSync(path.resolve(dir))
    var scripts=[]
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
    })
   // console.log(JSON.stringify(scripts))
    fs.writeFileSync(path.resolve("./config/scripts/阅读.json"),JSON.stringify(scripts),{encoding:"utf8"})
}



//生成加密脚本列表
function makepasswordscriptfiles(){
    var dir="./script/App"

    var scriptnames=fs.readdirSync(path.resolve(dir))
    var scripts=[]
    var scriptpath="App"
    scriptnames.forEach(name=>{
        name=name.replace('.js','')
        let newscript=JSON.parse(JSON.stringify(scriptobj))
        newscript.name=name;
        newscript.desc.summary="网友共享："+name
        newscript.password="123456781234567812345678"
        newscript.key="1234567887654321"
        newscript.source=7
        newscript.path="https://gitee.com/zhangshu345012/sample/raw/v2/script/"+scriptpath+"/"+name+".js"
        scripts.push(newscript)
    })
   // console.log(JSON.stringify(scripts))
    fs.writeFileSync(path.resolve("./config/scripts/阅读.json"),JSON.stringify(scripts),{encoding:"utf8"})
}

function oldscriptconfig2new(oldfile,newfile){
   let oldcontent= fs.readFileSync(path.resolve(oldfile),'utf8')
 //  console.log(oldcontent)
    let oldobjs=JSON.parse(oldcontent)
    var newscripts=[]
    var scriptpath="App"
    oldobjs.forEach(old=>{
        let newscript=JSON.parse(JSON.stringify(scriptobj))
        newscript.name=old.name;
        newscript.desc=old.desc
        newscript.tags=old.tags
        newscript.source=old.source
        newscript.path=old.path
        newscript.app=old.app
        newscripts.push(newscript)
    })
    console.log(JSON.stringify(newscripts))
    if(newfile){
        fs.writeFileSync(path.resolve(newfile),JSON.stringify(newscripts),{encoding:"utf8"})
    }
}


function oldpasswordscriptconfig2new(oldfile,newfile,pwd,key){
    let oldcontent= fs.readFileSync(path.resolve(oldfile),'utf8')
  //  console.log(oldcontent)
     let oldobjs=JSON.parse(oldcontent)
     var newscripts=[]
     var scriptpath="App"
     oldobjs.forEach(old=>{
         let newscript=JSON.parse(JSON.stringify(scriptobj))
         newscript.name=old.name;
         newscript.desc=old.desc
         newscript.tags=old.tags
         newscript.password=pwd,
         newscript.key=key,
         newscript.source=7
         newscript.path=old.path
         newscript.app=old.app
         newscripts.push(newscript)
     })
     console.log(JSON.stringify(newscripts))
     if(newfile){
         fs.writeFileSync(path.resolve(newfile),JSON.stringify(newscripts),{encoding:"utf8"})
     }
 }
 
 

function updateoldscriptconfig2newfromdir(dir){
    var scriptnames=fs.readdirSync(path.resolve(dir))
    scriptnames.forEach(name=>{
        // name=name.replace('.js','')
        console.log(name)
        if(!name.startsWith("新")&&name.endsWith(".json")){
            oldscriptconfig2new(dir+name,dir+"新"+name)
        }
    })
   // console.log(JSON.stringify(scripts))
}

//updateoldscriptconfig2newfromdir("./config/scripts/")

oldpasswordscriptconfig2new("./config/scripts/会员.json","./config/scripts/新会员.json","123456781234567812345678","1234567887654321")
// makepasswordscriptfiles()
 //createconfigjsonfile("./","测试生成json.json",{name:"你好",ls:["1","2"],ns:"字符串2",zs:2})