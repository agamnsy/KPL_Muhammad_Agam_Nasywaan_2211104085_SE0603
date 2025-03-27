class Penjumlahan {
    JumlahTigaAngka(x, y, z) {
        let total = Number(x) + Number(y) + Number(z);
        return total;
    }
}

function main() {
    const nim = "2211104085";
    const duaDigit1 = 22;
    const duaDigit2 = 11;
    const duaDigit3 = 10;

    // Digit terakhir : 5 -> Double
    const angka1 = parseFloat(duaDigit1);
    const angka2 = parseFloat(duaDigit2);
    const angka3 = parseFloat(duaDigit3);

    const penjumlahan = new Penjumlahan();
    const hasil = penjumlahan.JumlahTigaAngka(angka1, angka2, angka3);

    console.log(`\nHasil penjumlahan adalah : ${hasil}\n`);
}

main();
