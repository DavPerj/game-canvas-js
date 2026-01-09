


let idade = 2
let nome = "Davi"
let ehMenino = true

let vetorNumber = [1,2,3,4]
let vetorString = ["Davi", "Lana", "Fabio", "Ana"]
vetorString.push("Daniel")
vetorString[1] = "Lanna"

let vetorBoolean = [true, false, true, false]


function soma(a, b) {
    return a + b;
}

// console.log(soma(1,2));
// console.log(idade);
// console.log(nome);

// console.log(vetorNumber[1]);
// console.log(vetorString);
// console.log(vetorBoolean[1]);

const playerOne = {
    speed: 2,
    x: 50,
    y: 50,
    size: 15,
    life: 3,
    lostLife: function() {
        this.life--
    },

    speedBoost: function() {
        this.speed = this.speed + 5;
    },
}

class Player {
    constructor(speed, size, x, y, life,) {
        this.speed = speed;
        this.size = size;
        this.x = x;
        this.y = y;
        this.life = life;
    }

    lostLife() {
        this.life--
    }

    speedBoost() {
        this.speed = this.speed + 5;
    }
}

const playerTwo = new Player(5, 15, 70, 50, 3);

// console.log('Antes: ', playerTwo, playerTwo.speed, playerTwo.life);
// console.log('Antes: ', playerOne.life, playerOne.speed);

playerTwo.lostLife();
playerTwo.speedBoost();


playerOne.speedBoost();
playerOne.lostLife();

// console.log('Depois: ', playerTwo, playerTwo.speed, playerTwo.life);
// console.log('Depois: ', playerOne.life, playerOne.speed);

const dicioStringString = {
    ['teclaA']: 'A',
    ['teclaB']: 'B'
}

const dicioStringNumber = {
    ['A']: 1,
    ['B']: 1
}

console.log(dicioStringString)
console.log(dicioStringString['teclaA'])
console.log(playerOne.x)
    
// console.log(soma)
// console.log(soma(1,2))