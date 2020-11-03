/*
 花生壳的IP地址更新接口说明

   请求接口说明

   http://username:password@ddns.oray.com/ph/update?hostname=yourhostname&myip=ipaddress

   username: 你在花生壳上注册的用户名

   password: 你的花生壳密码

   hostname: 你在花生壳上申请的域名：如：test.zicp.net

   myip   : 你想更新成的IP地址。（可以不填，如果没有花生壳会直接使用你的出口公网地址）

   返回说明：  

   good	更新成功，域名的IP地址已经更新，同时会返回本次更新成功的IP，用空格隔开，              如：good 1.2.3.4

   nochg	更新成功，但没有改变IP。一般这种情况为本次提交的IP跟上一次的一样

   notfqdn	未有激活花生壳的域名

   nohost	域名不存在或未激活花生壳

   nochg	更新成功，但没有改变IP。一般这种情况为本次提交的IP跟上一次的一样

   abuse	请求失败，频繁请求或验证失败时会出现

   !donator	表示此功能需要付费用户才能使用，如https

https://blog.51cto.com/gofly/1751364
*/

var url = "http://18235812264:zsh18235812264@ddns.oray.com/ph/update?hostname=zhangshuhong888.iask.in&myip=";
var res = http.get(url);
if(res.statusCode == 200){
    toast("请求成功");
    console.show();
    log(res.body.string());
    res.close()
}else{
    toast("请求失败:" + res.statusMessage);
}