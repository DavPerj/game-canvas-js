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

const coins = [
    {x: 50, y:300, size: 20, collected: false},
    {x: 430, y:40, size: 20, collected: false},
    {x: 380, y:550, size: 20, collected: false},
    {x: 680, y:300, size: 20, collected: false},
    {x: 270, y:180, size: 20, collected: false},
    {x: 210, y:420, size: 20, collected: false},
    {x: 530, y:180, size: 20, collected: false},
    {x: 570, y:420, size: 20, collected: false}
]

const curaPowerUp = {    
    x: 70,
    y: 530,
    size: 23, 
    collected: false
}


const speedPowerUp = {
    x: 670,
    y: 530, 
    size: 27, 
    collected: false
}

const sizePowerUp = {
    x: 670,
    y: 60,
    size: 20,
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

    coletaveis()

    powerUps()
}

function powerUps() {
    if (speedPowerUp.collected == true) {
        if (player.speed == 5) {
            player.speed = player.speed + 3
            console.log(player.speed)
        }
    }

    if (curaPowerUp.collected == true) {
        if (player.life < 3) {
            player.life++
        }
    }

    if (sizePowerUp.collected == true) {
        if (player.size == 40) {
            player.size = player.size + 15
        }
    }
}

function drawColetaveis() {
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].collected == false) {
            exibir("yellow", coins[i])
        }
    }

    if (speedPowerUp.collected == false) {
        exibir('aqua', speedPowerUp);
    }

    if (curaPowerUp.collected == false && player.life == 1) {
        exibir('forestgreen', curaPowerUp)
    }

    if (sizePowerUp.collected == false) {
        exibir('coral', sizePowerUp)
    }
}

function coletaveis() {
    for (let i = 0; i < coins.length; i++) {
        if (!coins[i].collected && isColliding(player, coins[i])) {
            coins[i].collected = true
        }
    }

    if (!curaPowerUp.collected && isColliding(player, curaPowerUp)) {
        curaPowerUp.collected = true
    }

    if (!speedPowerUp.collected && isColliding(player, speedPowerUp)) {
        speedPowerUp.collected = true
    }

    if (!sizePowerUp.collected && isColliding(player, sizePowerUp)) {
        sizePowerUp.collected = true
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rodarNaTela();
    drawColetaveis()

    ctx.textAlign = "center";
    ctx.fillText('Jogo do Davi', 40, 590, 200);
    ctx.fillStyle = "black";
    ctx.font = "Arial";
}

function rodarNaTela() {
    exibir('blue', player);
    exibir('red', enemy);

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

gameLoop()