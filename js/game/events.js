
BasicGame.Game.prototype.setMoves = function(){
    this.physics.arcade.collide(this.pig, this.ground,this.setCameraY,null, this);
    this.physics.arcade.overlap(this.pig, this.ground, this.quitGame ,null, this);
    this.physics.arcade.overlap(this.pig, this.grass, this.checkGrass ,null, this);

    this.physics.arcade.overlap(this.pig, this.corns, this.setPoints, null, this);
    this.physics.arcade.overlap(this.pig, this.blocks, this.quitGame, null, this);
    this.physics.arcade.overlap(this.bullets, this.blocks, this.destructBlock, null, this);
    this.physics.arcade.overlap(this.superBullets, this.blocks, this.destructSuperBlock, null, this);
    this.physics.arcade.overlap(this.bulletsAttack, this.ground, this.destructAttack, null, this);
    this.physics.arcade.overlap(this.bulletsAttack, this.pig, this.destructPig, null, this);

    //console.log(this.pig.body.touching.right);
    if(this.pig.body.touching.right){
        // this.quitGame();
    }
};
BasicGame.Game.prototype.setCameraY = function(pig,ground) {
    this.camera.y =  this.pig.y - 500;    
    
};
BasicGame.Game.prototype.checkGrass = function(pig,grass){
    if(grass.key == "mud") {
        this.quitGame();
    }
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
    this.background.x = this.pig.x - 200;
    this.background.y = this.pig.y - 500;
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
    if(corn.key == "apple"){
        this.appleValue++;
    } else {
        this.cornValue++;
    }
    corn.kill();
};

var RIGHT = 0, LEFT = 1;

/* Divide the current tap x coordinate to half the game.width, floor it and there you go */
game.input.onTap.add(function(e){
    if (Math.floor(e.x/(this.game.width/2)) === LEFT) {
        //do left stuff
    }

    if (Math.floor(e.x/(this.game.width/2)) === RIGHT) {
        //do right stuff
    }
}); 



//This is inside your update function
if ((cursors.up.isDown || onSwipe()) && player.body.touching.down)
  {
      player.body.velocity.y = -350;
  }
 
//This can be placed outside
function onSwipe() {
  return (Phaser.Point.distance(game.input.activePointer.position, game.input.activePointer.positionDown) > 150 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
}