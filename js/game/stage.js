//
BasicGame.Game.prototype.addSounds = function(){
    this.music = this.add.audio('sound',1,true);
    this.eat = this.add.audio('eat',1);
    this.music.play();
};

//Add background images to the game
BasicGame.Game.prototype.addGameBackground = function(){
    this.background  = this.add.sprite(0,0,'gameBackground');
    this.background.width = BasicGame.gameWidth;
    this.background.height = BasicGame.gameHeight;
	
};

//Add moves to the background images 

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
    this.cloud  = this.add.physicsGroup();
    this.wheat  = this.add.physicsGroup();
    this.platforms  = this.add.physicsGroup();
    
    this.corns      = this.add.physicsGroup();
    this.blocks      = this.add.physicsGroup();
    this.bullets      = this.add.physicsGroup();
    this.superBullets      = this.add.physicsGroup();
    this.attack      = this.add.physicsGroup();
    this.bulletsAttack      = this.add.physicsGroup();

    for(var x=0 ; x <= (10*this.plataformWidth); x+=this.plataformWidth){
        this.platforms.create(x, this.plataformYPosition, 'platform_image');
    }
    for(var x=0 ; x <= (10*260); x+=260){
        this.wheat.create(x, this.plataformYPosition-130, 'wheat_image');
    }

    for(var x=0 ; x <= (4*500); x+=500){
        this.cloud.create(x, this.setCloudY(), this.setCloud());
    }

    this.cloud.setAll('body.allowGravity', false);
    this.cloud.setAll('body.immovable', true);

    this.wheat.setAll('body.allowGravity', false);
    this.wheat.setAll('body.immovable', true);

    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);
};

BasicGame.Game.prototype.wrapPlatform = function(){    
    var platform = this.platforms.getFirstExists();
    if(platform.x < this.pig.x-400){
        this.platforms.removeChild(platform);
        var lastPlatform = this.platforms.getTop();
        this.platforms.create(lastPlatform.x+lastPlatform.width, this.plataformYPosition, 'platform_image');
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
    }

    var wheat = this.wheat.getFirstExists();
    if(wheat.x < this.pig.x-500){
        this.wheat.removeChild(wheat);
        var lastWheat = this.wheat.getTop();
        this.wheat.create(lastWheat.x+lastWheat.width, this.plataformYPosition-130, 'wheat_image');
        this.wheat.setAll('body.allowGravity', false);
        this.wheat.setAll('body.immovable', true);
    }

    var cloud = this.cloud.getFirstExists();
    if(cloud.x < this.pig.x-500){
        this.cloud.removeChild(cloud);
        var lastCloud = this.cloud.getTop();
        this.cloud.create(lastCloud.x+lastCloud.width+400, this.setCloudY(), this.setCloud());
        this.cloud.setAll('body.allowGravity', false);
        this.cloud.setAll('body.immovable', true);
    }
};

BasicGame.Game.prototype.setCloud = function(){
    var select = Math.round(Math.random() * 100);
    if(select > 0 && select <= 33){
        return 'cloud1_image';
    } else if(select > 33 && select <= 66) {
        return 'cloud2_image';
    } else if(select > 66 && select <= 100) {
        return 'cloud3_image';
    } else {
        return "cloud2_image";
    }
}

BasicGame.Game.prototype.setCloudY = function(){
    var select = Math.round(Math.random() * 100);
    if(select > 0 && select <= 50){
        return  200 - select;
    } else if(select > 50 && select <= 100) {
        return 200 + select;
    } else {
        return 200;
    }
}
