# Laporan Praktikum Konstruksi Perangkat Lunak

#### Nama : Muhammad Agam Nasywaan

#### NIM : 2211104085 / SE-06-03

## Tugas Jurnal

### Bank Transfer Config - Implementasi Runtime Configuration

#### File JSON

```
{
  "lang": "id",
  "transfer": {
    "threshold": 10000000,
    "low_fee": 5000,
    "high_fee": 12000
  },
  "methods": ["QRIS", "Mobile Banking", "ATM", "Internet Banking"],
  "confirmation": {
    "en": "confirm",
    "id": "konfirmasi"
  }
}
```

#### File bank-transfer-config.js

```
const fs = require("fs");
const path = require("path");

class BankTransferConfig {
  constructor() {
    this.configPath = path.join(__dirname, "bank_transfer_config.json");
    this.defaultConfig = {
      lang: "en",
      transfer: {
        threshold: 25000000,
        low_fee: 6500,
        high_fee: 15000,
      },
      methods: ["RTO (real-time)", "SKN", "RTGS", "BI FAST"],
      confirmation: {
        en: "yes",
        id: "ya",
      },
    };

    this.config = this.loadConfig();
  }

  loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, "utf8");
        return JSON.parse(data);
      } else {
        return this.defaultConfig;
      }
    } catch (err) {
      console.error("Gagal membaca konfigurasi, menggunakan default.");
      return this.defaultConfig;
    }
  }

  saveConfig() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }
}

module.exports = BankTransferConfig;
```

#### File main.js (Program utama)

```
const readline = require("readline");
const BankTransferConfig = require("./bank-transfer-config");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async function main() {
  const configHandler = new BankTransferConfig();
  const config = configHandler.config;

  const lang = config.lang;
  const prompt = lang === "id" ? "Masukkan jumlah uang yang akan di-transfer: " : "Please insert the amount of money to transfer: ";
  const amountInput = await ask(prompt);
  const amount = parseInt(amountInput);

  const fee = amount <= config.transfer.threshold ? config.transfer.low_fee : config.transfer.high_fee;
  const total = amount + fee;

  if (lang === "id") {
    console.log(`Biaya transfer = ${fee}`);
    console.log(`Total biaya = ${total}`);
    console.log("Pilih metode transfer:");
  } else {
    console.log(`Transfer fee = ${fee}`);
    console.log(`Total amount = ${total}`);
    console.log("Select transfer method:");
  }

  config.methods.forEach((method, i) => {
    console.log(`${i + 1}. ${method}`);
  });

  await ask("> ");

  const confirmPrompt = lang === "id" ? `Ketik "${config.confirmation.id}" untuk mengkonfirmasi transaksi: ` : `Please type "${config.confirmation.en}" to confirm the transaction: `;

  const confirmInput = await ask(confirmPrompt);
  const isConfirmed = (lang === "id" && confirmInput.toLowerCase() === config.confirmation.id.toLowerCase()) || (lang === "en" && confirmInput.toLowerCase() === config.confirmation.en.toLowerCase());

  if (isConfirmed) {
    console.log(lang === "id" ? "Proses transfer berhasil" : "The transfer is completed");
  } else {
    console.log(lang === "id" ? "Transfer dibatalkan" : "Transfer is cancelled");
  }

  rl.close();
})();
```

#### Output
![Image](https://github.com/user-attachments/assets/e70f761d-5bf4-445c-bfd1-bb6dc22a5d69)

#### Penjelasan Kode

Kode ini terdiri dari tiga bagian utama, yaitu bank-transfer-config.js, main.js, dan bank-transfer-config.json. Kelas BankTransferConfig bertugas memproses file konfigurasi JSON untuk menyimpan pengaturan seperti bahasa (lang), ambang batas transfer (threshold), biaya transfer (low_fee dan high_fee), metode transfer (methods), serta kata konfirmasi transaksi dalam bahasa Inggris dan Indonesia. Jika file konfigurasi belum tersedia, kelas ini akan memuat nilai default dan menyimpannya. File main.js merupakan program utama yang menggunakan kelas konfigurasi tersebut untuk menampilkan pesan interaktif sesuai bahasa yang dipilih, menerima input jumlah transfer, menghitung biaya dan total yang harus dibayar berdasarkan ambang batas yang ditentukan, serta menampilkan pilihan metode transfer dan melakukan konfirmasi transaksi. File bank_transfer_config.json menyimpan konfigurasi yang dapat dimodifikasi sesuai kebutuhan, sehingga program bersifat fleksibel terhadap perubahan tanpa perlu mengubah kode utama.
