# Laporan Praktikum Konstruksi Perangkat Lunak

#### Nama : Muhammad Agam Nasywaan

#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### 1. Membuat GUI Sederhana

#### main.js

File ini merupakan entry point utama dari aplikasi Electron. Di dalamnya terdapat konfigurasi dan pembuatan window aplikasi menggunakan BrowserWindow, serta menentukan file HTML (index.html) yang akan ditampilkan dalam jendela. File ini juga menangani siklus hidup aplikasi seperti membuka jendela utama saat aplikasi siap, dan menutup aplikasi saat semua jendela ditutup. main.js bekerja di proses utama (main process) Electron.

```
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
```

#### index.html

File ini berisi struktur tampilan antarmuka pengguna (GUI) menggunakan HTML. Di dalamnya terdapat dua textbox (untuk input nilai a dan b), satu tombol (untuk memicu perhitungan), dan satu label (untuk menampilkan hasil output). File ini menjadi UI statis yang dirender oleh Electron dan berkomunikasi dengan skrip renderer.js untuk menangani logika perhitungan saat pengguna berinteraksi.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Cari Nilai Pangkat</title>
  </head>
  <body>
    <h1>Hitung Nilai Pangkat</h1>
    <input type="number" id="inputA" placeholder="Masukkan nilai a" />
    <input type="number" id="inputB" placeholder="Masukkan nilai b" />
    <button onclick="hitungPangkat()">Hitung</button>
    <p id="output"></p>

    <script src="renderer.js"></script>
  </body>
</html>
```

#### renderer.js

File ini berfungsi sebagai jembatan antara tampilan HTML (index.html) dan logika aplikasi (fungsi CariNilaiPangkat). File ini berjalan di proses renderer (browser window) pada Electron. Di dalamnya terdapat kode JavaScript untuk menangani klik tombol, membaca nilai dari textbox, memanggil fungsi CariNilaiPangkat dari file pangkat.js, dan menampilkan hasil ke label. renderer.js menangani semua interaksi dinamis di sisi UI.

```
const { CariNilaiPangkat } = require("./pangkat");

window.hitungPangkat = function () {
  const a = parseInt(document.getElementById("inputA").value);
  const b = parseInt(document.getElementById("inputB").value);
  const hasil = CariNilaiPangkat(a, b);
  document.getElementById("output").innerText = `Hasil: ${hasil}`;
};
```

#### pangkat.js

File ini berisi definisi fungsi utama CariNilaiPangkat(a, b), yang menghitung pangkat berdasarkan aturan logika tertentu seperti jika b = 0 hasil 1, jika b < 0 hasil -1, jika b > 10 atau a > 100 hasil -2, dan jika hasil pangkat melebihi batas maksimal Number.MAX_SAFE_INTEGER maka hasil -3. File ini menggunakan JavaScript murni dan diekspor menggunakan module.exports, sehingga dapat digunakan baik di renderer.js maupun pada unit test.

```
function CariNilaiPangkat(a, b) {
  if (b === 0) return 1;
  if (b < 0) return -1;
  if (b > 10 || a > 100) return -2;

  let hasil = 1;
  try {
    for (let i = 0; i < b; i++) {
      hasil *= a;
      if (!Number.isSafeInteger(hasil)) throw new Error("Overflow");
    }
    return hasil;
  } catch (err) {
    return -3;
  }
}

module.exports = { CariNilaiPangkat };
```

#### Output Kode

a. Tampilan GUI
![Image](https://github.com/user-attachments/assets/f31ee5d8-40eb-4066-b14a-06c38656118b)

b. Input perpangkatan biasa
![Image](https://github.com/user-attachments/assets/cac7b079-6fc6-4bf5-bcaa-215e50984a39)

c. Apabila input b adalah 0 maka nilai return selalu 1
![Image](https://github.com/user-attachments/assets/510d565b-188c-4102-9a3e-56d990ec3324)

d. Apabila input b adalah bilangan negatif, maka nilai return adalah -1
![Image](https://github.com/user-attachments/assets/6ae31b66-0684-4752-9f54-c7a3e0afda3e)

e. Apabila input b lebih dari 10 atau input a lebih dari 100 maka nilai return adalah -2
![Image](https://github.com/user-attachments/assets/7c52b3f3-ff19-4406-af0e-256e5c049f86)

f. Apabila hasil pangkat melebihi batas maksimal bilangan positif integer maka nilai return adalah -3
![Image](https://github.com/user-attachments/assets/5fa1e110-a90e-4b58-9b17-cb06013052c8)

### 2. Melakukan Software Profiling

#### Saat aplikasi idle (tanpa input)

![Image](https://github.com/user-attachments/assets/7fe2899f-f10b-4761-ba6a-e9d82a0d9b24)

![Image](https://github.com/user-attachments/assets/aba2128f-b575-4474-ad0b-d2569f38cfc9)

#### Input 3 dan 19

![Image](https://github.com/user-attachments/assets/1916900f-7722-4991-81d2-00268eb9c526)

![Image](https://github.com/user-attachments/assets/922f7e92-b935-49a5-945d-d57222635294)

#### Input 9 dan 30

![Image](https://github.com/user-attachments/assets/b0404112-02cc-4189-baad-a868b46d4a97)

![Image](https://github.com/user-attachments/assets/e87b8469-1947-4e96-8a6a-939a3bae35ca)

### 3. Menambahkan Unit Testing

#### pangkat.test.js

File ini berisi unit test untuk fungsi CariNilaiPangkat menggunakan framework testing seperti Jest. Di dalamnya terdapat berbagai skenario uji yang mencakup semua kemungkinan cabang logika fungsi: b = 0, b < 0, b > 10, a > 100, hasil overflow, dan hasil valid. Tujuan dari file ini adalah untuk memastikan fungsi berjalan dengan benar, memiliki branch coverage yang baik, serta menjadi dokumentasi otomatis atas perilaku fungsi.

```
const { CariNilaiPangkat } = require("./pangkat");

test("pangkat biasa 2^3 = 8", () => {
  expect(CariNilaiPangkat(2, 3)).toBe(8);
});

test("0^0 = 1", () => {
  expect(CariNilaiPangkat(0, 0)).toBe(1);
});

test("negatif pangkat return -1", () => {
  expect(CariNilaiPangkat(2, -2)).toBe(-1);
});

test("pangkat lebih dari 10 return -2", () => {
  expect(CariNilaiPangkat(2, 11)).toBe(-2);
});

test("nilai a lebih dari 100 return -2", () => {
  expect(CariNilaiPangkat(101, 2)).toBe(-2);
});

test("overflow return -3", () => {
  expect(CariNilaiPangkat(100, 10)).toBe(-3);
});
```

![Image](https://github.com/user-attachments/assets/9bf60924-36d0-4a99-a95d-3381e79af1ea)
