const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

function placeFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
  const head = {
    x: snake[0].x + direction.x * gridSize,
    y: snake[0].y + direction.y * gridSize,
  };

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert('Game Over! Your Score: ' + score);
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById('score').textContent = score;
    placeFood();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

placeFood();
setInterval(gameLoop, 100);
