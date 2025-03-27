# Laporan Praktikum Konstruksi Perangkat Lunak 
#### Nama : Muhammad Agam Nasywaan
#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### Penjumlahan - Menambahkan Class Penjumlahan dengan Method JumlahTigaAngka
```
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
```

#### Output
![Image](https://github.com/user-attachments/assets/c4488528-5d7a-4099-81c7-809537bee4c9)

#### Penjelasan Kode
Kode diatas membuat class Penjumlahan dengan method JumlahTigaAngka(x, y, z) yang menjumlahkan tiga angka dengan mengonversinya ke tipe Number (Double). Dalam fungsi main, tiga angka diambil dari dua digit NIM (22, 11, dan 10), lalu dikonversi ke tipe double menggunakan parseFloat(), sesuai aturan berdasarkan digit terakhir NIM, yaitu 5. Kemudian, objek Penjumlahan dibuat dan method JumlahTigaAngka() dipanggil untuk menghitung jumlah ketiga angka tersebut, yang hasilnya ditampilkan di konsol. Kode ini pada dasarnya menjumlahkan tiga angka dari NIM dengan tipe data yang telah ditentukan.


### Simple Database - Menambahkan Class SimpleDataBase
```
class SimpleDataBase {
    constructor() {
        this.storedData = [];
        this.inputDates = [];
    }

    AddNewData(data) {
        this.storedData.push(data);
        this.inputDates.push(new Date().toUTCString());
    }

    PrintAllData() {
        this.storedData.forEach((data, index) => {
            console.log(`Data ${index + 1} berisi: ${data}, yang disimpan pada waktu UTC: ${this.inputDates[index]}`);
        });
    }
}

function main() {
    const nim = "2211104085";
    const duaDigit1 = 22;
    const duaDigit2 = 11;
    const duaDigit3 = 10;

    const database = new SimpleDataBase();
    database.AddNewData(duaDigit1);
    database.AddNewData(duaDigit2);
    database.AddNewData(duaDigit3);

    database.PrintAllData();
}

main();
```

#### Output
![Image](https://github.com/user-attachments/assets/0db24b19-2867-439c-937a-26e00d95c698)

#### Penjelasan Kode
Kode di atas membuat class SimpleDataBase yang menyimpan data bertipe generic dalam storedData dan mencatat waktu penyimpanannya dalam inputDates. Setiap kali method AddNewData dipanggil, data baru beserta timestamp UTC akan ditambahkan. Method PrintAllData menampilkan semua data beserta waktu penyimpanannya. Fungsi main menginisialisasi database, menambahkan tiga angka dari dua digit NIM (2211104085), yaitu 22, 11, 10, lalu mencetak hasilnya.