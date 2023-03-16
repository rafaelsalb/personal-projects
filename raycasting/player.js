class Player
{
    constructor(x, y, fov, layer)
    {
        this.boundaries = layer;
        this.pos = new p5.Vector(x, y);
        this.rays = [];
        for (let i = 0; i < fov; ++i) {
            this.rays.push(new Ray(i - fov/2, i));
        }
        this.angle = 0;
        this.speed = 5;
        this.size = 10;
        this.KEYS = {
            "up" : 87,
            "down" : 83,
            "left" : 65,
            "right" : 68
        };

        this.show_fov = false;
    }

    update()
    {
        const view = [];

        for (let i = 0; i < this.rays.length; ++i) {
            this.rays[i].update(this.pos.x, this.pos.y, this.angle);
            // this.rays[i].show();
            for (let j = 0; j < this.boundaries.length; ++j) {
                this.boundaries[j].show();
                let pt = this.rays[i].cast(this.boundaries[j], j);
                if (pt) {
                    stroke(255);
                    strokeWeight(1);
                    line(this.pos.x, this.pos.y, pt.x, pt.y);
                    view.push(pt.z);
                }
                else {
                    view.push({dist: -1});
                }
            }
        }
        if (this.show_fov) {
            this.draw_fov();
        }

        return view;
    }

    show()
    {
        noStroke();
        fill(0, 255, 0);
        circle(this.pos.x, this.pos.y, this.size);
    }

    draw_fov()
    {
        let last = this.rays.length - 1;
        this.rays[0].show();
        this.rays[last].show();
        stroke(255, 0, 0);
        strokeWeight(1);

        line(this.rays[0].pos.x + 100*this.rays[0].dir.x, this.rays[0].pos.y + 100*this.rays[0].dir.y, this.rays[last].pos.x+ 100*this.rays[last].dir.x, this.rays[last].pos.y+ 100*this.rays[last].dir.y);
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
        let collision = this.check_bound_collisions()
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

    check_bound_collisions()
    {
        this.collision_dir = new p5.Vector(0, 0);

        if (this.pos.x >= width/2 - this.size) {
            this.collision_dir.x = 1;
        }
        else if (this.pos.x <= this.size) {
            this.collision_dir.x = -1;
        }
        else if (this.pos.x > this.size & this.pos.x > width/2 - this.size) {
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