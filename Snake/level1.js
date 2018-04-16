//DRAW CANVAS1 BODY
var canvas1 = document.getElementById("myCanvas1");
var ctx = canvas1.getContext("2d");

var imported = document.createElement('script');
var span = document.querySelector("#level1");
var scor = document.querySelector('#score');
var maxScore = document.querySelector('#maxScore');
var nLevel = document.querySelector('#nLevel');
var dLevel = document.querySelector('#dLevel');
var pLevel = document.querySelector('#pLevel');
var pa = document.getElementById('pa');
var pa1 = document.getElementById('pa1');
var pa2 = document.getElementById('pa2');
var tScore = document.getElementById('tScore');
var v = document.getElementById('victory-notification');
v.style.display = 'none';

nLevel.textContent = 'Next Level';

pLevel.textContent = '';
dLevel.textContent = '';

span.textContent = "Level 1";
pa1.textContent = '';
pa.textContent = '';

canvas1.className = 'bg1';

//STARTING OF GAME
restart();
function restart() {
    if (localStorage.mathS >= 1)
        maxScore.textContent = "Max Score: " + localStorage.getItem('maxMathScoreS');
    scor.textContent = "Score: " + 0;
    pa2.textContent = '';
    var myGamePiece = new Array(), myObstacle, myScore, score = 0, mySnake, max;
    var d = 0, l = 0, u = 0, r = 1;
    var myGameArea = {
        start : function() {
            this.interval = setInterval(updateGameArea, 60);
            window.addEventListener('keydown', function (e) {
                myGameArea.key = e.keyCode;
            })
            window.addEventListener('keyup', function (e) {
                myGameArea.key = false;
            })
        },
        clear : function() {
            ctx.clearRect(0, 0, 500, 500);
        },
        clearinterval : function() {
            this.interval = clearInterval(this.interval);
        }
    }

    startGame();

    function startGame() {
        for (var i=4; i>=0; i--) {
            myGamePiece.push({
                x : i,
                y : 0
            });
        }
        var random = Math.floor((Math.random()*49)),
            random1 = Math.floor((Math.random()*49));
        myObstacle = new component(10, 10, "blue", random*10, random1*10);
        myGameArea.start();
    }

    function component(width, height, color, x, y, type) {
        this.gamearea = myGameArea;
        this.type = type;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;    
        this.update = function(){
            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }

    //CHECK COLLISON WITH SNAKE BODY
    checkCollison = function(x, y, array){
        for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
                return true;
        } 
        return false;
    }

    function updateGameArea() {
        var snakex = myGamePiece[0].x;
        var snakey = myGamePiece[0].y;

        if (r === 1) {
            snakex++;
        }  
        else if (u === 1) {
            snakey--;
        }  
        else if (d === 1) {
            snakey++;
        } 
        else if (l === 1) {
            snakex--;
        } 
        
        if (myGameArea.key && myGameArea.key == 37) {
            if (r === 0) {
                l = 1;
                r = u = d = 0;
            }
        }
        if (myGameArea.key && myGameArea.key == 39) {
            if (l === 0) {
                r = 1;
                l = u = d = 0;
            }
        }
        if (myGameArea.key && myGameArea.key == 38) {
            if (d === 0) {
                u = 1;
                l = r = d = 0;
            }
        }
        if (myGameArea.key && myGameArea.key == 40) {
            if (u === 0) {
                d = 1;
                l = u = r = 0;
            }
        }

        //COLLISON WITH ITSELF
        if (checkCollison(snakex, snakey, myGamePiece)) {
            myGameArea.clear();
            myGameArea.clearinterval();
            v.style.display = 'block';
            pa2.textContent = 'Play Again';
            pa2.addEventListener('click', function(){
                imported.src = 'level1.js';
            document.head.appendChild(imported);
            });
        }

        //MAKING THE SNAKE APPEAR IF IT CROSSES THE WALL
        if (snakex === 50) {
            snakex = 0;
            snakey = myGamePiece[0].y;
        }
        else if (snakex === -1) {
            snakex = 50;
            snakey = myGamePiece[0].y;
        }
        else if (snakey === 50) {
            snakex = myGamePiece[0].x;
            snakey = 0;
        }
        else if (snakey === -1) {
            snakex = myGamePiece[0].x;
            snakey = 50;
        }

        //EATING OF FOOD(myObstacle=FOOD)
        if (snakex === myObstacle.x/10 && snakey === myObstacle.y/10) {
            myObstacle = new component(0, 0, "#f1f1f1", 0, 0);
            score+=20;
            if (localStorage.mathS) {
                localStorage.mathS = Number(localStorage.mathS)+1;
            } else {
                localStorage.mathS = 1;
            }
            if (localStorage.mathS === 1) {
                localStorage.setItem('maxMathScoreS', score);    
            } else {
                var q = localStorage.getItem('maxMathScoreS');
                if (score > q)
                    localStorage.setItem('maxMathScoreS', score);
            }
            maxScore.textContent = "Max Score: " + localStorage.getItem('maxMathScoreS');
            /*var s = Number(localStorage.getItem('maxMathScoreS')) + Number(localStorage.getItem('maxMathScoreS2')) + Number(localStorage.getItem('maxMathScoreS3'));
            tScore.textContent = "Total Score: " + s;*/
            scor.textContent = "Score: " + score;
            var random = Math.floor((Math.random()*49)),
                random1 = Math.floor((Math.random()*49));
            myObstacle = new component(10, 10, "blue", random*10, random1*10);
            myGamePiece.unshift({
                x : snakex,
                y : snakey
            });
        }
        else {
            var tail = myGamePiece.pop();
            tail.x = snakex;
            tail.y = snakey;
            myGamePiece.unshift(tail);
        }
       
        myGameArea.clear();
        myObstacle.update();
        for (var o = 0; o < myGamePiece.length; o++) {
            mySnake = new component(10, 10, "red", myGamePiece[o].x*10, myGamePiece[o].y*10);
            mySnake.update();
        }

        nLevel.addEventListener('click', function(){
            myGameArea.clear();
            myGameArea.clearinterval();
            if (localStorage.mathS) {
                localStorage.mathS = Number(localStorage.mathS)+1;
            } else {
                localStorage.mathS = 1;
            }
            if (localStorage.mathS === 1) {
                localStorage.setItem('maxMathScoreS', score);    
            } else {
                var q = localStorage.getItem('maxMathScoreS');
                if (score > q)
                    localStorage.setItem('maxMathScoreS', score);
            }
            //imported.src = '/home/gopesh/Exeplore5.0/Snake/level2.js';
            imported.src = 'level2.js';
            document.head.appendChild(imported);
        });  
    }
}
