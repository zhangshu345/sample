"ui";
var ss="选项66|选项88|选项99"
ui.layout(
    <vertical padding="16">
        <horizontal>
            <text textSize="16sp">下拉菜单</text>
            <spinner id="sp1" entries="选项1|选项2|选项3"/>
        </horizontal>
        <horizontal>
            <text textSize="16sp">对话框菜单</text>
            <spinner id="sp2" entries="{{ss}}" spinnerMode="dialog"/>
        </horizontal>
        <button id="ok">确定</button>
        <button id="select3">选择选项3</button>
    </vertical>
);

ui.ok.on("click", ()=>{
    var i = ui.sp1.getSelectedItemPosition();
    var j = ui.sp2.getSelectedItemPosition();
    toast("您的选择是选项" + (i + 1) + "和选项" + (j + 4));
});

ui.select3.on("click", ()=>{
    ui.sp1.setSelection(2);
});

ui.run(function(){
    toast("设置属性")
    ss="ssss|666|9999"
//    ui.sp2.setAdapter(new ui.sp2.Adapter(context,android.R.layout.simple_spinner_dropdown_item,["sss","aa","555"]))
})
