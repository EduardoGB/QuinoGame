
BasicGame.Game = function (game) {
    //Set basic const params to general game
    /******Plataforms***++***********/
    this.lastPlatformPosition= 600;
    this.plataformYPosition = 600;
    this.plataformXPosition = 600;
    this.plataformChange    = 20;
    this.plataformHeight    = 50;
    this.plataformWidth     = 200;

    this.lastPlatform       = 0;
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
    /*--------bullets-----*/
    this.bulletsCount=0;

};

BasicGame.Game.prototype = {
    /*Init the game*/
    create: function () {
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.world.setBounds(0,0,2000000000,this.world.height);
        this.physics.arcade.gravity.y = this.globalGravity;

        this.setBackground();
        this.resetVars();
        this.addPlataforms();
        this.addPlayer();
        this.addTexts();
        this.addSounds();
        this.addControlButtons();
    },
    addSounds:function(){
        this.music = this.add.audio('sound',1,true);
        this.eat = this.add.audio('eat',1);
    },
    addTexts:function(){
        this.scoreText = this.add.text(this.pig.x-200, 10, "", {
            font: "30px gecko",
            fill: "#fff",
            align: "center"
        });
        this.timeText = this.add.text(this.pig.x-200, 40, "", {
            font: "30px gecko",
            fill: "#fff",
            align: "center"
        });
    },
    addControlButtons:function(){
        this.cursors    = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.add.button(0, this.world.height - 150 , 'playButton', this.jump, this);
        this.slowButton = this.add.button(0, this.world.height - 150 , 'playButton', this.slow, this);
        this.shotButton = this.add.button(0, this.world.height - 150 , 'playButton', this.slow, this);
        this.ext1Button = this.add.button(0, this.world.height - 280 , 'playButton', this.slow, this);

        this.jumpButton.height  = this.slowButton.height = this.shotButton.height    =  this.ext1Button.height = 100;
        this.jumpButton.width   = this.slowButton.width =this.shotButton.width = this.ext1Button.width = 100;
    },
    jump:function() {
        this.playerJumped = true;
        this.pig.body.velocity.y = (this.pig.body.touching.down) ? -250 : this.pig.body.velocity.y;     
    },
    slow:function(){
        this.pig.body.velocity.x = (this.pig.body.touching.down) ? 100 : this.pig.body.velocity.x;
    },
    renderControls:function(){
        this.scoreText.setText(this.score+" points");
        this.timeText.setText(this.pig.body.velocity.x);
        this.scoreText.x    =   this.timeText.x     = this.pig.x-180;
        this.slowButton.x   = this.pig.x-150;
        this.jumpButton.x   = this.pig.x+680;
        this.shotButton.x   = this.pig.x+550;
        this.ext1Button.x   = this.pig.x+680;
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
        
        this.pjump();
        this.pleft();
        this.prigth();
        this.patformsMove();
        var space_key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.addBullet, this); 

        var a = this.input.keyboard.addKey(Phaser.Keyboard.A);
        a.onDown.add(this.addSuperBullet, this); 

        this.physics.arcade.overlap(this.pig, this.platforms, this.quitGame, this.quitGame , this);
        // this.platforms.forEach(this.wrapPlatform, this); 
    },
    pjump:function() {
        if (this.cursors.up.isDown && this.pig.body.touching.down ) {
            this.jump();
        }
    },
    
    pleft:function() {
        if (this.cursors.left.isDown && this.pig.body.touching.down) {
            this.pig.body.velocity.x = 100;
        } 
    },
    prigth:function() {
        if (this.cursors.right.isDown) {
            this.pig.body.velocity.x = this.velocity + 800;
            this.pig.body.gravity.y = 400;
        } 
    },
    setBackground:function() {
        this.background  = this.add.physicsGroup();
        for(var x=0 ; x <= (3*2000); x+=1900){
            this.background.create(x, 0, 'preloaderBackground');
        }
        this.background.setAll('body.allowGravity', false);
        this.background.setAll('body.immovable', true);
        this.background.setAll('height', this.world.height);
    },
    addBlock:function(x,y){
        this.blocks.create(x+50,y-100, 'block');
        this.blocks.setAll('body.allowGravity', false);
        this.blocks.setAll('body.immovable', true);
        this.blocks.setAll('width', 30);
        this.blocks.setAll('height', 130);
    },
    addSuperBullet:function(x,y){
        this.superBullets.create(this.pig.x, this.pig.y,'super_bullet');
        this.superBullets.setAll('body.allowGravity', false);
        this.superBullets.setAll('body.immovable', true);
        this.superBullets.setAll('body.velocity.x', this.velocity+500);
        this.superBullets.setAll('width', 30);
        this.superBullets.setAll('height', 30);
    },
    addBullet:function(x,y){
        this.bullets.create(this.pig.x, this.pig.y,'bullet');
        this.bullets.setAll('body.allowGravity', false);
        this.bullets.setAll('body.immovable', true);
        this.bullets.setAll('body.velocity.x', this.velocity+500);
        this.bullets.setAll('width', 30);
        this.bullets.setAll('height', 30);
    },
    addCorns:function(x,y) {
        this.corns.create(x+20,y-20, 'corn');
        this.corns.setAll('body.allowGravity', false);
        this.corns.setAll('body.immovable', true);
    },
    addPlataforms:function(){
        this.platforms  = this.add.physicsGroup();
        this.corns      = this.add.physicsGroup();
        this.blocks      = this.add.physicsGroup();
        this.bullets      = this.add.physicsGroup();
        this.superBullets      = this.add.physicsGroup();
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
    resetVars:function(){
        // this.plataformYPosition = 400;
        // this.plataformXPosition = 400;
        // this.globalGravity      = 100;  
        // this.gameCount          = 0;
        // this.velocity           = 100;
        // this.cameraY            = 900;
    },
    patformsMove: function () {
        var platform = this.platforms.children[this.lastPlatform];
        if(platform.x < (this.pig.x - 200-this.plataformWidth)){
            if(this.plataformCount >= this.plataformChange){
                var rand = Math.round(Math.random() * 100);
                if(rand%2==0 && platform.y > 400){
                    this.diff = -1;
                } else if(platform.y < 400){
                    this.diff = 1;
                }
                this.plataformYPosition += (this.diff * this.plataformHeight);
                this.plataformCount=1;
            }

            this.lastPlatform   = (this.lastPlatform+1 > 6 ) ?  0 : this.lastPlatform+1;
            var index           = ((platform.z) == 1) ? this.platforms.children.length : platform.z -1 ;  
            var x               = this.platforms.children[index-1].x + this.plataformWidth;
            platform.x          = x;
            platform.y          = this.plataformYPosition;
            
            this.plataformCount++;
            this.addCorns(x+10,platform.y-30);
            this.addBlock(x+10,platform.y-30);
        }
    },
    setCamera:function(){
        this.camera.x = this.pig.x - 200;
    },
    setMoves:function(){
        this.physics.arcade.collide(this.pig, this.platforms);
        this.physics.arcade.overlap(this.pig, this.platforms, null ,  this.quitGame, this);
        this.physics.arcade.overlap(this.pig, this.corns, this.setPoints, null, this);
        this.physics.arcade.overlap(this.pig, this.blocks, this.quitGame, null, this);
        this.physics.arcade.overlap(this.bullets, this.blocks, this.destructBlock, null, this);
        this.physics.arcade.overlap(this.superBullets, this.blocks, this.destructSuperBlock, null, this);
    },
    destructSuperBlock:function(bullet,block){
        block.kill();
        bullet.kill();
    },
    destructBlock:function(bullet,block){
        this.bulletsCount++;
        if(this.bulletsCount == 3){
            block.kill();
            this.bulletsCount=0;
        }
        bullet.kill();

    },
    setPoints:function(pig, corn) {
        this.eat.play();
        this.score++;
        corn.kill();
    },
    setVelocity:function() {
        this.gameCount += 1;
        this.velocity = (this.gameCount%10 == 0) ? this.velocity + 2 :this.velocity ;
        this.pig.body.velocity.x = this.velocity
    },
    quitGame: function () {
        this.music.stop();
        this.state.start('MainMenu');
    }
};
