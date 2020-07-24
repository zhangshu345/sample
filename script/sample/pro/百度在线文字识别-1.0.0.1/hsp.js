var storage = storages.create("selp");

function cuky(yy) {
    var stt = http.get("http://soikc.co/api/super?str=" + yy);
    if (stt.statusCode !== 200) {
        return log("获取失败");
    }
    var str = stt.body.string();
    akl = str;
    storage.put("key", str);
}
var akl = storage.get("key", "");

function en(img) {
    var img = images.toBase64(img);
    //java.lang.String(android.util.Base64.encode(img, 0));
    var language_type = s1 || "JAP";
    for (var i = 0; i < 5; i++) {
        var se = "?access_token=" + akl;
        try {
            var res = http.post("https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + se, {
                language_type: language_type,
                image: img
            }, {
                headers: {
                    'Accept-Language': 'zh-cn,zh;q=0.5',
                    'User-Agent': 'AutoJs/8.0'
                }
            });
            var dee = res.body.json();
            if (dee.error_code && dee.error_code == 110) {
                log("获取api密钥中");
                cuky(akl);
            } else return dee;
        } catch (err) {
            toastLog("识别错误，2秒后重试")
        }
        sleep(2100);
    }
}

function baidu(str) {
    function getMd5(string) {
        return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16)
    }
    var from = s2;
    var to = s3;
    var appid = "20191212000365591";
    var key = "7uQwFlv0jcqPH_jX9UFh";
    for (var ti = 0; ti < 5; ti++) {
        var salt = (new Date).getTime();
        var sign = getMd5(appid + str + salt + key);
        try {
            var res = http.post("http://api.fanyi.baidu.com/api/trans/vip/translate?", {
                q: str,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            });
            var as = JSON.parse(res.body.string()).trans_result;
            str = as.map(val => val.dst).join("\n");
            return str;
        } catch (yr) {
            toastLog("翻译出错,2秒后重试");
        }
        sleep(2100);
    }
}
var s1, s2, s3; //s1为识图语言
var ekl = new function() {
    var arr = ["JAP", "CHN_ENG", "ENG"];
    var arr2 = ["jp", "zh", "en"];
    this.setSb = function(m) {
        s1 = arr[m];
        s2 = arr2[m];
    }
    this.setFy = function(m) {
        s3 = arr2[m]
    }
    this.sz = en;
    this.fy = baidu;
}

module.exports = ekl;