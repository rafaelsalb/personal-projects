function list_walls()
{
    let list = '';

    for (let i = 0; i < walls.length; i++) {
        list += '<input type="button" value="Remove" onclick="remove_wall(' + i.toString() + ')">'
        list += i.toString() + ' A: ' + walls[i].a.x.toString() + ', ' + walls[i].a.y.toString() + ' B: ' + walls[i].b.x.toString() + ', ' + walls[i].b.y.toString() + '<br>';
    }

    document.getElementById("list_of_walls").innerHTML = list;
}