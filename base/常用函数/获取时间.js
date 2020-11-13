var today=function(){
    let td=new Date();
    return td.getFullYear()+"_"+td.getMonth()+"_"+td.getDate();
}
let td=new Date();
log(td.toLocaleTimeString())