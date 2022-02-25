class Led {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = random(50, 250);
    this.g = random(50, 250);
    this.b = random(50, 250);
  }

  setColour(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  display() {
    push();
    translate(this.x * scale, this.y * scale, this.z * scale);
    noStroke();
    fill(this.r, this.g, this.b);
    sphere(5, 3, 3);
    pop();
  }
}

let socket;
let ledJson = {};
let leds = [];
let scale = 300;

function preload() {
  ledJson = loadJSON("rotated2.json");
}

function loadLeds() {
  let ledData = ledJson.leds;
  for (let i = 0; i < ledData.length; i++) {
    let led = ledData[i];
    let x = led.X;
    let y = led.Y;
    let z = led.Z;
    leds.push(new Led(x, y, z));
  }
}

function newColours(data) {
  let ledColours = data.map;
  for (let i = 0; i < ledColours.length; i++) {
    leds[i].setColour(ledColours[i]);
  }
}

function setup() {
  createCanvas(800, 600, WEBGL);
  loadLeds();
  socket = io.connect("http://localhost:8000");
  socket.on("message", newColours);
}

function draw() {
  background(0);
  rotateY(frameCount * 0.01);
  orbitControl();

  for (let i = 0; i < leds.length; i++) {
    leds[i].display();
  }
}
