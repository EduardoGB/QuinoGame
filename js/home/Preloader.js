BasicGame.Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;
    this.ready      = false;
};

BasicGame.Preloader.prototype = {
    preload: function () {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.background.width = this.world.width;
        this.background.height =this.world.height;
        
        this.preloadBar = this.add.sprite(450, 200, 'loader');
        
        this.load.image('ground', BasicGame.ground);
        this.load.spritesheet('pig','img/CUINO.png', 265, 171);
        this.load.image('grass', BasicGame.grass);
        this.load.image('grass2', BasicGame.grass2);
        this.load.image('grass3', BasicGame.grass3);
        this.load.image('wheat', BasicGame.wheat);
        this.load.image('bush', BasicGame.bush);
        this.load.image('mud', BasicGame.mud);
        this.load.image('smilesun', BasicGame.smilesun);
        
        
        this.load.image('cloud1_image', BasicGame.game_cloud1_image);
        this.load.image('cloud2_image', BasicGame.game_cloud2_image);
        this.load.image('cloud3_image', BasicGame.game_cloud3_image);
        this.load.image('corn', BasicGame.corn);
        this.load.image('apple', BasicGame.apple);

        this.load.image('gameBackground', BasicGame.game_background_image);

        this.load.image('playButton', 'img/image.png');

        this.load.image('bullet', 'img/elote.png');
        this.load.image('super_bullet', 'img/elote.png');
        this.load.image('bullet_attack', 'img/elote.png');
        this.load.image('attack', 'img/rect2.png');
        this.load.image('block', 'img/rect.png');
        
        this.load.audio('sound', ['audio/back.wav']);
        this.load.audio('eat', ['audio/comer.wav']);

    },
    create: function () {
        BasicGame.gameWidth =  this.world.width;
        BasicGame.gameHeight = this.world.height;
        this.preloadBar.cropEnabled = false;
    },
    update: function () {	
        if ( this.ready == false) {
            this.ready = true;
            this.state.start('MainMenu');
        }

    }
};


    
