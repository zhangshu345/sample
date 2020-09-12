if (typeof files === 'undefined') {
    const fs = require('fs');
    var files = {
        read: function(path){
            return fs.readFileSync(path,{encoding:"utf-8"}).toString();
        },
        write: function(path,text){
            return fs.writeFile(path,text,function(err){
                if(err) throw err;
            });
        }
    };
}
function readJSON(fileName){
    if(typeof fileName=="string"){
        var strList = fileName.split(".");
        if(strList[strList.length-1].toLowerCase()=="json"){
            var data = files.read(fileName);
            return JSON.parse(data);
        }else{
            throw Error("not JSON File")
        }
    }else{
        throw Error("not file name")
    }
}

function writeJSON(fileName,data){
    if(typeof fileName == "string"){
        try{
            files.write(fileName,JSON.stringify(data));
        }catch(e){
            console.log("Hava Error!!")
        }
    }
}
console.log(readJSON("project.json"));