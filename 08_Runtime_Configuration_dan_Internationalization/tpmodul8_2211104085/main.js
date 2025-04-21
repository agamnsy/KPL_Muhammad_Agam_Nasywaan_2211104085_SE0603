const readline = require("readline");
const CovidConfig = require("./covid-config");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

(async function main() {
  const configHandler = new CovidConfig();
  const config = configHandler.config;

  // Pengubah satuan suhu
  // configHandler.ubahSatuan();

  const suhuInput = await askQuestion(`\nBerapa suhu badan anda saat ini? Dalam nilai ${config.satuan_suhu}: `);
  const suhu = parseFloat(suhuInput);

  const hariInput = await askQuestion("Berapa hari yang lalu (perkiraan) anda terakhir memiliki gejala demam? ");
  const hariDemam = parseInt(hariInput);

  rl.close();

  let suhuNormal = false;
  if (config.satuan_suhu === "celcius") {
    suhuNormal = suhu >= 36.5 && suhu <= 37.5;
  } else if (config.satuan_suhu === "fahrenheit") {
    suhuNormal = suhu >= 97.7 && suhu <= 99.5;
  }

  const hariCukup = hariDemam < config.batas_hari_deman;

  if (suhuNormal && hariCukup) {
    console.log(config.pesan_diterima);
  } else {
    console.log(config.pesan_ditolak);
  }
})();
