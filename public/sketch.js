let fillAlpha = 0;
let fadeSpeed = 5;
let isFadingOut = false;
let isFadingIn = false;

let textX = 1920;
let textY = 1030;

let levelOne;
let waterTextureFloor;
let cardsFont;

let otherPlayerPosition;

let data;

let mapSprite;

let hallway1;
let hallway2;
let caveLevel;

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

let lapis;

let portrait;
let faceTexture;

let marina;

let inc = 0;

let imgArr;

let gameFullImg;

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
  faceTexture = loadImage('img/faceTexture2.png');
  gameFullImg = loadImage('img/gameFull.jpg');
  portrait = loadImage('img/playerPortrait.png');
  lapis = loadImage('img/lapis.png');

  yarn = loadStrings('text/yarn.txt');

  imgArr = [water, marina];

  cardsFont = loadFont('fonts/MagicCardsNormal.ttf');
  boatModel = loadModel('models/newBoatSmaller.obj');
  playerHorrible = loadModel('models/bodyModel2.obj');
  moonModel = loadModel('models/moon.obj');
}

//reduce boat



function setup() {    //Begin setup
  createCanvas(1920, 1080, WEBGL);
  textureWrap(REPEAT, CLAMP);
  rover = createRoverCam();
  // rover.usePointerLock();
  rover.setState({
    position: [-300, -400, -200],
    rotation: [1.56, 0, 0],
    sensitivity: 0.03,
    fov: 0.8,
    // speed: 8.6 //Game speed
    speed: 60 //testing speed
  });

  rover.position.z = 3527;

  setAttributes('perPixelLighting', false);
  socket = io.connect('https://remake-2.onrender.com/');

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
  bridgeLevel2 = new bridgeLevel();
  skyLevel1 = new skyLevel();

  hallway1 = new Hallway(0, -100, 15000, 100);
  hallway2 = new Hallway(0, -100, 35000, 100);

  caveLevel = new CaveLevel(-31000, 0, 15000, 20000);

  player1 = new PlayerModel(rover.position.x, rover.position.y, rover.position.z - 100);

  fill(255);
  textFont(cardsFont);
  textSize(50);

  rover.position.y = -700;

  frameRate(20);

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

  // rover.position.y = -700;

  inc++;

  if (frameCount % 60 === 0) {
    textCount++;
  }

  noStroke();
  getMovement();
  textureSwitch();

  if (gameIsFull === false) {
    if (levelCounter === 0) {
      bridgeLevel1.display();
    }
    if (levelCounter === 1) {
      skyLevel1.display();
    }
  }

  displayMap();

  player2Model();

  displayPlayerPortrait();
  gameFullMsg();

  // push();
  // translate(0, 0, 0);
  // texture(water);
  // sphere(10000);
  // pop();

  if (levelCounter === 3) {
    caveLevel.display();
  }

  if (levelCounter === 0 || levelCounter === 3) {
    hallway1.display();

  }
  if (levelCounter === 1 || levelCounter === 3) {
    hallway2.display();
  }

  if (levelCounter === 0) {
    if (rover.position.x < -19500) {
      rover.position.x = -22500;
    }
  }

  makeWalls();

  if (levelCounter === 3) {
    caveLevel.display();
  }

  displayWhiteSquare();
  scrollingText();

} //End Draw


function makeWalls() {

  if (levelCounter === 0) {
    if (rover.position.z < 13975 || rover.position.z > 16081) {
      if (rover.position.x > 1000) {
        rover.position.x = 1000;
      }
      if (rover.position.x < -1000) {
        rover.position.x = -1000;
      }
    }
  }


  if (levelCounter === 1) {
    if (rover.position.z > 35900 || rover.position.z < 33100) {
      if (rover.position.x > 1000) {
        rover.position.x = 1000;
      }
      if (rover.position.x < -1000) {
        rover.position.x = -1000;
      }
    }
  }

  if (levelCounter === 0) {
    if (rover.position.z > 13795 && rover.position.z < 16084) {
      if (rover.position.x < -4000) {

        // if (rover.position.z > 15083) {
        //   rover.position.z = 15083;
        // }
        // if (rover.position.z < 12790) {
        //   rover.position.z = 13790;
        // }
        rover.position.z = 15000;
      }
    }
  }

  if (levelCounter === 1) {
    if (rover.position.z > 33000 && rover.position.z < 36000) {
      if (rover.position.x < -1000) {

        // if (rover.position.z > 15083) {
        //   rover.position.z = 15083;
        // }
        // if (rover.position.z < 12790) {
        //   rover.position.z = 13790;
        // }
        rover.position.z = 35000;
      }
    }
  }

  if (rover.position.x < -20000) {
    levelCounter = 3;
  }

}


