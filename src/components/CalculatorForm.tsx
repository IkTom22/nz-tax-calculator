'use client';
import { useState, useEffect } from 'react';
import { CountryCode } from '@/src/data/taxBracketsByCountries';
import {
  calculateTax,
  formatNumberWithCommas,
  sanitiseStringNum,
} from '@/src/utils/taxUtils';
import { IoClose } from 'react-icons/io5';

type CalculatorFormProps = {
  setCalcResult: React.Dispatch<React.SetStateAction<number>>;
  setTakeHome: React.Dispatch<React.SetStateAction<number>>;
};
const CalculatorForm = (props: CalculatorFormProps) => {
  const { setCalcResult, setTakeHome } = props;
  const [annualIncome, setAnnualIncome] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('nz');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setAnnualIncome('');
      return;
    }
    const amount = sanitiseStringNum(value);
    setAnnualIncome(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeNum = +annualIncome;
    if (isNaN(incomeNum)) {
      setCalcResult(0);
      return;
    }
    const tax = calculateTax(incomeNum, selectedCountry);

    setCalcResult(tax);
    setTakeHome(+(incomeNum - tax).toFixed(2)); // unary + is used to convert to number
  };

  // Clear input
  const handleClearInput = () => {
    setAnnualIncome('');
    setCalcResult(0);
    setTakeHome(0);
  };
  useEffect(() => {
    if (!annualIncome) {
      setCalcResult(0);
      setTakeHome(0);
    }
  }, [annualIncome]);

  // Country options
  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCountry(e.target.value as CountryCode);
    setCalcResult(0);
    setTakeHome(0);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-6 text-2xl px-4"
      >
        {/* country options */}
        <fieldset className="w-full">
          <legend>Select your country:</legend>
          <div className="flex w-full justify-between mt-2">
            {['nz', 'au'].map((country) => (
              <div className="flex gap-2 items-center" key={country}>
                <input
                  type="radio"
                  id={`${country}-tax`}
                  title="New Zealand"
                  name="country"
                  value={country}
                  checked={selectedCountry === country}
                  onChange={handleCountryChange}
                  className="appearance-none h-6 w-6 rounded-full checked:bg-sky-600 border-sky-900 border focus:ring-2 focus:ring-sky-500"
                />
                <label htmlFor={`${country}-tax`}>
                  {country === 'nz' ? 'New Zealand' : 'Australia'}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        {/* Tax calculator */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="annual-income" className="w-full">
            Your taxable annual income:
          </label>
          <div className="relative w-full flex gap-2 items-center z-10 border-sky-800 border-2 rounded-[10px]">
            <span className="absolute left-4">$</span>
            <input
              type="text"
              id="annual-income"
              value={annualIncome ? formatNumberWithCommas(annualIncome) : ''}
              placeholder="0"
              onChange={handleAmountChange}
              className="w-full px-12 py-2 text-right rounded-[10px]"
              inputMode="decimal"
              required
            />
            {/* reset button */}
            {annualIncome && (
              <button
                type="button"
                onClick={handleClearInput}
                className="absolute right-4 text-rose-400 z-50"
              >
                <IoClose />
              </button>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-6 bg-sky-900 text-white rounded-full hover:cursor-pointer hover:bg-sky-800"
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;
