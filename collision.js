export class Collision {
    static checkCircleCollision(obj1, obj2) {
      const dx = obj1.x - obj2.x;
      const dy = obj1.y - obj2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      return distance < obj1.radius + obj2.radius;
    }
  
    static checkCircleRectangleCollision(circleX, circleY, circleRadius, rectangle) {
      const deltaX = circleX - Math.max(rectangle.x, Math.min(circleX, rectangle.x + rectangle.width));
      const deltaY = circleY - Math.max(rectangle.y, Math.min(circleY, rectangle.y + rectangle.height));
  
      return (deltaX * deltaX + deltaY * deltaY) < (circleRadius * circleRadius);
    }
  }
  