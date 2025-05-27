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
