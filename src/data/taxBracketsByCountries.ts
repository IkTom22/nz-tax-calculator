export const taxBracketsByCountries = {
  nz: [
    { upto: 15600, rate: 0.105 },
    { upto: 53500, rate: 0.175 },
    { upto: 78100, rate: 0.3 },
    { upto: 180000, rate: 0.33 },
    { upto: Infinity, rate: 0.39 },
  ],
  au: [
    { upto: 18200, rate: 0 },
    { upto: 45000, rate: 0.16 },
    { upto: 135000, rate: 0.3 },
    { upto: 190000, rate: 0.37 },
    { upto: Infinity, rate: 0.45 },
  ],
};
export type CountryCode = 'nz' | 'au';
