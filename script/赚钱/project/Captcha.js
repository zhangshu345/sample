var captcha = {};
captcha.puzzleFrame = [];//拼图位置
captcha.sliderFrame = [];//滑块位置
captcha.refreshFrame = [];//刷新控件位置
captcha.bgFrame=[];//滑块 的图片背景
captcha.debug=0;
captcha.percent=0.9; 
// 初始化
captcha.init = function ( ) 
{
    this.puzzleFrame = "";//拼图位置
    this.sliderFrame = "";//滑块位置
    this.refreshFrame = "";//刷新控件位置
    this.bgFrame="";//滑块 的图片背景
    var curAc = currentActivity();
    if(curAc!="com.yxcorp.gifshow.webview.KwaiWebViewActivity"&&curAc!="com.yxcorp.gifshow.webview.KwaiYodaWebViewActivity"&&curAc!="")
    {
        if(this.debug)
            log("当前界面:"+curAc);
        return false;
    }
    var items=className("android.view.View").boundsInside(10, device.height*0.1, device.width-10, device.height*0.5).find();
    if(items.length>1)
    {
        for(var i=0;i<items.length;i++)
        {
            var item=items[i];
            if(item.bounds().right>device.width*0.5)
            {
                this.bgFrame=this.covertBounds(item.bounds());
            }
        }
    }
    
    if(!this.bgFrame)
    {
        if(this.debug)
            log("没找到划图背景图");
        return false;
    }
     
    var image=className("Image").boundsInside(10, device.height*0.15, device.width*0.3, device.height*0.4).findOnce();
    if(image)
    {
        this.puzzleFrame=this.covertBounds(image.bounds());  
    }
    else
    {
        if(this.debug)
            log("没找到左边划图");
        return false;
    }
    var items=className("android.view.View").clickable(true).boundsInside(10, device.height*0.30, device.width*0.2, device.height*0.6).find();
    if(items&&items.length>1)
    {
        if(items[0].bounds().top>items[1].bounds().top)
        {
            this.sliderFrame=this.covertBounds(items[0].bounds());
            this.refreshFrame=this.covertBounds(items[1].bounds()); 
        }
        else
        {
            this.sliderFrame=this.covertBounds(items[1].bounds());
            this.refreshFrame=this.covertBounds(items[0].bounds());
        }
    }
    else
    {
        if(this.debug)
            log("没找到下面的拖动块");
    }
     
    if(this.sliderFrame&&this.puzzleFrame&&this.bgFrame&&this.refreshFrame)
         return true;
    return false;
};
captcha.close=function()
{
    var tryTimes=0;
    this.debug=0;
    while(tryTimes<5)
    {
        tryTimes++; 
        var state=this.init();  
        if(state)
        {
            log("截图");
            var img = captureScreen(); 
            var slider_rect=this.getCoordinate(img,140);   
            if(slider_rect['endX']==-1)
            {
                slider_rect=this.getCoordinate(img,70); 
            }
            if(slider_rect['endX']!=-1)
            {
                log("开始滑动");   
                swipe(slider_rect['x'],slider_rect['y'], slider_rect['endX']-12, slider_rect['endY'], 1000);
                sleep(2000);
                var curAc = currentActivity();
                if(curAc!="com.yxcorp.gifshow.webview.KwaiWebViewActivity"&&curAc!="com.yxcorp.gifshow.webview.KwaiYodaWebViewActivity"&&curAc!="")
                {
                    log("划图成功");
                    return true;
                }
            }
            else
            {
                var point=this.refreshPoint();
                click(point['x'],point['y']);
                sleep(2000);
            }
        }
        else
        {
            log("未找齐划图控件"); 
            return false;
        }
    }
}
captcha.useFakeFrame=function()
{
    this.puzzleFrame['left']=72;
    this.puzzleFrame['top']=474;
    this.puzzleFrame['right']=249;
    this.puzzleFrame['bottom']=630;
    this.puzzleFrame['width']=177;
    this.puzzleFrame['height']=177;

    this.sliderFrame['left']=87;
    this.sliderFrame['top']=939;
    this.sliderFrame['right']=159;
    this.sliderFrame['bottom']=1011;
    this.sliderFrame['width']=72;
    this.sliderFrame['height']=72;

    this.refreshFrame['left']=72;
    this.refreshFrame['top']=735;
    this.refreshFrame['right']=144;
    this.refreshFrame['bottom']=810;
    this.refreshFrame['width']=72;
    this.refreshFrame['height']=75;

    this.bgFrame['left']=48;
    this.bgFrame['top']=258;
    this.bgFrame['right']=1032;
    this.bgFrame['bottom']=834;
    this.bgFrame['width']=984;
    this.bgFrame['height']=576;
}
captcha.covertBounds=function(bounds)
{
    var rect=[];
    rect['left']=bounds.left;
    rect['top']=bounds.top;
    rect['right']=bounds.right;
    rect['bottom']=bounds.bottom;
    rect['width']=bounds.width();
    rect['height']=bounds.height();
    return rect;
}
captcha.sliderPoint=function()
{
    var point={};
    var clickWidth=this.sliderFrame['width']-10*2;
    var clickHeight=this.sliderFrame['height']-25*2; 
    point['x']=parseInt(this.sliderFrame['left']+this.sliderFrame['width']*0.5);
    point['y']=parseInt(this.sliderFrame['top']+this.sliderFrame['height']*0.5); 
    return point;
}
captcha.refreshPoint=function()
{
    var point={};
    var clickWidth=this.refreshFrame['width']-20*2;
    var clickHeight=this.refreshFrame['height']-20*2;
    point['x']=parseInt(this.refreshFrame['left']+20+clickWidth*random());
    point['y']=parseInt(this.refreshFrame['top']+20+clickHeight*random());
    return point;h
}
captcha.getCoordinate=function(img,pixelRGB)
{
     var binaryRGB=new Array();
     //默认二值化阈值
     var calculateStartX= parseInt(this.puzzleFrame['right']+this.puzzleFrame['width']*0.5);
     var calculateStartY=parseInt(this.puzzleFrame['top']);
     var calculateEndX=parseInt(this.bgFrame['right']);
     var calculateEndY=parseInt(calculateStartY+this.puzzleFrame['height']);
     log("二值化中...");
     var screnWidth=parseInt(device.width);
     var screenHeight=parseInt(device.height);
     for(var h=0;h<screenHeight;h++)
     {
        binaryRGB[h]=new Array();
         for(var w=0;w<screnWidth;w++)
         {
             if(w>=calculateStartX&&w<=calculateEndX&&h>=calculateStartY&&h<=calculateEndY)
             {
                var color = images.pixel(img, w, h);
                var R=(color>>16)&0xFF;
                var G=(color>>8)&0xFF;
                var B=color &0xFF;
                var imageGray=Math.round(R*0.3+G*0.59+B*0.11);
                var binaColor=imageGray>pixelRGB?1:0;
                binaryRGB[h][w]=binaColor;
                if(this.debug)
                {
                    if(w==700&&h==476)
                    {
                        log("color:"+color); 
                        log("R:"+R);
                        log("G:"+G);
                        log("B:"+B);
                        log("imageGray:"+imageGray);
                        log("binaColor:"+binaColor);
                    }
                }
             }
             else
             {
                binaryRGB[h][w]=0;
             }
         }
     }
     var slider_point=this.sliderPoint();
     
     slider_point['endY']=slider_point['y'];
     slider_point['endX']=-1;
     log("开始进行识别");
     log("查找左上角的点")
     var endPointLeftUp=this.endPointLeftTopX(binaryRGB);
     if(endPointLeftUp)
     {
         log("查找右上角的点");
         var endPointRight=this.endPointRightX(binaryRGB,endPointLeftUp['x'],endPointLeftUp['y'],true);
         if(endPointRight)
         {
             log("坐标计算精确");
             slider_point['endX']=Math.ceil((endPointLeftUp['x']+endPointRight['x'])/2); 
             return slider_point;
         }
         else
         {
            log("未找到右上角的点");
            slider_point['endX']=endPointLeftUp['x']+Math.ceil((this.puzzleFrame['width']*0.69)/2);
             return slider_point; 
         }
     }
     else
     {
        log("未找到左上角的点")
     }
     log("查左下角的点")
     var endPointLeftDown=this.endPointLeftDownX(binaryRGB);
     if(endPointLeftDown)
     {
        log("查右下角的点")
        var endPointRight=this.endPointRightX(binaryRGB,endPointLeftDown['x'],endPointLeftDown['y'],false);
        if(endPointRight)
        {
            log("坐标计算精确");
            slider_point['endX']=Math.ceil((endPointLeftDown['x']+endPointRight['x'])/2);
            return slider_point;
        }
        else
        {
            log("未找到右下角的点");
            slider_point['endX']=endPointLeftDown['x']+Math.ceil((this.puzzleFrame['width']*0.69)/2);
            return slider_point;
        }
     }
     else
     {
        log("未找到左下角的点")
     }
     return slider_point;
}
//右边滑块终点 右边界x坐标
captcha.endPointRightX=function(binaryRGB,endPointLeftX,endPointLeftY,isTop)
{
     
    var calculateStartX=parseInt(endPointLeftX+this.puzzleFrame['width']*0.67);
    var calculateEndX=parseInt(calculateStartX+this.puzzleFrame['width']*0.33);
   
    if(this.debug)
    {
        for(var j=504;j<504+30;j++)
        {
            var logstr="";
            for(var i=w-4;i<w+4;i++)
            {
                if(i==772&&j==504)
                {
                    logstr+='('+(binaryRGB[j][i]?"白":"黑")+')   ';  
                }
                else
                {
                    logstr+=binaryRGB[j][i]?"白    ":"黑    ";
                }
                
            }
            log(logstr); 
        }
    }
    for(var w=calculateStartX;w<=calculateEndX;w++)
    {
        var color=binaryRGB[endPointLeftY][w];
        
        if(!this.isBlack(color))
        {
            if(isTop)
            {
                if(this.isWhiteDownLine(binaryRGB,endPointLeftY,w))
                {
                    log("右上角endPointRightX:"+w+",endPointRightY:"+endPointLeftY); 
                    var result=[];
                    result['x']=w;
                    result['y']=endPointLeftY;
                    return result;
                }
            }
            else
            {
                if(this.isWhiteUpLine(binaryRGB,endPointLeftY,w))
                {
                    log("右下角endPointRightX:"+w+",endPointRightY:"+endPointLeftY);
                    
                    var result=[];
                    result['x']=w;
                    result['y']=endPointLeftY;
                    return result;
                }
            }
        }
    }

    return false;
}
//右边滑块终点 左上角边界x坐标
captcha.endPointLeftTopX=function(binaryRGB)
{
    var calculateStartX= parseInt(this.puzzleFrame['right']+this.puzzleFrame['width']*0.5);
     var calculateStartY=parseInt(this.puzzleFrame['top']);
     var calculateEndX=parseInt(this.bgFrame['right']-this.puzzleFrame['width']*0.5);
     var calculateEndY=parseInt(calculateStartY+this.puzzleFrame['height']*0.33);
     
    
     for(var h=calculateStartY;h<calculateEndY;h++)
     {
         for(var w=calculateStartX;w<calculateEndX;w++) 
         {
            var color=binaryRGB[h][w];
            if(this.debug)
            {
                var width=562;
                var height=610;
                if(w==width&&h==height)
                {
                    for(var i=w-20;i<w+20;i++)
                    {
                        var logstr="";
                        for(var j=h-20;j<h+20;j++)
                        {
                            if(i==width&&j==height)
                            {
                                logstr+='('+(binaryRGB[j][i]?"白":"黑")+')   '; 
                            }
                            else
                            {
                                logstr+=binaryRGB[j][i]?"白    ":"黑    ";
                            }
                        }
                        log(logstr);
                    }
                }
            }
            
            if(!this.isBlack(color))
            {
                 
                if(this.isWhiteDownLine(binaryRGB,h,w))
                {
                     
                    if(this.isWhiteRightLine(binaryRGB,h,w))
                    {
                        
                        if(this.isDownOffsetBlackRightLine(binaryRGB,h,w))
                        {
                             
                            if(this.isRightOffsetBlackDownLine(binaryRGB,h,w)&&!this.isCenterPoint(binaryRGB,h,w,true))
                            {
                               
                                 log("左上角endPointLeftX:"+w+",endPointLeftY:"+h);
                                 var result=[];
                                 result['x']=w;
                                 result['y']=h;
                                 return result; 
                            }
                        }
                    }
                }
            }
         }
    }
   
    return false;
}

