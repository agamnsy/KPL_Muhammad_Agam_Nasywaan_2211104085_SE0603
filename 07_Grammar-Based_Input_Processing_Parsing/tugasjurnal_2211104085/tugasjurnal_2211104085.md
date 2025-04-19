# Laporan Praktikum Konstruksi Perangkat Lunak
#### Nama : Muhammad Agam Nasywaan
#### NIM  : 2211104085 / SE-06-03

## Tugas Jurnal

### 1. Menambahkan JSON Deserialization 1 - Menambahkan Class DataMahasiswa2211104085

#### File JSON
```
{
  "firstName": "Muhammad Agam",
  "lastName": "Nasywaan",
  "gender": "Male",
  "age": 20,
  "address": {
    "streetAddress": "Jalan Kisar No. 46",
    "city": "Banyumas",
    "state": "Center Java"
  },
  "courses": [
    { "code": "SE0001", "name": "Konstruksi Perangkat Lunak" },
    { "code": "SE0002", "name": "Tata Tulis Ilmiah" },
    { "code": "SE0003", "name": "Kecerdasan Buatan" },
    { "code": "SE0004", "name": "Proyek Tingkat II" },
    { "code": "SE0005", "name": "Design Thinking" }
  ]
}
```

#### File JS
```
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
```

#### Output
![Image](https://github.com/user-attachments/assets/03862fd4-86f6-4062-a3a2-f9185dbbcc4f)

#### Penjelasan Kode
Kode ini membuat sebuah class bernama DataMahasiswa2211104085 yang bertugas membaca dan memproses file JSON berisi informasi lengkap seorang mahasiswa, termasuk nama, jenis kelamin, usia, alamat, dan daftar mata kuliah yang diambil. Dalam method ReadJSON(), file JSON dibaca dari folder solution, kemudian di-deserialize (diubah menjadi objek JavaScript) menggunakan JSON.parse(). Setelah itu, setiap atribut seperti firstName, lastName, gender, age, dan objek address dicetak secara eksplisit. Informasi alamat diakses melalui property streetAddress, city, dan state. Selain itu, daftar courses ditampilkan menggunakan forEach() dengan format <kode mata kuliah> - <nama mata kuliah>. Pendekatan ini memungkinkan seluruh data mahasiswa ditampilkan secara lengkap dan terstruktur di console, memberikan gambaran menyeluruh tentang data personal dan akademik mahasiswa.


### 2. Menambahkan JSON Deserialization 2 - Menambahkan Class TeamMembers2211104085

#### File JSON
```
{
  "members": [
    {
      "firstName": "Muhammad Imam",
      "lastName": "Al Amin",
      "gender": "Male",
      "age": 20,
      "nim": "2211104077"
    },
    {
      "firstName": "Muhammad",
      "lastName": "Chairul Anam",
      "gender": "Male",
      "age": 19,
      "nim": "2211104072"
    },
    {
      "firstName": "Rosyid Mukti",
      "lastName": "Wibowo",
      "gender": "Male",
      "age": 21,
      "nim": "2211104076"
    }
  ]
}
```

#### File JS
```
const fs = require("fs");

class TeamMembers2211104085 {
  ReadJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const obj = JSON.parse(data);

      console.log("Kamitetep Team Member :");
      obj.members.forEach((member) => {
        const fullName = `${member.firstName} ${member.lastName}`;
        console.log(`${member.nim} ${fullName} (${member.age} ${member.gender})`);
      });
    } catch (error) {
      console.error("Gagal membaca file JSON:", error.message);
    }
  }
}

const team = new TeamMembers2211104085();
team.ReadJSON("./solution/jurnal7_2_2211104085.json");
```

#### Output
![Image](https://github.com/user-attachments/assets/ccf9f4da-ae2e-443f-8ca3-d1e9464b8cde)

#### Penjelasan Kode
Kode ini membuat sebuah class bernama TeamMembers2211104085 yang bertugas membaca dan memproses file JSON yang berisi daftar anggota tim. Method ReadJSON() melakukan parsing terhadap file JSON dan menampilkan daftar anggota tim dengan format terstruktur. Setiap anggota tim dicetak dalam format: <nim> <firstName lastName> (<age> <gender>). File JSON dipanggil dari folder solution, dan objek members di-loop satu per satu menggunakan forEach untuk mengambil dan mencetak informasi lengkap setiap anggota. Kode ini mempermudah pembacaan data anggota tim dalam format yang informatif dan mudah dibaca.


### 3. Menambahkan JSON Deserialization 3 - Menambahkan Class GlossaryItem2211104085

#### File JSON
```
{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": {
        "GlossEntry": {
          "ID": "SGML",
          "SortAs": "SGML",
          "GlossTerm": "Standard Generalized Markup Language",
          "Acronym": "SGML",
          "Abbrev": "ISO 8879:1986",
          "GlossDef": {
            "para": "A meta-markup language, used to create markup languages such as DocBook.",
            "GlossSeeAlso": ["GML", "XML"]
          },
          "GlossSee": "markup"
        }
      }
    }
  }
}
```

#### File JS
```
const fs = require("fs");

class GlossaryItem2211104085 {
  ReadJSON(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(data);

      const entry = jsonData.glossary.GlossDiv.GlossList.GlossEntry;

      console.log("========== Glossary Entry ==========");
      console.log(`ID         : ${entry.ID}`);
      console.log(`Sort As    : ${entry.SortAs}`);
      console.log(`Gloss Term : ${entry.GlossTerm}`);
      console.log(`Acronym    : ${entry.Acronym}`);
      console.log(`Abbrev     : ${entry.Abbrev}`);
      console.log(`Definition : ${entry.GlossDef.para}`);
      console.log(`See Also   : ${entry.GlossDef.GlossSeeAlso.join(", ")}`);
      console.log(`See        : ${entry.GlossSee}`);
    } catch (error) {
      console.error("Gagal membaca file JSON:", error.message);
    }
  }
}

const glossary = new GlossaryItem2211104085();
glossary.ReadJSON("./solution/jurnal7_3_2211104085.json");
```

#### Output
![Image](https://github.com/user-attachments/assets/14d1adda-1035-4671-93c2-146b84c40db0)

#### Penjelasan Kode
Kode ini mendefinisikan class GlossaryItem2211104085 yang bertugas membaca file JSON bertipe glossary dan memproses bagian GlossEntry. Method ReadJSON() membaca file JSON dari folder solution, lalu memparsingnya menjadi objek JavaScript. Fokus pengambilan data dilakukan pada bagian GlossEntry saja, yang mencakup informasi seperti ID, SortAs, GlossTerm, Acronym, Abbrev, definisi (para), daftar referensi lain (GlossSeeAlso), dan kata kunci yang direferensikan (GlossSee). Semua informasi tersebut kemudian dicetak ke console dalam format yang rapi dan deskriptif, memudahkan pemahaman isi dari sebuah entri glossary.