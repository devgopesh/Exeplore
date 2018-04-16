var game;
var sc = document.querySelector('#sc');
var maxScore = document.querySelector('#maxScore');
var v = document.getElementById('victory-notification');
v.style.display = 'none';

sc.textContent = "Score: " + 0;

window.onload = function() {
    game = new Phaser.Game(500, 500, Phaser.CANVAS);
    game.state.add("PlayGame",playGame);
    //game.state.add("MainMenu",MainMenu);
    // game.state.add("GameOver",GameOver);
    game.state.start("PlayGame");
}

 if (localStorage.bob >= 1)
    maxScore.textContent = "Max Score: " + localStorage.getItem('maxMathBob');

var playGame = function(game){};
var score = 0,highscore = 0,crateleft = 50;
var scoreText,spaceKey,cratetext;
playGame.prototype = {
    preload:function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
        game.load.image("ground", "assets/sprites/ground.png");
        game.load.image("sky", "assets/sprites/4.png");
        game.load.image("crate", "assets/sprites/crate.png");
    },
  	create: function(){
        var sky = game.add.image(0, 0, "sky");
        sky.width = game.width;
        scoreText = game.add.text(160, 12, 'BOB THE BUILDER', { fontSize: '24px', fill: 'white' });
        cratetext = game.add.text(12, 36, 'Crateleft: 50', { fontSize: '20px', fill: '#000' });

        this.cameraGroup = game.add.group();
        this.crateGroup = game.add.group();
        this.cameraGroup.add(this.crateGroup);
        game.physics.startSystem(Phaser.Physics.BOX2D);
        game.physics.box2d.gravity.y = 500;//600
        this.canDrop = true;
        this.movingCrate = game.add.sprite(50, 102, "crate");
        this.movingCrate.anchor.set(0.5);
        var crateTween = game.add.tween(this.movingCrate).to({
            x: game.width - 50
        }, 800, Phaser.Easing.Linear.None, true, 0, -1, true);//800
        this.cameraGroup.add(this.movingCrate);
        var ground = game.add.sprite(game.width / 2, game.height, "ground");
        ground.y = game.height - ground.height / 2;
        ground.preUpdate();
        game.physics.box2d.enable(ground);
        ground.body.friction = 0.8;
        ground.body.static = true;
        ground.body.setCollisionCategory(1);
        this.cameraGroup.add(ground);
        game.input.onDown.add(this.dropCrate, this);
	},
    dropCrate: function(){
        if(crateleft<1){//GAMEOVER
          this.canDrop =false;
          v.style.display = 'block';
        }
        if(this.canDrop){
            crateleft -= 1;
            cratetext.text = 'Crateleft: '+crateleft;
            this.canDrop = false;
            this.movingCrate.alpha = 0;
            var fallingCrate = game.add.sprite(this.movingCrate.x, this.movingCrate.y, "crate");
            fallingCrate.hit = false;
            game.physics.box2d.enable(fallingCrate);
            fallingCrate.body.friction = 0.8;
            this.crateGroup.add(fallingCrate);
            fallingCrate.preUpdate();
            fallingCrate.body.setCollisionCategory(1);
            fallingCrate.body.setCategoryContactCallback(1, function(b){
                this.canDrop = true;
                this.movingCrate.alpha = 1;
                this.movingCrate.preUpdate();
                b.setCategoryContactCallback(1);
                b.sprite.hit = true;
                this.getMaxHeight();
            }, this);
        }
    },
    update: function(){
        this.crateGroup.forEach(function(i){
            if(i.y > game.height + i.height){
                if(!i.hit){
                    this.canDrop = true;
                    this.movingCrate.alpha = 1;
                    this.movingCrate.preUpdate();
                    this.getMaxHeight();
                }
                i.destroy();
            }
        }, this);
    },
    scaleCamera: function(cameraScale){
        var moveTween = game.add.tween(this.cameraGroup).to({
            x: (game.width - game.width * cameraScale) / 2,
            y: game.height - game.height * cameraScale,
        }, 200, Phaser.Easing.Quadratic.IN, true);
        var scaleTween = game.add.tween(this.cameraGroup.scale).to({
            x: cameraScale,
            y: cameraScale,
        }, 200, Phaser.Easing.Quadratic.IN, true);
    },
    getMaxHeight: function(){
        var maxHeight = 0
        this.crateGroup.forEach(function(i){
            if(i.hit){
                var height = Math.round(Math.abs(792-960 +500 - i.y) / i.height) + 1;
                maxHeight = Math.max(height, maxHeight);
                score = maxHeight*10;
                sc.textContent = "Score: " + score;
                if (localStorage.bob) {
                    localStorage.bob = Number(localStorage.bob)+1;
                } else {
                    localStorage.bob = 1;
                }
                if (localStorage.bob === 1) {
                    localStorage.setItem('maxMathBob', score);    
                } else {
                    var q = localStorage.getItem('maxMathBob');
                    if (score > q)
                      localStorage.setItem('maxMathBob', score);
                }
                maxScore.textContent = "Max Score: " + localStorage.getItem('maxMathBob');
                //maxScore.textContent = "Max"
                //scoreText.text = 'Score: ' + score + ' Highscore: ' + highscore;
            }
        }, this);
        this.movingCrate.y = 792 - (maxHeight) * 77 - 690;
        var newHeight = game.height + 77 * maxHeight;
        var ratio = game.height / newHeight;
        this.scaleCamera(ratio);
    }
}
