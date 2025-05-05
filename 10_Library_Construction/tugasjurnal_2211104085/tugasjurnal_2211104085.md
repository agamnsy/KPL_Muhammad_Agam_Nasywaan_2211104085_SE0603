# Laporan Praktikum Konstruksi Perangkat Lunak
#### Nama : Muhammad Agam Nasywaan
#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### Mathematics Libraries - Membuat Library Matematika

#### File mathematic.js

```
class MatematikaLibraries {
  static FPB(input1, input2) {
    let a = Math.abs(input1);
    let b = Math.abs(input2);

    while (b) {
      let temp = b;
      b = a % b;
      a = temp;
    }

    return a;
  }

  static KPK(input1, input2) {
    return Math.abs(input1 * input2) / this.FPB(input1, input2);
  }

  static Turunan(persamaan) {
    let result = [];

    for (let i = 0; i < persamaan.length - 1; i++) {
      const koefisien = persamaan[i] * (persamaan.length - 1 - i);
      const pangkat = persamaan.length - 2 - i;

      if (koefisien !== 0) {
        if (pangkat === 0) {
          result.push(koefisien.toString());
        } else if (pangkat === 1) {
          result.push(`${koefisien}x`);
        } else {
          result.push(`${koefisien}x${pangkat}`);
        }
      }
    }

    return result.join(" + ").replace(/\+ -/g, "- ");
  }

  static Integral(persamaan) {
    let result = [];

    for (let i = 0; i < persamaan.length; i++) {
      const pangkat = persamaan.length - i;
      const koefisien = persamaan[i] / pangkat;

      if (koefisien !== 0) {
        if (pangkat === 1) {
          result.push(`${koefisien}x`);
        } else {
          result.push(`${koefisien}x${pangkat}`);
        }
      }
    }

    result.push("C");

    return result.join(" + ").replace(/\+ -/g, "- ");
  }
}

module.exports = MatematikaLibraries;
```

#### File main.js (Program utama)

```
const MatematikaLibraries = require("./mathematics");

console.log("FPB(60, 45):", MatematikaLibraries.FPB(60, 45));

console.log("KPK(12, 8):", MatematikaLibraries.KPK(12, 8));

console.log(
  "Turunan([1, 4, -12, 9]):",
  MatematikaLibraries.Turunan([1, 4, -12, 9])
);

console.log(
  "Integral([4, 6, -12, 9]):",
  MatematikaLibraries.Integral([4, 6, -12, 9])
);
```

#### Output
![Image](https://github.com/user-attachments/assets/5af3d05b-7baa-4191-ba6c-38ad00e4b25b)

#### Penjelasan Kode
Kode ini terdiri dari dua file, yaitu mathematic.js yang berisi class MatematikaLibraries sebagai pustaka fungsi matematika, dan main.js sebagai program utama yang menggunakan fungsi-fungsi tersebut. Di dalam MatematikaLibraries, terdapat empat metode statis: FPB, yang menghitung Faktor Persekutuan Terbesar antara dua bilangan menggunakan algoritma Euclidean; KPK, yang menghitung Kelipatan Persekutuan Terkecil dengan rumus $\text{KPK} = \frac{|a \times b|}{\text{FPB}(a, b)}$; Turunan, yang menerima array koefisien polinomial dan mengembalikan bentuk turunan pertamanya dalam notasi aljabar; serta Integral, yang menghitung bentuk integral tak tentu dari polinomial dan menambahkan konstanta integrasi "C" di akhir. File main.js kemudian memanggil keempat fungsi tersebut dengan contoh input yang sesuai dan mencetak hasilnya ke console, memperlihatkan cara kerja fungsi FPB, KPK, serta perhitungan turunan dan integral dari persamaan polinomial dalam bentuk array.
