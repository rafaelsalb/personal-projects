class Cell
{
    pos = new p5.Vector();
    data;

    constructor(x, y, data)
    {
        this.pos.x = x;
        this.pos.y = y;
        this.data = data === "r" ? "0x" + Math.floor(Math.random() * 255).toString(16) : data;
    }

    set_data(data)
    {
        this.data = data;
    }

    update(x, y)
    {
        this.pos.x = x;
        this.pos.y = y;
    }

    draw()
    {
        strokeWeight(2);
        stroke(255);
        fill(127);
        rect(this.pos.x, this.pos.y, cell_width, cell_height);

        strokeWeight(0);
        fill(255);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(this.data, this.pos.x + cell_width / 2.0, this.pos.y + cell_height / 2.0);
    }
}

class HeaderCell extends Cell
{
    constructor(x, y, lower_half, upper_half)
    {
        super(x, y, lower_half);
        this.data = {"lower_half": lower_half, "upper_half": upper_half};
    }

    set_data(lower_half, upper_half)
    {
        this.data.lower_half = lower_half;
        this.data.upper_half = upper_half;
    }

    draw()
    {
        strokeWeight(2);
        stroke(255);
        fill(127);
        rect(this.pos.x, this.pos.y, cell_width, cell_height);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.pos.x + cell_width, this.pos.y + cell_height);

        strokeWeight(0);
        fill(255);
        textSize(12);
        textAlign(LEFT, CENTER);
        text(this.data.lower_half, this.pos.x, this.pos.y + cell_height * 0.75);
        textAlign(RIGHT, TOP);
        text(this.data.upper_half, this.pos.x + cell_width, this.pos.y + cell_height * 0.05);
    }
    
}