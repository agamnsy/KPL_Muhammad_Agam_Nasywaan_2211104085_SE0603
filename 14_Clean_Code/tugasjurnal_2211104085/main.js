const AljabarLibraries = require("./modul14_2211104085");

// Contoh penggunaan method akarPersamaanKuadrat
const akarAkar = AljabarLibraries.akarPersamaanKuadrat([1, -3, -10]);
console.log("Akar-akar persamaan kuadrat:");
console.log(akarAkar);

// Contoh penggunaan method hasilKuadrat
const hasilKuadrat = AljabarLibraries.hasilKuadrat([2, -3]);
console.log("\nHasil kuadrat dari bentuk (2x - 3)^2:");
console.log(`${hasilKuadrat[0]}x^2 + ${hasilKuadrat[1]}x + ${hasilKuadrat[2]}\n`);
