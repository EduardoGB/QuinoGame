
BasicGame.Game = function (game) {
    //Set basic const params to general game
    /******Plataforms***++***********/
    this.plataformYPosition = 1200;
    this.plataformXPosition = 1200;
    this.plataformChange    = 190;
    this.plataformHeight    = 50;
    this.plataformWidth     = 200;
    this.plataformCount     = 1;
    this.plataformsNum      = 6;
    this.diff               = 0;
    /******Score points**************/

    /******General game**************/
    this.globalGravity      = 100;  
    this.gameCount          = 0;
    this.velocity           = 100;
    this.score              = 0;
    /******Player*++++++*************/
    this.playerJumped       = false;
    /*******Camera*******************/
    this.cameraY            = 900;

};

BasicGame.Game.prototype = {
    /*Init the game*/
    create: function () {
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.world.setBounds(0,0,0,2000);
        this.physics.arcade.gravity.y = this.globalGravity;
        this.setBackground();
        this.resetVars();
        this.addPlataforms();
        this.addPlayer();
        this.scoreText = this.add.text(this.world.centerX, this.world.centerY, "", {
            font: "30px gecko",
            fill: "#000000",
            align: "center"
        });
        this.timeText = this.add.text(700, this.world.centerY, "", {
            font: "30px gecko",
            fill: "#000000",
            align: "center"
        });
        this.cursors = this.input.keyboard.createCursorKeys();
    },
    /*update the game every second*/
    update: function () {
        this.scoreText.setText(this.score+" points");
        this.timeText.setText(this.gameCount);
        this.addCorns();
        this.setVelocity();
        this.setMoves();
        this.setCamera();

        if(this.pig.body.touching.down){
            this.pig.body.velocity.x = this.velocity;
        }else{
            this.pig.body.gravity.y = this.globalGravity+300;
            this.pig.body.velocity.x = 0;
        }
        
        if (this.cursors.up.isDown && this.pig.body.touching.down ) {
            this.pig.body.velocity.y = -250;
            this.pig.body.velocity.x = 0;
        } 
    },
    addCorns:function(){
        if(this.gameCount%30 == 0){
            this.corns.create(1200, this.plataformYPosition - 50, 'corn');
        }
        this.corns.setAll('body.allowGravity', false);
        this.corns.setAll('body.immovable', true);
        this.corns.setAll('body.velocity.x', -this.velocity);
    },
    /*Set the background image to the game*/
    setBackground:function(){
        this.background = this.add.tileSprite(0,0, 1200, 2000, 'preloaderBackground');
    },
    /*Add plataform to the game, this method is callled from create*/
    addPlataforms:function(){
        this.platforms  = this.add.physicsGroup();
        this.corns      = this.add.physicsGroup();

        for(var x=0 ; x <= (this.plataformsNum*this.plataformWidth); x+=this.plataformWidth){
            this.platforms.create(x, this.plataformYPosition, 'ground');
        }

        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', -this.velocity);
    },
    /*Add the player data, this methos is called from create*/
    addPlayer:function(){
        this.pig = this.add.sprite(300, 800, 'pig');
        this.physics.enable( [ this.pig ], Phaser.Physics.ARCADE);
        this.pig.animations.add('walk',[0,1],5,true);
        this.pig.play('walk');
        this.pig.scale.setTo(2,2)
        this.pig.body.gravity.y = this.globalGravity;
    },
    /*Reset variable needed to the game, this method is called from create*/
    resetVars:function(){
        this.plataformYPosition = 1200;
        this.plataformXPosition = 1200;
        this.globalGravity      = 100;  
        this.gameCount          = 0;
        this.velocity           = 100;
        this.cameraY            = 900;
    },
    /*Check if the plataform move is less than the configuration then set a new position*/
    wrapPlatform: function (platform) {
        if (platform.x <= -this.plataformChange) {
            if(this.plataformCount >= this.plataformsNum){
                var rand = Math.round(Math.random() * 100);
                if(rand%2==0 && platform.y > 500){
                    this.diff = -1;
                } else if(platform.y < 1500){
                    this.diff = 1;
                }
                this.plataformYPosition += (this.diff * this.plataformHeight);
                this.plataformCount=1;
            }
            this.plataformCount++;
            var plataformDiff = Math.abs(this.plataformChange + platform.x);
            platform.x = this.plataformXPosition-plataformDiff;
            platform.y = this.plataformYPosition;
        }    
    },
    /*Move the camera acord the player and the plataform than it is touching*/
    setCamera:function(){
        if(this.pig.body.touching.down){
            if(this.cameraY != ((this.pig.y + this.pig.height) -300)) {
                if(this.cameraY < ((this.pig.y + this.pig.height) -300)){
                    this.cameraY += .5;
                    this.scoreText.y+=.5;
                    this.timeText.y+=.5;
                }else if(this.cameraY > ((this.pig.y + this.pig.height) -300)){
                    this.cameraY -= .5;
                    this.scoreText.y-=.5;
                    this.timeText.y-=.5;
                }
            }
        }
        this.camera.y = this.cameraY;
    },
    /*This method add move to plataform, events in collapse*/
    setMoves:function(){
        this.platforms.forEach(this.wrapPlatform, this);
        this.physics.arcade.collide(this.pig, this.platforms);
        this.physics.arcade.overlap(this.pig, this.platforms, this.quitGame, null, this);
        this.physics.arcade.overlap(this.pig, this.corns, this.setPoints, null, this);
    },
    setPoints:function(pig, corn){
        this.score++;
        corn.kill();
    },
    /*Set new velocity to the game acord to the configuration*/
    setVelocity:function(){
        this.gameCount += 1;
        if(this.gameCount%10 == 0){
            this.velocity   += 1;
        }
        this.platforms.setAll('body.velocity.x', -this.velocity);
    },
    /*Close the game and redirect to the main menu*/
    quitGame: function (pointer) {
        this.state.start('MainMenu');
    }
};
