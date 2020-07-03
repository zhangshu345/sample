function Role(roleid,uid,name,lv,exp,heros,pets,headid){
	//角色序列id
	this.roleid = roleid;
	//账号id
	this.uid = uid;
	//角色名
	this.name = name;
	//角色等级
	this.lv = lv;
	//角色经验
	this.exp = exp;
    //英雄
    this.heros = heros;
    //装备
    this.equips = equips;
    //宠物
    this.pets = pets;
    //推图记录
    this.backcopy = [1,0];
    //金钱
    this.gamecoin = 0;
    //水晶
    this.crystal = 0;
    //能量(体力)
    this.power = 150;
    //头像id
    this.headid = headid;
}
exports.Role = Role;