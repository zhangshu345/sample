
 
global = {};
global.tipView="";
global.items=[];//日志数据源
global.appName="";
global.originFollowingCount=0;
global.originLikeCount=0;
global.currentFollowingCount=0;
global.currentLikeCount=0;
global.successFollowingCount=0;
global.successLikeCount=0;
global.failFollowingCount=0;
global.failLikeCount=0;
global.taskBegin=false;
global.showCloseBtn = function(ver)
{
    var btncClose = floaty.window(
        <vertical>
            <button id="stopScrip" text= "停止脚本"  w="108" h="46" background="#5AC3DA" textColor="#FFFFFF" /> 
            <text id="ver" textSize="8sp"  text="" background="#000000" enabled='false' textColor="#ffffff" />
        </vertical>
    );
    btncClose.ver.setText("v"+ver)
    btncClose.setPosition(40, 20);
    btncClose.stopScrip.click(() => {
        log("执行完成");
        threads.shutDownAll();
        engines.stopAll();
        exit();
    });
    
}
global.initData = function(appName)
{
    global.appName=appName;
    global.originFollowingCount=0; 
    global.originLikeCount=0;
    global.currentFollowingCount=0;
    global.currentLikeCount=0;
    global.successFollowingCount=0;
    global.successLikeCount=0;
    global.failFollowingCount=0;
    global.failLikeCount=0;
    this.items=[];
    if(!global.tipView)
        return;
    var that=this;
    ui.run(function(){
        that.tipView.list.setDataSource(that.items);
    });
    this.updateLog();
}
global.saveLog = function(content)
{
    var dir="/storage/emulated/0";
    let date = new Date()
    var datestr=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    content=datestr+" "+content+"  \n";
    files.append(dir+"/1.txt", content);
}
 
global.showLogView = function()
{
    this.tipView = floaty.rawWindow(
        <frame>
             <vertical>
                <text id="tip" textSize="14sp" maxLines="4" layout_weight="1" text="" background="#000000" enabled='false' textColor="#ffffff" w="210" h="58" alpha="1.0" />
                    <list id="list"  w="210" h="220" background="#000000" alpha="0.8"  >
                        <vertical>
                            <text id="name" textSize="14sp" textColor="{{color}}" text="{{name}}" />
                        </vertical>
                    </list>
             </vertical>
        </frame>
    );
    this.tipView.setTouchable(false)
    // for(var prop in this.tipView.list)
    // {
    //     log(prop)
    // }
    this.tipView.list.setOnTouchListener(function(view, event){
        return true
    })

    this.tipView.setPosition(40, device.height*0.4);
    var that=this;
    ui.run(function(){
        that.tipView.list.setDataSource(that.items);
    });
    var dir="/storage/emulated/0";
    files.write(dir+"/1.txt", "");
}

global.alert = function(dialogtitle,positiveCallback,x,y,width,height)
{
    var dialog = dialogs.build({
        title: dialogtitle,
        positive: "确定",
       
    }).on("positive", (dialog)=>{
        positiveCallback()
    });
    if (x === undefined)  
        x =0;
    if (y === undefined)  
        y =0;
    if (width === undefined)  
        width =0;
    if (height === undefined)  
        height =0;
    window=dialog.getWindow()
    var attr=window.getAttributes();
    // attr.x=x;
    attr.y=y;
    if(width)
      attr.width=width;
    // attr.height=250;
    if(height)
        attr.height=height;
    window.setAttributes(attr);
    dialog.show();
    window.setGravity(51); 
}

