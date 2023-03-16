class Editor
{
    constructor(x, y, sizeX, sizeY) {
        this.pos = new p5.Vector(x, y);
        this.size = new p5.Vector(sizeX, sizeY);
        this.state = 0; // 0 = idle | 1 = adding start of wall | 2 = adding end of wall | 3 = added wall
        this.objCoords = [new p5.Vector(0, 0), new p5.Vector(0, 0)];
        this.mouseButtonPressed = 0; // 0 = null | 1 = left
    }

    mousePressedEditor(button) {
        if (this.state == 0) {
            this.state++;
            this.objCoords[0].x = mouseX;
            this.objCoords[0].y = mouseY;
        }
        else if (this.state == 1) {
            this.state++;
            this.objCoords[1].x = mouseX;
            this.objCoords[1].y = mouseY;
        }
        else if (this.state == 2) {
            this.state = 0;
            this.objCoords[0].x = 0;
            this.objCoords[0].y = 0;
            this.objCoords[1].x = 0;
            this.objCoords[1].y = 0;
        }
        // console.log(this.state);
    }

    update() {
        if (this.state == 1) {
            strokeWeight(8);
            stroke(255);
            line(this.objCoords[0].x, this.objCoords[0].y, mouseX, mouseY);
            return null;
        }
        else if (this.state == 2) {
            this.state = 0;
            return this.objCoords;
        }
    }

}