const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    speed: 5,
    size: 40,
    x: 50,
    y: 50,
    life: 2,
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

    if (curaPowerUp[0].collected == true) {
        if (player.life == 3) {
            player.life++
            console.log(player.life)
        }
    }

    if (curaPowerUp[1].collected == true) {
        if (player.life == 4) {
            player.life++
            console.log(player.life)
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

        if (player.life < 3) {
            if (curaPowerUp[0].collected == false) {
                exibir('lawngreen', curaPowerUp[0]);
            }
    
            if (curaPowerUp[1].collected == true) {
                return;
            }
    
            if (curaPowerUp[0].collected == true) {
                exibir('lawngreen', curaPowerUp[1])
            }
        }
}

function coletaveis() {
    for (let i = 0; i < coins.length; i++) {
        if (!coins[i].collected && isColliding(player, coins[i])) {
            coins[i].collected = true
        }
    }

    for (let i = 0; i < curaPowerUp.length; i++) {
        if (!curaPowerUp[i].collected && isColliding(player, curaPowerUp[i])) {
            curaPowerUp[i].collected = true
        }
    }

    if (!speedPowerUp.collected && isColliding(player, speedPowerUp)) {
        speedPowerUp.collected = true
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