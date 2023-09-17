const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

let x = 0; // координата x нужна только для передвижения кораблика большого
let y = (canvas.height / 2) - 50; // координата y нужна как большому кораблю, так и для выстрела пули
let v = 140; // скорость для движения большого корабля
let dt = 0.1; // время для движения большого корабля ( для формулы нужна)

let vbox1 = 3;
let vbox3 = 5;

let predy = 0; // в данный момент бесполезна, но нужна была на моменте тестирования
let boxid = 2; // пытался реализовать выстрел разными пулями, служила для функции for, но реализация была слишком сложна и я решил забросить

let score1 = 0; // очки для рассчета поочередности злобных кораблей
let score = 0; // очки для рассчета вашего "счета", который вы набиваете за счет злобных кораблей

let kartinkaSizeY = 100; // размеры тут и снизу
let kartinkaSizeX = 100;

let box2 = ''; // тоже нужна была на моменте тестирования для реализации прошлого плана

let startplay;

window.onkeydown = function(e) {
  return e.keyCode !== 32;
};

let starts = () => {
  var display = document.getElementById("Gamess").style.display;
 document.getElementById("dolit").style.display="none";
 startplay = 1;
}
requestAnimationFrame(tick);
// функция снизу это проигрыш, который реализуется в request..... когда злобный кораблик попадает на нашу "базу"
function GameOver () {  
  context.fillStyle = 'white';
  context.font = '50px Exo2';
  context.fillText('You Lose', canvas.width/2 - 70, canvas.height/2);
  
}
// функция для поля нашей базы
let pole1 = () => {
    context.beginPath();
    context.strokeStyle = 'white';
    context.moveTo(x + kartinkaSizeX, 0);
    context.lineTo(x + kartinkaSizeX, canvas.height);
    context.stroke();
}


// вызов картинки
let kartinka = () => {
    return context.drawImage(image,x,y,kartinkaSizeY,kartinkaSizeX);
}
let kartinka2 = () => {
  return context.drawImage(image2,box2.position.X,box2.position.Y,35,35);
}
let kartinka3 = () => {
  return context.drawImage(image3,box1.position.X,box1.position.Y,35,35); 
}
let kartinka4 = () => {
  return context.drawImage(image4,box3.position.X,box3.position.Y,35,35);
}
// это было чуточку украдено из интернета, потому что не было времени на создание собственной физики движения, но тут все понятно и логично, хотя некоторые моменты являются багнутыми, но они не мешают играть, если вы будете Играть, а не искать баги!
var pressedKeys = {}
document.onkeydown = function(e) {

pressedKeys[event.keyCode] = true

// тоже пробел )) и тоже выстрел!
Object.keys(pressedKeys).forEach(key => {

  if (!pressedKeys[key]) return
  if (key == 32) {
      soundLaser();
      box2.position.Y = y + 35;
      box2.position.X = 100;
  } 
  });
// ниже все связано с движением
if (y >= v*dt && y < canvas.height - kartinkaSizeY) {
    Object.keys(pressedKeys).forEach(key => {

        if (!pressedKeys[key]) return
        if (key == 83) y = y + v * dt;
        if (key == 87) y = y - v * dt;
        });
        }

if (y <= v*dt) {
    Object.keys(pressedKeys).forEach(key => {
        
        if (!pressedKeys[key]) return
        if (key == 83) y = y + v * dt;
        // if (key == 87) y = y - v * dt;
        });
        }

if (y === canvas.height - kartinkaSizeY + 10) {
    Object.keys(pressedKeys).forEach(key => {
                
        if (!pressedKeys[key]) return
        // if (key == 83) y = y + v * dt;
        if (key == 87) y = y - v * dt;
    });
    }
}

document.onkeyup = function(event) {
pressedKeys[event.keyCode] = false
}
// рандомное число, нужное для выхода злобных корабликов в разных местах
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}  

// код для реализации песенок
function soundClick() {
  let audio = new Audio();
  audio.src = "pesnya.mp3";
  audio.autoplay = true;
}
function soundLaser() {
  let audio1 = new Audio();
  audio1.src = "laser.mp3";
  audio1.autoplay = true;
}




// код ниже создает презагрузку картинок, чтобы "игра" работала :))
let image = new Image();

image.src = 'samolet.png';

let image2 = new Image();

image2.src = 'Pylya.png';

let image3 = new Image();

image3.src = 'Zloba1.png';

let image4 = new Image();

image4.src = 'Zloba2.png';

