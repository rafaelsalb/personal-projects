function resultado()
{
    const notas = [parseFloat(document.getElementById('s1').value), parseFloat(document.getElementById('s2').value), parseFloat(document.getElementById('s3').value)];

    let s4 = 0;
    let media = 0;

    while(media < 7.0) {
        let ra1 = (notas[0] * 400 + notas[1] * 400 + notas[2] * 133 + s4 * 67) / 1000;
        let ra2 = (notas[1] * 476 + notas[2] * 238 + s4 * 286) / 1000;
        let ra3 = (notas[2] * 667 + s4 * 333) / 1000;
        let ra4 = (notas[2] * 250 + s4 * 750) / 1000;

        let soma = ra1 + ra2 + ra3 + ra4;
        media = soma / 4;
        s4 += 0.1;
    }

    document.getElementById("resultado").textContent = "Você precisa de:" + toString(s4);
}