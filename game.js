const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    speed: 5,
    size: 40,
    x: 50,
    y: 50,
    life: 3,
    won: false,
    alive: true
}

const enemy = {
    speed: 3,
    size: 40,
    x: 400,
    y: 300,
    alive: true
}

let coins = [
    {x: 70, y:300, size: 20, collected: false},
    {x: 400, y:40, size: 20, collected: false},
    {x: 405, y:550, size: 20, collected: false},
    {x: 700, y:300, size: 20, collected: false},
    {x: 240, y:180, size: 20, collected: false},
    {x: 240, y:420, size: 20, collected: false},
    {x: 550, y:180, size: 20, collected: false},
    {x: 550, y:420, size: 20, collected: false}
]

const curaPowerUp = [
    {x: 70, y: 530, size: 23, collected: false},
    {x: 670, y: 80, size: 23, collected: false}
]

const speedPowerUp = {
    x: 670,
    y: 530, 
    size: 27, 
    collected: false
}

const finalPowerUp = {
    x: 50,
    y: 100,
    size: 30,
    speed: 3,
    collected: false
}

function isColliding(a, b) {
    return (
      a.x < b.x + b.size &&
      a.x + a.size > b.x &&
      a.y < b.y + b.size &&
      a.y + a.size > b.y
    );
  }

const keys = {}

function setKeyTrue(e) {
    // console.log("apertou: ", e.key)
    keys[e.key] = true
}

function setKeyFalse(e) {
    keys[e.key] = false
}

window.addEventListener("keydown", setKeyTrue)
window.addEventListener("keyup", setKeyFalse)

function update() {
    if (keys["ArrowUp"]) player.y -= player.speed
    if (keys["ArrowDown"]) player.y += player.speed
    if (keys["ArrowRight"]) player.x += player.speed
    if (keys["ArrowLeft"]) player.x -= player.speed
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rodarNaTela();

    ctx.textAlign = "center";
    ctx.fillText('Jogo do Davi', 40, 590, 200);
    ctx.fillStyle = "black";
    ctx.font = "Arial";
}

function rodarNaTela() {
    exibir('blue', player);
    exibir('red', enemy);

    exibir('yellow', coins[0]);
    exibir('yellow', coins[1]);
    exibir('yellow', coins[2]);
    exibir('yellow', coins[3]);
    exibir('yellow', coins[4]);
    exibir('yellow', coins[5]);
    exibir('yellow', coins[6]);
    exibir('yellow', coins[7]);

    exibir('lawngreen', curaPowerUp[0]);
    exibir('lawngreen', curaPowerUp[1]);

    exibir('aqua', speedPowerUp);

    exibir('darkblue', finalPowerUp)
}

function exibir(cor, objeto) {
    ctx.fillStyle = cor;
    ctx.fillRect(objeto.x, objeto.y, objeto.size, objeto.size);
}

function gameLoop() {
    update()
    draw()
    requestAnimationFrame(gameLoop)
}

if (isColliding(player, coins[0])) {
    console.log(coins[0])
}

gameLoop()