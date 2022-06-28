const walls = [];
let player;

function setup()
{
    let canvas = createCanvas(800, 600);
    canvas.parent("canvas");
    background(0);
    
    // walls.push(new Wall(0, 0, width, 0));
    // walls.push(new Wall(0, height, width, height));

    list_walls();

    player = new Player(width/2, height/2, 90, walls);
    //walls.push(new Wall(0, 0, 0, width));
    // rays.push(new Ray(0));
}

function draw()
{
    background(0);
    player.update();
    player.show();
    player.handle_input();
    // console.log(player.angle);
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
    if (mouseButton === "LEFT") {
        for (let i = 0; i < rays.length; ++i) {
            rays[i].debug(i);
        }
    } else {
        console.log(frameRate());
    }
}

function add_wall()
{
    let x1 = document.getElementById("x1").value;
    let y1 = document.getElementById("y1").value;
    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;

    walls.push(new Wall(x1, y1, x2, y2));
    list_walls();
}

function remove_wall(index)
{
    walls.splice(index, 1);
    list_walls();
}