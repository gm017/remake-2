let levelOne;
let waterTextureFloor;
let cardsFont;

let otherPlayerPosition;

let data;

let mapSprite;

let socket;

let backgroundOn = 0;

let yarn;

let gameIsFull = false;

let bgStart;
let bgEnd;

let colAmount;

let bothWaters;

let boatModel;

let voiceAccel = 10;

let levelCounter = 0;

boatSequence = true;

let textCount = 0;
let imgCount = 0;

let graveyard;
let waterTexture;
let boat;
let hotel;
let fire;
let bubbles;

let marina;

let inc = 0;

let imgArr;

let currentFrequency;

let audioContext;
let mic
let pitch;

let playerMapX;
let playerMapZ;

let player2MapX;
let player2MapZ;



class PlayerModel {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.sphereRadius = 3;
  }
  display() {
    // Update the position of the sphere to match the camera
    this.position.x = rover.position.x;
    this.position.y = rover.position.y - 5;
    this.position.z = rover.position.z;

    // Draw the sphere at the updated position
    push();
    translate(this.position.x, this.position.y, this.position.z);
    // sphere(this.sphereRadius);
    pop();
  }
}

function preload() {
  water = loadImage("img/water.png");
  marina = loadImage("img/marina.jpg");
  hotel = createVideo('vid/hotel.mp4');
  waterTexture = createVideo('vid/water2.mp4');
  waterTextureFloor = createVideo('vid/water.mp4');
  graveyard = createVideo('vid/graveyard.mp4');
  boat = createVideo('vid/boat.mp4');
  boat.hide();
  waterTexture.hide();
  waterTextureFloor.hide();
  graveyard.hide();
  hotel.hide();
  fire = createVideo('vid/fire.mp4');
  fire.hide();
  bubbles = createVideo('vid/bubbles.mp4');
  bubbles.hide();
  mapSprite = loadImage('img/mapSprite.png');



  yarn = loadStrings('text/yarn.txt');
  imgArr = [water, marina];
  cardsFont = loadFont('fonts/MagicCardsNormal.ttf');
  boatModel = loadModel('models/newBoat.obj');
  playerHorrible = loadModel('models/playerHorrible.obj');

  moonModel = loadModel('models/moon.obj');
}


function setup() {    //Begin setup
  createCanvas(1920, 1080, WEBGL);
  textureWrap(REPEAT, CLAMP);
  rover = createRoverCam();
  rover.usePointerLock();
  rover.setState({
    position: [-300, -400, -200],
    rotation: [1.56, 0, 0],
    sensitivity: 0.1,
    speed: 5.6 //Game speed
    // speed: 30 //testing speed
  });


  socket = io.connect('http://localhost:3000');

  socket.on('playerMove', function (data) {
    otherPlayerPosition = data;
  });

  socket.on('gameFull', () => {
    gameIsFull = true;
  });

  waterSwitch = 0;
  bothWaters = waterTexture;

  bgStart = color(0, 0, 0);
  bgEnd = color(221, 242, 191);

  colAmount = 0;

  bridgeLevel1 = new bridgeLevel();
  skyLevel1 = new skyLevel();

  player1 = new PlayerModel(rover.position.x, rover.position.y, rover.position.z - 100);

  fill(255);
  textFont(cardsFont);
  textSize(50);

  rover.position.y = -700;


} // Begin draw



function draw() { //Begin draw

  player1.display();


  if (frameCount % 60 === 0) {
    if (backgroundOn === 0) {
      backgroundOn = 1;
    } else if (backgroundOn === 1) {
      backgroundOn = 0;
    }
  }

  rover.position.y = -400

  inc++;

  if (frameCount % 60 === 0) {
    textCount++;
  }

  noStroke();
  getMovement();
  textureSwitch();

  if (gameIsFull === false) {
    gameProgression();
  }

  push();
  playerMapX = map(rover.position.x, -1000, 1000, 10, 90);
  playerMapZ = map(rover.position.z, -200, 40589, 0, 400);
  if (otherPlayerPosition) {
    player2MapX = map(otherPlayerPosition.x, -1000, 1000, 10, 90);
    player2MapZ = map(otherPlayerPosition.z, -200, 40589, 0, 400);
  }
  stickDisplays();
  fill(0, 0, 0, 50);
  rect(400, 100, 100, 400);
  push();
  fill(0, 255, 255);
  translate(-playerMapX, -playerMapZ, 0);
  image(mapSprite, 490, 490, 20, 20);
  // ellipse(500, 490, 20);
  pop();
  push();
  fill(255, 0, 255);
  if (otherPlayerPosition) {
    translate(-player2MapX, -player2MapZ, 0);
    ellipse(500, 490, 20);
  }
  pop();
  pop();

  if (keyIsDown(32)) {
    rover.enableControl = false;
  } else {
    rover.enableControl = true;
  }

  if (gameIsFull === true) {
    push();
    stickDisplays();
    fill(255);
    rect(0, 0, 1920, 1080);
    fill(255, 0, 0);
    text("the server is full. ", 100, 100);
    text("you need to rest and try again later x", 100, 200);
    pop();
  }


  if (otherPlayerPosition) {
    push();
    translate(otherPlayerPosition.x, otherPlayerPosition.y, otherPlayerPosition.z);
    scale(100);
    texture(fire);
    model(playerHorrible)
    pop();
  }


} //End Draw


function bgFade() {
  background(lerpColor(bgStart, bgEnd, colAmount))

  if (colAmount < 1) {
    colAmount += 0.001;
  } else {
    colAmount = 0;
  }
}

function getMovement() {
  if (keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68)) {
    data = {
      x: player1.position.x,
      y: player1.position.y,
      z: player1.position.z
    }
    socket.emit('playerMove', data);
  }
}

function keyPressed() {
  waterTexture.loop();
  waterTextureFloor.loop();
  graveyard.loop();
  boat.loop();
  hotel.loop();
  hotel.volume(0.0);
  fire.loop();
  bubbles.loop();
}


function textureSwitch() {
  if (frameCount % 60 === 0) {
    if (waterSwitch === 0) {
      waterSwitch = 1;
    } else if (waterSwitch === 1) {
      waterSwitch = 0;
    }
  }
  if (waterSwitch === 0) {
    bothWaters = water;
  }
  if (waterSwitch === 1) {
    bothWaters = waterTexture;
  }

}

function stickDisplays() { //This code was lifted from the Mazerunner game example linked from the rovercam guthub page. This is used to create the static elements on the screen. 
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
}

