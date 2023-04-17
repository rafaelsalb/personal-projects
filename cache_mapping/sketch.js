let canvas;
const memory = new Memory(48, 48, mem_capacity_Bytes);
const cache = new Cache(10 * cell_width, 48, mem_capacity_Bytes / 4);


function setup()
{
    canvas = createCanvas(cell_width * 16, 3280);
    strokeWeight(2);
    stroke(255);

    console.log(memory);
}

function draw()
{
    background(0);
    textSize(24);
    stroke(0);
    fill(255);
    textAlign(LEFT, BOTTOM)
    text("Memória principal", 48, 42);
    memory.draw();
    textSize(24);
    stroke(0);
    fill(255);
    textAlign(LEFT, BOTTOM)
    text("Memória cache", 10 * cell_width, 42);
    cache.draw();
}

function mousePressed()
{
    console.log(memory);
}
