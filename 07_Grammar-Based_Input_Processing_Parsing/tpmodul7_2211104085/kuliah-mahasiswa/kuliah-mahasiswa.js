const fs = require("fs");

class KuliahMahasiswa2211104085 {
  constructor() {
    this.courses = [];
  }

  ReadJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(data);

      this.courses = jsonData.courses;

      console.log("Daftar mata kuliah yang diambil:");
      this.courses.forEach((course, index) => {
        console.log(`MK ${index + 1} ${course.code} - ${course.name}`);
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat membaca file JSON:", error.message);
    }
  }
}

const mahasiswa = new KuliahMahasiswa2211104085();
mahasiswa.ReadJSON('./solution/tp7_2_2211104085.json');

