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
  console.log('parts[0]', parts[0]);

  // use unary + to convert str-num
  parts[0] = (+parts[0]).toLocaleString('en');
  return parts.join('.');
};

export const sanitiseStringNum = (value: string) => {
  // remove all the non degit , non dot charactors form the string
  // then remove leading zeros except when followed by a dot (preserve "0." and ".5")
  let amount = value.replace(/[^0-9.]/g, '').replace(/^0+(?=\d)/, '');
  // handle multiple '.'
  const parts = amount.split('.');
  if (parts.length > 2) {
    amount = parts[0] + '.' + parts[1];
  }
  return amount;
};
