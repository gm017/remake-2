class CaveLevel {
    constructor(x, y, z, width) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
    }
    display() {

        background(91, 88, 187);

        push();
        texture(lapis);
        translate(this.x, this.y, this.z);
        box(this.width, 10, this.width);
        pop();
        push();
        texture(lapis);
        translate(this.x, this.y - 2000, this.z);
        rotateY(radians(180));
        box(this.width, 10, this.width * 2);
        pop();
        push();
        texture(lapis);
        translate(this.x, this.y - 1000, this.width + 5000);
        rotateX(radians(180));
        box(this.width, 2000, 10);
        pop();
        push();
        texture(lapis);
        translate(this.x, this.y - 1000, this.width - 15000);
        rotateX(radians(180));
        box(this.width, 2000, 10);
        pop();

        push();
        texture(lapis);
        translate(this.x - 10000, this.y - 1000, this.width - 5000);
        rotateX(radians(180));
        rotateY(radians(90));
        box(this.width, 2000, 10);
        pop();

        push();
        texture(lapis);
        translate(this.x + 10000, this.y - 1000, this.width - 5000);
        rotateX(radians(180));
        rotateY(radians(90));
        box(this.width, 2000, 10);
        pop();

        if (rover.position.x > -22000) {
            rover.position.x = -22000;
        }
        if (rover.position.x < -40000) {
            rover.position.x = -40000;
        }

        if (rover.position.z < 5600) {
            rover.position.z = 5600;
        }

        if (rover.position.z > 23785) {
            rover.position.z = 23785;
        }


        //restrict

        // x -21000
        //x - 40000

        //z 5600
        // 24785


    }
}