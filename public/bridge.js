class Bridge {
    constructor(x, y, z, width) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
    }
    display() {
        push();
        fill(255, 0, 0);
        translate(this.x - 11000, this.y, this.z);
        box(20000, 10, 1900);
        pop();
        push();
        fill(255, 0, 0);
        translate(this.x - 11000, this.y - 2000, this.z);
        box(20000, 10, 1900);
        pop();
    }
}