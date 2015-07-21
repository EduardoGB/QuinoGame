
BasicGame.History = function (game) {
    this.music = null;
    this.playButton = null;
};

BasicGame.History.prototype = {
    create: function () {
        this.world.setBounds(0,0, BasicGame.gameWidth,BasicGame.gameHeight);
        this.background = this.add.sprite(0,0,'preloaderBackground');
        this.background.height = this.world.height;
        this.background.width = this.world.width;
        this.music = this.add.audio('sound',1,true);
        // this.music.play();

        this.playAButton = this.add.button(450, 200, 'playButton', this.goHome, this, 'buttonOver', 'buttonOut', 'buttonOver');
        this.playAText = this.add.text(15, 0, "Home", {font: "50px Arial", fill: "#ffffff"});
        this.playAButton.addChild(this.playAText);

    },
    update: function () {
        //Do some nice funky main menu effect here
    },
    goHome: function (pointer) {
        this.music.stop();
        this.state.start('MainMenu');
    },
};
