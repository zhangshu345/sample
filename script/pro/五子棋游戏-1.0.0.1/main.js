"ui";
/**
 *作者QQ: 1105310045 (可用但不可盗用)
 *完成时间: 2020年2月14日 下午8:30:00
 *测试机型: huawei MAIMANG 8
 *Auto.js版本: 8.0.0.2
 *Android版本: 10
 *屏幕: 1080*2340
 **/

ui.layout(
    <vertical>
        <canvas id="board" w="*" h="*"/>
    </vertical>
);
//画笔
X=0
Y=0
x=0
y=0
e=0
f=0
棋子=[]
记录x=[0,0]
记录y=[0,0]
棋子色=1
开关="关"
var paint = new Paint();
paint.setStrokeWidth(2);
ui.board.on("draw", function(canvas){
    paint.setARGB(255,100,20,20)
    canvas.drawRect(0,0,18*70,21*70, paint); 
    
    paint.setARGB(255,0,0,0)
    paint.setTextSize(50);//字体大小
    paint.setFakeBoldText(true); //字体加粗
    canvas.drawText(e/70+"."+f/70,12*70,100, paint);
    
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    for(var i=0;i<70*13;i+=70){
    canvas.drawLine(X+i, 70, X+i,70*20, paint);
    }
    for(var i=0;i<70*21;i+=70){
    canvas.drawLine(70, Y+i, 70*12, Y+i, paint);
    }
    
    if(开关=="开"){
        for(var i=0;i<棋子.length;i++){
        if(棋子[i].棋子色==0){
          canvas.drawCircle(13*70,2*70,35 , paint);//圆
          paint.setARGB(255,30,30,30)//黑棋
          }else{
          canvas.drawCircle(13*70,2*70,35 , paint);//圆
          paint.setARGB(255,180,180,180)//白棋
        }
        canvas.drawCircle(棋子[i].x,棋子[i].y,35 , paint);//圆
        }
        paint.setARGB(255,100,20,20)
        canvas.drawCircle(e,f,15, paint);//圆
    }
    
});
var view=ui.board
view.setOnTouchListener(function(view, event){
  switch(event.getAction()){
      case event.ACTION_DOWN:
          x =  event.getX();
          y =  event.getY();
          输赢x=""
          输赢y=""
          for(var j=70;j<13*70;j+=70){
          for(var k=70;k<21*70;k+=70){
              a=j+35
              b=j-35
              c=k+35
              d=k-35
              if(a>x&&x>b&&c>y&&y>d){
              开关="开"
              if(记录x.indexOf(j+"."+k)==-1){
                  if(棋子色==0){棋子色=1}else{棋子色=0}
                  记录x.push(j+"."+k)
                  记录x.push(棋子色)
                  棋子.push({x:j,y:k,棋子色:棋子色})
                  e=j;f=k
                  //log(j+"."+k+"."+棋子色)
                  
              }
              }
            
             w=记录x.indexOf(j+"."+k)
             if(w>0){
             输赢x=输赢x+""+记录x[w+1]
             }else{
                 输赢x=输赢x+""+"*"
                 }
             
          }
          }
         
          //log(输赢x)
          输赢=输赢x.match(/11111/)
          if(输赢!=null){alert("白","赢");log("赢")}else{log("对弈白")}
          输赢=输赢x.match(/00000/)
          if(输赢!=null){alert("黑","赢");log("赢")}else{log("对弈白")}
          
          for(var k=70;k<21*70;k+=70){
          for(var j=70;j<13*70;j+=70){
             w=记录x.indexOf(j+"."+k)
             if(w>0){
             输赢x=输赢x+""+记录x[w+1]
             }else{
                 输赢x=输赢x+""+"*"
                 }
          }
          }
          //log(输赢x)
          输赢=输赢x.match(/00000/)
          if(输赢!=null){alert("黑","赢");log("赢")}else{log("对弈黑")}        
          输赢=输赢x.match(/11111/)
          if(输赢!=null){alert("白","赢");log("赢")}else{log("对弈白")}
          
          输赢z=""
          for(var j=0;j<21*70;j+=70){
                  w=记录x.indexOf((j+e)+"."+(j+f))
                  if(w>0){
                  输赢z=输赢z+""+记录x[w+1]
                  }else{
                  输赢z=输赢z+""+"*"
                  }
                  //log((j+e)+"."+(j+f))
           }
          //log(输赢z)
          输赢=输赢z.match(/00000/)
          if(输赢!=null){alert("黑","赢");log("赢")}else{log("对弈黑")}        
          输赢=输赢z.match(/11111/)
          if(输赢!=null){alert("白","赢");log("赢")}else{log("对弈白")}
          
          输赢z=""
          for(var j=0;j<21*70;j+=70){
                  w=记录x.indexOf((e-j)+"."+(f-j))
                  if(w>0){
                  输赢z=输赢z+""+记录x[w+1]
                  }else{
                  输赢z=输赢z+""+"*"
                  }
                  //log((j+e)+"."+(j+f))
           }
          //log(输赢z) 
          输赢=输赢z.match(/00000/)
          if(输赢!=null){alert("黑","赢");log("赢")}else{log("对弈黑")}        
          输赢=输赢z.match(/11111/)
          if(输赢!=null){alert("白","赢");log("赢")}else{log("对弈白")}
          
          
          输赢z=""
          for(var j=0;j<21*70;j+=70){
                  w=记录x.indexOf((j+e)+"."+(f-j))
                  if(w>0){
                  输赢z=输赢z+""+记录x[w+1]
                  }else{
                  输赢z=输赢z+""+"*"
                  }
                  //log((j+e)+"."+(j+f))
           }
          //log(输赢z)
          输赢=输赢z.match(/00000/)
          if(输赢!=null){alert("黑","赢");log("赢")}else{log("对弈黑")}        
          输赢=输赢z.match(/11111/)
          if(输赢!=null){alert("白","赢");log("赢")}else{log("对弈白")}
          
          输赢z=""
          for(var j=0;j<21*70;j+=70){
                  w=记录x.indexOf((e-j)+"."+(f+j))
                  if(w>0){
                  输赢z=输赢z+""+记录x[w+1]
                  }else{
                  输赢z=输赢z+""+"*"
                  }
                  //log((j+e)+"."+(j+f))
           }
          //log(输赢z) 
          输赢=输赢z.match(/00000/)
          if(输赢!=null){alert("黑","赢");log("赢")}else{log("对弈黑")}        
          输赢=输赢z.match(/11111/)
          if(输赢!=null){alert("白","赢");log("赢")}else{log("对弈白")}
           
          return true;
  }
  return true;
}); 

