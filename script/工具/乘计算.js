"ui";
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="利息计算器"/>
        </appbar>
        <scroll >
            <vertical >
            <text gravity="center" id="ok" padding="8dp" textSize="20sp" background="#ffff0000">计算相乘</text>
            <text id="t1"  > 本金 </text>
            <input id="benjin" />
            <text id="t2"  > 乘数 </text>
            <input id="chengshu" />
            <text id="t3"  > 相乘次数 </text>
            <input id="cishu" />
            <text id="t4"  ></text>
            <text id="result" />
            <text id="lizi"> 
             </text>
        </vertical>
    </scroll>
</vertical>
)

function fuli(b,l,n){
    for(let i=0;i<n;i++){
        b=b*l;
    }
    return b;
}


let an=100;
let s="复利的伟大！";
for(let i=1;i<=100;i++){
    s=s+"\n1.01 的"+10*i+"连乘："+fuli(1,1.01,10*i)
}

ui.lizi.setText(s)

ui.ok.on("click",function(){
    var benjin=parseFloat(ui.benjin.text())||1;
    var chengshu=parseFloat(ui.chengshu.text())||1;
    var cishu=parseInt(ui.cishu.text())||1;
   
   ui.run(function(){})
    ui.result.setText(ui.benjin.text()+"连续"+ui.chengshu.text()+"相乘，结果:"+fuli(benjin,chengshu,cishu))
})



