BasicGame.Preloader = function (game) {
    this.background = null;
    this.preloadBar = null;
    this.ready      = false;
};

BasicGame.Preloader.prototype = {
    preload: function () {
        this.background = this.add.tileSprite(0, 0,1200,1200, 'preloaderBackground');
        // this.background.width = this.world.width;
        // this.background.height =this.world.height;
        
        this.preloadBar = this.add.sprite(450, 200, 'loader');
        
        this.load.image('playButton', 'img/load.png');
        this.load.image('ground', 'img/camino2.png');
        this.load.image('corn', 'img/corn.png');
        this.load.spritesheet('pig','img/pig2.png', 40, 40);
        this.load.audio('sound', ['audio/back.wav']);
        this.load.audio('eat', ['audio/comer.wav']);

    },
    create: function () {
        this.preloadBar.cropEnabled = false;
    },
    update: function () {	
        if ( this.ready == false) {
            this.ready = true;
            this.state.start('MainMenu');
        }

    }
};


    
