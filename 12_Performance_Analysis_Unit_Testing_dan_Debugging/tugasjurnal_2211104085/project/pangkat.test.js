const { CariNilaiPangkat } = require("./pangkat");

test("pangkat biasa 2^3 = 8", () => {
  expect(CariNilaiPangkat(2, 3)).toBe(8);
});

test("0^0 = 1", () => {
  expect(CariNilaiPangkat(0, 0)).toBe(1);
});

test("negatif pangkat return -1", () => {
  expect(CariNilaiPangkat(2, -2)).toBe(-1);
});

test("pangkat lebih dari 10 return -2", () => {
  expect(CariNilaiPangkat(2, 11)).toBe(-2);
});

test("nilai a lebih dari 100 return -2", () => {
  expect(CariNilaiPangkat(101, 2)).toBe(-2);
});

test("overflow return -3", () => {
  expect(CariNilaiPangkat(100, 10)).toBe(-3);
});