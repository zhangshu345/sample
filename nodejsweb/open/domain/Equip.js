function Equip(guid,id,lv,q,bding){
	//装备序列id
	this.guid = guid;
	//装备id
	this.id = id;
	//等级
	this.lv = lv;
	//品质
	this.q = q;
	//绑定的英雄id
	this.bding = bding;
}
exports.Equip = Equip;