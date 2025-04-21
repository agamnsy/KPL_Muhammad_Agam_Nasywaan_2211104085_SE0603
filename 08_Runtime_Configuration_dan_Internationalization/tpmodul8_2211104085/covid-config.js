const fs = require("fs");
const path = require("path");

class CovidConfig {
  constructor() {
    this.configPath = path.join(__dirname, "covid_config.json");
    this.defaultConfig = {
      satuan_suhu: "celcius",
      batas_hari_deman: 14,
      pesan_ditolak: "Anda tidak diperbolehkan masuk ke dalam gedung ini\n",
      pesan_diterima: "Anda dipersilahkan untuk masuk ke dalam gedung ini\n",
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

  ubahSatuan() {
    this.config.satuan_suhu = this.config.satuan_suhu === "celcius" ? "fahrenheit" : "celcius";
    this.saveConfig();
    console.log(`Satuan suhu berhasil diubah menjadi ${this.config.satuan_suhu}`);
  }
}

module.exports = CovidConfig;