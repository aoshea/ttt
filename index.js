// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

appDiv.appendChild(canvas);

class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Camera {
  constructor(vw, vh) {
    this.x = this.tx = 0;
    this.y = this.ty = 0;
    this.vw = vw;
    this.vh = vh;
  }
  update(target) {
    this.tx += (target.x - this.tx) * 0.5;
    this.ty += (target.y - this.ty) * 0.5;
    this.x = this.tx - this.vw * 0.5;
    this.y = this.ty - this.vh * 0.5;
  }
}

const VW = 300;
const VH = 200;

let cam;
let player;
let vx = 0;
let ax = 0.1;

init();

function update() {
  vx += ax;
  player.x += Math.sin(vx);
  cam.update(player);
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, VW, VH);
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x - cam.x, player.y - cam.y, 5, 5);
}

function tick() {
  update();
  draw();
  requestAnimationFrame(tick);
}

function init() {
  cam = new Camera(VW, VH);
  player = new Entity(0, 0);

  tick();
}
