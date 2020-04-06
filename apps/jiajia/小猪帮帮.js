var w = device.width;
var h = device.height;
function 文章详情(){
    var i = 0
    while(true)
    {
        if(i>60)
        {
            back()
            break
        }
        if(className("android.view.View").textContains("展开全文").exists())
        {
            var b=className("android.view.View").textContains("展开全文").findOne(1000).bounds()
            click(b.centerX(),b.centerY())
            // swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.65 + random(10, 30), random(220, 235))
        }
        sleep(8000)
        i = i + 8
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.65 + random(10, 30), random(220, 235))
    }
    log("结束详情")
}

function 文章列表(){
    sleep(3000)
    while(true)
    {
        log("开始检测")
        var uc = className("android.view.View").find();
        for(var i = 0; i < uc.length; i++)
        {
            var c = uc[i]   
            var b = c.bounds()
                if((b.right-b.left)>0.9*w && (b.right-b.left)<w &&(b.bottom-b.top)>0.2*h && (b.bottom-b.top)<0.4*h)
                {
                    log("检测到文章")
                    sleep(1000)
                    click((b.left+b.right)/2,b.top+(b.bottom-b.top)/2)
                    sleep(1000)
                    // back()
                    文章详情()                
                }
        }
        sleep(1000)
        swipe(w * 0.6 - random(10, 30), h * 0.8 + random(10, 20), w * 0.6 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
        sleep(3000)

    }
    

}


exports.启动线程=function (){
    sleep(5000)
    文章列表()

}