image.onload = () => {
  image2.onload = () => {
    image3.onload = () => {
      
    }
  }
}
image4.onload = () => {
    
}
// функция на которой все держится, но она не держится, если начать менять ее физику :)))
function tick() {
// setTimeout(function () {
//   if (!(box1.position.X <= 100 && box3.position.X <= 100)) {
//     requestAnimationFrame(tick);
//   }
  
// },1000/144);



requestAnimationFrame(tick);

console.log(y);

context.clearRect(0, 0, canvas.width, canvas.height);

context.fillStyle = 'yellow';
context.font = '50px mono';
context.fillText(score, canvas.width/2-13, canvas.height);
pole1();
kartinka();
if (startplay === 1) {
if (box1.position.X <= 100) {
   
    return GameOver();
}

if (box3.position.X <= 100) {
  
    return GameOver();
}
if (box3.position.Y < 0 ){
        box3.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
}
if (box1.position.Y < 0) {
      box1.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
}
kartinka3();
kartinka4();
box3.position.X = box3.position.X - vbox3;
box1.position.X = box1.position.X - vbox1;

if (box3.position.X + box3.width >= box1.position.X && box1.position.X + box1.width >= box3.position.X && box3.position.Y + box3.height >= box1.position.Y && box1.position.Y + box1.height >= box3.position.Y) {
  
  context.clearRect(104,0, canvas.width, canvas.height );
  box3.position.X = 1000;
  box3.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
  box1.position.X = 1000;
  box1.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
}
// box1.position.X = box1.position.X - vbox1;
// if (score1 % 7 === 0 && score1 !== 0 ) {
//     if (box3.position.Y < 0 ){
//       box3.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
//     }
//     kartinka4();
//     box3.position.X = box3.position.X - vbox3;
//     box1.position.X = getRandomNumber(canvas.width,canvas.width);
// }
// if (!(score1 % 7 === 0 && score1 !== 0)){
//     if (box1.position.Y < 0) {
//     box1.position.Y = getRandomNumber(0 + 50, canvas.height - 50)
//     }
//     kartinka3();
// }


if (box3.position.X + box3.width >= box2.position.X && box2.position.X + box2.width >= box3.position.X && box3.position.Y + box3.height >= box2.position.Y && box2.position.Y + box2.height >= box3.position.Y) {
      context.clearRect(104,0, canvas.width, canvas.height );
      box3.position.X = getRandomNumber(canvas.width,canvas.width);
      box3.position.Y = -1000;
      box2.position.X = 100000;
      score = score + 4;
      score1 = score1 +1;
    }



if (box1.position.X + box1.width >= box2.position.X && box2.position.X + box2.width >= box1.position.X && box1.position.Y + box1.height >= box2.position.Y && box2.position.Y + box2.height >= box1.position.Y) {
      context.clearRect(104,0, canvas.width, canvas.height );
      box1.position.X = getRandomNumber(canvas.width,canvas.width);
      box1.position.Y = -1000;
      box2.position.X = 100000;
      score = score + 1;
      score1 = score1 +1;
    }



if (true) {
    Object.keys(pressedKeys).forEach(key => {

        
        if (key == 32) {
            box2.position.X = box2.position.X + 30;
            kartinka2(); 
        } 
        
        });
       }
}
}



class Box {
    constructor({
      position = { X: 0, Y: 0 },
      color = 'red',
      width = 35,
      height = 35,
      velocity = { X: 0, Y: 0 },
      hasKey = false 
    }) {
      this.position = position
      this.width = width
      this.height = height
      this.color = color
      this.velocity = velocity
      this.hasKey = hasKey
    }
  
   

    draw() {
      context.strokeStyle = this.color
      context.strokeRect(this.position.X, this.position.Y, this.width, this.height)
    }
  
   
  }
  


  const box3 = new Box({
    position: {
      X: 1000,
      Y: -1000
    },
    velocity: {
        X: 0,
        Y: 0
    },
    color: 'cyan'
  })



  box2 = new Box({
    position: {
      X: 100,
      Y: 0
    },
    velocity: {
        X: 0,
        Y: 0
    },
    color: 'blue',
    hasKey: false
  })



  const box1 = new Box({
    position: {
      X: 1000,
      Y: -1000
    },
    velocity: {
        X: 0,
        Y: 0
    },
    color: 'red'
  })
  

  
  // instantiate box with right offset
//   const box2 = new Box({
//     position: {
//       X: 100,
//       Y: 100
//     },
//     color: 'blue'
//   })
  
  // add gray background
//   c.fillStyle = 'rgb(39,39,42)'
//   c.fillRect(0, 0, canvas.width, canvas.height)
  
  // draw boxes
 
