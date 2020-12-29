const GRAVITY = 0.55;
const FAIL_GRAVITY = 0.8;
const IMG_URL = "../images/";
const SPIKE_HEIGHT = 60;
const rightSpikes = [];
const leftSpikes = [];
var myInterval;
var score = 0;
var fail = false;
var stopped = false;
var gameStarted = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var bird;
 

window.onload = () => {
    if (!localStorage.getItem("highScore")) { 
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
    if (ySpeed > 12) {
        src = "1";
    } else if (ySpeed > 8) {
        src = "2";
    } else if (ySpeed > 4) { 
        src = "3";
    } else if (ySpeed > 0) { 
        src = "4";
    } else if (ySpeed > -3) { 
        src = "5";
    } else if (ySpeed > -6) { 
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
    rightSpikes.splice(0, rightSpikes.length);
    leftSpikes.splice(0, leftSpikes.length);
    clearCanvas();
}

const setHighScore = () => { 
    let HighScore = JSON.parse(localStorage.getItem("highScore"));
    HighScore = Math.max(HighScore, score);
    localStorage.setItem("highScore", HighScore);
}


const checkYCollision = (bird, spike) => { 
        return ((bird.y + 50 < spike.y + 45 && bird.y + 50 > spike.y - 45) ||
                (bird.y < spike.y + 45 && bird.y > spike.y - 45) || 
                (bird.y + 100 < spike.y + 45 && bird.y + 100 > spike.y + 45));
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
        rightSpikes.splice(0, rightSpikes.length);
        console.log(arr);
        for (let i = 0; i < arr.length; i++){
            let spike = new Spike(canvas.width - 50, arr[i] * 110);
            rightSpikes.push(spike);
        }
    } else { 
        leftSpikes.splice(0, leftSpikes.length);
        randomIndexes(quantity);
        for (let i = 0; i < arr.length; i++){
            let spike = new Spike(50, arr[i] * 110);
            leftSpikes.push(spike);
        }
    }
}

const setCanvas = () => { 
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.4;  
    canvas.height = window.innerHeight;
}

const drawTopSpikes = () => {
    let x;
    for (let i = 0; i < 8; i++) {
        x = 96 * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 96, 0);
        ctx.lineTo((x + (96 * (i + 1))) / 2, 50);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

const drawBottomSpikes = () => {
    let x;
    for (let i = 0; i < 8; i++) { 
        x = 96 * i;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height);
        ctx.lineTo(x + 96, canvas.height);
        ctx.lineTo((x + (96 * (i + 1))) / 2, canvas.height -50);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

const drawWelcome = () => {
    ctx.font = "750% 'Hanalei Fill', cursive"; 
        ctx.textAlign = "center";
        ctx.fillStyle = "blue";
        ctx.fillText("WELCOME", canvas.width/2, canvas.height/4);

        ctx.font = "300% 'Hanalei Fill', cursive";
        ctx.fillStyle = "white";
        ctx.strokeText("High Score: " + localStorage.getItem("highScore"), canvas.width/2, canvas.height/2);

        ctx.font = "250% 'Hanalei Fill', cursive"; 
        ctx.textAlign = "center";
        ctx.fillStyle = "blue";
        ctx.fillText("Press any key to start", canvas.width/2, canvas.height * 0.75);
}

const drawStopMenu = () => {
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(canvas.width / 4, canvas.height * 0.2, canvas.width / 2, canvas.height * 0.175);
    ctx.fillRect(canvas.width / 4, canvas.height * 0.55, canvas.width / 2, canvas.height * 0.175);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "red";
    ctx.font = "300% 'Hanalei Fill', cursive";
    ctx.textAlign = "center";
    ctx.fillText("Resume", canvas.width/2, canvas.height*0.3);
    ctx.fillText("Restart", canvas.width/2, canvas.height*0.65);

}

const drawScore = () => {
    ctx.font = "1250% 'Hanalei Fill', cursive";  
    ctx.textAlign = "center";
    ctx.strokeText(score, canvas.width/2, canvas.height/2);
}

const clearCanvas = () => {
    ctx.fillStyle = "gray";
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
                for (let i = 0; i < rightSpikes.length; i++) {
                    ctx.beginPath();
                    ctx.moveTo(rightSpikes[i].x, rightSpikes[i].y);
                    ctx.lineTo(canvas.width, rightSpikes[i].y + 45);
                    ctx.lineTo(canvas.width, rightSpikes[i].y - 45);
                    ctx.closePath();
                    ctx.fillStyle = "black";
                    ctx.fill();
                }
            } else {
                for (let i = 0; i < leftSpikes.length; i++) { 
                    ctx.beginPath();
                    ctx.moveTo(leftSpikes[i].x, leftSpikes[i].y);
                    ctx.lineTo(0, leftSpikes[i].y + 45);
                    ctx.lineTo(0, leftSpikes[i].y - 45);
                    ctx.closePath();
                    ctx.fillStyle = "black";
                    ctx.fill();
                }
            }
        }
    }
}
 
const updateGame = () => {
    clearCanvas(); 
    bird.draw();
    bird.updateYSpeed();
    bird.updatePos();
}

const startGame = () => {
    myInterval = setInterval(updateGame, 1000 / 60);
    
}


const keyPressed = (event) => {
    if (!gameStarted) {
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
            if (!fail && !stopped && event.key === " ") { 
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