class MatematikaLibraries {
  static FPB(input1, input2) {
    let a = Math.abs(input1);
    let b = Math.abs(input2);

    while (b) {
      let temp = b;
      b = a % b;
      a = temp;
    }

    return a;
  }

  static KPK(input1, input2) {
    return Math.abs(input1 * input2) / this.FPB(input1, input2);
  }

  static Turunan(persamaan) {
    let result = [];

    for (let i = 0; i < persamaan.length - 1; i++) {
      const koefisien = persamaan[i] * (persamaan.length - 1 - i);
      const pangkat = persamaan.length - 2 - i;

      if (koefisien !== 0) {
        if (pangkat === 0) {
          result.push(koefisien.toString());
        } else if (pangkat === 1) {
          result.push(`${koefisien}x`);
        } else {
          result.push(`${koefisien}x${pangkat}`);
        }
      }
    }

    return result.join(" + ").replace(/\+ -/g, "- ");
  }

  static Integral(persamaan) {
    let result = [];

    for (let i = 0; i < persamaan.length; i++) {
      const pangkat = persamaan.length - i;
      const koefisien = persamaan[i] / pangkat;

      if (koefisien !== 0) {
        if (pangkat === 1) {
          result.push(`${koefisien}x`);
        } else {
          result.push(`${koefisien}x${pangkat}`);
        }
      }
    }

    result.push("C");

    return result.join(" + ").replace(/\+ -/g, "- ");
  }
}

module.exports = MatematikaLibraries;