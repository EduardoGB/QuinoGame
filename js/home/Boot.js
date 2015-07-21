BasicGame = {
    score: 0,
    music: null,
    orientated: false,
    baseWidth:800,
    baseHeigth:600,
    gameWidth :0,
    gameHeight :0,
    background_image:'img/background.png',
    ground:'img/pasto-bloque2.png',
    grass:'img/pasto-bloque1.png',
    grass2:'img/pasto2.png',
    grass3:'img/cesped.png',
    mud:'img/lodo.png',
    smilesun:'img/sun.png',
    wheat:'img/wheat.png',
    bush:'img/arbusto.png',
    loader_image:'img/load.png',

    game_background_image:'img/background.png',
    game_platform_image:'img/box-sand.png',
    
    game_cloud1_image:'img/cloud_1.png',
    game_cloud2_image:'img/cloud_2.png',
    game_cloud3_image:'img/cloud_3.png'
};

BasicGame.Boot = function (game) { };

BasicGame.Boot.prototype = {
    init: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.setMinMax(jQuery(window).width(),jQuery(window).height(),jQuery(window).width(),jQuery(window).height());
        this.scale.setResizeCallback(this.gameResized, this);
    },

    preload: function () {
        this.load.image('preloaderBackground', BasicGame.background_image);
        this.load.image('loader',BasicGame.loader_image);
    },

    create: function () {
        this.state.start('Preloader');
    },
    gameResized: function (width, height) {
        this.scale.setMinMax(jQuery(window).width(),jQuery(window).height(),jQuery(window).width(),jQuery(window).height());
    },
};