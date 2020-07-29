"ui";
importClass(com.blankj.utilcode.util.KeyboardUtils)
ui.layout(
    <frame id="root">
      <vertical h="auto" align="center" margin="0 50">
      <text w="*" gravity="center" color="#111111" size="18">复利计算</text>
        <linear>
           <text w="96" gravity="center" color="#111111" size="16">每年定存金额</text>
           <input id="money" w="*" h="40"/>
        </linear>
        <linear>
           <text w="96" gravity="center" color="#111111" size="16">定存年限</text>
           <input id="year" w="*" h="40" />
        </linear>
        <linear>
           <text w="96" gravity="center" color="#111111" size="16">平均利率</text>
           <input id="ll" w="*" h="40" />
        </linear>
        <linear gravity="center">
           <button id="jisuan" text="计算"/>
        </linear>
        
        <ScrollView  layout_width="match_parent" layout_height="match_parent">
        <vertical>
            
        <text id="log" w="*" gravity="center"  size="14"></text>
        </vertical>

        </ScrollView>


      </vertical>
    </frame>
  );

ui.jisuan.on("click",function(){
    money =  parseInt( ui.money.getText()) 
    year=parseInt(ui.year.getText())
    ll=parseInt(ui.ll.getText())
    asum=复利计算(year,money,ll,false)
})

ui.root.on("click",function(){
    
    KeyboardUtils.hideSoftInput(ui.root)
})
var 复利计算=function(n,money,ll,showtoast){
    sum=0
    sumstr=null
    for(i=0;i<n;i++){
        if(i==0){
            sum=money
        }else{
            sum=sum*(ll+100)/100+money
        }
        if(sumstr){
            sumstr=sumstr+"\n"+"第"+(i+1)+"年：利率="+ll+"%:总额:"+sum
        }else{
            sumstr="第"+(i+1)+"年：利率="+ll+"%:总额:"+sum
        }
        if(showtoast){
            toastLog()
            sleep(2000)
        }

    }
    ui.log.setText(sumstr)
}
