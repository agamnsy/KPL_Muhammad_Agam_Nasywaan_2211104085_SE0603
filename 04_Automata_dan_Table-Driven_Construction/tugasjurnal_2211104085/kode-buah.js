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

// Contoh pemanggilan method getKodeBuah
const kodeBuah = new KodeBuah();
const namaBuah = "Durian";
const hasilKode = kodeBuah.getKodeBuah(namaBuah);
console.log(`Kode buah dari ${namaBuah} adalah ${hasilKode}`);
