
BasicGame.MainMenu = function (game) {
    this.music = null;
    this.playButton = null;
};

BasicGame.MainMenu.prototype = {
    create: function () {
        this.world.setBounds(0,0, BasicGame.gameWidth,BasicGame.gameHeight);
        this.background = this.add.sprite(0,0,'preloaderBackground');
        this.background.height = this.world.height;
        this.background.width = this.world.width;
        this.music = this.add.audio('sound',1,true);
        // this.music.play();
        
        this.playAButton = this.add.button(450, 200, 'playButton', this.startHistory, this, 'buttonOver', 'buttonOut', 'buttonOver');
        this.playAText = this.add.text(15, 0, "Historia", {font: "50px Arial", fill: "#ffffff"});
        this.playAButton.addChild(this.playAText);

        this.playBButton = this.add.button(450, 300, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
        this.playBText = this.add.text(15, 0, "Carrera", {font: "50px Arial", fill: "#ffffff"});
        this.playBButton.addChild(this.playBText);

        this.playCButton = this.add.button(450, 400, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
        this.playCText = this.add.text(0, 0, "Compartir", {font: "50px Arial", fill: "#ffffff"});
        this.playCButton.addChild(this.playCText);
    },
    update: function () {
        //Do some nice funky main menu effect here
    },
    startGame: function (pointer) {
        this.music.stop();
        this.state.start('Game');
    },
    startHistory: function (pointer) {
        this.music.stop();
        this.state.start('History');
    },
    gameResized: function (width, height) {
        this.scale.setMinMax(200, 200,jQuery(window).width(),jQuery(window).height());
    },
};
