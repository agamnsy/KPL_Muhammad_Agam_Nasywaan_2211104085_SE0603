# Laporan Praktikum Konstruksi Perangkat Lunak 
#### Nama : Muhammad Agam Nasywaan
#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### Kode Buah - Menambahkan Kode Dengan Teknik Table-Driven
```
class KodeBuah {
  constructor() {
    this.kodeBuahMap = {
      Apel: "A00",
      Aprikot: "B00",
      Alpukat: "C00",
      Pisang: "D00",
      Paprika: "E00",
      Blackberry: "F00",
      Ceri: "H00",
      Kelapa: "I00",
      Jagung: "J00",
      Kurma: "K00",
      Durian: "L00",
      Anggur: "M00",
      Melon: "N00",
      Semangka: "O00",
    };
  }

  getKodeBuah(namaBuah) {
    return this.kodeBuahMap[namaBuah] || "Buah tidak ditemukan";
  }
}

const kodeBuah = new KodeBuah();
const namaBuah = "Durian";
const hasilKode = kodeBuah.getKodeBuah(namaBuah);
console.log(`Kode buah dari ${namaBuah} adalah ${hasilKode}`);
```

#### Output
![Image](https://github.com/user-attachments/assets/53c3dbc2-efb4-427c-a36e-8bbc6c7255e4)

#### Penjelasan Kode
Kode tersebut mendefinisikan sebuah class KodeBuah yang berisi constructor untuk membuat objek kodeBuahMap, yang menyimpan daftar nama buah beserta kodenya dalam bentuk key-value. Method getKodeBuah() digunakan untuk mengambil kode buah berdasarkan nama buah yang diberikan dan mengembalikan pesan "Buah tidak ditemukan" jika nama buah tidak ada dalam daftar. Di bagian akhir, class KodeBuah diinstansiasi dan method getKodeBuah() dipanggil untuk menampilkan kode buah dari nama "Durian" menggunakan console.log().



### Posisi Karakter Game - Menambahkan Kode Dengan Teknik State-Based Construction
```
class PosisiKarakterGame {
  constructor() {
    this.state = "Berdiri";
    console.log("Posisi awal: Berdiri (posisi standby)");
  }

  ubahPosisi(tombol) {
    switch (this.state) {
      case "Berdiri":
        if (tombol === "S") {
          console.log("tombol arah bawah ditekan");
          this.state = "Jongkok";
          console.log("Posisi berubah: Jongkok");
        } else if (tombol === "W") {
          console.log("tombol arah atas ditekan");
          this.state = "Terbang";
          console.log("Posisi berubah: Terbang (posisi take off)");
        }
        break;
      case "Jongkok":
        if (tombol === "W") {
          console.log("tombol arah atas ditekan");
          this.state = "Berdiri";
          console.log("Posisi berubah: Berdiri (posisi standby)");
        } else if (tombol === "S") {
          console.log("tombol arah bawah ditekan");
          this.state = "Tengkurap";
          console.log("Posisi berubah: Tengkurap (posisi istirahat)");
        }
        break;
      case "Tengkurap":
        if (tombol === "W") {
          console.log("tombol arah atas ditekan");
          this.state = "Jongkok";
          console.log("Posisi berubah: Jongkok");
        }
        break;
      case "Terbang":
        if (tombol === "S") {
          console.log("tombol arah bawah ditekan");
          this.state = "Berdiri";
          console.log("Posisi berubah: Berdiri (posisi standby)");
        } else if (tombol === "X") {
          this.state = "Jongkok";
          console.log("Posisi berubah: Jongkok (posisi landing)");
        }
        break;
    }
  }
}

console.log("Nama : Muhammad Agam Nasywaan");
console.log("NIM : 2211104085\n");
test = new PosisiKarakterGame();
test.ubahPosisi("S");
test.ubahPosisi("S");
test.ubahPosisi("W");
test.ubahPosisi("W");
test.ubahPosisi("X");
test.ubahPosisi("W");
```

#### Output
![Image](https://github.com/user-attachments/assets/af67a546-21ba-4b8f-8475-cc7a245bae43)

#### Penjelasan Kode
Kode diatas mendefinisikan sebuah class PosisiKarakterGame yang mengimplementasikan teknik State-Based Construction dengan state awal "Berdiri". Class ini memiliki method ubahPosisi(tombol) yang mengubah state berdasarkan tombol yang ditekan (S, W, atau X). Setiap perubahan state akan menampilkan pesan yang sesuai, termasuk pesan tambahan berdasarkan hasil mod NIM (2211104085 % 3 = 1), yaitu "posisi standby" ketika state berubah ke "Berdiri" dan "posisi istirahat" ketika state berubah ke "Tengkurap". Simulasi perubahan state dilakukan dengan memanggil method ubahPosisi() menggunakan urutan tombol yang berbeda.