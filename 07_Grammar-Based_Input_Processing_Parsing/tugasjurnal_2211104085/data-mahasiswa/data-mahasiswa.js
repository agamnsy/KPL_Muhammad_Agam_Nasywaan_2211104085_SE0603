const fs = require("fs");

class DataMahasiswa2211104085 {
  ReadJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const obj = JSON.parse(data);

      console.log("\n======== Identitas Mahasiswa ========");
      console.log(`Nama Lengkap: ${obj.firstName} ${obj.lastName}`);
      console.log(`Jenis Kelamin: ${obj.gender}`);
      console.log(`Umur: ${obj.age}`);
      console.log("Alamat:");
      console.log(`  Jalan: ${obj.address.streetAddress}`);
      console.log(`  Kota: ${obj.address.city}`);
      console.log(`  Provinsi: ${obj.address.state}`);
      console.log("Mata Kuliah yang Diambil:");
      obj.courses.forEach((course, index) => {
        console.log(`  MK ${index + 1}: ${course.code} - ${course.name}`);
      });
    } catch (error) {
      console.error("Gagal membaca file JSON:", error.message);
    }
  }
}

const mahasiswa = new DataMahasiswa2211104085();
mahasiswa.ReadJSON("./solution/jurnal7_1_2211104085.json");
