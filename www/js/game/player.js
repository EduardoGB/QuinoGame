//Render the player images
BasicGame.Game.prototype.addPlayer = function(){
    this.pig = this.add.sprite(500, 400, 'pig');
    this.physics.enable( [ this.pig ], Phaser.Physics.ARCADE);
    this.pig.animations.add('walk',[0,1],10,true);
    this.pig.play('walk');
    this.pig.scale.setTo(.5,.5);
    this.pig.body.gravity.y = this.globalGravity;
};

//Event when the player jump
BasicGame.Game.prototype.playerInputJump = function(){
	if (this.cursors.up.isDown && this.pig.body.touching.down ) {
        this.playerJump();
    }		
};

//Event when the player decrease his velocity
BasicGame.Game.prototype.playerInputLeft = function(){
	if (this.cursors.left.isDown && this.pig.body.touching.down) {
		this.playerDecrease();
    } 
};

//Event when the player increment his velocity
BasicGame.Game.prototype.playerInputRight = function(){
	if (this.cursors.right.isDown && this.pig.body.touching.down) {
        this.pig.body.velocity.x = this.velocity + 800;
        this.pig.body.gravity.y = 400;
    } 
};

//Decrease the player velocity
BasicGame.Game.prototype.playerDecrease = function(){
	this.pig.body.velocity.x = (this.pig.body.touching.down) ? 100 : this.pig.body.velocity.x;
};

//Execute a player jump
BasicGame.Game.prototype.playerJump = function(){
	this.playerJumped = true;
    this.pig.body.velocity.y = (this.pig.body.touching.down) ? -280 : this.pig.body.velocity.y;     	
    this.pig.body.velocity.x +=15;
};

//Add bullets with a super power
BasicGame.Game.prototype.addSuperBullet = function(){
	this.superBullets.create(this.pig.x, this.pig.y,'super_bullet');
    this.superBullets.setAll('body.allowGravity', false);
    this.superBullets.setAll('body.immovable', true);
    this.superBullets.setAll('body.velocity.x', this.velocity+500);
    this.superBullets.setAll('width', 30);
    this.superBullets.setAll('height', 30);
};

//Add a small bullet
BasicGame.Game.prototype.addBullet = function(){
	this.bullets.create(this.pig.x, this.pig.y,'bullet');
    this.bullets.setAll('body.allowGravity', false);
    this.bullets.setAll('body.immovable', true);
    this.bullets.setAll('body.velocity.x', this.velocity+500);
    this.bullets.setAll('width', 30);
    this.bullets.setAll('height', 30);
};
