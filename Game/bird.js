var deg = 0;

class Bird {
    constructor() { 
        this.initialize();
    } 

    initialize() { 
        this.x = canvas.width / 2;
        this.y = canvas.height * 0.3;
        this.width = 100;
        this.height = 75;
        this.ySpeed = 0;
        this.xSpeed = 10;
        this.img = new Image();
    }

    updateYSpeed() {
        if (!fail) { 
            this.ySpeed += (GRAVITY * gravityRatio);
        } else {
            this.ySpeed += FAIL_GRAVITY;
        }
    }
  
    updatePos() {
        this.y += this.ySpeed; 
        this.x += (this.xSpeed * speedRatio);
        if (!fail) { 
            if (this.xSpeed > 0) {
                if (rightSpikes.filter(spike => {
                    return this.x + this.width * sizeRatio >= canvas.width && checkYCollision(this, spike);
                }).length > 0) {
                    fail = true;
                    this.ySpeed = -20;
                }
            } else {
                if (leftSpikes.filter(spike => {
                    return this.x <= 0 && checkYCollision(this, spike);
                }).length > 0) {
                    fail = true;
                    this.ySpeed = -20; 
                }
            }
            if (this.y <= 25 || this.y + this.height * sizeRatio >= canvas.height - 25) { 
                fail = true;
                if (this.y > 25) { 
                    this.ySpeed = -20;
                }
            }
        } else {
            if (this.y >= canvas.height + 150) { 
                clearInterval(myInterval);
                initializeGame();
            }
        }    
        if (this.x + this.width * sizeRatio >= canvas.width || this.x < 0) { 
            this.xSpeed *= -1;
            if (!fail) { 
                createSpikes(this.xSpeed);
                score++;
                if (score % 8 === 0) { 
                    let x = Math.floor(Math.random() * (canvas.width - 200)) + 100;
                    let y = Math.floor(Math.random() * (canvas.height - 300)) + 150;
                    power = new Power(x, y);
                }
            }
            if (score !== 0 && score % 10 === 0 && score <= 40) { 
                this.xSpeed += 1; 
            }
        }
    }
 
    flyUp()  {
        this.ySpeed = -15;
    }

    draw() {
        ctx.save();
        if (fail) {
            ctx.save();
            ctx.setTransform(0.3, 0, 0, 0.3, this.x, this.y);
            ctx.rotate(deg * 0.5);
            ctx.drawImage(this.img, -(this.width * sizeRatio / 2), -(this.height * sizeRatio / 2));
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.restore();
            deg++;
        } else { 
            this.img.src = IMG_URL + setImgSrc(this.ySpeed, this.xSpeed) + ".png";
            ctx.drawImage(this.img, this.x, this.y, this.width * sizeRatio, this.height * sizeRatio);
            ctx.restore();
        }
    }

    
    isPointCollision(x, y) { 
        return x > this.x && x < this.x + this.width * sizeRatio && y > this.y && y < this.y + this.height * sizeRatio;
    }
}