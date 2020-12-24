const GRAVITY = 0.4;
var myInterval;

window.onload = () => {
    setCanvas();
    clearCanvas();
    window.addEventListener("keypress", flyUp);
    startGame();
}

class Rect {
    constructor(height, width, x, y, color) { 
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.color = color;
        this.ySpeed = 0;
        this.xSpeed = 10;
        this.gravitySpeed = 0;
    }

    updateGravitySpeed() {
        this.gravitySpeed += GRAVITY;
    }

    updatePos() {
        this.y += this.ySpeed + this.gravitySpeed;
        this.x += this.xSpeed; 
        if (this.x + this.width >= canvas.width || this.x < 0) { 
            this.xSpeed *= -1;
        }

        if (this.y <= 0 || this.y + this.height >= canvas.height) { 
            clearInterval(myInterval);
        }
    }

    changeGravity()  {
        this.gravitySpeed = -15;
    }

    draw() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 20, 20);
    }
}

const setCanvas = () => {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rect = new Rect(20, 20, window.innerWidth / 4, 100, "black");

const clearCanvas = () => {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const updateGame = () => {
    rect.updateGravitySpeed();
    rect.updatePos();
} 

const draw = () =>{
    clearCanvas();
    rect.draw();
}

const startGame = () => {
    myInterval = setInterval(updateGame, 20);
    setInterval(draw, 1000 / 60);
}

const flyUp = () => {
    rect.changeGravity();
}