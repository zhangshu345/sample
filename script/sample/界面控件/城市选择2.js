"ui";

ui.layout(
    <vertical padding="16">
        <horizontal>
             <NumberPicker id="sheng" w="auto" h="56dp" padding="16">
                
                
            </NumberPicker>
            <NumberPicker id="shi" w="auto" h="56dp" padding="16">
              
            </NumberPicker>
            <NumberPicker id="xian" w="auto" h="56dp" padding="16">
                 
            </NumberPicker>
        </horizontal>
             <button id="ok">确定</button>
        <button id="select3">选择选项3</button>
    </vertical>
);

sheng=["山西","浙江","河南"]
shi=[]
ui.sheng.set

ui.ok.on("click", ()=>{
  
    
});

ui.select3.on("click", ()=>{
    ui.sp1.setSelection(2);
});