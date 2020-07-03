var Class = require('./class');

var Player = Class.extend({
	ctor:function(uid,username,role){
		this.uid = uid;
		this.username = username;
		this.role = role;

	},
	getplayer: function(){
		return this;
	}
});
module.exports = Player;

// var p = new Player(1,'aaa','tttt');
// console.log(p.getplayer().username);