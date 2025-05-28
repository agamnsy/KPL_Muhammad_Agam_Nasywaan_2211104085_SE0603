class AljabarLibraries {
    /**
   * Menghitung akar-akar dari persamaan kuadrat ax^2 + bx + c = 0
   * @param {number[]} persamaan - Array berisi [a, b, c]
   * @returns {number[]} Array akar-akar, kosong jika tidak real
   */
    static akarPersamaanKuadrat(persamaan) {
    const [a, b, c] = persamaan;
    const diskriminan = b * b - 4 * a * c;

    if (diskriminan < 0) {
      return []; // Tidak ada akar real
    } else if (diskriminan === 0) {
      const x = -b / (2 * a); // Akar tunggal
        return [x];
    } else {
      const x1 = (-b + Math.sqrt(diskriminan)) / (2 * a);
      const x2 = (-b - Math.sqrt(diskriminan)) / (2 * a);
        return [x1, x2];
    }
    }

    /**
   * Mengkuadratkan bentuk (ax + b)^2 menjadi [a^2, 2ab, b^2]
   * @param {number[]} persamaan - Array berisi [a, b]
   * @returns {number[]} Koefisien hasil kuadrat
   */
    static hasilKuadrat(persamaan) {
    const [a, b] = persamaan;

    const aKuadrat = a * a;
    const duaAB = 2 * a * b;
    const bKuadrat = b * b;

    return [aKuadrat, duaAB, bKuadrat];
    }
}

module.exports = AljabarLibraries;
