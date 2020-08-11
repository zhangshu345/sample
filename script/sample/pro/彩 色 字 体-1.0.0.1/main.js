"ui";
ui.layout(
    <vertical>
    <button id="b" text="按我"/>
    </vertical>
)
v = ui.b
r="0"
g="0"
b="0"
ui.b.on("click", function(){
setInterval(function(){
ui.run(function(){
if(r<"255".toString(16) && g==0&& b==0){
r++
var rgb = 整理(r, g, b)
v.textColor=colors.parseColor(rgb)
}
//初始+r
if(r=="255".toString(16) && g<"255".toString(16) && b==0){
g++
var rgb = 整理(r, g, b)
v.textColor=colors.parseColor(rgb)
}
//渐变到黄
if(r<="255".toString(16) && g=="255".toString(16) && b==0 && r!=00){
r--
var rgb = 整理(r, g, b)
v.textColor=colors.parseColor(rgb)
}
//渐变到绿
if(r==00 && g=="255".toString(16) && b<"255".toString(16)){
b++
var rgb = 整理(r, g, b)
v.textColor=colors.parseColor(rgb)
}
//渐变到青
if(r==00 && g<="255".toString(16) && b=="255".toString(16) &&g!= 00){
g--
var rgb = 整理(r, g, b)
v.textColor=colors.parseColor(rgb)
}
//渐变到蓝
if(r<"255".toString(16) && g==00 && b=="255".toString(16)){
r++
var rgb = 整理(r, g, b)
v.textColor=colors.parseColor(rgb)
//渐变到紫
}
if(r=="255".toString(16) && g==00 && b<="255".toString(16) &&b!=00){
b--
var rgb = 整理(r, g, b)
v.textColor=colors.parseColor(rgb)
}
//渐变到红
})
}, 10)
})







function 整理(r, g, b){
if(r>255 || g>255 || b>255){
    return "#ffffff"
    }
      
if(r<="15".toString(16)){
r="0"+ r.toString(16)

}
r=r.toString(16)

if(g<="15".toString(16)){
g="0"+ g.toString(16)

}
g=g.toString(16)

if(b<="15".toString(16)){
b="0"+ b.toString(16)

}
b=b.toString(16)

return "#"+r+g+b
}