const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

let x = 0; // координата x нужна только для передвижения кораблика большого
let y = (canvas.height / 2) - 50; // координата y нужна как большому кораблю, так и для выстрела пули
let v = 55; // скорость для движения большого корабля
let dt = 0.1; // время для движения большого корабля ( для формулы нужна)

let vbox1 = 1.5;
let vbox3 = 3;

let predy = 0; // в данный момент бесполезна, но нужна была на моменте тестирования
let boxid = 2; // пытался реализовать выстрел разными пулями, служила для функции for, но реализация была слишком сложна и я решил забросить

let score1 = 0; // очки для рассчета поочередности злобных кораблей
let score = 0; // очки для рассчета вашего "счета", который вы набиваете за счет злобных кораблей

let kartinkaSizeY = 100; // размеры тут и снизу
let kartinkaSizeX = 100;

let box2 = ''; // тоже нужна была на моменте тестирования для реализации прошлого плана

let startplay;

let puls = 0;

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
let kartinka5 = () => {
  return context.drawImage(image2,box4.position.X,box4.position.Y,35,35);
}
let kartinka6 = () => {
  return context.drawImage(image2,box5.position.X,box5.position.Y,35,35);
}
let kartinka7 = () => {
  return context.drawImage(image2,box6.position.X,box6.position.Y,35,35);
}
let kartinka8 = () => {
  return context.drawImage(image2,box7.position.X,box7.position.Y,35,35);
}
let kartinka9 = () => {
  return context.drawImage(image2,box8.position.X,box8.position.Y,35,35);
}
let patron1 = () => {
  return context.drawImage(image5, 0, 460, 40, 40);
}
let patron2 = () => {
  return context.drawImage(image5, 20, 460, 40, 40);
}
let patron3 = () => {
  return context.drawImage(image5, 40, 460, 40, 40);
}
let pressingbutton = '';
let pressedKeys = {}
document.onkeydown = function(e) {

pressedKeys[e.code] = true

//выстрел!
  if (pressedKeys['Space']) {
    if (pressingbutton === '') {
    if (puls === 0) {
      soundLaser();
    box2.position.Y = y + 35;
    box2.position.X = 100;
    }
    if (puls === 1) {
      soundLaser();
    box4.position.Y = y + 35;
    box4.position.X = 100;
    }
    if (puls === 2) {
      soundLaser();
      box5.position.Y = y + 35;
      box5.position.X = 100;
    }
    // if (puls === 3) {
    //   soundLaser();
    //   box6.position.Y = y + 35;
    //   box6.position.X = 100;
    // }
    // if (puls === 4) {
    //   soundLaser();
    //   box7.position.Y = y + 35;
    //   box7.position.X = 100;
    // }
    // if (puls === 5) {
    //   soundLaser();
    //   box8.position.Y = y + 35;
    //   box8.position.X = 100;
    // }
    puls = puls + 1;
    if (puls === 4) {
      puls = 0;
    }
    if (puls === 3) {
      Reload(); 
    }
    pressingbutton = 'fire';
    
  }
} 
}



document.onkeyup = function(event) {
  pressingbutton = '';
pressedKeys[event.code] = false
}
// рандомное число, нужное для выхода злобных корабликов в разных местах
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}  

// код для реализации песенок

let audio = new Audio();
  audio.src = "pesnya.mp3";
function soundClick() {
  audio.play();
  audio.volume = 0.1;
}
function soundLaser() {
  let audio1 = new Audio();
  audio1.src = "laser.mp3";
  audio1.autoplay = true;
  audio1.volume = 0.1;
}
function Vzriv(){
  let audio2 = new Audio();
  audio2.src = "Vzriv.mp3";
  audio2.autoplay = true;
  audio2.volume = 0.2;
}