function displayMap() {
  push();
  playerMapX = map(rover.position.x, -1000, 1000, 10, 90);
  playerMapZ = map(rover.position.z, -200, 40589, 0, 400);
  if (otherPlayerPosition) {
    player2MapX = map(otherPlayerPosition.x, -1000, 1000, 10, 90);
    player2MapZ = map(otherPlayerPosition.z, -200, 40589, 0, 400);
  }
  stickDisplays();
  translate(0, -30, 0);
  fill(0, 0, 0, 50);
  rect(400, 100, 100, 400);
  push();
  fill(0, 255, 255);
  translate(-playerMapX, -playerMapZ, 0);
  image(mapSprite, 490, 490, 20, 20);
  pop();
  push();
  fill(255, 0, 255);
  if (otherPlayerPosition) {
    translate(-player2MapX, -player2MapZ, 0);
    image(mapSprite, 490, 490, 20, 20);
  }
  pop();
  pop();

}

function scrollingText() {

  if (textX > -700) {
    textX -= 5;
  } else {
    textX = 2000;
  }

  push();
  stickDisplays();
  translate(-width / 2, -height / 2, 0);
  fill(255, 120);
  rect(0, 980, 1920, 90);
  fill(255, 0, 0, 200);
  text("Day 1: Shortcut the oracle...", textX, textY);
  pop();
}

function gameFullMsg() {
  if (gameIsFull === true) {
    push();
    stickDisplays();
    fill(255);
    rect(0, 0, 1920, 1080);
    fill(255, 0, 0);
    image(gameFullImg, 100, 280, 750, 200);
    text("the server is full. ", 100, 100);
    text("you need to rest and try again later x", 100, 200);
    pop();
  }
}

function displayPlayerPortrait() {
  push();
  stickDisplays();
  tint(255, 255, 0, 150);
  image(portrait, -950, -530, 100, 100);
  pop();
}


function displayWhiteSquare() {

  if (rover.position.z < 2399 || rover.position.z > 40589) {
    isFadingOut = true;
    rover.enableControl = false;
  }

  if (isFadingOut) {
    fillAlpha += fadeSpeed;
  }

  if (fillAlpha >= 255 && isFadingOut) {
    isFadingIn = true;
    isFadingOut = false;
    levelCounter++
  }

  if (isFadingIn) {
    if (rover.position.z < 2399) {
      rover.position.z = 40000
    } else if (rover.position.z > 40589) {
      rover.position.z = 2500
    }
    fillAlpha -= fadeSpeed;
    rover.enableControl = true;
  }

  if (fillAlpha <= 0 && isFadingIn) {
    isFadingIn = false;
  }

  push();
  stickDisplays();
  fill(255, fillAlpha);
  rect(-1000, -630, 2920, 2080);
  pop();

  if (levelCounter === 2) {
    levelCounter = 0;
  }
}


function player2Model() {
  if (otherPlayerPosition) {

    let mapX = map(otherPlayerPosition.x, 1000, -1000, -78, -400);

    push();

    // Calculate the angle between the camera and the model
    const angle = atan2(rover.position.x - otherPlayerPosition.x, rover.position.z - otherPlayerPosition.z);

    // Translate and rotate the model
    translate(otherPlayerPosition.x, otherPlayerPosition.y + 660, otherPlayerPosition.z);
    rotateY(angle + PI);

    texture(faceTexture);
    push();
    scale(6);
    rotateX(radians(180));

    model(playerHorrible);

    pop();
    pop();
  }
}

function bgFade() {
  background(lerpColor(bgStart, bgEnd, colAmount))

  if (colAmount < 1) {
    colAmount += 0.001;
  } else {
    colAmount = 0;
  }
}

function getMovement() {
  if (keyIsDown(68) || keyIsDown(65) || keyIsDown(87) || keyIsDown(83)) {
    data = {
      x: rover.position.x,
      y: rover.position.y,
      z: rover.position.z
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
  fire.speed(0.2);
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

