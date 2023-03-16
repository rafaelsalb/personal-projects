class Renderer {

    constructor(r, g, b) {
        this.objects = [];
        this.floor = {
            r: r,
            g: g,
            b: b
        }
        this.horizon = height/2;
        this.screenStart = width/2;
        this.wallSize = 200;
        this.maxDist = sqrt(width*width + height*height);
    }

    render() {

        rectMode(CORNER);
        fill(this.floor.r, this.floor.g, this.floor.b);
        rect(width/2, height/2, width/2, height/2);
        fill(200);
        rect(width/2, 0, width/2, height/2);
        strokeWeight(4);

        for (let i = 0; i < this.objects.length; ++i) {
            let distance = this.objects[i].dist;

            if (distance != -1) {
                let curr = this.objects[i];
                let color = curr.color;
                let brightness = (this.maxDist - curr.dist) / this.maxDist;

                let projected_size = curr.height / curr.dist;
                let offset = this.wallSize / this.wallSize - curr.height;

                this.y0 = this.horizon + (this.wallSize * projected_size/2);
                this.y1 = this.y0 - this.wallSize * projected_size;//y0 + projected_half_size*this.wallSize;
                
                //console.log(this.y1 - this.y0);

                // if (i == 50) {
                //     //console.log(projected_size, offset, y0, y1, curr.dist, abs(y1 - y0));
                //     stroke(0, 0, 255);
                // }
                // else if (i == 51) {
                //     //console.log(projected_size, offset, y0, y1, curr.dist, abs(y1 - y0))
                //     stroke(0, 255, 0);
                // }
                stroke(color.r * brightness, color.g * brightness, color.b * brightness);

                line(4 * curr.idx + this.screenStart, this.y0, 4 * curr.idx + this.screenStart, this.y1);
            }
        }

    }

    update(objects) {
        this.objects = objects;
        this.objects.sort(this.compareReverse);
    }

    compareReverse(a, b) {
        if (a.dist < b.dist) {
            return  1;
        }
        else if (a.dist > b.dist) {
            return -1;
        }
        else {
            return 0;
        }
    }

    getObjects() {
        console.log(this.y1 - this.y0);
        return this.objects;
    }

}