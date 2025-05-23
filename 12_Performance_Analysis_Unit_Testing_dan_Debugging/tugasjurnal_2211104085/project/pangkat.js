function CariNilaiPangkat(a, b) {
  if (b === 0) return 1;
  if (b < 0) return -1;
  if (b > 10 || a > 100) return -2;

  let hasil = 1;
  try {
    for (let i = 0; i < b; i++) {
      hasil *= a;
      if (!Number.isSafeInteger(hasil)) throw new Error("Overflow");
    }
    return hasil;
  } catch (err) {
    return -3;
  }
}

module.exports = { CariNilaiPangkat };
