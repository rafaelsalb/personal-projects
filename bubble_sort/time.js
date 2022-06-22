let time = Date.now();

function format_time(time)
{
    let converted = toString(time);

    if (converted.length == 2) {
        converted = '0' + converted;
        return converted;
    } else {
        return converted;
    }
}