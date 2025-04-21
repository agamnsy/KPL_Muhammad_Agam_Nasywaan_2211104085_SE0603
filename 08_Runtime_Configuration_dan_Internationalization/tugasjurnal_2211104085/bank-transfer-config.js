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
