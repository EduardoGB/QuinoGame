
BasicGame.Game.prototype.setMoves = function(){
    this.physics.arcade.collide(this.pig, this.ground, this.checkCollidate);
    this.physics.arcade.overlap(this.pig, this.ground, this.quitGame ,null, this);

    this.physics.arcade.overlap(this.pig, this.corns, this.setPoints, null, this);
    this.physics.arcade.overlap(this.pig, this.blocks, this.quitGame, null, this);
    this.physics.arcade.overlap(this.bullets, this.blocks, this.destructBlock, null, this);
    this.physics.arcade.overlap(this.superBullets, this.blocks, this.destructSuperBlock, null, this);
    this.physics.arcade.overlap(this.bulletsAttack, this.ground, this.destructAttack, null, this);
    this.physics.arcade.overlap(this.bulletsAttack, this.pig, this.destructPig, null, this);
};

BasicGame.Game.prototype.checkCollidate = function(pig,ground){

};

BasicGame.Game.prototype.setVelocity = function(){
    this.gameCount += 1;
    this.pig.body.velocity.x = this.velocity;
};

BasicGame.Game.prototype.safePig = function(){
	this.playerSave = true;
};

BasicGame.Game.prototype.unsafePig = function(){
	this.playerSave = false;
};

BasicGame.Game.prototype.setCamera = function(){
	this.camera.x = this.pig.x - 200;
    if(!this.playerJumped){
        this.camera.y =  this.pig.y - 520;    
        this.background.y = this.pig.y - 500;
    }
    
    this.background.x = this.pig.x - 200;
    
};

BasicGame.Game.prototype.destructAttack = function(bullet, platform){
    bullet.kill();
};

BasicGame.Game.prototype.destructPig = function(bullet, pig){
    // this.quitGame();
};

BasicGame.Game.prototype.destructSuperBlock = function(bullet, block){
    block.kill();
    bullet.kill();
};

BasicGame.Game.prototype.destructBlock = function(block, bullet){
    this.bulletsCount++;
    if(this.bulletsCount == 3){
        block.kill();
        this.bulletsCount=0;
    }
    bullet.kill();
};

BasicGame.Game.prototype.setPoints = function(pig, corn){
    // this.eat.play();
    this.cornValue++;
    corn.kill();
};
