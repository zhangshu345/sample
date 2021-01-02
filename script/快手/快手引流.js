var 打开应用=function(){

}

var 回到快手主页=function(){

}


var 到达直播页=function(){

}

var 搜索商品直播=function(){

}

var 私信对话框页=function(){

}

function 快手直播观众列表一次私信(){
     let n_item= id('com.smile.gifmaker:id/live_top_user_list_item_user_name_text').depth(14).findOne(300)
     if(n_item){
         log("用户名:"+n_item.text())
        if(clicknode(n_item)){
            sleep(1000)
            textclick("主页")
            sleep(1000)
            快手个人页私信()
        }
     }
}

function 快手个人页私信(){
    descclick("更多")
    sleep(1000)
    textclick("发私信")
    sleep(1000)
}