BasicGame.Game.prototype.attackPig = function(){
	if(this.gameCount%100==0){
		var desicion = this.selectAttack();
		// console.log(desicion);
		switch(desicion){
			case 'block':
				this.addBlock(this.pig.x +4000,this.plataformYPosition-30);
				break;
			case 'floor':
				this.floorAttack = true;
				break;
			case 'red':
        		this.addAttack();
				break;
			default:
				break;
		}
    }
}

BasicGame.Game.prototype.selectAttack = function(){
	this.select = Math.round(Math.random() * 100);
	if(this.select > 0 && this.select <= 25){
		return 'block';
	} else if(this.select > 25 && this.select <= 50) {
		return 'floor';
	} else if(this.select > 50 && this.select <= 75) {
		return 'red';
	} else if(this.select > 75 && this.select <= 100) {
		return 'super';
	} else {
		return "nothing"
	}

};

BasicGame.Game.prototype.selectPlatform = function(){
	this.select = Math.round(Math.random() * 100);
	if(this.select > 0 && this.select <= 25){
		return -120;
	} else if(this.select > 25 && this.select <= 50) {
		return 120;
	} else if(this.select > 50 && this.select <= 75) {
		return -120;
	} else if(this.select > 75 && this.select <= 100) {
		return 120;
	} else {
		return -120;
	}

};

