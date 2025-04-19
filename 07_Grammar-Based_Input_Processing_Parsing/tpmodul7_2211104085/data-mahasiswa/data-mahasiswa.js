const fs = require("fs");

class DataMahasiswa2211104085 {
  ReadJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const obj = JSON.parse(data);
      const namaLengkap = `${obj.nama.depan} ${obj.nama.belakang}`;
      console.log(`Nama ${namaLengkap} dengan nim ${obj.nim} dari fakultas ${obj.fakultas}`);
    } catch (error) {
      console.error("Gagal membaca file JSON:", error.message);
    }
  }
}

const mahasiswa = new DataMahasiswa2211104085();
mahasiswa.ReadJSON("./solution/tp7_1_2211104085.json");