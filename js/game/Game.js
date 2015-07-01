
BasicGame.Game = function (game) {
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
    this.cornValue =0;
    this.appleValue =0;
    this.floorAttack = false;
};


BasicGame.Game.prototype = {
    /*Init the game*/
    create: function () {
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.world.setBounds(0,0,2000000000,this.world.height);
        this.physics.arcade.gravity.y = this.globalGravity;

        this.addGameBackground();
        this.resetVars();
        this.addPlataforms();
        this.addPlayer();
        this.addTexts();
        this.addSounds();
        this.addControlButtons();
    },
    
    /*update the game every second*/
    update: function () {
        this.setMoves();
        this.playerJumped = (this.pig.body.touching.down) ? false : this.playerJumped;
        this.pig.body.gravity.y = this.playerJumped ? 300 : this.pig.body.touching.down ? this.globalGravity : 8000;
        this.renderControls();
        this.addCorns();
        this.setVelocity();
        this.setCamera();
        
        this.playerInputJump();
        this.playerInputLeft();
        this.playerInputRight();
        this.playerInputDown();
        var space_key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.addBullet, this); 

        var a = this.input.keyboard.addKey(Phaser.Keyboard.A);
        a.onDown.add(this.addSuperBullet, this); 

        var save = this.input.keyboard.addKey(Phaser.Keyboard.S);
        save.onDown.add(this.safePig, this); 

        this.physics.arcade.overlap(this.pig, this.platforms, this.quitGame, this.quitGame , this);
        this.wrapPlatform();
        this.attackPig();
        this.attack.forEach(this.sendAttack, this); 
        // this.background.tilePosition.x = 0.5;        
    },
    
    quitGame: function () {
        this.music.stop();
        this.state.start('MainMenu');
    }
};
