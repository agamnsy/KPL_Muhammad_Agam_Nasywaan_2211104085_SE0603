const { CariTandaBilangan } = require('./logic');

test('Angka negatif', () => {
    expect(CariTandaBilangan(-10)).toBe('Negatif');
});

test('Angka positif', () => {
    expect(CariTandaBilangan(5)).toBe('Positif');
});

test('Angka nol', () => {
    expect(CariTandaBilangan(0)).toBe('Nol');
});
