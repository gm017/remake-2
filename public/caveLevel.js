class CaveLevel {
    constructor(x, y, z, width) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
    }
    display() {
        push();
        texture(lapis);
        translate(this.x, this.y, this.z);
        box(this.width, 10, this.width);
        pop();
    }
}