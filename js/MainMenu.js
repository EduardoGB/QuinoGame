
BasicGame.MainMenu = function (game) {
    this.music = null;
    this.playButton = null;
};

BasicGame.MainMenu.prototype = {
    create: function () {
         this.backgroundh = this.add.sprite(0, 0, 'preloaderBackground');
        this.backgroundh.scale.x =.7;
        this.backgroundh.scale.y =.7;
        
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
