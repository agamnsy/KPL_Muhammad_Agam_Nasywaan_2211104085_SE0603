class AljabarLibraries {
  static AkarPersamaanKuadrat(persamaan) {
    const [a, b, c] = persamaan;
    const diskriminan = b * b - 4 * a * c;

    if (diskriminan < 0) {
      return [];
    } else if (diskriminan === 0) {
      const x = -b / (2 * a);
      return [x];
    } else {
      const x1 = (-b + Math.sqrt(diskriminan)) / (2 * a);
      const x2 = (-b - Math.sqrt(diskriminan)) / (2 * a);
      return [x1, x2];
    }
  }

  static HasilKuadrat(persamaan) {
    const [a, b] = persamaan;

    const a2 = a * a;
    const ab2 = 2 * a * b;
    const b2 = b * b;

    return [a2, ab2, b2];
  }
}

module.exports = AljabarLibraries;