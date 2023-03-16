class Ray
{
    constructor(angle, index)
    {
        this.angle = radians(angle);

        this.index = index;

        this.pos = new p5.Vector(0, 0);
        this.dir = new p5.Vector(cos(this.angle), sin(this.angle));
    }

    t_f(x1, x2, x3, x4, y1, y2, y3, y4)
    {
        return ((x1 - x3) * (y3 - y4) - (x3 - x4) * (y1 - y3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    }

    u_f(x1, x2, x3, x4, y1, y2, y3, y4)
    {
        return ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    }

    cast(wall)
    {
        this.x1 = this.pos.x;
        this.y1 = this.pos.y;

        this.x2 = this.dir.x + this.pos.x;
        this.y2 = this.dir.y + this.pos.y;

        this.x3 = wall.a.x;
        this.y3 = wall.a.y;

        this.x4 = wall.b.x;
        this.y4 = wall.b.y;

        this.t = this.t_f(this.x1, this.x2, this.x3, this.x4, this.y1, this.y2, this.y3, this.y4);
        this.u = this.u_f(this.x1, this.x2, this.x3, this.x4, this.y1, this.y2, this.y3, this.y4);

        // console.log(index.toString(), this.t, this.u);

        if ((0 <= this.t) && (0 <= this.u && this.u <= 1))
        {
            this.px = this.x1 + this.t * (this.x2 - this.x1);
            this.py = this.y1 + this.t * (this.y2 - this.y1);
            let length = sqrt((this.px - this.pos.x)*(this.px - this.pos.x) + (this.py - this.pos.y)*(this.py - this.pos.y));
            return new p5.Vector(this.px, this.py, 
                {
                    dist: length * cos(this.angle),
                    color: wall.color,
                    idx: this.index,
                    height: wall.height
                });
        } else {
            return;
        }
    }

    update(x, y, angle)
    {
        let new_angle = this.angle + angle;
        this.dir.x = cos(new_angle);
        this.dir.y = sin(new_angle);
        this.pos.x = x;
        this.pos.y = y;
    }

    show()
    {
        stroke(255, 0, 0);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.pos.x + 100 * this.dir.x, this.pos.y + 100 * this.dir.y);
    }

    debug(index)
    {
        console.log("Ray " + index.toString() + " | " + "Pos: " , this.pos.x, this.pos.y, " Dir: ", this.dir.x, this.dir.y);
    }
}