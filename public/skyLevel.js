class skyLevel {
    constructor(plankTexture1, plankTexture2, seaTexture, archTexture) {
        this.plankTexture1 = plankTexture1;
        this.plankTexture2 = plankTexture2;
        this.seaTexture = seaTexture;
        this.archTexture = archTexture;
    }
    display() {
        push();

        bgFade();

        push();
        translate(1500, -1500, 1300);
        texture(fire);
        for (let i = 0; i < 5; i++) {
            box(500, 5000, 500);
            translate(0, 0, 10000);
        }
        pop();

        push();
        translate(-1500, -1500, 1300);
        texture(fire);
        for (let i = 0; i < 5; i++) {
            box(500, 5000, 500);
            translate(0, 0, 10000);
        }
        pop();

        push();
        translate(0, -2500, 1300);
        texture(fire);
        for (let i = 0; i < 5; i++) {
            box(5000, 250, 250);
            translate(0, 0, 10000);
        }
        pop();

        rotateX(radians(90));
        texture(fire);

        push();
        translate(6000, (rover.position.z + 5000), 200);
        // rotateY(inc / 100);
        rotateX(radians(180));
        rotateZ(radians(90));
        rotateY(radians(210));
        texture(bubbles);
        scale(6.3);
        model(boatModel);
        pop();

        push();
        translate(-4500, (rover.position.z + 9000), 4000);
        rotateY(inc / 100);
        rotateZ(inc / 102);
        rotateX(inc / 52);
        rotateX(radians(180));
        // rotateZ(radians(90));
        texture(bubbles);
        scale(16.3);
        model(moonModel);
        pop();


        for (let i = 0; i < 104; i++) {
            texture(waterTexture);
            push();
            fill(255, 0, 0);
            texture(bubbles);
            plane(17000, 400);
            pop();
            box(2000, 200, 200);
            translate(0, 200, 0);
            texture(boat);
            translate(0, 0, -50);
            box(2000, 200, 200)
            translate(0, 0, 50);
            translate(0, 200, 0);
        }
        pop();

        push();
        translate(0, -1250, (11200 * 4 - 3600));
        texture(bubbles);
        box(2450, 2300, 10);
        translate(0, 0, -30);
        fill(255, 0, 255, 90);
        box(2450, 2300, 10);
        pop();


        push();
        translate(0, -1250, 11200);
        fill(0, 0, 255, 90);
        box(2450, 2300, 10);
        pop();

        push();
        translate(0, -1250, (11200 * 4 - 3600));
        texture(bubbles);
        box(2450, 2300, 10);
        translate(0, 0, -30);
        fill(255, 0, 255, 90);
        box(2450, 2300, 10);
        pop();

        push();
        translate(0, -1250, 1400);
        texture(bubbles);
        box(2450, 2300, 10);
        translate(0, 0, -30);
        fill(255, 0, 255, 90);
        box(2450, 2300, 10);
        pop();

        // if (rover.position.x > 1000) {
        //     rover.position.x = 1000;
        // }
        // if (rover.position.x < -1000) {
        //     rover.position.x = -1000;
        // }

        // if (rover.position.z > 10319) {
        //     rover.position.z = 0;
        // }
    }
}
