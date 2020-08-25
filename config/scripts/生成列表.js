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
desc:{summary:"脚本模板简介",html:""},
tags:["推荐"],
pay:{coin:0,money:0,daymoney:0,monthmoney:0,yearmoney:0},
runconfig:{starttime:"5:24",time:3600,perhormoney:0.65,daymaxmoney:2,onetime:1800
,logintype:"phone",daycashcondition:0.3,daymoneyinterval:7},
root:false,password:"123456781234567812345678",key:"1234567887654321",
reward:{coin:0,"money":0,experience:10,achievement:"成就"},
money:{perdaymoney:0.38,permonthmoney:60.1,peryearmoney:360.0},
path:"http://zhangshuhong888.iask.in:8989/加密脚本/加密推荐上滑.js",
source:1,
author:{name:"作者",id:"",icon:""},
level:0,
version:0,
appversioni:10,
requestapi:10,
icon:"",
app:{name:"",pkg:"",icon:"",downloadurl:"", version:""}
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

function makescriptfiles(){
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


makepasswordscriptfiles()



 //createconfigjsonfile("./","测试生成json.json",{name:"你好",ls:["1","2"],ns:"字符串2",zs:2})