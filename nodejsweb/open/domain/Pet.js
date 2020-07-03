function Pet(guid,id,lv,q,exp,skill,position,bding){
	//宠物序列id
	this.guid = guid;
	//宠物id
	this.id = id;
	//宠物等级
	this.lv = lv;
	//宠物品质
	this.q = q;
	//宠物经验
	this.exp = exp;
	//宠物技能
	this.skill = skill;
	//宠物位置
	this.position = position;
	//绑定的英雄
	this.bding = bding;
}
exports.Pet = Pet;