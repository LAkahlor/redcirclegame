import { Collision } from './collision.js';
import { Ball } from './ball.js';
import { Health } from './health.js';

export class NPC {
  constructor(x, y, radius, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 3;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.direction = { x: 1, y: 1 };
    this.balls = [];
    this.health = new Health(6);
    this.shootingCooldown = 2000;
    this.lastShot = Date.now();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
    this.health.draw(ctx, this.x, this.y, this.radius);

  }



  shoot(targetX, targetY) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const angle = Math.atan2(dy, dx);

    this.balls.push(
      new Ball(
        this.x,
        this.y,
        5,
        7,
        angle,
        this.canvasWidth,
        this.canvasHeight
      )
    );
  }

  updateBalls(ctx, barriers, target) {
    for (let i = this.balls.length - 1; i >= 0; i--) {
      if (this.balls[i].update(ctx, barriers, target)) {
        this.balls.splice(i, 1);
      } else {
        this.balls[i].draw(ctx);
        if (Collision.checkCircleCollision(this.balls[i].x, this.balls[i].y, this.balls[i].radius, target.x, target.y, target.radius)) {
          target.takeDamage(10); // Reduce target health by 10
          this.balls.splice(i, 1);
        }
      }
    }
  }

  update(player, barriers) {
    let newX = this.x + this.speed * this.direction.x;
    let newY = this.y + this.speed * this.direction.y;

    if (
      this.isWithinCanvas(newX, newY) &&
      !this.collidesWithBarriers(newX, newY, barriers)
    ) {
      this.x = newX;
      this.y = newY;
    } else {
      this.changeDirection();
    }

    if (Date.now() - this.lastShot >= this.shootingCooldown) {
      this.shoot(player.x, player.y);
      this.lastShot = Date.now();
    }
  }

  isWithinCanvas(x, y) {
    return (
      x - this.radius >= 0 &&
      x + this.radius <= this.canvasWidth &&
      y - this.radius >= 0 &&
      y + this.radius <= this.canvasHeight
    );
  }

  collidesWithBarriers(x, y, barriers) {
    return barriers.some((barrier) =>
      Collision.checkCircleRectangleCollision(x, y, this.radius, barrier)
    );
  }

  changeDirection() {
    this.direction.x = Math.random() < 0.5 ? -1 : 1;
    this.direction.y = Math.random() < 0.5 ? -1 : 1;
  }
  takeDamage(damage) {
    this.health.takeDamage(damage);
  }

}
