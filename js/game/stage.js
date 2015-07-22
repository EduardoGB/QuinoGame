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
    this.smilesun = this.add.sprite(this.pig.x-200, 130, 'smilesun');
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

BasicGame.Game.prototype.backImages = function(){
    this.setGroups();
     for(var x=0 ; x <= (10*this.plataformWidth); x+=this.plataformWidth){
        this.addCloud(x);
    }

    for(var x=0 ; x <= (10*this.plataformWidth); x+=this.plataformWidth){
        this.addBackGrass(x-70);
    }
    this.addPlayer();
};

BasicGame.Game.prototype.setGroups = function(){
    this.cloud      = this.add.physicsGroup();
    this.bush       = this.add.physicsGroup();
    this.grass3     = this.add.physicsGroup();
    this.grass2     = this.add.physicsGroup();
    this.wheat      = this.add.physicsGroup();
};

BasicGame.Game.prototype.addBackGrass = function(x){   
    this.bush.create(x, this.plataformYPosition-350, 'bush');
    this.grass3.create(x, this.plataformYPosition-150, 'grass3');
    this.grass2.create(x, this.plataformYPosition-100, 'grass2');
    this.wheat.create(x, this.plataformYPosition-250, 'wheat');

    this.wheat.getTop().body.allowGravity = false;
    this.wheat.getTop().body.immovable =true;
    this.wheat.getTop().scale.x = .5;
    this.wheat.getTop().visible = this.backgroundVisible();

    this.grass2.getTop().body.allowGravity = false;
    this.grass2.getTop().body.immovable = true;
    this.grass2.getTop().scale.x = .36;
    //this.grass2.getTop().visible = this.backgroundVisible();

    this.grass3.getTop().body.allowGravity = false;
    this.grass3.getTop().body.immovable = true;
    this.grass3.getTop().scale.x= .43;
    //this.grass3.getTop().visible = this.backgroundVisible();

    this.bush.getTop().body.allowGravity = false;
    this.bush.getTop().body.immovable = true;
    this.bush.getTop().scale.x = .5;
    this.bush.getTop().visible = this.backgroundVisible();

    if(this.plataformCount%20 == 0) {
        this.bush.getTop().visible = false;
    }
};

BasicGame.Game.prototype.removeBackGrass = function(){   
    var firstBush = this.bush.getFirstExists();
    var firstGrass3 = this.grass3.getFirstExists();
    var firstGrass2 = this.grass2.getFirstExists();
    var firstWheat = this.wheat.getFirstExists();

    this.bush.removeChild(firstBush);
    this.grass3.removeChild(firstGrass3);
    this.grass2.removeChild(firstGrass2);
    this.wheat.removeChild(firstWheat);
}

BasicGame.Game.prototype.addBaseGrass = function(x) {   
    this.ground.create(x, this.plataformYPosition, 'ground');
    
    // if (this.plataformCount%15 == 0) {
        // this.grass.create(x, this.plataformYPosition-30, 'mud');
    // }else{
        this.grass.create(x, this.plataformYPosition-30, 'grass');
    // }

    this.grass.getTop().body.allowGravity = false;
    this.grass.getTop().body.immovable  = true;
    this.grass.getTop().scale.y = .6;
    this.grass.getTop().scale.x = .5;

    this.ground.getTop().body.allowGravity = false;
    this.ground.getTop().body.immovable = true;
    this.ground.getTop().scale.y = 1.2;
    this.ground.getTop().scale.x =.5;
};

BasicGame.Game.prototype.addBaseGroups = function(x) {   
    this.ground     = this.add.physicsGroup();
    this.grass      = this.add.physicsGroup();
    this.mud        = this.add.physicsGroup();
}

BasicGame.Game.prototype.addPlataforms = function() {
    this.bulletsAttack  = this.add.physicsGroup();
    this.superBullets   = this.add.physicsGroup();
    this.bullets        = this.add.physicsGroup();
    this.blocks         = this.add.physicsGroup();
    this.corns          = this.add.physicsGroup();
    this.attack         = this.add.physicsGroup();
    
    this.addBaseGroups();
    for(var x=0 ; x <= (10*this.plataformWidth); x+=this.plataformWidth){
        this.addBaseGrass(x);
    }
};

BasicGame.Game.prototype.addCloud = function(x,w){
    this.cloud.create(x+100, this.setCloudY(), this.setCloud());
    this.cloud.getTop().body.allowGravity = false;
    this.cloud.getTop().body.immovable = true;
};

BasicGame.Game.prototype.updateGroundAndGrass = function(){    
    var firstGround = this.ground.getFirstExists();
    var firstGrass  = this.grass.getFirstExists();
    if(firstGround.x < this.pig.x-200-this.plataformWidth){
        this.ground.removeChild(firstGround);
        this.grass.removeChild(firstGrass);
        this.removeBackGrass();
        
        this.plataformCount++;
        if(this.plataformCount%10==0){
            this.plataformYPosition += this.selectPlatform();    
        }
        var nextX = this.ground.getTop().x + this.plataformWidth;           
        this.addBackGrass(nextX-70);
        this.addBaseGrass(nextX);
    }
};

BasicGame.Game.prototype.wrapPlatform = function(){        
    var cloud = this.cloud.getFirstExists();
    if(cloud.x < this.pig.x-500){
        this.cloud.removeChild(cloud);
        var lastCloud = this.cloud.getTop();
        this.addCloud(lastCloud.x+lastCloud.width);
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
    var y = (typeof(this.pig) != "undefined" ) ? this.pig.y : 2500;
    if(select > 0 && select <= 50){
        return  y - 400 - select;
    } else if(select > 50 && select <= 100) {
        return y - 400 + select;
    } else {
        return 200;
    }
}


BasicGame.Game.prototype.backgroundVisible = function(){
    this.select = Math.round(Math.random() * 100);
    if(this.select > 0 && this.select <= 25){
        return true;
    } else if(this.select > 25 && this.select <= 50) {
        return false;
    } else if(this.select > 50 && this.select <= 75) {
        return true;
    } else if(this.select > 75 && this.select <= 100) {
        return false;
    } else {
        return true;
    }

};