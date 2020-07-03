function Handler(roleMap){
	console.log('开启线程执行');
	function handler(){
		// console.log('每秒执行');


	}
	var time = setInterval(handler,1000);
	this.clear = function(){
		console.log('关闭线程');
		clearInterval(timer);
	}
}
exports.Handler = Handler;
