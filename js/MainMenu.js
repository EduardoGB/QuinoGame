
BasicGame.MainMenu = function (game) {
    this.music = null;
    this.playButton = null;
};

BasicGame.MainMenu.prototype = {
    create: function () {
         this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.background.scale.x =5;
        this.background.scale.y =2;
        
        this.music = this.add.audio('sound',1,true);
        // this.music.play();

        this.playButton = this.add.button(450, 200, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
    },
    update: function () {
        //Do some nice funky main menu effect here
    },
    startGame: function (pointer) {
        this.music.stop();
        this.state.start('Game');
    }
};
