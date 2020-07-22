const p1 = new Promise(function(resolve,reject){
    resolve('success1');
    resolve('success2');
}); 
const p2 = new Promise(function(resolve,reject){  
    resolve('success3'); 
    reject('reject');
});
p1.then(function(value){  
    console.log(value); // success1
})
.then(function(value){  
    console.log("2:"+value); // success1
});
p2.then(function(value){ 
    console.log(value); // success3
});