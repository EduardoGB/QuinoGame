var game = new Phaser.Game(250, 300, Phaser.AUTO, 'game_div');
var game_state = {};
var anim;
var loadingJump = false;

game_state.main = function() { };  
game_state.main.prototype = {

    preload: function() {
        //this.backgroundColor = ‘#71c5cf’;
        this.globalGravity = 9; // or any value you need
        this.playerJumped = false;
        this.timer = 0;
        this.load.image('scene', 'https://lh3.googleusercontent.com/ylYuTA7ge0gSERN0HFTrXhLJsiLngsrjNMxcN8TL8cwwg-kIgbRnMJtIrgKC_iM5Y7K0bKTv6IFFRIE=w1269-h553');
        this.load.image('ground', 'https://lh6.googleusercontent.com/8jq8kL_h7mIVOx07_C64FyAk-DkMV1IxGexvs1DjrZxZeGlMJQJUDwawglMCx6PnU-s5l8MQuSbiVJA=w1269-h553');
        this.load.spritesheet('pig','https://lh3.googleusercontent.com/B_7Y9wOtIE9JQ18Eu_OyFHBFG2wkrVDeyFz8CyJEVmb5sNym9kgbJ7AbH66yHDyIEGo_whNQ2lNwelk=w1269-h553', 40, 40);

    },

    create: function() { 
        //this.stage.backgroundColor = '#71c5cf';
        this.bbackground = game.add.sprite(0, 0, 'scene', 'background');
        //this.bg = this.add.tileSprite(0, 0, 500, 490, 'ground');
        
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
        this.platforms.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.ground = this.platforms.create(0, this.world.height - 64, 'ground');
        this.ground.scale.setTo(5, .1);
        this.ground.body.immovable = true;
        
        this.ground1 = this.platforms.create(150, this.world.height - 110, 'ground');
        this.ground1.scale.setTo(2, .1);
        this.ground1.body.immovable = true;
        
        this.ground2 = this.platforms.create(0, this.world.height - 170, 'ground');
        this.ground2.scale.setTo(1, .1);
        this.ground2.body.immovable = true;
        
        this.mummy = this.add.sprite(100, 160, 'mummy');
        this.mummy.body.bounce.y = 0.2;
        this.mummy.body.gravity.y =  this.globalGravity;
        this.mummy.body.collideWorldBounds = true;
        this.mummy.anchor.setTo(0.5,0.5);
        
        this.mummy.animations.add('walk',[0,1],5,true);
        this.mummy.play('walk');    
        
        this.cursors = this.input.keyboard.createCursorKeys();
       
    },
    
    update: function() {
        //console.log(this.time.elapsed)
        this.physics.arcade.collide(this.mummy, this.platforms);
        this.mummy.body.velocity.x = 0;
        if(this.cursors.left.isDown){
            this.mummy.x -= 4;
        } else if (this.cursors.right.isDown){
            this.mummy.x += 4;
        } 
        
            if (this.cursors.up.isDown && this.mummy.body.touching.down) {
                //  Allow the player to jump if they are touching the ground.
                this.mummy.body.velocity.y = -200;
                this.playerJumped = true;
                
            } else if (this.cursors.up.isDown && this.playerJumped == true )  {  
                // reduce players gravity if player recently jumped and jump key is down 
                this.mummy.body.gravity.y = this.globalGravity - 5;
        
            } else {
                // reset gravity once the jump key is released to prevent prolongation
                this.playerJumped = false;
                this.mummy.body.gravity.y = this.globalGravity;
            }
   
    },
};


game.state.add('main', game_state.main);  
game.state.start('main'); 