function Reload() {
  let audio3 = new Audio();
  audio3.src = 'reload.mp3';
  audio3.autoplay = true;
  audio3.volume = 0.15;
  audio3.playbackRate = 1.8;
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

let image5 = new Image();

image5.src = 'patron.png';

image.onload = () => {
  image2.onload = () => {
    image3.onload = () => {
      
    }
  }
}
image4.onload = () => {
    image5.onload = () =>{

    }
}
//движение кораблика и выстрел
const pressed = {};
document.addEventListener('keydown', function(event){
  pressed[event.code] = true;
})
document.addEventListener('keyup', function(event){
  pressed[event.code] = false;
  dt = 0.1;
})

// функция на которой все держится, но она не держится, если начать менять ее физику :)))
function tick() {
// setTimeout(function () {
  if (!(box1.position.X <= 100 && box3.position.X <= 100)) {
    requestAnimationFrame(tick);
  }
  
// },1000/144);

console.log(y);

if (score1 >= 35 && score1 < 65) {
  vbox1 = 2.1;
  vbox3 = 4;
}
if (score1 >= 65 && score1 < 90 ) {
  vbox1 = 3.2;
  vbox3 = 5.1;
}
if (score1 >= 90) {
  vbox1 = 4.3;
  vbox3 = 6.5;
}

if (pressed['ShiftLeft']) {
  dt = 0.2;
}

if (y >= v*dt && y < canvas.height - kartinkaSizeY) {
  if (pressed['KeyW']) {
    y = y - v*dt;
  }
  if (pressed['KeyS']) {
    y = y + v*dt;
  }
}

if (y <= v*dt) {
  if (pressed['KeyS']) {
    y = y + v*dt;
  }
}

if (y === canvas.height - kartinkaSizeY + 3.5 || y === canvas.height - kartinkaSizeY + 9) {
  if (pressed['KeyW']) {
    y = y - v*dt;
  }
}

if (pressedKeys['Space']) {
  if (pressingbutton !== 'fire') {
  pressingbutton = 'fire';
  if (puls === 0) {
    soundLaser();
  box2.position.Y = y + 35;
  box2.position.X = 100;
  }
  if (puls === 1) {
    soundLaser();
  box4.position.Y = y + 35;
  box4.position.X = 100;
  }
  if (puls === 2) {
    soundLaser();
    box5.position.Y = y + 35;
    box5.position.X = 100;
  }
  // if (puls === 3) {
  //   soundLaser();
  //   box6.position.Y = y + 35;
  //   box6.position.X = 100;
  // }
  // if (puls === 4) {
  //   soundLaser();
  //   box7.position.Y = y + 35;
  //   box7.position.X = 100;
  // }
  // if (puls === 5) {
  //   soundLaser();
  //   box8.position.Y = y + 35;
  //   box8.position.X = 100;
  // }
  puls = puls + 1;
  if (puls === 4) {
    puls = 0;
  }
  if (puls === 3) {
    Reload(); 
  }
  
}
} 

// requestAnimationFrame(tick);



context.clearRect(0, 0, canvas.width, canvas.height);

context.fillStyle = 'yellow';
context.font = '50px mono';
context.fillText(score, canvas.width/2-13, canvas.height);
pole1();
kartinka();
if (startplay === 1) {
if (box1.position.X <= 100) {
    GameOver(); 
    audio.pause();
    return 
}

if (box3.position.X <= 100) {
    GameOver();
    audio.pause();
    return 
}

if (box3.position.Y < 0 ){
        box3.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
}
if (box1.position.Y < 0) {
      box1.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
}

if (puls === 0) {
  patron1();
  patron2();
  patron3();
}
if (puls === 1) {
  patron1();
  patron2();
}
if (puls === 2) {
  patron1();
}
if (puls === 3) {
  context.font ='30px Exo-2';
  context.fillText('Reload',8,500);
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



// //box8
// if (box3.position.X + box3.width >= box8.position.X && box8.position.X + box8.width >= box3.position.X && box3.position.Y + box3.height >= box8.position.Y && box8.position.Y + box8.height >= box3.position.Y) {
//   context.clearRect(104,0, canvas.width, canvas.height );
//   box3.position.X = getRandomNumber(canvas.width,canvas.width);
//   box3.position.Y = -1000;
//   box8.position.X = 100000;
//   Vzriv();
//   score = score + 4;
//   score1 = score1 +1;
  
// }

// if (box1.position.X + box1.width >= box8.position.X && box8.position.X + box8.width >= box1.position.X && box1.position.Y + box1.height >= box8.position.Y && box8.position.Y + box8.height >= box1.position.Y) {
//   context.clearRect(104,0, canvas.width, canvas.height );
//   box1.position.X = getRandomNumber(canvas.width,canvas.width);
//   box1.position.Y = -1000;
//   box8.position.X = 100000;
//   Vzriv();
//   score = score + 1;
//   score1 = score1 +1;
  
// }

// //box7
// if (box3.position.X + box3.width >= box7.position.X && box7.position.X + box7.width >= box3.position.X && box3.position.Y + box3.height >= box7.position.Y && box7.position.Y + box7.height >= box3.position.Y) {
//   context.clearRect(104,0, canvas.width, canvas.height );
//   box3.position.X = getRandomNumber(canvas.width,canvas.width);
//   box3.position.Y = -1000;
//   box7.position.X = 100000;
//   Vzriv();
//   score = score + 4;
//   score1 = score1 +1;
  
// }

// if (box1.position.X + box1.width >= box7.position.X && box7.position.X + box7.width >= box1.position.X && box1.position.Y + box1.height >= box7.position.Y && box7.position.Y + box7.height >= box1.position.Y) {
//   context.clearRect(104,0, canvas.width, canvas.height );
//   box1.position.X = getRandomNumber(canvas.width,canvas.width);
//   box1.position.Y = -1000;
//   box7.position.X = 100000;
//   Vzriv();
//   score = score + 1;
//   score1 = score1 +1;
  
// }

// //box6
// if (box3.position.X + box3.width >= box6.position.X && box6.position.X + box6.width >= box3.position.X && box3.position.Y + box3.height >= box6.position.Y && box6.position.Y + box6.height >= box3.position.Y) {
//   context.clearRect(104,0, canvas.width, canvas.height );
//   box3.position.X = getRandomNumber(canvas.width,canvas.width);
//   box3.position.Y = -1000;
//   box6.position.X = 100000;
//   Vzriv();
//   score = score + 4;
//   score1 = score1 +1;
  
// }

// if (box1.position.X + box1.width >= box6.position.X && box6.position.X + box6.width >= box1.position.X && box1.position.Y + box1.height >= box6.position.Y && box6.position.Y + box6.height >= box1.position.Y) {
//   context.clearRect(104,0, canvas.width, canvas.height );
//   box1.position.X = getRandomNumber(canvas.width,canvas.width);
//   box1.position.Y = -1000;
//   box6.position.X = 100000;
//   Vzriv();
//   score = score + 1;
//   score1 = score1 +1;
  
// }
//box5
if (box3.position.X + box3.width >= box5.position.X && box5.position.X + box5.width >= box3.position.X && box3.position.Y + box3.height >= box5.position.Y && box5.position.Y + box5.height >= box3.position.Y) {
  context.clearRect(104,0, canvas.width, canvas.height );
  box3.position.X = getRandomNumber(canvas.width,canvas.width);
  box3.position.Y = -1000;
  box5.position.X = 100000;
  Vzriv();
  score = score + 4;
  score1 = score1 +1;
  
}

if (box1.position.X + box1.width >= box5.position.X && box5.position.X + box5.width >= box1.position.X && box1.position.Y + box1.height >= box5.position.Y && box5.position.Y + box5.height >= box1.position.Y) {
  context.clearRect(104,0, canvas.width, canvas.height );
  box1.position.X = getRandomNumber(canvas.width,canvas.width);
  box1.position.Y = -1000;
  box5.position.X = 100000;
  Vzriv();
  score = score + 1;
  score1 = score1 +1;
  
}
//box4
if (box3.position.X + box3.width >= box4.position.X && box4.position.X + box4.width >= box3.position.X && box3.position.Y + box3.height >= box4.position.Y && box4.position.Y + box4.height >= box3.position.Y) {
  context.clearRect(104,0, canvas.width, canvas.height );
  box3.position.X = getRandomNumber(canvas.width,canvas.width);
  box3.position.Y = -1000;
  box4.position.X = 100000;
  Vzriv();
  score = score + 4;
  score1 = score1 +1;
  
}

if (box1.position.X + box1.width >= box4.position.X && box4.position.X + box4.width >= box1.position.X && box1.position.Y + box1.height >= box4.position.Y && box4.position.Y + box4.height >= box1.position.Y) {
  context.clearRect(104,0, canvas.width, canvas.height );
  box1.position.X = getRandomNumber(canvas.width,canvas.width);
  box1.position.Y = -1000;
  box4.position.X = 100000;
  Vzriv();
  score = score + 1;
  score1 = score1 +1;
  
}
//box2
if (box3.position.X + box3.width >= box2.position.X && box2.position.X + box2.width >= box3.position.X && box3.position.Y + box3.height >= box2.position.Y && box2.position.Y + box2.height >= box3.position.Y) {
      context.clearRect(104,0, canvas.width, canvas.height );
      box3.position.X = getRandomNumber(canvas.width,canvas.width);
      box3.position.Y = -1000;
      box2.position.X = 100000;
      Vzriv();
      score = score + 4;
      score1 = score1 +1;
      
    }



if (box1.position.X + box1.width >= box2.position.X && box2.position.X + box2.width >= box1.position.X && box1.position.Y + box1.height >= box2.position.Y && box2.position.Y + box2.height >= box1.position.Y) {
      context.clearRect(104,0, canvas.width, canvas.height );
      box1.position.X = getRandomNumber(canvas.width,canvas.width);
      box1.position.Y = -1000;
      box2.position.X = 100000;
      Vzriv();
      score = score + 1;
      score1 = score1 +1;
      
    }


kartinka2();
kartinka5();
kartinka6();
box4.position.X = box4.position.X + 14;
box2.position.X = box2.position.X + 14;
box5.position.X = box5.position.X + 14;
// if (true) {
//     Object.keys(pressedKeys).forEach(key => {

        
//         if (key == 32) {
//             box4.position.X = box4.position.X + 14;
//             box2.position.X = box2.position.X + 14;
//             box5.position.X = box5.position.X + 14;
//             // box6.position.X = box6.position.X + 30;
//             // box7.position.X = box7.position.X + 30;
//             // box8.position.X = box8.position.X + 30;
//             kartinka2();
//             kartinka5();
//             kartinka6();
//             // kartinka7();
//             // kartinka8();
//             // kartinka9();
//         } 
        
//         });
//        }
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
      X: 1000,
      Y: 0
    },
    velocity: {
        X: 0,
        Y: 0
    },
    color: 'blue',
    hasKey: false
  })

   const box4 = new Box({
    position: {
      X: 1000,
      Y: 0
    },
    velocity: {
        X: 0,
        Y: 0
    },
    color: 'blue',
    hasKey: false
  })
  const box5 = new Box({
    position: {
      X: 1000,
      Y: 0
    },
    velocity: {
        X: 0,
        Y: 0
    },
    color: 'blue',
    hasKey: false
  })
  // const box6 = new Box({
  //   position: {
  //     X: 1000,
  //     Y: 0
  //   },
  //   velocity: {
  //       X: 0,
  //       Y: 0
  //   },
  //   color: 'blue',
  //   hasKey: false
  // })
  // const box7 = new Box({
  //   position: {
  //     X: 1000,
  //     Y: 0
  //   },
  //   velocity: {
  //       X: 0,
  //       Y: 0
  //   },
  //   color: 'blue',
  //   hasKey: false
  // })
  // const box8 = new Box({
  //   position: {
  //     X: 1000,
  //     Y: 0
  //   },
  //   velocity: {
  //       X: 0,
  //       Y: 0
  //   },
  //   color: 'blue',
  //   hasKey: false
  // })
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
