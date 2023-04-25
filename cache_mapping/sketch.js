let parent_div;
let canvas;

const memory = new Memory(mem_capacity_Bytes);
const cache = new Cache(cache_capacity_Bytes)
const cpu = new CPU(memory, cache);

function setup()
{
    parent_div = document.getElementById("canvas")
    canvas = createCanvas(cell_width * 17, 256 + cell_height * mem_capacity_Bytes / 4);
    canvas.parent("canvas");
}

function draw()
{
    background(0);
    push();
    translate(24, 24);
    memory.draw();
    translate(cell_width * 2.5, cell_height * 20);
    cpu.draw();
    pop();
    push();
    translate(24 + cell_width * 10, 24);
    cache.draw();
    pop();
}

function menu_search()
{
    let address = document.getElementById("address").value;
    if(address != null && address != "" && address >= 0 && address < mem_capacity_Bytes) {
        cpu.read(Number(address));
    }
}