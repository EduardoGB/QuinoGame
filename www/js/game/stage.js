//
BasicGame.Game.prototype.addSounds = function(){
    this.music = this.add.audio('sound',1,true);
    this.eat = this.add.audio('eat',1);
};

//Add background images to the game
BasicGame.Game.prototype.addGameBackground = function(){
	this.background  = this.add.physicsGroup();
    for(var x=0 ; x <= (3*2000); x+=1900){
        this.background.create(x, 0, 'gameBackground');
    }
    this.background.setAll('body.allowGravity', false);
    this.background.setAll('body.immovable', true);
    this.background.setAll('height', this.world.height);		
};

//Add moves to the background images 
BasicGame.Game.prototype.addBackgroundMoves = function(){
	var background = this.background.children[this.lastBack];
    if(background.x < (this.pig.x - 2200)){
        this.lastBack  	= (this.lastBack+1 > 3 ) ?  0 : this.lastBack+1;
        var index 		= ((background.z) == 1) ? this.background.children.length : background.z -1 ;  
        var x           = this.background.children[index-1].x + 1800;
        background.x    = x;
    }
};

BasicGame.Game.prototype.addCorns = function(x, y){
	this.corns.create(x+20,y-20, 'corn');
    this.corns.setAll('body.allowGravity', false);
    this.corns.setAll('scale.x', .3);
    this.corns.setAll('scale.y', .3);
    this.corns.setAll('body.immovable', true);
};

BasicGame.Game.prototype.addTexts = function(){
    this.cornCount = this.add.sprite(this.pig.x-200, 10, 'corn');
    this.cornCount.scale.setTo(.6,.6);
	this.cornText = this.add.text(this.pig.x-120, 60, "", {
        font: "40px gecko",
        fill: "#000",
        align: "center"
    });

    this.appleCount = this.add.sprite(this.pig.x-200, 130, 'apple');
    this.appleCount.scale.setTo(.7,.7);
    this.appleText = this.add.text(this.pig.x-120, 160, "", {
        font: "40px gecko",
        fill: "#000",
        align: "center"
    });
};

BasicGame.Game.prototype.addPlataforms = function(){
    this.platforms  = this.add.physicsGroup();
    this.corns      = this.add.physicsGroup();
    this.blocks      = this.add.physicsGroup();
    this.bullets      = this.add.physicsGroup();
    this.superBullets      = this.add.physicsGroup();
    this.attack      = this.add.physicsGroup();
    this.bulletsAttack      = this.add.physicsGroup();
    for(var x=0 ; x <= (this.plataformsNum*this.plataformWidth); x+=this.plataformWidth){
        this.platforms.create(x, this.plataformYPosition, 'ground');
    }
    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);
};

BasicGame.Game.prototype.patformsMove = function(){
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
        if(this.floorAttack){
            this.floorAttack = false;
            platform.visible = false;
        } else {
            platform.visible = true;
        }
        // platform.y          = this.plataformYPosition;
        // if(this.gameCount%1200==0){
            // platform.visible = false;
        // }
        this.plataformCount++;
        if(platform.z-1 == 0 || !platform.visible){
            this.addCorns(x-120,platform.y-30);
            this.addCorns(x-80,platform.y-70);
            this.addCorns(x-40,platform.y-95);
            this.addCorns(x+0,platform.y-120);
            this.addCorns(x+40,platform.y-120);
            this.addCorns(x+80,platform.y-95);
            this.addCorns(x+120,platform.y-70);
            this.addCorns(x+160,platform.y-30);

        } else if(platform.z-1 == 4){
            this.addCorns(x-120,platform.y-30);
            this.addCorns(x-80,platform.y-30);
            this.addCorns(x-40,platform.y-30);
            this.addCorns(x+0,platform.y-30);
            this.addCorns(x+40,platform.y-30);
            this.addCorns(x+80,platform.y-30);
            this.addCorns(x+120,platform.y-30);
            this.addCorns(x+160,platform.y-30);            
        }
        // this.addBlock(x+10,platform.y-30);

    }
};
