// ball.js
import { Collision } from './collision.js';

export class Ball {
  constructor(x, y, radius, speed, angle, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.angle = angle;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.toBeDestroyed = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }

  update(ctx, barriers, target) {
    this.move();
    this.draw(ctx);

    if (!this.isWithinCanvas()) {
      this.toBeDestroyed = true;
      return;
    }

    if (this.collidesWithBarriers(barriers)) {
      this.toBeDestroyed = true;
      return;
    }

    if (this.collidesWithObject(target)) {
      this.toBeDestroyed = true;
      target.takeDamage(1); // Cause 1 point of damage to the target
      return;
    }
  }

  move() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }

  isWithinCanvas() {
    return (
      this.x - this.radius >= 0 &&
      this.x + this.radius <= this.canvasWidth &&
      this.y - this.radius >= 0 &&
      this.y + this.radius <= this.canvasHeight
    );
  }

  collidesWithBarriers(barriers) {
    return barriers.some((barrier) =>
      Collision.checkCircleRectangleCollision(this.x, this.y, this.radius, barrier)
    );
  }

  collidesWithObject(object) {
    return Collision.checkCircleCollision({ x: this.x, y: this.y, radius: this.radius }, object);
  }
}
