class Power {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
        this.width = 40;
        this.heigth = 40;
    }

    draw() { 
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.heigth);
        ctx.globalAlpha = 1;
        
        ctx.font = "200% 'Hanalei Fill', cursive";
        ctx.fillStyle = "LimeGreen";
        ctx.textAlign = "center";
        ctx.fillText("?", this.x + 20, this.y + 30);
        
    }
}