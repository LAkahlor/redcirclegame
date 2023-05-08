// health.js
export class Health {
    constructor(maxHealth) {
      this.currentHealth = maxHealth;
      this.maxHealth = maxHealth;
    }
  
    takeDamage(damage) {
      this.currentHealth -= damage;
      if (this.currentHealth < 0) {
        this.currentHealth = 0;
      }
    }
  
    draw(ctx, x, y, radius) {
        // Draw the health bar background
        ctx.fillStyle = 'black';
        ctx.fillRect(x - 50, y - (radius + 20), 100, 10);
      
        // Draw the health bar fill
        ctx.fillStyle = 'green';
        const healthPercentage = this.currentHealth / this.maxHealth;
        ctx.fillRect(x - 50, y - (radius + 20), 100 * healthPercentage, 10);
      }
  }
  