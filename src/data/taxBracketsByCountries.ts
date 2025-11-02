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
  sg: [
    { upto: 20000, rate: 0 },
    { upto: 30000, rate: 0.02 },
    { upto: 40000, rate: 0.035 },
    { upto: 80000, rate: 0.07 },
    { upto: 120000, rate: 0.115 },
    { upto: 160000, rate: 0.15 },
    { upto: 200000, rate: 0.18 },
    { upto: 240000, rate: 0.19 },
    { upto: 280000, rate: 0.195 },
    { upto: 320000, rate: 0.2 },
    { upto: 500000, rate: 0.22 },
    { upto: 1000000, rate: 0.23 },
    { upto: Infinity, rate: 0.24 },
  ],
};
export type CountryCode = 'nz' | 'au' | 'sg';
// Taxable income band SG	National income tax rates
// 1 to 20,000

// 0%

// 20,001 to 30,000

// 2%

// 30,001 to 40,000

// 3.5%

// 40,001 to 80,000

// 7%

// 80,001 to 120,000

// 11.5%

// 120,001 to 160,000

// 15%

// 160,001 to 200,000

// 18%

// 200,001 to 240,000

// 19%

// 240,001 to 280,000

// 19.5%

// 280,001 to 320,000	20%
// 320,001 to 500,000	22%
// 500,001 to 1,000,000	23%
// 1,000,000 +	24%
// zhr-dzpu-cup
