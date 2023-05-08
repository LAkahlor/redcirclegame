export class Barrier {
    constructor(x, y, width, height, canvasWidth, canvasHeight) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.closePath();
    }
  
    update() {
      // This method does nothing as requested.
    }
  }
  