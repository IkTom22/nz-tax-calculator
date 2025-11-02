import {
  taxBracketsByCountries,
  CountryCode,
} from '@/src/data/taxBracketsByCountries';
export const calculateTax = (income: number, country: CountryCode) => {
  let previousUpto = 0;
  let tax = 0;

  for (const bracket of taxBracketsByCountries[country]) {
    const { upto, rate } = bracket;
    if (income > upto) {
      tax += (upto - previousUpto) * rate;
      previousUpto = upto;
    } else {
      tax += (income - previousUpto) * rate;
      break;
    }
  }

  return +tax.toFixed(2);
};

export const formatNumberWithCommas = (str: string) => {
  const parts = str.split('.');
  // use unary + to convert str-num
  console.log('parts[0]', parts[0]);
  parts[0] = (+parts[0]).toLocaleString('en');
  return parts.join('.');
};
