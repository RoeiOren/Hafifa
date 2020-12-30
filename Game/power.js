const ORIGIN_WIDTH = 40;

class Power {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
        this.width = canvas.width / 19;
        this.heigth = this.width;
    }

    draw() { 
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.heigth);
        ctx.globalAlpha = 1;
        
        ctx.font = `${200 * (this.width / ORIGIN_WIDTH)}% 'Hanalei Fill', cursive`;
        ctx.fillStyle = "LimeGreen";
        ctx.textAlign = "center";
        ctx.fillText("?", this.x + 20 * (this.width / ORIGIN_WIDTH), this.y + 30 * (this.width / ORIGIN_WIDTH));
        
    }
}