// player.js
import { Collision } from './collision.js';
import { Ball } from './ball.js';
import { Health } from './health.js';

export class Player {
  constructor(x, y, radius, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 5;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.balls = [];
    this.health = new Health(6);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    this.health.draw(ctx, this.x, this.y, this.radius);

  }

  setDirection(event, isPressed) {
    switch (event.key) {
      case 'w':
      case 'W':
        this.keys.up = isPressed;
        break;
      case 's':
      case 'S':
        this.keys.down = isPressed;
        break;
      case 'a':
      case 'A':
        this.keys.left = isPressed;
        break;
      case 'd':
      case 'D':
        this.keys.right = isPressed;
        break;
      default:
        break;
    }
  }

  update(barriers) {
    let newX = this.x;
    let newY = this.y;

    if (this.keys.up) {
      newY -= this.speed;
    }
    if (this.keys.down) {
      newY += this.speed;
    }
    if (this.keys.left) {
      newX -= this.speed;
    }
    if (this.keys.right) {
      newX += this.speed;
    }

    if (
      this.isWithinCanvas(newX, newY) &&
      !this.collidesWithBarriers(newX, newY, barriers)
    ) {
      this.x = newX;
      this.y = newY;
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

  shootBall(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
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
      this.balls[i].update(ctx, barriers, target);

      if (this.balls[i].toBeDestroyed) {
        this.balls.splice(i, 1);
      }
    }
  }

  takeDamage(damage) {
    this.health.takeDamage(damage);
  }
}
