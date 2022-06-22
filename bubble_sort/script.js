let bars = [];
let idx = 0;

function fisher_yates(array)
{
    for (let i = array.length - 1; i > 0; --i) {
        let j = int(random(0, i))
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function setup()
{
    frameRate(600);
    noStroke();
    createCanvas(1200, 600);
    for (let i = 0; i < width; ++i) {
        bars.push(height * i / width);
    }
    bars = fisher_yates(bars);
}

function draw()
{
    background(0);
    fill(255);
    for(let i = 0; i < bars.length; ++i) {
        rect(i, height - bars[i], 1, bars[i]);
    }

    if (bars[idx] > bars[idx+1]) {
        let temp = bars[idx];
        bars[idx] = bars[idx+1];
        bars[idx+1] = temp;
    }

    if (idx == bars.length - 2) {
        idx = 0;
    }
    ++idx;
    console.log(idx);
}

function mousePressed()
{
    console.log(idx);
}