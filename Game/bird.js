var deg = 0;

class Bird {
    constructor() { 
        this.initialize();
    } 

    initialize() { 
        this.x = canvas.width / 2;
        this.y = canvas.height * 0.3;
        this.width = canvas.width / 7.7;
        this.height = 0.75 * this.width;
        this.ySpeed = 0;
        this.xSpeed = canvas.width / 77;
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

                // Check if there is a collision with the spikes on the wall
                if (rightSpikes.filter(spike => {
                    return this.x + this.width * sizeRatio >= canvas.width && checkYCollision(this, spike);
                }).length > 0) {
                    fail = true;
                    this.ySpeed = -(canvas.height / 48.5);
                }
            } else {
                // Check if there is a collision with the spikes on the wall
                if (leftSpikes.filter(spike => {
                    return this.x <= 0 && checkYCollision(this, spike);
                }).length > 0) {
                    fail = true;
                    this.ySpeed = -(canvas.height / 48.5); 
                }
            }

            //Check if there is collision with the spike at the top or bottom
            if (this.y <= VERTICAL_SPIKE_HEIGHT / 2 || this.y + this.height * sizeRatio >= canvas.height - (VERTICAL_SPIKE_HEIGHT / 2)) { 
                fail = true;
                if (this.y > VERTICAL_SPIKE_HEIGHT / 2) { 
                    this.ySpeed = -(canvas.height / 48.5);
                }
            }
        } else {
            if (this.y >= canvas.height + VERTICAL_SPIKE_HEIGHT * 3) { 
                clearInterval(myInterval);
                initializeGame();
            }
        }

        // Switch side
        if (this.x + this.width * sizeRatio >= canvas.width || this.x < 0) { 
            this.xSpeed *= -1;
            if (!fail) { 
                createSpikes(this.xSpeed);
                score++;
                if (score % 8 === 0) { 
                    let x = Math.floor(Math.random() * (canvas.width - canvas.width / 3.85)) + canvas.width / 7.7;
                    let y = Math.floor(Math.random() * (canvas.height - canvas.height / 3.2)) + canvas.height / 6.5;
                    power = new Power(x, y);
                }
            }

            // Increase x speed
            if (score !== 0 && score % 10 === 0 && score <= 40) { 
                this.xSpeed += canvas.width / 770; 
            }
        }
    }
 
    flyUp()  {
        this.ySpeed = -(canvas.height / 65);
    }

    draw() {
        ctx.save();

        // Draw the rotating bird
        if (fail) {
            ctx.save();
            ctx.setTransform(0.0033 * this.width, 0, 0, 0.0033 * this.width, this.x, this.y);
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