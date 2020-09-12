"ui";

ui.layout(
    <vertical padding="16">
        <horizontal>
             <vertical padding="16">
                  <text id="sheng" textSize="16sp">省</text>
                 <spinner id="sp1" entries="北京|山西|河北"/>
            </vertical>
            <vertical padding="16">
                 <text id="shi" textSize="16sp">市</text>
                 <spinner id="sp2" entries=""/>
            </vertical>
             <vertical padding="16">
                 <text  id="xian" textSize="16sp">县</text>
                <spinner id="sp3" entries=""/>
            </vertical>
        </horizontal>
             <button id="ok">确定</button>
        <button id="select3">选择选项3</button>
    </vertical>
);

 ui.sp1.setOnItemSelectedListener(function(adapter,view,i,l){})


ui.ok.on("click", ()=>{
    var i = ui.sp1.getSelectedItemPosition();
    var j = ui.sp2.getSelectedItemPosition();
    var n = ui.sp3.getSelectedItemPosition();
    toast("您的选择是选项" + (i + 1) + "和选项" + (j + 4));
});

ui.select3.on("click", ()=>{
    ui.sp1.setSelection(2);
});