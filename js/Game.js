
BasicGame.Game = function (game) {
    //Set basic const params to general game
    /******Plataforms***++***********/
    this.lastPlatformPosition= 600;
    this.plataformYPosition = 600;
    this.plataformXPosition = 600;
    this.plataformChange    = 190;
    this.plataformHeight    = 50;
    this.plataformWidth     = 200;
    this.plataformCount     = 1;
    this.plataformsNum      = 6;
    this.diff               = 0;
    /******Score points**************/
    this.score              = 0;
    /******General game**************/
    this.height             = 0;
    this.globalGravity      = 150;  
    this.gameCount          = 0;
    this.velocity           = 100;
    /******Player*++++++*************/
    this.playerJumped       = false;
    /*******Camera*******************/
    this.cameraY            = 400;
    this.cameraX            = 0;

};

BasicGame.Game.prototype = {
    /*Init the game*/
    create: function () {
        this.height = this.world.height;
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.world.setBounds(0,0,2000000000,this.height);
        this.physics.arcade.gravity.y = this.globalGravity;
        this.setBackground();
        this.resetVars();
        this.addPlataforms();
        this.addPlayer();
        this.scoreText = this.add.text(this.pig.x-200, 10, "", {
            font: "30px gecko",
            fill: "#000000",
            align: "center"
        });
        this.timeText = this.add.text(700, this.world.centerY, "", {
            font: "30px gecko",
            fill: "#000000",
            align: "center"
        });
        this.music = this.add.audio('sound',1,true);
        this.eat = this.add.audio('eat',1);
        // this.music.play();
        // this.playButton = this.add.button(100, 200, 'playButton', this.quitGame);
        this.cursors = this.input.keyboard.createCursorKeys();
    },
    /*update the game every second*/
    update: function () {
        this.scoreText.setText(this.score+" points");
        this.scoreText.x = this.pig.x-200;

        this.timeText.setText(this.gameCount);
        this.addCorns();
        this.setVelocity();
        this.setMoves();
        this.setCamera();
        
        this.pjump();
        this.pleft();
        this.prigth();

        this.platforms.forEach(this.wrapPlatform, this); 
    },
    pjump:function() {
        if(!this.pig.body.touching.down){
            this.pig.body.gravity.y = this.globalGravity + 300;    
        }
        if (this.cursors.up.isDown && this.pig.body.touching.down ) {
            this.pig.body.velocity.y = -250;
        }
    },
    pleft:function() {
        if (this.cursors.left.isDown && this.pig.body.touching.down) {
            this.pig.body.velocity.x = 100;
        }
    },
    prigth:function() {
        if (this.cursors.right.isDown && this.pig.body.touching.down) {
            this.pig.body.velocity.x = this.velocity + 800;
        }
    },
    addCorns:function(x,y) {
        this.corns.create(x,y, 'corn');
        this.corns.setAll('body.allowGravity', false);
        this.corns.setAll('body.immovable', true);
        this.corns.setAll('body.velocity.x', -this.velocity);
    },
    setBackground:function() {
        this.background         = this.add.sprite(0,0,'preloaderBackground');
        this.background.height  = this.world.height;
        this.background.width   = 2000;
    },
    addPlataforms:function(){
        this.platforms  = this.add.physicsGroup();
        this.corns      = this.add.physicsGroup();

        for(var x=0 ; x <= (this.plataformsNum*this.plataformWidth); x+=this.plataformWidth){
            this.platforms.create(x, this.plataformYPosition, 'ground');
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
    },
    addPlayer:function(){
        this.pig = this.add.sprite(500, 400, 'pig');
        this.physics.enable( [ this.pig ], Phaser.Physics.ARCADE);
        this.pig.animations.add('walk',[0,1],10,true);
        this.pig.play('walk');
        this.pig.scale.setTo(2,2)
        this.pig.body.gravity.y = this.globalGravity;
    },
    /*Reset variable needed to the game, this method is called from create*/
    resetVars:function(){
        // this.plataformYPosition = 400;
        // this.plataformXPosition = 400;
        // this.globalGravity      = 100;  
        // this.gameCount          = 0;
        // this.velocity           = 100;
        // this.cameraY            = 900;
    },
    /*Check if the plataform move is less than the configuration then set a new position*/
    wrapPlatform: function (platform) {
        if (platform.x <= (this.pig.x - 200-this.plataformChange)) {
            if(this.plataformCount >= this.plataformsNum){
                var rand = Math.round(Math.random() * 100);
                if(rand%2==0 && platform.y > 400){
                    this.diff = -1;
                } else if(platform.y < 500){
                    this.diff = 1;
                }
                this.plataformYPosition += (this.diff * this.plataformHeight);
                this.plataformCount=1;
            }
            var index = ((platform.z) == 1) ? this.platforms.children.length : platform.z -1 ;  
            var x = this.platforms.children[index-1].x + this.plataformWidth;
            this.addCorns(x+10,platform.y-30);
            this.plataformCount ++;
            platform.x = x;
            platform.y = this.plataformYPosition;
        }    
    },
    /*Move the camera acord the player and the plataform than it is touching*/
    setCamera:function(){
        this.camera.x = this.pig.x - 200;
    },
    /*This method add move to plataform, events in collapse*/
    setMoves:function(){
        this.physics.arcade.collide(this.pig, this.platforms);
        this.physics.arcade.overlap(this.pig, this.platforms, this.quitGame, this.quitGame , this);
        this.physics.arcade.overlap(this.pig, this.corns, this.setPoints, null, this);
    },
    setPoints:function(pig, corn) {
        this.eat.play();
        this.score++;
        corn.kill();
    },
    /*Set new velocity to the game acord to the configuration*/
    setVelocity:function() {
        this.gameCount += 1;
        this.velocity = (this.gameCount%100 == 0) ? this.velocity + .5 :this.velocity ;
        this.pig.body.velocity.x = this.velocity
    },
    /*Close the game and redirect to the main menu*/
    quitGame: function () {
        this.music.stop();
        this.state.start('MainMenu');
    }
};
