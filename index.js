// index.js
import { Player } from './player.js';
import { Barrier } from './barrier.js';
import { Collision } from './collision.js';
import { NPC } from './npc.js';
import { Health } from './health.js';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
createEndGameButton();
const ctx = canvas.getContext('2d');

const player = new Player(canvas.width / 2, canvas.height - 50, 25, canvas.width, canvas.height);
const npc = new NPC(canvas.width / 2, 50, 25, canvas.width, canvas.height);
const barrier = new Barrier(canvas.width / 2 - 50, canvas.height / 2 - 25, 100, 50, canvas.width, canvas.height);

const barriers = [barrier];

window.addEventListener('keydown', (event) => {
  player.setDirection(event, true);
});

window.addEventListener('keyup', (event) => {
  player.setDirection(event, false);
});

window.addEventListener('mousedown', (event) => {
  if (event.button === 0) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    player.shootBall(mouseX, mouseY);
  }
});

function endGame() {
  const endGameMessage = document.createElement('div');
  endGameMessage.innerText = 'Game Over';
  endGameMessage.style.position = 'absolute';
  endGameMessage.style.top = '50%';
  endGameMessage.style.left = '50%';
  endGameMessage.style.transform = 'translate(-50%, -50%)';
  endGameMessage.style.fontSize = '48px';
  endGameMessage.style.color = 'red';

  const restartButton = document.createElement('button');
  restartButton.innerText = 'OK';
  restartButton.style.display = 'block';
  restartButton.style.margin = '0 auto';
  restartButton.onclick = () => {
    endGameMessage.remove();
    player.health = new Health(6);
    npc.health = new Health(6);
    startGame();
  };

  endGameMessage.appendChild(restartButton);
  document.body.appendChild(endGameMessage);
}

function createEndGameButton() {
    const button = document.createElement('button');
    button.id = 'end-game-button';
    button.innerText = 'End Game';
    button.onclick = endGame;
  
    document.body.appendChild(button);
  }
  

function startGame() {
  const startMenu = document.createElement('div');
  startMenu.style.position = 'absolute';
  startMenu.style.top = '50%';
  startMenu.style.left = '50%';
  startMenu.style.transform = 'translate(-50%, -50%)';
  startMenu.style.fontSize = '48px';
  startMenu.style.textAlign = 'center';

  const startMessage = document.createElement('div');
  startMessage.innerText = 'Start Game';
  startMessage.style.color = 'black';
  startMenu.appendChild(startMessage);

  const startButton = document.createElement('button');
  startButton.innerText = 'Start';
  startButton.style.display = 'block';
  startButton.style.margin = '0 auto';
  startButton.onclick = () => {
    startMenu.remove();
    gameLoop();
  };

  startMenu.appendChild(startButton);
  document.body.appendChild(startMenu);
}

function gameLoop() {
    if (player.health.currentHealth <= 0 || npc.health.currentHealth <= 0) {
        endGame();
        return;
      }
  

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update(barriers);
  npc.update(player, barriers);
  barrier.update();

  player.draw(ctx);
  npc.draw(ctx);
  barrier.draw(ctx);

  player.updateBalls(ctx, barriers, npc);
  npc.updateBalls(ctx, barriers, player);

  requestAnimationFrame(gameLoop);
}

startGame();
