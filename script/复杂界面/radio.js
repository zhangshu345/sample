"ui";


//显示登录界面

ui.layout(
    <frame>
    <vertical id="datav5">
        </vertical>
        </frame>
);   

datas3 = ["附近人","新上线","功能3"]

    var radiogroup =new android.widget.RadioGroup(context);
    for (var i = 0; i < datas3.length; i += 1) {
    var radiobutton=new  android.widget.RadioButton(context)
    radiobutton.setText(datas3[i]);
    // if(i==2){
    //     //这里是你要首次选中的默认值  你改一下数字2就行 那个678  我也不知道 你多运行几次看看 是不是还是那样 是默认+6？
        
    //     radiobutton.setChecked(true)
    // }
    radiogroup.addView(radiobutton)
    }
    
    radiogroup.setOnCheckedChangeListener(function(group,position){
        // position  为当前选中序号 看一下截屏 
        group
        log("当前的选项是position"+position)
    
    })
    ui.datav5.addView(radiogroup);
    ui.statusBarColor("#000000")
