# Laporan Praktikum Konstruksi Perangkat Lunak

#### Nama : Muhammad Agam Nasywaan

#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### MENJELASKAN DESIGN PATTERN SINGLETON

#### A. Berikan salah dua contoh kondisi dimana design pattern “Singleton” dapat digunakan.

1. Ketika suatu aplikasi membutuhkan sistem pencatatan log yang konsisten dan global, Singleton digunakan agar hanya ada satu instance dari Logger, sehingga semua bagian aplikasi mencatat log ke tempat yang sama.

2. Jika sebuah program memuat pengaturan global (seperti dari file .ini, .json, atau environment variable), Singleton cocok digunakan agar hanya ada satu objek konfigurasi yang dibagikan ke seluruh bagian aplikasi.

#### B. Berikan penjelasan singkat mengenai langkah-langkah dalam mengimplementasikan design pattern “Singleton”.

1. Buat constructor menjadi private atau protected
   Ini mencegah objek dibuat dari luar kelas menggunakan keyword new.

2. Buat static field untuk menyimpan satu-satunya instance
   Biasanya, field ini bertipe sama dengan kelas itu sendiri dan digunakan untuk menyimpan instance Singleton.

3. Buat static method (biasanya bernama getInstance() atau instance())
   Method ini mengecek apakah instance sudah dibuat. Jika belum, ia akan membuat instance baru, lalu mengembalikannya. Jika sudah ada, cukup mengembalikan instance yang sama.

#### C. Berikan tiga kelebihan dan kekurangan dari design pattern “Singleton”.

1. Kelebihan

   - Kontrol global atas instance karena menjamin bahwa hanya ada satu instance yang digunakan secara global dalam aplikasi.
   - Menghemat memori dan resource karena hanya ada satu objek, penggunaan resource lebih efisien dibanding membuat banyak instance.
   - Akses mudah dan konsisten karena objek singleton dapat diakses dari mana saja melalui method statis, memudahkan manajemen data bersama.

2. Kekurangan
   - Sulit untuk diuji (Testing), karena Singleton bersifat global dan tidak bisa di-reset dengan mudah, ini membuat pengujian unit (unit testing) menjadi rumit, terutama jika melibatkan state.
   - Menyebabkan ketergantungan tersembunyi (Hidden dependencies), karena kode yang menggunakan Singleton bisa tampak independen, padahal sebenarnya bergantung pada instance global.
   - Melanggar prinsip single responsibility dan open-closed, karena singleton sering kali menggabungkan logika bisnis dengan pengelolaan instance-nya sendiri, sehingga menyalahi prinsip-prinsip desain berorientasi objek.

### IMPLEMENTASI DAN PEMAHAMAN DESIGN PATTERN SINGLETON

#### pusat_data_singleton.py

```
class PusatDataSingleton:
    _instance = None  # Property singleton
    def __init__(self):
        self.DataTersimpan = []  # List of strings

    @classmethod
    def GetDataSingleton(cls):
        if cls._instance is None:
            cls._instance = PusatDataSingleton()
        return cls._instance

    def GetSemuaData(self):
        return self.DataTersimpan

    def PrintSemuaData(self):
        print("Isi data:")
        for data in self.DataTersimpan:
            print(f"- {data}")

    def AddSebuahData(self, input):
        self.DataTersimpan.append(input)

    def HapusSebuahData(self, index):
        if 0 <= index < len(self.DataTersimpan):
            removed = self.DataTersimpan.pop(index)
            print(f"Data '{removed}' telah dihapus.")
        else:
            print("Index tidak valid.")
```

### IMPLEMENTASI PROGRAM UTAMA

#### main.py

```
from pusat_data_singleton import PusatDataSingleton

if __name__ == "__main__":
    # A. Buat dua variable singleton
    data1 = PusatDataSingleton.GetDataSingleton()
    data2 = PusatDataSingleton.GetDataSingleton()

    # B. Tambah data anggota dan asisten via data1
    data1.AddSebuahData("Alice - Anggota")
    data1.AddSebuahData("Bob - Anggota")
    data1.AddSebuahData("Charlie - Anggota")
    data1.AddSebuahData("Dina - Asisten Praktikum")

    # C. Cetak data dari data2 (harusnya sama dengan data1)
    print("\n[Print dari data2 sebelum penghapusan]")
    data2.PrintSemuaData()

    # D. Hapus asisten via data2
    index_asisten = data2.GetSemuaData().index("Dina - Asisten Praktikum")
    data2.HapusSebuahData(index_asisten)

    # E. Cetak ulang data dari data1 (asisten harus sudah hilang)
    print("\n[Print dari data1 setelah penghapusan dari data2]")
    data1.PrintSemuaData()

    # F. Hitung jumlah data
    print("\nJumlah data di data1:", len(data1.GetSemuaData()))
    print("Jumlah data di data2:", len(data2.GetSemuaData()))

```

#### Output

![Image](https://github.com/user-attachments/assets/4d9ef6d8-7f86-4c90-82a2-1fdad81f11e7)

#### Penjelasan Kode

Kode ini mengimplementasikan pola desain Singleton melalui kelas PusatDataSingleton, yang berperan sebagai pusat penyimpanan data berbasis list. Singleton memastikan bahwa hanya ada satu instance dari kelas ini yang dibuat selama program berjalan. Hal ini dilakukan melalui properti kelas \_instance dan method kelas GetDataSingleton(). Jika \_instance masih None, maka objek baru akan dibuat dan disimpan di dalam \_instance; jika tidak, instance yang sudah ada akan dikembalikan. Konstruktor **init** akan otomatis dipanggil hanya sekali untuk menginisialisasi atribut DataTersimpan sebagai list kosong. Metode tambahan disediakan untuk menambahkan data (AddSebuahData()), mencetak semua data (PrintSemuaData()), menghapus data berdasarkan indeks (HapusSebuahData()), dan mengambil semua data yang tersimpan (GetSemuaData()).

Di dalam main.py, program utama memanfaatkan desain Singleton ini dengan membuat dua variabel (data1 dan data2) yang keduanya mengacu pada instance yang sama dari PusatDataSingleton. Data ditambahkan melalui data1, kemudian dicetak melalui data2, menunjukkan bahwa keduanya memang berbagi data yang sama. Data asisten praktikum kemudian dihapus melalui data2, dan hasilnya dikonfirmasi melalui PrintSemuaData() pada data1, yang juga tidak lagi menampilkan nama asisten tersebut. Hal ini menegaskan bahwa hanya satu instance yang aktif dan digunakan di seluruh program. Terakhir, program menghitung jumlah data pada data1 dan data2, yang tentu saja akan sama karena mengacu pada list yang sama.