global.log = function(content,colorValue)
{
    this.saveLog(content);
    console.log(content);
    if(!global.tipView)
        return;
    if(this.items.length>15)
        this.items.splice(0, 1);
    this.items.splice(this.items.length, 0,{name:content,color:colorValue});
    var adapter=global.tipView.list.getAdapter();
    ui.run(function(){
        adapter.notifyDataSetChanged();
        if(global.items.length>7)
           global.tipView.list.smoothScrollToPosition(adapter.getItemCount()-1); 
    });
}
global.error = function(content)
{
    this.log(content,"#ff0000");
}
global.info = function(content)
{
     this.log(content,"#00ff00");
}
global.consolelog = function(content)
{
    this.log(content,"#ffffff");
}
global.consolewarn = function(content)
{
    this.log(content,"#ffff00");
}
global.updateLog=function()
{
    if(!global.tipView)
        return;
    var that = this;
    ui.run(function(){
      that.tipView.tip.setText(that.appName+"原始:喜欢"+that.originLikeCount+" 关注"+that.originFollowingCount+"\n"
    +that.appName+"当前:喜欢"+that.currentLikeCount+" 关注"+that.currentFollowingCount+
    "\r\n成功:喜欢"+that.successLikeCount+" 关注 "+that.successFollowingCount);
    });//+",失败:喜欢"+that.failLikeCount+" 关注"+that.failFollowingCount+""
}
global.updateFoucsLikeNum=function(following_count,favoriting_count)
{
    if(following_count)
    {
        this.currentFollowingCount = following_count;
        if(!this.originFollowingCount)
        {
            this.originFollowingCount =  following_count ;
            this.updateLog();
        }
    }
   if(favoriting_count)
   {
        this.currentLikeCount= favoriting_count; 
        
        if(!this.originLikeCount)
        {
            this.originLikeCount = favoriting_count ;
            this.updateLog();
        }
   }
}
global.updateNum=function(isFocus,isOk)
{
    if(isFocus)
    {
        if(isOk)
        {
            this.successFollowingCount++;
            this.info("关注:"+this.currentFollowingCount+"  成功");
        }
        else
        {
            this.failFollowingCount++;
            this.error("关注:"+this.currentFollowingCount+"  失败");
        }
    }
    else
    {
        if(isOk)
        {
            this.successLikeCount++;
            this.info("赞:"+this.currentLikeCount+"  成功");
        }
        else
        {
            this.failLikeCount++;
            this.error("赞:"+this.currentLikeCount+" 失败");
        }
    }
    this.updateLog();
}

global.isCorrectView=function(view)
{//&& view.bounds().left<view.bounds().right&& view.bounds().top<view.bounds().bottom
    if(view&&view.bounds().left>=0&&view.bounds().right>=0&&view.bounds().right<device.width&&view.bounds().top>=0&&view.bounds().bottom>=0&& view.bounds().bottom<device.height)
        return true;
    // log("left:"+view.bounds().left);
    // log("right:"+view.bounds().right);
    // log("top:"+view.bounds().top);
    // log("bottom:"+view.bounds().bottom);
    return false;
}
global.clickView =function(view,level)//level是多少层父控件遍历
{
    if(!view)
        return false;
    if (level === undefined)  
        level =2;
    if(view.clickable())
        view.click();
    else if(view.parent().clickable())
        view.parent().click();
    else if(level>=2&& view.parent().parent().clickable())
        view.parent().parent().click();
    else if(level>=3&& view.parent().parent().parent().clickable())
        view.parent().parent().parent().click();
    else
        return false;
    return true;
}
global.getClipBoardContent=function(package)
{
    sleep(2000);
    var content=getClip();
    if(content)
        return content;
    var androidVersion = parseFloat(device.release);
    if(androidVersion >= 10)
    {
        app.launchPackage("com.haozhuan.scriptnew");
        sleep(5000);
        content=getClip();
        log("返回APP");
        app.launchPackage(package);
    }
    setClip("");
    return content;
}
//关闭通用弹窗
global.closeGenernalDialog=function()
{
    if (textContains("响应").exists()) 
    {
        log("无响应");
        var sure=text("确定").findOnce();
        if(sure)
            this.clickView(sure);
        else 
        {
            var sure=text("关闭应用").findOnce();
            if(sure)
                this.clickView(sure);
            else
            {
                var sure=text("等待").findOnce();
                if(sure)
                    this.clickView(sure);
            }
        }
        sleep(3000);
    };
    if (text('以后再说').exists()) {
        console.verbose("以后再说");
        text('以后再说').click();
    };
    if (text('下次再说').exists()) {
        console.verbose("下次再说");
        text('下次再说').click();
    };
    if (text('稍后').exists()) {
        console.verbose("稍后");
        text('稍后').click();
    };
    if (text('跳过').exists()) {
        console.verbose("跳过");
        text('跳过').click();
    };
    
    if (text('取消更新').clickable(true).exists()) { //判断是否有更新
        console.verbose("取消更新");
        text('取消更新').clickable(true).findOnce().click();//点击取消
    }
    if (text('总是允许').exists()) 
    {
        log("总是允许");
        text('总是允许').click();
    };
    if (text('我知道了').exists()) {
        console.verbose("我知道了");
        text('我知道了').click();
    };
    if (text('好的').exists()) {
        console.verbose("好的");
        text('好的').click();
    };
    if (text('始终允许').exists()) {
        console.verbose("始终允许");
        var alW = text('始终允许').findOnce();
        if(!this.clickView(alW))
            console.verbose("始终允许不可点");
    };
    var btn=text("允许").findOnce();
    if(btn)
    {
        log("允许");
        this.clickView(btn);
    }
    var allowW = textEndsWith("允许").clickable(true).findOnce();
    if (allowW != null) {
        log("允许");
        allowW.click();
    }
}
module.exports = global;