importClass(com.blankj.utilcode.util.EncryptUtils)
importClass(com.blankj.utilcode.util.ConvertUtils)
importClass(com.hongshu.utils.AdvancedEncryptionStandard)
function httpget(url) {var r = http.get(url);if (r.statusCode == 200) { return r.body.string();  } else { toastLog("五秒后重试");sleep(5000);  return "";}  }
//字符串转字节序列
function stringToByte(str) {  
    var bytes = new Array();  
    var len, c;  
    len = str.length;  
    for(var i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
        if(c >= 0x010000 && c <= 0x10FFFF) {  
            bytes.push(((c >> 18) & 0x07) | 0xF0);  
            bytes.push(((c >> 12) & 0x3F) | 0x80);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000800 && c <= 0x00FFFF) {  
            bytes.push(((c >> 12) & 0x0F) | 0xE0);  
            bytes.push(((c >> 6) & 0x3F) | 0x80);  
            bytes.push((c & 0x3F) | 0x80);  
        } else if(c >= 0x000080 && c <= 0x0007FF) {  
            bytes.push(((c >> 6) & 0x1F) | 0xC0);  
            bytes.push((c & 0x3F) | 0x80);  
        } else {  
            bytes.push(c & 0xFF);  
        }  
    }  
    return bytes;  
}  
//字节序列转ASCII码
//[0x24, 0x26, 0x28, 0x2A] ==> "$&C*"
 function byteToString(arr) {  
    if(typeof arr === 'string') {  
        return arr;  
    }  
    var str = '',  
        _arr = arr;  
    for(var i = 0; i < _arr.length; i++) {  
        var one = _arr[i].toString(2),  
            v = one.match(/^1+?(?=0)/);  
        if(v && one.length == 8) {  
            var bytesLength = v[0].length;  
            var store = _arr[i].toString(2).slice(7 - bytesLength);  
            for(var st = 1; st < bytesLength; st++) {  
                store += _arr[st + i].toString(2).slice(2);  
            }  
            str += String.fromCharCode(parseInt(store, 2));  
            i += bytesLength - 1;  
        } else {  
            str += String.fromCharCode(_arr[i]);  
        }  
    }  
    return str;  
}  

//  var ss=httpget('http://zhangshuhong888.iask.in:8989/lib3.js')
//  log("原生："+ss)

// var ess=EncryptUtils.encryptAES2HexString(ss)
 var ss='http://zhangshuhong888.iask.in:8989/0集好视频.js'
 var key="123456781234567812345678"
 var iv="1234567887654321"
ctbt=ConvertUtils.string2Bytes(ss)

// psbt=ConvertUtils.string2Bytes(key)
 //ivbt=ConvertUtils.string2Bytes(iv)
//  var dss=EncryptUtils.decryptAES(ctbt,psbt,"AES/CBC/PKCS5Padding",ConvertUtils.string2Bytes(iv))
//  ess=ConvertUtils.bytes2String(dss);

function encrypt(datastr,keystr,ivstr){
    var ad=new AdvancedEncryptionStandard(ConvertUtils.string2Bytes(keystr),ivstr)
    mw=ad.encrypt(ConvertUtils.string2Bytes(datastr));
  //  log(ConvertUtils.bytes2String(ad.decrypt(mw)))
    return mw
}

function encryptstring(datastr,keystr,ivstr){
    var ad=new AdvancedEncryptionStandard(stringToByte(keystr),ivstr)
    mw=ad.encryptstring(datastr);
    return mw
}

//获取网络文件字符串内容 加密 写入到指定目标文件
function encrypthttpfile(url,savepath,key,iv){
    var httpcontent=httpget(url)
    if(httpcontent!=""){
        log(httpcontent.sub(0,100))
        var emw=encrypt(httpcontent,key,iv)
        files.writeBytes("/sdcard/"+savepath, emw);
    }
}

function decrypt(databyte,keystr,ivstr){
    var ad=new AdvancedEncryptionStandard(stringToByte(keystr),ivstr)
    mw=ad.decrypt(databyte,0,databyte.length);
    emw=byteToString(mw);
    return emw;
}

function decryptstring(datastr,keystr,ivstr){
    var ad=new AdvancedEncryptionStandard(ConvertUtils.string2Bytes(keystr),ivstr)
    mw=ad.decryptstring(datastr);
    return mw;
}

function decryptfile(path,key,iv){
  var  databyte= files.readBytes("/sdcard/"+path)
    var ad=new AdvancedEncryptionStandard(ConvertUtils.string2Bytes(key),iv)
     mw=ad.decrypt(databyte);
    emw=ConvertUtils.bytes2String(mw);
    files.write("/sdcard/解密"+path,emw)
    log(emw)
    return emw;
}

function encryfile(filename,dir,savedir,key,iv){
    files.create(dir+savedir)
    if(files.exists(files.join(dir, filename))){
        var cy=files.read(files.join(dir, filename))
        var emw=encrypt(cy,key,iv)
        files.writeBytes(dir+savedir+filename, emw);
    }  
}

function encrydir(dir,houzhui,key,iv){

    var jsFiles = files.listDir(dir, function(name){
        return name.endsWith(houzhui) && files.isFile(files.join(dir, name));
    });
    jsFiles.forEach(filename => {
        encryfile(filename,dir,"/加密/",key,iv)
    });

}
encrydir("/sdcard/apps",".js",key,iv)



// encrypthttpfile("https://gitee.com/zhangshu345012/sample/raw/v2/script/推荐/循环上滑.js","加密推荐上滑.js",key,iv)
// ss="http://zhangshuhong888.iask.in:8989/加密脚本/加密文件.js"
// path="新加密文件"

// // files.write("/sdcard/"+path,httpget(ss))
// // log(decryptfile(path,key,iv))
// log(decryptstring(httpget(ss),key,iv))
//  encrypthttpfile(ss,"加密集好视频.txt",key,iv)
// log(files.readBytes("/sdcard/加密集好视频.js"))
// var  jiamifile="http://zhangshuhong888.iask.in:8989/加密脚本/加密文件"
// log(httpget(jiamifile))