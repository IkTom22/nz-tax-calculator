import { calculateTax } from '../taxUtils';
// AU tax refference: https://moneysmart.gov.au/work-and-tax/income-tax-calculator

describe('calculateTax', () => {
  test('selected country is NZ', () => {
    expect(calculateTax(10000, 'nz')).toBe(1050);
    expect(calculateTax(35000, 'nz')).toBe(5033);
    expect(calculateTax(100000, 'nz')).toBe(22877.5);
    expect(calculateTax(220000, 'nz')).toBe(64877.5);
  });
  test('selected country is AU', () => {
    expect(calculateTax(10000, 'au')).toBe(0);
    expect(calculateTax(35000, 'au')).toBe(2688);
    expect(calculateTax(100000, 'au')).toBe(20788);
    expect(calculateTax(220000, 'au')).toBe(65138);
  });
});
