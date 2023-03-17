function list_walls()
{
    let list = '';

    for (let i = 0; i < walls.length; i++) {
        list += "<div data-coords='[{";
        list += '"x1":"' + walls[i].a.x.toString() + '", "y1":"' + walls[i].a.y.toString() + '", "x2":"' + walls[i].b.x.toString() + '", "y2":"' + walls[i].b.y.toString() + '"';
        list += "}]' ";
        list += 'id="wall-' + i.toString() + '">';
        list += i.toString() + ':';
        list += '<input id="wall-' + i.toString() + '-x1" placeholder="X1" type="text" value="' + walls[i].a.x.toString() + '" style="width: 25px"> ';
        list += '<input id="wall-' + i.toString() + '-y1" placeholder="Y1" type="text" value="' + walls[i].a.y.toString() + '" style="width: 25px"> ';
        list += '<input id="wall-' + i.toString() + '-x2" placeholder="X2" type="text" value="' + walls[i].b.x.toString() + '" style="width: 25px"> ';
        list += '<input id="wall-' + i.toString() + '-y2" placeholder="Y2" type="text" value="' + walls[i].b.y.toString() + '" style="width: 25px"> ';
        list += 'Cor: ' + '<input id="wall-' + i.toString() + '-color" type="color" value="#FFFFFF" style="width: 35px; height: 25px;"> ';
        list += 'Altura (cm): ' + '<input id="wall-' + i.toString() + '-height" type="text" value="' + walls[i].height + '" style="width: 25px"> ';
        list += '<input type="button" value="Update" onclick="update_wall(' + i.toString() + ')">';
        list += '<input type="button" value="Remove" onclick="remove_wall(' + i.toString() + ')">';
        list += '</div>';
    }

    document.getElementById("list_of_walls").innerHTML = list;
}
