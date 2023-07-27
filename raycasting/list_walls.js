function add_fields()
{
    let list = '';

    for (let i = 0; i < walls.length; i++) {
        list += "<div ";
        list += 'id="wall-' + i.toString() + '">';
        list += i.toString() + ': ';
        list += '<input id="wall-' + i.toString() + '-x1" placeholder="X1" type="number" value="0" style="width: 50px"> ';
        list += '<input id="wall-' + i.toString() + '-y1" placeholder="Y1" type="number" value="0" style="width: 50px"> ';
        list += '<input id="wall-' + i.toString() + '-x2" placeholder="X2" type="number" value="0" style="width: 50px"> ';
        list += '<input id="wall-' + i.toString() + '-y2" placeholder="Y2" type="number" value="0" style="width: 50px"> ';
        list += 'Cor: ' + '<input id="wall-' + i.toString() + '-color" type="color" value="#FFFFFF" style="width: 35px; height: 25px;"> ';
        list += 'Altura (cm): ' + '<input id="wall-' + i.toString() + '-height" type="number" value="0" style="width: 50px"> ';
        list += '<input type="button" value="Update" onclick="update_wall(' + i.toString() + ')">';
        list += '<input type="button" value="Remove" onclick="remove_wall(' + i.toString() + ')">';
        list += '</div>';
    }

    document.getElementById("list_of_walls").innerHTML = list;
}

function get_wall_property(index, property)
{
    return document.querySelector("#wall-" + index.toString()).querySelector("#wall-" + index.toString() + "-" + property.toString());
}

function fill_fields()
{

    for (let i = 0; i < walls.length; i++) {
        get_wall_property(i, "x1").value = walls[i].a.x.toString();
        get_wall_property(i, "y1").value = walls[i].a.y.toString();
        get_wall_property(i, "x2").value = walls[i].b.x.toString();
        get_wall_property(i, "y2").value = walls[i].b.y.toString();
        get_wall_property(i, "color").value = walls[i].rgb2hex(walls[i].color);
        get_wall_property(i, "height").value = walls[i].height.toString();
    }

}

function list_walls()
{
    add_fields();
    fill_fields();
}
