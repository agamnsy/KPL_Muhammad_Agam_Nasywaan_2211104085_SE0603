const { CariNilaiPangkat } = require("./pangkat");

window.hitungPangkat = function () {
  const a = parseInt(document.getElementById("inputA").value);
  const b = parseInt(document.getElementById("inputB").value);
  const hasil = CariNilaiPangkat(a, b);
  document.getElementById("output").innerText = `Hasil: ${hasil}`;
};
