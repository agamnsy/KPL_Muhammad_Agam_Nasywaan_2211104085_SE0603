const Aljabar = require("./aljabar");

const akar = Aljabar.AkarPersamaanKuadrat([1, -3, -10]);
console.log("Akar-akar persamaan kuadrat:");
console.log(akar);

const hasilKuadrat = Aljabar.HasilKuadrat([2, -3]);
console.log("\nHasil kuadrat dari persamaan linear:");
console.log(`${hasilKuadrat[0]}x^2 + ${hasilKuadrat[1]}x + ${hasilKuadrat[2]}\n`);