//往右移4个像素后下边是黑色线
captcha.isRightOffsetBlackDownLine=function(binaryRGB,h,w)
{
    var blackcount=0;
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h+5+i][w+5]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0;
    return percent>this.percent;
}

//右边滑块终点 左下角边界x坐标
captcha.endPointLeftDownX=function(binaryRGB)
{
    var calculateStartX= parseInt(this.puzzleFrame['right']+this.puzzleFrame['width']*0.5);
     var calculateStartY=parseInt(this.puzzleFrame['top']+this.puzzleFrame['height']*0.67);
     var calculateEndX=parseInt(this.bgFrame['right']-this.puzzleFrame['width']*0.5); 
     var calculateEndY=parseInt(this.puzzleFrame['top']+this.puzzleFrame['height']);
     if(this.debug)
     {
         var width=562;
         var height=610;
        for(var j=height-30;j<=height;j++)
        {
            var logstr="";
            for(var i=width-5;i<width+5;i++)
            {
                if(i==width&&j==height)
                {
                    logstr+='('+(binaryRGB[j][i]?"白":"黑")+')   ';   
                }
                else
                {
                    logstr+=binaryRGB[j][i]?"白    ":"黑    ";
                }
                
            }
            log(logstr); 

        }
     }
     for(var h=calculateStartY;h<calculateEndY;h++)
     {
         for(var w=calculateStartX;w<calculateEndX;w++)
         {
            var color=binaryRGB[h][w];
            if(!this.isBlack(color))
            {
                if(this.isWhiteUpLine(binaryRGB,h,w))
                {
                    if(this.isWhiteRightLine(binaryRGB,h,w))
                    {
                        if(this.isUpOffsetBlackRightLine(binaryRGB,h,w))
                        {
                            if(this.isRightOffsetBlackUpLine(binaryRGB,h,w)&&!this.isCenterPoint(binaryRGB,h,w,false))
                            {
                                 log("左下角endPointLeftX:"+w+",endPointLeftY:"+h);
                                 var result=[];
                                 result['x']=w;
                                 result['y']=h;
                                 return result;
                            }
                        }
                    }
                }
            }
         }
    }
    return false;
}

