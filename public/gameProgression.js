// function gameProgression() {
//     if (levelCounter === -2) {
//         push();
//         stickDisplays();
//         background(0);
//         fill(255, 255, 0);
//         stroke(255, 0, 0);
//         text("PRESS P TO START", 0, 0);
//         pop();
//     }
//     if (levelCounter === -1) {
//         push();
//         stickDisplays();
//         background(0);
//         fill(0, 0, 255);
//         rect(0, -60, 600, 100);
//         fill(255, 255, 0);
//         stroke(255, 0, 0);
//         text("loading...", -50 + random(0, 10), 0 + random(0, 10));
//         text("play with headphones in a quiet room and with other people", -350, 30);
//         pop();

//         if (sectionOneVoice.isPlaying() === false) {
//             levelCounter++;
//         }

//     }
//     if (levelCounter === 0) {
//         bridgeLevel1.display();
//         if (rover.position.z > 40243) {
//             rover.position.z = 2547;
//             isFadingOut = true;
//             // if (fillInc === 255) {
//             // levelCounter++;
//             // }
//         }
//         if (rover.position.z < 2399) {
//             // rover.position.z = 40000;
//             isFadingOut = true;
//             // if (fillInc === 255) {
//             // levelCounter++;
//             // }
//         }
//     }
//     if (levelCounter === 1) {
//         skyLevel1.display();
//         if (rover.position.z > 40243) {
//             rover.position.z = 2547;
//             isFadingOut = true;
//             // if (fillInc === 255) {
//             // levelCounter++;
//             // }

//         }
//         if (rover.position.z < 2399) {
//             // rover.position.z = 40000;
//             isFadingOut = true;
//             // if (fillInc === 255) {
//             //     levelCounter++;
//             //     }
//         }
//     }

//     if (levelCounter >1) {
//         levelCounter = 0;
//     }
// }
