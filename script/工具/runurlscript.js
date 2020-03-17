var appname={scriptname}
var scripturl={scripturl}
function httpget(url) {
    var r = http.get(url);
    // log("code = " + r.statusCode);
    if (r.statusCode == 200) {
        return r.body.string()
    } else {
        return ""
    }
}
engines.execScript(appname,httpget(scripturl), )