//往右移4个像素后下边是黑色线
captcha.isRightOffsetBlackDownLine=function(binaryRGB,h,w)
{
    var blackcount=0;
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h+4+i][w+4]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0;
    return percent>this.percent;
}


//往右移4个像素后上边是黑色线
captcha.isRightOffsetBlackUpLine=function(binaryRGB,h,w)
{
    var blackcount=0;
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h-5-i][w+5]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0;
    return percent>this.percent;
}



//下边是白色线
captcha.isWhiteDownLine=function(binaryRGB,h,w)
{
    for(var i=4;i<=30;i++)
    {
        if(this.isBlack(binaryRGB[h+i][w]))
            return false;
    }
    return true;
}

//上边是白色线
captcha.isWhiteUpLine=function(binaryRGB,h,w)
{
    for(var i=4;i<=30;i++)
    {
        if(this.isBlack(binaryRGB[h-i][w]))
            return false;
    }
    return true;
}


//右边是白色线
captcha.isWhiteRightLine=function(binaryRGB,h,w)
{
    for(var i=4;i<=30;i++)
    {
        if(this.isBlack(binaryRGB[h][w+i]))
            return false;
    }
    return true;
}

 //左边是白色线
captcha.isWhiteLeftLine=function(binaryRGB,h,w)
{
    for(var i=4;i<=30;i++)
    {
        if(this.isBlack(binaryRGB[h][w-i]))
            return false;
    }
    return true;
}

