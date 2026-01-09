const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
let player = {
  x: 50,
  y: 50,
  size: 30,
  speed: 5,
  alive: true,
  won: false
};

// Enemy (monstro)
let enemy = {
  x: 400,
  y: 300,
  size: 35,
  speed: 2
};

// Moedas (posições fixas para facilitar o aprendizado)
let coins = [
  { x: 120, y: 90,  size: 18, collected: false },
  { x: 420, y: 120, size: 18, collected: false },
  { x: 300, y: 260, size: 18, collected: false },
  { x: 180, y: 330, size: 18, collected: false },
  { x: 460, y: 340, size: 18, collected: false },
];

const keys = {};

// window.addEventListener("keydown", e => keys[e.key] = true);
function setKeyTrue(e) {
  keys[e.key] = true
}

function setKeyFalse(e) {
  keys[e.key] = false
}

window.addEventListener("keydown", setKeyTrue);
window.addEventListener("keyup", setKeyFalse);

function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

function update() {
  if (!player.alive || player.won) return;

  // Movimento do jogador
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  // Limites do mapa
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));

  // IA do monstro
  if (enemy.x < player.x) enemy.x += enemy.speed;
  if (enemy.x > player.x) enemy.x -= enemy.speed;
  if (enemy.y < player.y) enemy.y += enemy.speed;
  if (enemy.y > player.y) enemy.y -= enemy.speed;

  // Colisão com o monstro → derrota
  if (isColliding(player, enemy)) {
    player.alive = false;
  }

  // Coleta de moedas
  for (const coin of coins) {
    if (!coin.collected && isColliding(player, coin)) {
      coin.collected = true;
    }
  }

  // Verifica vitória
  const allCollected = coins.every(c => c.collected === true);
  if (allCollected) {
    player.won = true;
  }
}

function drawCoins() {
  for (const coin of coins) {
    if (coin.collected) continue;

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
      coin.x + coin.size / 2,
      coin.y + coin.size / 2,
      coin.size / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Enemy
  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

  // Coins
  drawCoins();

  // Mensagens de estado
  ctx.textAlign = "center";

  if (!player.alive) {
    ctx.fillStyle = "black";
    ctx.font = "46px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.font = "22px Arial";
    ctx.fillText("Pressione R para reiniciar", canvas.width / 2, canvas.height / 2 + 40);
  }

  if (player.won) {
    ctx.fillStyle = "black";
    ctx.font = "46px Arial";
    ctx.fillText("VOCÊ VENCEU!", canvas.width / 2, canvas.height / 2);
    ctx.font = "22px Arial";
    ctx.fillText("Pressione R para jogar novamente", canvas.width / 2, canvas.height / 2 + 40);
  }
}

// Reiniciar o jogo
window.addEventListener("keydown", e => {
  if (e.key === "r" || e.key === "R") {
    player.x = 50;
    player.y = 50;
    player.alive = true;
    player.won = false;

    enemy.x = 400;
    enemy.y = 300;

    coins.forEach(c => c.collected = false);
  }
});

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
