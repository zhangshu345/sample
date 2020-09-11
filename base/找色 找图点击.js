var clicktexts=function(texts,t,st){
    alter("开始点击文本集合控件:"+texts)
    st=st || 500
    t=t || 500

    for(i=0;i<texts.length;i++){
        if(textclick(texts[i],t)){
            sleep(st)
        }
    }
}

var alter=sync(function(txt,t,left,top,width,height){
    var issleep=false
    t=t||1200
    left= left ||device.width/20
    top =top || device.height/20
    width =width|| device.height/20*19
    height =height || device.height/15
    var fw=floaty.rawWindow(
        <horizontal gravity="center">
            <text id="sleep" w="50dp"  >暂停</text>
        <text id="text" w="*" h="*" gravity="center" textSize="18sp" background="#55ffff00">提醒</text>
        <text id="stop" w="50dp">退出</text>
        </horizontal>
    );
    fw.sleep.click(function(){
        issleep=!issleep
        while(issleep){
            sleep(1000)
        }
    })
    fw.stop.click(function(){
        exit()
    })
    fw.setAdjustEnabled(true)
    fw.setTouchable(false)
    fw.setSize(1, 1)
    fw.setPosition(50,85)
      ui.run(function(){
          console.log(txt)
        fw.text.setText(txt)
        fw.setSize(device.width-100, 120)
        setTimeout(()=>{
            fw.close()
        },t)
     })
});


function textclick(i,t,left,top,right,bottom){
    t=t || 500
    left = left || 0;
    top = top || 0;
    right = bottom || device.width;
    bottom = bottom || device.height;
    var f=text(i).boundsInside(left, top, right, bottom).findOne(t);
    if(f){
         if(!f.click()){
             alter("text："+i+":点位开始成功")
                b=f.bounds()
              r=click(b.centerX(),b.centerY())
           return r
        }else{
            alter("text:"+i+"----控件点击成功")
            return true
        }
    }
    return false
}

//在图片消失之后点击图标位置
function afterpicturedismissclick(img){
threads.start(function(){
    while(true){
        if(textclick("立即开始")){
            return 
         }
        }
    })
//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}  
while(true){
    var p=images.findImage(captureScreen(),img)
    if(p){
        log("x:"+p.x+","+p.y)
        while(true){
            sleep(2000)
           var  np=images.findImage(captureScreen(),img)
            if(!np){
                log("消失:"+p.x+","+p.y)
                click(p.x,p.y)
                return true
            }else{
                log("还在"+np.x+":"+np.y)
            }
    }
    }else{
        log("一开始就没找到")
    return false 
    }
    sleep(3000)
}
}

afterpicturedismissclick(images.read("/sdcard/红包.jpg"))