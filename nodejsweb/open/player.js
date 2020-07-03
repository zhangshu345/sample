var Hero = require('./domain/Hero').Hero;
var Role = require('./domain/Role').Role;
var rf = require("./tools/ReadFile");
var Player = require("./mainplayer");
var player = Player.extend({
	ctor:function(uid,username,heroid,insertid,rolename){
		var role = null;
		if(heroid==null){

		}else{
			var herodatas = rf.readfile('./data/hero.json');
			var myobj = JSON.parse(herodatas);
			var tag = 0;
			for(var i=0;i<myobj.length;i++){
				if(myobj[i].ID===heroid){
					tag = i;
					break;
				}
			}
			var skills = JSON.parse(myobj[tag].Skills);
			var newskills = [];
			for(var i =0;i<skills.length;i++){
				newskills.push([skills[i],1]);
			}
			var heros = new Array();
			heros.push(new Hero(myobj[tag].ID,1,1,0,newskills,0));
			role = new Role(insertid,uid,rolename,1,0,heros,null,heroid,null);
		}
		this._super(uid,username,role);

	},
	getplayer: function(){
		return this;
	}

});
module.exports = player;