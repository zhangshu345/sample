dx="通知摘要: 106917511264547342 【刷宝短视频】4511（刷宝登录验证码，请完成验证）。"
contet=dx
reg=/\d{4}/ig
appname="刷宝登录验证码"
startwords="刷宝短视频"
endwords="刷宝登录验证码"
if(contet.includes(appname)){
    if(startwords){
        startindex=contet.indexOf(startwords)+startwords.length
        if(startindex>-1){
            contet=contet.substr(startindex)
        }
    }
    if(endwords){
        endindex=contet.indexOf(endwords)
        if(endindex>-1){
            contet=contet.substr(0,endindex)
        }
    }
    code =contet.match(reg)[0]
    console.log("找到对应的短信"+code);
     
}
