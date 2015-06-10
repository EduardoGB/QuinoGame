BasicGame = {
    score: 0,
    music: null,
    orientated: false,
    baseWidth:800,
    baseHeigth:600
};

BasicGame.Boot = function (game) { };

BasicGame.Boot.prototype = {

    init: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, window.screen.width,window.screen.height);
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = false;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = false;
            this.scale.forceOrientation(true,false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    },

    preload: function () {
        this.load.image('preloaderBackground', 'img/cielo.png');
        this.load.image('loader', 'img/load.png');
    },

    create: function () {
        this.state.start('Preloader');
    },
    gameResized: function (width, height) {

    },

    enterIncorrectOrientation: function () {
        BasicGame.orientated = true;
        document.getElementById('game').style["-webkit-transform"] = portrait ? "rotate(90deg) translate(248px, 248px)" : "";
        document.getElementById('orientation').style.display = 'block';
    },
    leaveIncorrectOrientation: function () {
        BasicGame.orientated = true;
        document.getElementById('orientation').style.display = 'none';
    }
};