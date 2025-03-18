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

console.log("Nama: Muhammad Agam Nasywaan");
console.log("NIM: 2211104085\n");
test = new PosisiKarakterGame();
test.ubahPosisi("S");
test.ubahPosisi("S");
test.ubahPosisi("W");
test.ubahPosisi("W");
test.ubahPosisi("X");
test.ubahPosisi("W");
