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
    document.getElementById("clean_reset_checkbox").checked = fill_on_reset;
    document.getElementById("clean_reset_checkbox").value = fill_on_reset;
}

function draw()
{
    background(curr_color_scheme.background);
    push();
    translate(24, 24);
    memory.draw();
    translate(cell_width * 7, cell_height * 2.5);
    cpu.draw();
    pop();
    push();
    translate(24 + cell_width * 10, 24);
    cache.draw();
    pop();

    fill(curr_color_scheme.headers);
    textSize(24);
    text("Método de mapeamento: " + METHOD_NAMES[curr_method], 24, height - 52);
    if (curr_method != METHODS.direct) {
        text("Política de mapeamento: " + POLICY_NAMES[curr_policy], 24, height - 24);
    }
}

function search()
{
    let address = document.getElementById("address").value;
    if(address != null && address != "" && address >= 0 && address < mem_capacity_Bytes)
    {
        cpu.read(Number(address));
    }
}

function update_method()
{
    curr_method = parseInt(document.getElementById("method_selector").value);
    update_policy();

    document.getElementById("clean_reset_checkbox").style.visibility = "visible";
    document.getElementById("clean_reset_checkbox_label").style.visibility = "visible";
    if (curr_method == METHODS.direct)
    {
        document.getElementById("policy_selector_region").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("policy_selector_region").style.visibility = "visible";
    }
    if (curr_method == METHODS.set_associative)
    {
        fill_on_reset = false;
        document.getElementById("clean_reset_checkbox").style.visibility = "hidden";
        document.getElementById("clean_reset_checkbox_label").style.visibility = "hidden";
    }
}

function update_policy()
{
    curr_policy = parseInt(document.getElementById("policy_selector").value);
    memory.reset();
    cache.reset();
    cpu.reset();
}

function switch_color_scheme()
{
    if (curr_color_scheme == COLOR_SCHEMES.dark)
    {
        curr_color_scheme = COLOR_SCHEMES.light;
        document.documentElement.style.setProperty('--text-color', 'rgb(17, 17, 17)');
    }
    else if (curr_color_scheme == COLOR_SCHEMES.light)
    {
        curr_color_scheme = COLOR_SCHEMES.dark;
        document.documentElement.style.setProperty('--text-color', 'rgb(233, 233, 233)');
    }
    memory.update_color_scheme();
    cache.update_color_scheme();
}
