class Wall
{
    constructor(x1, y1, x2, y2)
    {
        this.a = new p5.Vector(x1, y1);
        this.b = new p5.Vector(x2, y2);
        this.color = {
            r: 255,
            g: 255,
            b: 255,
        };
        this.height = 200;
        this.id = "0";
    }

    setCoords(x1, y1, x2, y2) {
        this.a.x = x1;
        this.a.y = y1;
        this.b.x = x2;
        this.b.y = y2;
    }

    setColor(r, g, b) {
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }

    setColorByHex(hex) {
        const r = parseInt(hex.substr(1,2), 16)
        const g = parseInt(hex.substr(3,2), 16)
        const b = parseInt(hex.substr(5,2), 16)
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }

    setHeight(h) {
        this.height = h;
    }

    setId(id) {
        this.id = id;
    }

    show()
    {
        strokeWeight(8);
        stroke(this.color.r, this.color.g, this.color.b);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        fill(0);
        text(this.id, (this.a.x + this.b.x)/2, (this.a.y + this.b.y)/2);
    }
}