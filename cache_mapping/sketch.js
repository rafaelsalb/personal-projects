let canvas;
const memory = new Memory(mem_capacity_Bytes);
const cache = new Cache(cache_capacity_Bytes)

function setup()
{
    canvas = createCanvas(cell_width * 17, 256 + cell_height * mem_capacity_Bytes / 4);
    cache.clear();
}

function draw()
{
    background(0);
    push();
    translate(24, 24);
    memory.draw();
    translate(cell_width * 10, 0);
    cache.draw();
    pop();
    push();
}