//往下移4个像素后右边是黑色线
captcha.isDownOffsetBlackRightLine=function(binaryRGB,h,w)
{
    var blackcount=0; 
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h+5][w+5+i]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0; 
    return percent>this.percent;
}


//往上移4个像素后右边是黑色线
captcha.isUpOffsetBlackRightLine=function(binaryRGB,h,w)
{
    var blackcount=0;
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h-5][w+5+i]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0;
    return percent>this.percent;
}



//往下移4个像素后左边是黑色线
captcha.isDownOffsetBlackLeftLine=function(binaryRGB,h,w)
{
    var blackcount=0;
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h+5][w+5-i]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0;
    return percent>this.percent;
}

//下边是白色线
captcha.isWhiteDownLine_percent=function(binaryRGB,h,w)
{
    var whitecount=0;
    for(var i=0;i<=20;i++)
    {
        if(!this.isBlack(binaryRGB[h+2+i][w]))
            whitecount++;
    }
    var percent=whitecount*1.0/20.0;
    return percent>this.percent;
}

//往左移4个像素后下边是黑色线
captcha.isLeftOffsetBlackDownLine=function(binaryRGB,h,w)
{
    var blackcount=0;
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h+5+i][w-5]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0;
    return percent>this.percent;
}


//往左移4个像素后上边是黑色线
captcha.isLeftOffsetBlackUpLine=function(binaryRGB,h,w)
{
    var blackcount=0;
    for(var i=0;i<=20;i++)
    {
        if(this.isBlack(binaryRGB[h+5-i][w-5]))
            blackcount++;
    }
    var percent=blackcount*1.0/20.0;
    return percent>this.percent;
}
//拼图中轴线 tu起来的半圆的左上角,有时会误当作拼图左上角
captcha.isCenterPoint=function(binaryRGB,h,w,isTop)
{
    for(var i=0;i<=20;i++)
    {   //中轴线很长,全是黑的,有一个点是白,就不是中轴线
        if(isTop)
        {
            if(!this.isBlack(binaryRGB[h+10*i*4][w+10]))
                return false;
        }
        else
        {
            if(!this.isBlack(binaryRGB[h-10-i*4][w+10]))
                return false;
        }
    }
    return true;
}

//是否黑色
captcha.isBlack=function(color)
{
    return color>0?false:true;
}


module.exports = captcha;