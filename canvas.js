let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");
let squareSize = 20;

function generateBackground() {
  for (let row = 0; row < canvas.height; row += squareSize * 2) {
    for (let col = 0; col < canvas.width; col += squareSize) {
      if ((row / squareSize + col / squareSize) % 2 === 0) {
        c.fillStyle = "#838E83";
      } else {
        c.fillStyle = "#B2BCAA";
      }

      c.fillRect(col, row, squareSize, squareSize);
    }
  }

  for (let row = 0; row < canvas.height; row += squareSize) {
    for (let col = 0; col < canvas.width; col += squareSize * 2) {
      if ((row / squareSize + col / squareSize) % 2 === 0) {
        c.fillStyle = "#838E83";
      } else {
        c.fillStyle = "#B2BCAA";
      }

      c.fillRect(col, row, squareSize, squareSize);
    }
  }
}

let png = new Image();
png.src = "pngtree-apple-fruit-cartoon-apple-cartoon-fruit-png-image_330305.png";
let pngX = 100;
let pngY = 100;
let pngWidth = 50;
let pngHeight = 50;

let x = 200;
let y = 200;
let speed = 5;
let radius = 30;

let keys = {};

let direction = "down";

window.addEventListener("keydown", function (event) {
  if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {
    event.preventDefault();
  }
  keys[event.key] = true;
});

window.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

let lastTime = performance.now();

function animate(time) {
  requestAnimationFrame(animate);

  let delta = (time - lastTime) / 1000;
  lastTime = time;

  c.clearRect(0, 0, innerWidth, innerHeight);
  generateBackground();

  let move = speed * delta * 60;

  if (keys["ArrowUp"] || keys["w"]) {
    y -= move;
    direction = "up";
  }
  if (keys["ArrowDown"] || keys["s"]) {
    y += move;
    direction = "down";
  }
  if (keys["ArrowLeft"] || keys["a"]) {
    x -= move;
    direction = "left";
  }
  if (keys["ArrowRight"] || keys["d"]) {
    x += move;
    direction = "right";
  }

  x = Math.max(radius, Math.min(innerWidth - radius, x));
  y = Math.max(radius, Math.min(innerHeight - radius, y));

  if (direction === "down") {
    drawCircle(x, y, 15);       
    drawCircle(x, y-20, 10);    
    drawCircle(x, y-45, 20);    
  
    drawLine(x, y, x-10, y+25); 
    drawLine(x, y, x+10, y+25);
  
    for (let i=-1; i<=1; i++) {
      drawLine(x, y-20, x-25, y-20 + i*10);
      drawLine(x, y-20, x+25, y-20 + i*10);
    }
  
  } else if (direction === "up") {
    drawCircle(x, y, 15);        
    drawCircle(x, y+20, 10);     
    drawCircle(x, y+45, 20);     
  
    drawLine(x, y, x-10, y-25);
    drawLine(x, y, x+10, y-25);
  
    for (let i=-1; i<=1; i++) {
      drawLine(x, y+20, x-25, y+20 + i*10);
      drawLine(x, y+20, x+25, y+20 + i*10);
    }
  
  } else if (direction === "right") {
    drawCircle(x, y, 15);        
    drawCircle(x-20, y, 10);     
    drawCircle(x-45, y, 20);     
  
    drawLine(x, y, x+25, y-10);
    drawLine(x, y, x+25, y+10);
  
    for (let i=-1; i<=1; i++) {
      drawLine(x-20, y, x-20 + i*10, y-25);
      drawLine(x-20, y, x-20 + i*10, y+25);
    }
  
  } else if (direction === "left") {
    drawCircle(x, y, 15);        
    drawCircle(x+20, y, 10);     
    drawCircle(x+45, y, 20);     
  
    drawLine(x, y, x-25, y-10);
    drawLine(x, y, x-25, y+10);
  
    for (let i=-1; i<=1; i++) {
      drawLine(x+20, y, x+20 + i*10, y-25);
      drawLine(x+20, y, x+20 + i*10, y+25);
    }
  }

  c.drawImage(png, pngX, pngY, pngWidth, pngHeight);
  
  if (checkCollision()) {
    pngX = Math.random() * (canvas.width - pngWidth);
    pngY = Math.random() * (canvas.height - pngHeight);
  }
}

function drawCircle(x, y, radius) {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = "#64403E";
  c.fillStyle = "#ed2424";
  c.stroke();
  c.fill();
}

function drawLine(x1, y1, x2, y2, color="#ed2424") {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.strokeStyle = color;
  c.lineWidth = 3;
  c.stroke();
  c.lineWidth = 1; 
}

function checkCollision() {
  let antRadius = 15;
  if (
    x + antRadius > pngX &&
    x - antRadius < pngX + pngWidth &&
    y + antRadius > pngY &&
    y - antRadius < pngY + pngHeight
  ) {
    return true;
  }
  return false;
}

animate(performance.now());
