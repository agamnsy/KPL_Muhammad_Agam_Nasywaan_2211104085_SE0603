const { CariTandaBilangan } = require('./logic');

function cekTanda() {
    const input = document.getElementById('inputNumber').value;
    const output = document.getElementById('output');

    const num = parseInt(input);
    if (isNaN(num)) {
    output.innerText = "Masukkan angka yang valid!";
    } else {
    output.innerText = "Hasil: " + CariTandaBilangan(num);
    }
}
