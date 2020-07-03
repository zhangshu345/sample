function Hero(id,lv,q,exp,skill,position){
	//英雄id
	this.id = id;
	//英雄等级
	this.lv = lv;
	//英雄品质(升阶)
	this.q = q;
    //英雄经验
    this.exp = exp;
    //英雄技能
    this.skill = skill;
    //英雄位置，相当于上阵的位置
    this.position =position;
    //英雄装备
    this.equips = [0,0,0,0,0,0];
}
exports.Hero = Hero;