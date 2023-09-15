const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

let x = 0;
let y = (canvas.height / 2) - 50;
let v = 80;
let dt = 0.1;
let lox = 0;


let kartinkaSizeY = 100;
let kartinkaSizeX = 100;

let box2 = '';

// document.addEventListener('keydown', function(event) {
//     if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
//       box1.draw();
//     }
//   });

let pole1 = () => {
    context.beginPath();
    context.strokeStyle = 'black';
    context.moveTo(x + kartinkaSizeX, 0);
    context.lineTo(x + kartinkaSizeX, canvas.height);
    context.stroke();
}

let kartinka = () => {
    return context.drawImage(image,x,y,kartinkaSizeY,kartinkaSizeX);
}


var pressedKeys = {}
document.onkeydown = function(e) {
    Object.keys(pressedKeys).forEach(key => {

        // if (pressedKeys[key]) return
        if (key == 32) {
            box2.position.X = 100;
        } 
        });
pressedKeys[event.keyCode] = true

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

if (y === canvas.height - kartinkaSizeY) {
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

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}  

getRandomNumber(100,200);

const image = new Image();

image.src = 'test.png';

image.onload = () => {
requestAnimationFrame(tick);
}

function tick() {
requestAnimationFrame(tick,);
context.clearRect(0, 0, canvas.width, canvas.height);


console.log(lox);
// box1.draw()
if (box1.position.X <= 100) {
    box1.position.X = getRandomNumber(canvas.width,canvas.width -50);
    box1.position.Y = getRandomNumber(0 + 50, canvas.height - 50);
}

box1.position.X = box1.position.X - 3,5;

box1.draw();

box2.position.Y = y+35;

pole1();
kartinka();

if (true) {
    Object.keys(pressedKeys).forEach(key => {

        // if (pressedKeys[key]) return
        if (key == 32) {
            box2.position.X = box2.position.X + 2;
            box2.draw();
        } 
        });
        }
}

class Box {
    constructor({
      position = { X: 0, Y: 0 },
      color = 'red',
      width = 35,
      height = 35,
      velocity = { X: 0, Y: 0 }
    }) {
      this.position = position
      this.width = width
      this.height = height
      this.color = color
      this.velocity = velocity
    }
  
   

    draw() {
      context.strokeStyle = this.color
      context.strokeRect(this.position.X, this.position.Y, this.width, this.height)
    }
  
    update() {
      this.position.X += this.velocity.X
      this.position.Y += this.velocity.Y
    }
  }
  
  box2 = new Box({
    position: {
      X: 100,
      Y: lox
    },
    velocity: {
        X: 0,
        Y: 0
    },
    color: 'blue'
  })

  const box1 = new Box({
    position: {
      X: getRandomNumber(canvas.width,canvas.width -50),
      Y: getRandomNumber(0 + 50, canvas.height - 50)
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
 