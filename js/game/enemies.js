BasicGame.Game.prototype.addBulletAttack = function(x,y){
	this.bulletsAttack.create(x, y,'bullet_attack');
    this.bulletsAttack.setAll('body.allowGravity', true);
    this.bulletsAttack.setAll('body.gravity.y', 1000);
    this.bulletsAttack.setAll('width', 30);
    this.bulletsAttack.setAll('height', 30);
};

BasicGame.Game.prototype.addAttack = function(){
    this.attack.create(this.pig.x+1200, 100,'attack');
    this.attack.setAll('body.allowGravity', false);
    this.attack.setAll('body.immovable', true);
    this.attack.setAll('body.velocity.x', -200);
    this.attack.setAll('width', 50);
    this.attack.setAll('height', 30); 
};

BasicGame.Game.prototype.addBlock = function(x, y){
    this.blocks.create(x+50,y-100, 'block');
    this.blocks.setAll('body.allowGravity', false);
    this.blocks.setAll('body.immovable', true);
    this.blocks.setAll('width', 30);
    this.blocks.setAll('height', 130);
};

BasicGame.Game.prototype.sendAttack = function(attack){
    if(this.gameCount%7==0){
        this.addBulletAttack(attack.x+25,attack.y);
    }
    if(attack.x < (this.pig.x - 200-this.plataformWidth)){
        attack.kill();
        this.attack.removeChild(attack);
    }
};