/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

//she will say yes after how many time you flirt her?
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");


canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady, boyReady, girlReadyE;
let bgImage, boyImage, girlImageE;

let startTime = Date.now();
const SECONDS_PER_ROUND = 0;
let elapsedTime = 0;

function loadImages() {
    bgImage = new Image();
    bgImage.onload = function () {
        // show the background image
        bgReady = true;
    };
    bgImage.src = "images/canvas.jpg";

    boyImage = new Image();
    boyImage.onload = function () {
                                    // show the hero image
        boyReady = true;
    };
    boyImage.src = "images/man2.png";

    girlImageE = new Image();
    girlImageE.onload = function () {
                                // show the monster image CAP e sức mạnh 1
                                girlReadyE = true;
    };   
    girlImageE.src = "images/gai2.png";
}

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let monsterX = 100;
let monsterY = 100;

let yourLove = 0;
let herLove = Math.floor(Math.random()*10)

let keysDown = {};
function setupKeyboardListeners() {
    addEventListener("keydown", function (key) {
        keysDown[key.keyCode] = true;
    }, false);

    addEventListener("keyup", function (key) {
        delete keysDown[key.keyCode];
    }, false);
}

let update = function () {
    // Update the time.
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);


    if (38 in keysDown) { // Player is holding up key
        heroY -= 5;
    }
    if (40 in keysDown) { // Player is holding down key
        heroY += 5;
    }
    if (37 in keysDown) { // Player is holding left key
        heroX -= 5;
    }
    if (39 in keysDown) { // Player is holding right key
        heroX += 5;
    }

    if(yourLove < herLove){
        if(heroX<0){
            heroX=0
        }else if(heroX>canvas.width){
            heroX = canvas.width-32
        }
    
        if(heroY<0){
            heroY=0
        }else if(heroY>canvas.width){
            heroY = canvas.height-32
        }
    
        if (
            heroX <= (monsterX + 32)
            && monsterX <= (heroX + 32)
            && heroY <= (monsterY + 32)
            && monsterY <= (heroY + 32)
        ) {
            monsterX = Math.floor(Math.random()*(canvas.width-32)) 
            monsterY = Math.floor(Math.random()*(canvas.height-32))
            yourLove++;
        }    
    }else{
        alert("married");
        return;
    }


};
console.log (herLove)

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (boyReady) {
        ctx.drawImage(boyImage, heroX, heroY);
    }
    if (girlReadyE) {
        ctx.drawImage(girlImageE, monsterX, monsterY);
    }
    ctx.fillText(`Time to get her: ${SECONDS_PER_ROUND + elapsedTime +" year"}`, 20, 100);
    ctx.fillText(`yourLove: ${yourLove}`, 20, 150);
};

var main = function () {
    update();
    render();
    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();

