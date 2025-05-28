# Laporan Praktikum Konstruksi Perangkat Lunak
#### Nama : Muhammad Agam Nasywaan
#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### REFACTORING DENGAN STANDAR CODE

#### modul14_2211104085.js

```
class AljabarLibraries {
    /**
   * Menghitung akar-akar dari persamaan kuadrat ax^2 + bx + c = 0
   * @param {number[]} persamaan - Array berisi [a, b, c]
   * @returns {number[]} Array akar-akar, kosong jika tidak real
   */
    static akarPersamaanKuadrat(persamaan) {
    const [a, b, c] = persamaan;
    const diskriminan = b * b - 4 * a * c;

    if (diskriminan < 0) {
      return []; // Tidak ada akar real
    } else if (diskriminan === 0) {
      const x = -b / (2 * a); // Akar tunggal
        return [x];
    } else {
      const x1 = (-b + Math.sqrt(diskriminan)) / (2 * a);
      const x2 = (-b - Math.sqrt(diskriminan)) / (2 * a);
        return [x1, x2];
    }
    }

    /**
   * Mengkuadratkan bentuk (ax + b)^2 menjadi [a^2, 2ab, b^2]
   * @param {number[]} persamaan - Array berisi [a, b]
   * @returns {number[]} Koefisien hasil kuadrat
   */
    static hasilKuadrat(persamaan) {
    const [a, b] = persamaan;

    const aKuadrat = a * a;
    const duaAB = 2 * a * b;
    const bKuadrat = b * b;

    return [aKuadrat, duaAB, bKuadrat];
    }
}

module.exports = AljabarLibraries;
```

#### main.js

```
const AljabarLibraries = require("./modul14_2211104085");

// Contoh penggunaan method akarPersamaanKuadrat
const akarAkar = AljabarLibraries.akarPersamaanKuadrat([1, -3, -10]);
console.log("Akar-akar persamaan kuadrat:");
console.log(akarAkar);

// Contoh penggunaan method hasilKuadrat
const hasilKuadrat = AljabarLibraries.hasilKuadrat([2, -3]);
console.log("\nHasil kuadrat dari bentuk (2x - 3)^2:");
console.log(`${hasilKuadrat[0]}x^2 + ${hasilKuadrat[1]}x + ${hasilKuadrat[2]}\n`);
```

#### Output
![Image](https://github.com/user-attachments/assets/8a56f098-0176-488e-b400-6ba2abfd3836)

#### Penjelasan Kode
Kode yang telah di-refactor menjadi clean code terdiri dari dua bagian: aljabarLibraries.js dan main.js. Pada aljabarLibraries.js, class AljabarLibraries berisi dua method statis yaitu akarPersamaanKuadrat dan hasilKuadrat, yang masing-masing digunakan untuk menghitung akar-akar dari persamaan kuadrat dan mengkuadratkan bentuk (ax + b)^2. Perubahan clean code mencakup penggunaan penamaan metode dan variabel dengan konvensi camelCase, penambahan komentar untuk menjelaskan fungsi dan logika blok kode, serta penggunaan const untuk deklarasi nilai tetap agar kode lebih aman dan mudah dibaca. Sementara di main.js, penggunaan class dilakukan dengan rapi dan output dicetak secara informatif. Kedua file memiliki struktur whitespace dan indentasi yang konsisten, membuat keseluruhan program lebih terstruktur, mudah dipelihara, dan siap untuk kolaborasi atau pengembangan lebih lanjut.