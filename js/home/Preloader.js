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
        
        this.load.image('platform_image', BasicGame.game_platform_image);
        this.load.image('wheat_image', BasicGame.game_wheat_image);
        this.load.image('cloud1_image', BasicGame.game_cloud1_image);
        this.load.image('cloud2_image', BasicGame.game_cloud2_image);
        this.load.image('cloud3_image', BasicGame.game_cloud3_image);

        this.load.image('gameBackground', BasicGame.game_background_image);

        this.load.image('playButton', 'img/image.png');

        this.load.image('corn', 'img/maiz.png');
        this.load.image('apple', 'img/manzana.png');

        this.load.image('bullet', 'img/elote.png');
        this.load.image('super_bullet', 'img/elote.png');
        this.load.image('bullet_attack', 'img/elote.png');
        this.load.image('attack', 'img/rect2.png');
        this.load.image('block', 'img/rect.png');
        this.load.spritesheet('pig','img/CUINO.png', 265, 171);
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


    
