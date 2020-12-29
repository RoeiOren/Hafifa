const GRAVITY = 0.55;
const FAIL_GRAVITY = 0.8;
const IMG_URL = "../images/";
const SPIKE_HEIGHT = 60;

const rightSpikes = [];
const leftSpikes = [];
var myInterval;
var score;
var fail = false;
var stopped = false;
var gameStarted = false;
var openedIns = false;
var power;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var bird;
 

window.onload = () => {
    if (!localStorage.getItem("highScore") || isNaN(JSON.parse(localStorage.getItem("highScore")))) { 
        localStorage.setItem("highScore", 0);
    }
    setCanvas();
    initializeGame();
    window.addEventListener("keydown", keyPressed);
    window.addEventListener("resize", setCanvas);
    document.getElementById("canvas").addEventListener("mouseup", handleClick);
}

const setImgSrc = (ySpeed, xSpeed) => {
    let src = "";
    if (ySpeed > 12 * gravityRatio) {
        src = "1";
    } else if (ySpeed > 8 * gravityRatio) {
        src = "2";
    } else if (ySpeed > 4 * gravityRatio) { 
        src = "3";
    } else if (ySpeed > 0 * gravityRatio) { 
        src = "4";
    } else if (ySpeed > -3 * gravityRatio) { 
        src = "5";
    } else if (ySpeed > -6 * gravityRatio) { 
        src = "6";
    } else {
        src = "7";
    }

    src += xSpeed > 1 ? "-flipped" : "";

    return src;
}

const initializeGame = () => {
    if (!bird) { 
        bird = new Bird();
    } else {
        bird.initialize();
    }
    stopped = false;
    gameStarted = false;
    setHighScore();    
    score = 0;
    fail = false; 
    resetAllProp();
    rightSpikes.splice(0, rightSpikes.length);
    leftSpikes.splice(0, leftSpikes.length);
    power = undefined;
    clearCanvas();
}

const setHighScore = () => {
    if(score) { 
        let HighScore = JSON.parse(localStorage.getItem("highScore"));
        HighScore = Math.max(HighScore, score);
        localStorage.setItem("highScore", HighScore);
    }
}


const checkYCollision = (bird, spike) => { 
        return ((bird.y + (bird.height / 2) * sizeRatio < spike.y + spike.height / 2 && bird.y + (bird.height / 2) * sizeRatio > spike.y - spike.height / 2) ||
                (bird.y < spike.y + spike.height / 2 && bird.y > spike.y - spike.height / 2) || 
                (bird.y + bird.height * sizeRatio < spike.y + spike.height / 2 && bird.y + bird.height * sizeRatio > spike.y + spike.height / 2));
}
 
const createSpikes = (xSpeed) => {
    let quantity;
    if (score < 8) { 
        quantity = 3;
    } else if (quantity > 24) { 
        quantity = 6;
    } else {
        quantity = Math.floor((score / 8) + 3);
    }
    const arr = randomIndexes(quantity);
    if (xSpeed > 0) { 
        createRightSpikes(arr);
    } else { 
        createLeftSpikes(arr);
    }
}

const createRightSpikes = (arr) => {
    rightSpikes.splice(0, rightSpikes.length);
        for (let i = 0; i < arr.length; i++){
            let spike = new Spike(canvas.width - 50, arr[i] * 110);
            rightSpikes.push(spike);
        }
}

const createLeftSpikes = (arr) => {
    leftSpikes.splice(0, leftSpikes.length);
    for (let i = 0; i < arr.length; i++){
        let spike = new Spike(50, arr[i] * 110);
        leftSpikes.push(spike);
    }
}

const setCanvas = () => { 
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.4;  
    canvas.height = window.innerHeight;
}

const clearCanvas = () => {
    ctx.fillStyle = CalcBackColor();
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    drawTopSpikes();
    drawBottomSpikes();
    
    if (!gameStarted) { 
        drawWelcome();
    } else {

        if (stopped) {
            drawStopMenu();
        } else {
            drawScore();
        }

        if(!fail) { 
            if (bird.xSpeed > 0) { 
                drawRightSpikes();
            } else {
                drawLeftSpikes();
            }
        }
    }
}

const CalcBackColor = () => {
    let color;

    if (score < 5) { 
        color = "HoneyDew"; 
    } else if (score < 10) { 
        color = "GhostWhite";
    } else if (score < 15) { 
        color = "Gainsboro";
    } else if (score < 20) { 
        color ="LightSlateGrey";
    } else if (score < 25) { 
        color = "LightCoral";
    } else {
        color = "FireBrick";
    } 

    return color;
}
 
const updateGame = () => {
    clearCanvas(); 
    bird.draw();
    bird.updateYSpeed();
    bird.updatePos();
    if (power) { 
        power.draw();
        if  (bird.isPointCollision(power.x, power.y) || bird.isPointCollision(power.x + power.width, power.y)
            || bird.isPointCollision(power.x, power.y + power.height) || bird.isPointCollision(power.x + power.width, power.y + power.height)) { 
                power = undefined;
                activateRandomPower();
                setTimeout(resetAllProp, 5000);
            }
    }
}

const activateRandomPower = () => { 
    resetAllProp();
    let index = Math.floor(Math.random() * powersArr.length);
    powersArr[index]();
}

const startGame = () => {
    myInterval = setInterval(updateGame, 1000 / 60);
    
}

const keyPressed = (event) => {
    if (!gameStarted && !openedIns) {
        gameStarted = true;
        startGame();
    } else {
        if (event.key === "Escape" && !fail) { 
            if (!stopped)  {
                stopped = true;
                clearInterval(myInterval);
                clearCanvas();
                bird.draw();
            } else {
                stopped = false;
                startGame();
            }
        } else { 
            if (!fail && !stopped && !openedIns && event.key === " ") { 
                bird.flyUp();
            }
        }
    }
}

const randomIndexes = (quantity) => { 
    const INDEXES = [1, 2, 3, 4, 5, 6, 7, 8];
    const pickedIndexes = [];
    for (let i = 0; i < quantity; i++) { 
        let maxIndex = INDEXES.length - 1;
        let minIndex = i + 1;
        let swapIndex = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;
        let tmp = INDEXES[i];
        INDEXES[i] = INDEXES[swapIndex];
        INDEXES[swapIndex] = tmp;
        pickedIndexes.push(INDEXES[i]);
    }

    return pickedIndexes;
}

const handleClick = (event) => {
    if (!gameStarted) {
        if (event.pageX - canvas.offsetLeft > canvas.width * 0.075 && event.pageX - canvas.offsetLeft < canvas.width * 0.275 
            && event.pageY > canvas.height * 0.8 && event.pageY < canvas.height * 0.885) {
            if(!openedIns) {
                openedIns = true;
                clearCanvas();
                drawInstructions();
            } else { 
                openedIns = false;
                clearCanvas();
            }
        }
    } else {
        if (!fail && stopped) { 
            // In X range
            if (event.pageX - canvas.offsetLeft > canvas.width / 4 && event.pageX - canvas.offsetLeft < canvas.width * 0.75){
                if (event.pageY > canvas.height * 0.2 && event.pageY < canvas.height * 0.375) {
                    stopped = false;
                    startGame();
                } else if (event.pageY > canvas.height * 0.55 && event.pageY < canvas.height * 0.725){
                    initializeGame();
                }
            }
        }
    }
}