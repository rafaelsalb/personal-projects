const walls = [];
let view = [];
let player;
let renderer;
let editor;

function setup()
{
    let canvas = createCanvas(800, 300);
    canvas.parent("canvas");
    background(0);

    // walls.push(new Wall(0, 0, width, 0));
    // walls.push(new Wall(0, height, width, height));

    list_walls();

    player = new Player(width/4, height/2, 100, walls);
    
    // rays.push(new Ray(0));

    renderer = new Renderer(235, 200, 100);
    editor = new Editor(0, 0, width, height);
}

function draw()
{
    background(0);

    let new_wall = editor.update();
    if (new_wall != null) {
        walls.push(new Wall(int(new_wall[0].x), int(new_wall[0].y), int(new_wall[1].x), int(new_wall[1].y)));
        walls[walls.length - 1].setId(walls.length - 1);
        list_walls();
    }

    player.handle_input();
    view = player.update();
    player.show();
    // console.log(player.angle);

    renderer.update(view);
    renderer.render();

    stroke(255);
    strokeWeight(2);
    line(width/2, 0, width/2, height);

    //grid(50);
}

function grid(space)
{
    for (let i = 0; i < width; i += space) {
        line(i, 0, i, height);
    }

    for (let j = 0; j < height; j += space) {
        line(0, j, width, j);
    }
}

function mousePressed()
{
    if (mouseX >= 0 && mouseX <= width/2 && mouseY >= 0 && mouseY <= height) {
        editor.mousePressedEditor();
        // if (mouseButton === "LEFT") {
            // for (let i = 0; i < rays.length; ++i) {
                // rays[i].debug(i);
                // for (let i = 0; i < view.length; ++i) {
                //     console.log(view[i][0]);
                //     console.log(view[i][1]);
                // }
            // }
        // } else {
            //console.log(frameRate());
        // }
    }

    //console.log(renderer.getObjects());
}

function add_wall()
{
    let x1 = document.getElementById("x1").value;
    let y1 = document.getElementById("y1").value;
    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;
    let r = document.getElementById("r").value;
    let g = document.getElementById("g").value;
    let b = document.getElementById("b").value;
    let h = document.getElementById("h").value;

    walls.push(new Wall(x1, y1, x2, y2));
    walls[walls.length-1].setColor(r, g, b);
    walls[walls.length-1].setHeight(h);
    list_walls();
}

function remove_wall(index)
{
    walls.splice(index, 1);
    list_walls();
}

function update_wall(wall)
{
    let list = document.getElementById("wall-" + wall.toString());
    let data = JSON.parse(list.dataset.coords);
    console.log(list.innerHTML);
    console.log(walls[wall]);

    let x1 = parseInt(document.getElementById("wall-" + wall.toString() + "-x1").value);
    let y1 = parseInt(document.getElementById("wall-" + wall.toString() + "-y1").value);
    let x2 = parseInt(document.getElementById("wall-" + wall.toString() + "-x2").value);
    let y2 = parseInt(document.getElementById("wall-" + wall.toString() + "-y2").value);
    let color = document.getElementById("wall-" + wall.toString() + '-color').value;
    let height = parseFloat(document.getElementById("wall-" + wall.toString() + '-height').value);

    console.log(x1);
    console.log(y1);
    console.log(x2);
    console.log(y2);

    walls[wall].setCoords(x1, y1, x2, y2);
    walls[wall].setColorByHex(color);
    walls[wall].setHeight(height);
}

function toggle_fov()
{
    if (player.show_fov) {
        player.show_fov = false;
    } else {
        player.show_fov = true;
    }
}
