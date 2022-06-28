class Wall
{
    constructor(x1, y1, x2, y2)
    {
        this.a = new p5.Vector(x1, y1);
        this.b = new p5.Vector(x2, y2);
    }

    show()
    {
        stroke(255);
        line(this.a.x, this.a.y, this.b.x, this.b.y)
    }
}