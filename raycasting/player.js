class Player
{
    constructor(x, y, fov, layer)
    {
        this.boundaries = layer;
        this.pos = new p5.Vector(x, y);
        this.rays = [];
        this.interval = 360 / fov
        for (let i = 0; i < fov; i += this.interval) {
            this.rays.push(new Ray(i - fov/2));
        }
        this.angle = 0;
        this.speed = 10;
        this.size = 20;
        this.KEYS = {
            "up" : 87,
            "down" : 83,
            "left" : 65,
            "right" : 68
        };
    }

    update()
    {
        for (let i = 0; i < this.rays.length; ++i) {
            this.rays[i].update(this.pos.x, this.pos.y, this.angle);
            // this.rays[i].show();
            for (let j = 0; j < this.boundaries.length; ++j) {
                this.boundaries[j].show();
                let pt = this.rays[i].cast(this.boundaries[j], j);
                if (pt) {
                    line(this.pos.x, this.pos.y, pt.x, pt.y);
                }
            }
        }
    }

    show()
    {
        noStroke();
        fill(0, 255, 0);
        circle(this.pos.x, this.pos.y, this.size);
    }

    handle_input()
    {
        let x;
        let y;

        if (keyIsDown(this.KEYS["up"])) {
            y = -1;
        }
        else if (keyIsDown(this.KEYS["down"])) {
            y = 1;
        }
        if (keyIsDown(this.KEYS["left"])) {
            x = -1;
        }
        else if (keyIsDown(this.KEYS["right"])) {
            x = 1;
        }
        this.move(x, y);
        this.look_at(mouseX, mouseY);
    }

    move(x, y)
    {
        let velocity = new p5.Vector(x, y);
        let collision = this.get_collisions()
        velocity.normalize();

        if (collision.x > 0 & velocity.x > 0) {
            velocity.x = 0;
        }
        else if (collision.x < 0 & velocity.x < 0) {
            velocity.x = 0;
        }
        if (collision.y > 0 & velocity.y > 0) {
            velocity.y = 0;
        }
        else if (collision.y < 0 & velocity.y < 0) {
            console.log(velocity.y, collision.y);
            velocity.y = 0;
        }

        this.pos.x += velocity.x * this.speed;
        this.pos.y += velocity.y * this.speed;
    }

    get_collisions()
    {
        this.collision_dir = new p5.Vector(0, 0);

        if (this.pos.x >= width - this.size) {
            this.collision_dir.x = 1;
        }
        else if (this.pos.x <= this.size) {
            this.collision_dir.x = -1;
        }
        else if (this.pos.x > this.size & this.pos.x > width - this.size) {
            this.collision_dir.x = 0;
        }
        if (this.pos.y >= height - this.size) {
            this.collision_dir.y = 1;
        }
        else if (this.pos.y <= this.size) {
            this.collision_dir.y = -1;
        }
        else if (this.pos.y > this.size & this.pos.y > height - this.size) {
            this.collision_dir.y = 0;
        }
        return this.collision_dir;
    }

    look_at(x, y)
    {
        let direction = new p5.Vector(mouseX - this.pos.x, mouseY - this.pos.y);
        direction.normalize();
        this.angle = Math.atan2(direction.y, direction.x);
        return direction;
    }
}