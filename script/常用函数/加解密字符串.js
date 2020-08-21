importClass(com.blankj.utilcode.util.EncryptUtils)
importClass(com.blankj.utilcode.util.ConvertUtils)
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
 var ss='http://zhangshuhong888.iask.in:8989/lib3.js'
 var key="3499jiajia"
 var iv="5e8y6w45ju8w9jq8"
 ctbt=ConvertUtils.string2Bytes(ss)
 log(ctbt)
psbt=ConvertUtils.string2Bytes(key)
log(psbt)
var dss=EncryptUtils.decryptAES(ctbt,psbt,"DES",ConvertUtils.string2Bytes(iv))
log("dss:"+dss)
ess=ConvertUtils.bytes2String(dss);
log(ess)
