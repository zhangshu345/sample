// // console.log("开始")
// // var today="今天:"+new Date().getDay()
// // var date=new Date()
// // console.log("debug",today)
// // console.log("year",date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate())
// // console.log("runtime",process.uptime() )
// // console.log( __dirname );


// 　　require.config({

//     　　　　paths: {
    
//     　　　　　　"Bmob": "https://gitee.com/zhangshu345012/ceshi/raw/master/bmob.js"
    
//     　　　　}
    
//     　　});
// // var Bmob = require('https://gitee.com/zhangshu345012/ceshi/raw/master/bmob.js');
// Bmob.initialize("25ee600dadbc51c5","622049")
// let params = {
//     username: 'bmob2018',
//     password: 'bmob2018',
//     email: 'bmob2018@bmob.cn',
//     phone: '13711166567',
// }
// Bmob.User.register(params).then(res => {
//   console.log(res)
// }).catch(err => {
//  console.log(err)
//  });
// // Bmob.User.login("nihao","zsh123456").then(
// //     res =>{
// //         console.log(res )
// //     }
// // ).catch(err =>{
// //     console.log(err )
// // });
var Bmob = require('Bmob-2.2.2.min.js');
console.log(Bmob)
