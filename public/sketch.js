


let levelOne;
let waterTextureFloor;
let cardsFont;

let data;

let socket;

let backgroundOn = 0;

let yarn;

let boatModel;

let voiceAccel = 10;

boatSequence = false;

let textCount = 0;
let imgCount = 0;

let graveyard;
let waterTexture;
let boat;
let hotel;

let marina;

let inc = 0;

let imgArr;

let currentFrequency;

let audioContext;
let mic
let pitch;


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
    sphere(this.sphereRadius);
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

  yarn = loadStrings('text/yarn.txt');

  imgArr = [water, marina];

  cardsFont = loadFont('fonts/MagicCardsNormal.ttf');

  boatModel = loadModel('models/newBoat.obj');

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

  levelOne = new Level(10000, 10000, waterTextureFloor, waterTexture, 0);
  levelTwo = new Level(10000, 10000, boat, boat, 0);
  levelThree = new Level(7000, 7000, hotel, hotel, 0);

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

  // background(255);

  // console.log(rover.position.z);

  // if (textCount >= 42) {
  //   boatSequence = true;
  // }

  // rover.enableControl = false;

  rover.position.y = -400

  // displayBoatSequence();



  inc++;

  if (frameCount % 60 === 0) {
    textCount++;
  }

  // rover.position.y = -300;
  noStroke();

  if (boatSequence === false) {

    if (textCount < 17) {
      levelOne.display();
      levelOne.restrictMovement();
      imgCount = 0;
    } else if (textCount < 34) {
      levelTwo.display();
      levelTwo.restrictMovement();
      imgCount = 1;
    } else {
      levelThree.display();
      levelThree.restrictMovement();
    }

    push();
    texture(waterTexture);
    translate(0, -2000, 5200);
    box(1000 + inc, 5000 + inc, 1000);
    pop();

    // push();
    // stickDisplays();
    // stroke(255, 0, 0);
    // strokeWeight(3);
    // rect(-510, -60, 100, 100);
    // image(imgArr[imgCount], -510, -60, 100, 100);
    // translate(random(1, 5), random(1, 5), 0);
    // text(yarn[textCount], -400, 0);
    // pop();
  }

  increaseSpeed();
  voiceMove();

  if (keyIsDown(87)) {
    // console.log('x' + player1.position.x);
    // console.log('y' + player1.position.y);
    // console.log('z' + player1.position.z);

    data = {
      x: player1.position.x,
      y: player1.position.y,
      z: player1.position.z
    }

    socket.emit('playerMove', data);

  }






} //End Draw

function keyPressed() {
  waterTexture.loop();
  waterTextureFloor.loop();
  graveyard.loop();
  boat.loop();
  hotel.loop();




  // synth.triggerAttackRelease('C4', '8n');

}


function displayBoatSequence() {
  if (boatSequence === true) {

    push();
    if (backgroundOn) {
      background(255, 255, 255, 30);
    } else {
      background(0);
    }

    push();
    translate(0, -900, (rover.position.z + 2300));
    texture(hotel);
    rotateZ(frameCount / 10);
    sphere(20);
    translate(0, 150, 0);
    sphere(60);

    pop();

    push();
    translate(1500, -1500, 1300);
    texture(boat);
    for (let i = 0; i < 100; i++) {
      box(1000, 1000, 5000);
      translate(0, 0, 10000);
    }
    pop();

    push();
    translate(-1500, -1500, 1300);
    texture(boat);
    for (let i = 0; i < 100; i++) {
      box(1000, 1000, 5000);
      translate(0, 0, 10000);
    }
    pop();

    rotateX(radians(90));
    texture(waterTexture);
    push();
    translate(0, 20000, 2000);
    rotateY(inc / 100);
    rotateX(radians(90));
    texture(boat);
    scale(13.3);
    // model(boatModel);

    pop();
    for (let i = 0; i < 100; i++) {
      texture(waterTexture);
      box(2000, 200, 200);
      // push();
      // translate(0, 100, 100)
      // rotateX(radians(90));
      // plane(2000, 200);
      // pop();
      translate(0, 200, 0);
      texture(boat);
      translate(0, 0, -50);
      box(2000, 200, 200)
      translate(0, 0, 50);
      translate(0, 200, 0);

    }
    pop();


    push();

    pop();

    if (rover.position.x > 1000) {
      rover.position.x = -1000;
    }
    if (rover.position.x < -1000) {
      rover.position.x = 1000;
    }
    // if (rover.position.z > 5300) {
    //   rover.position.z = 0;
    // }
  }
}

function increaseSpeed() {
  if (frameCount % 60 === 0) {
    voiceAccel += 1;
  }

}

function stickDisplays() { //This code was lifted from the Mazerunner game example linked from the rovercam guthub page. This is used to create the static elements on the screen. 
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
}

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext, mic.stream, modelLoaded);
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      select('#result').html(frequency);
      currentFrequency = frequency;
      console.log(currentFrequency);
    } else {
      select('#result').html('No pitch detected');
    }
    getPitch();
  })
}

function voiceMove() {
  if (currentFrequency > 100 && currentFrequency < 300) {
    rover.position.z += voiceAccel;
  }
  if (currentFrequency < 100 && currentFrequency > 0) {
    rover.position.z -= voiceAccel;
  }
}