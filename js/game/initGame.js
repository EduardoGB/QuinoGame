BasicGame.Game.prototype.addControlButtons = function(){
	this.cursors    = this.input.keyboard.createCursorKeys();
};

BasicGame.Game.prototype.renderControls = function(){
	this.cornText.setText("X "+this.cornValue);
    this.appleText.setText("X "+this.appleValue);

    this.cornCount.x    = this.pig.x-200;
    this.cornText.x     = this.pig.x-150;

    this.appleCount.x   = this.pig.x-200;
    this.appleText.x    = this.pig.x-150;
};

BasicGame.Game.prototype.resetVars = function(){
	//Set basic const params to general game
    /******Plataforms***++***********/
    this.lastPlatformPosition= 600;
    this.plataformYPosition = 600;
    this.plataformXPosition = 600;
    this.plataformChange    = 20;
    this.plataformHeight    = 50;
    this.plataformWidth     = 153;

    this.lastPlatform       = 0;
    this.plataformCount     = 1;
    this.plataformsNum      = 6;
    this.diff               = 0;
    /******Score points**************/
    this.score              = 0;
    /******General game**************/
    this.lastBack       = 0;
    this.height             = 0;
    this.globalGravity      = 150;  
    this.gameCount          = 0;
    this.velocity           = 100;
    /******Player*++++++*************/
    this.playerJumped       = false;
    this.playerSave       = false;
    /*******Camera*******************/
    this.cameraY            = 400;
    this.cameraX            = 0;
    /*--------bullets-----*/
    this.bulletsCount=0;
};

