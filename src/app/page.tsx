'use client';
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const taxBrackets = {
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
type CountryCode = 'nz' | 'au';
export default function Home() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [calcResult, setCalcResult] = useState(0);
  const [takeHome, setTakeHome] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('nz');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setAnnualIncome('');
      return;
    }
    // remove all the non degit , non dot charactors form the string
    //https://nulldog.com/regex-remove-nondigit-characters
    // then remove leading zeros except when followed by a dot (preserve "0." and ".5")
    let amount = value.replace(/[^0-9.]/g, '').replace(/^0+(?=\d)/, '');
    // handle multiple '.'
    const parts = amount.split('.');
    if (parts.length > 2) {
      amount = parts[0] + '.' + parts[1];
    }
    setAnnualIncome(amount);
  };

  const addCommasToStr = (str: string) => {
    const parts = str.split('.');
    // use unary + to convert str-num
    console.log('parts[0]', parts[0]);
    parts[0] = (+parts[0]).toLocaleString('en');
    return parts.join('.');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let previousUpto = 0;
    let tax = 0;
    const incomeNum = +annualIncome;
    if (isNaN(incomeNum)) {
      setCalcResult(0);
      return;
    }
    for (const bracket of taxBrackets[selectedCountry]) {
      const { upto, rate } = bracket;
      console.log('incomeNum: ', incomeNum, ' upto: ', upto, ' rate: ', rate);
      if (incomeNum > upto) {
        // if the incomeNum is bigger than 'upto' amount
        //calculate and add the tax for the bracket, update previousUpto to upto, continue the loop
        tax += (upto - previousUpto) * rate;
        previousUpto = upto;
      } else {
        // otherwise calculate and add the tax and break the loop
        tax += (incomeNum - previousUpto) * rate;
        break;
      }
    }
    // unary + is used to convert to number
    setCalcResult(+tax.toFixed(2)); // Round to 2 decimal places
    setTakeHome(+(incomeNum - tax).toFixed(2));
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
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-full md:w-[500px] min-h-[500px] md:min-h-[400px] flex flex-col gap-6 items-center px-6 py-8 md:px-10 md:border-2 md:border-slate-800 rounded-2xl">
        <h1 className="text-3xl text-sky-900 font-medium">
          Tax calculator 2025/2026
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-6 text-2xl px-4"
        >
          {/* country options */}
          <fieldset className="w-full flex flex-row justify-between">
            <legend>Select your country:</legend>
            <div className="flex gap-8">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="nz-tax"
                  title="New Zealand"
                  name="country"
                  value="nz"
                  checked={selectedCountry === 'nz'}
                  onChange={handleCountryChange}
                  className="appearance-none h-6 w-6 rounded-full checked:bg-sky-600 border-sky-900 border focus:ring-2 focus:ring-sky-500"
                />
                <label htmlFor="nz-tax">NZ</label>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="au-tax"
                    title="Australia"
                    name="country"
                    value="au"
                    checked={selectedCountry === 'au'}
                    onChange={handleCountryChange}
                    className="appearance-none h-6 w-6 rounded-full checked:bg-sky-600 border-sky-900 border"
                  />
                  <label htmlFor="au-tax">AU</label>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="annual-income" className="w-full">
              Enter your taxable annual income:
            </label>
            <div className="relative w-full flex gap-2 items-center z-10 border-sky-800 border-2 rounded-[10px]">
              <span className="absolute left-4">$</span>
              <input
                type="text"
                id="annual-income"
                value={annualIncome ? addCommasToStr(annualIncome) : ''}
                placeholder="0"
                onChange={handleAmountChange}
                className="w-full px-12 py-2 text-right rounded-[10px]"
                inputMode="decimal"
                required
              />
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
        <div className="w-full rounded-2xl mt-6">
          <div className="w-full flex justify-between items-center text-2xl">
            <div className="w-[45%] md:w-[32%]">Tax to Pay:</div>
            <div className="w-[55%] md:w-[67%] flex justify-between bg-sky-900 px-4 py-2 rounded-[10px] text-white">
              <span>$</span>
              <span>{calcResult.toLocaleString('en')}</span>
            </div>
          </div>
        </div>
        <div className="w-full rounded-2xl mt-6">
          <div className="w-full flex justify-between items-center text-2xl">
            <div className="w-[45%] md:w-[32%]">Take Home:</div>
            <div className="w-[55%] md:w-[67%] flex justify-between bg-sky-900 px-4 py-2 rounded-[10px] text-white">
              <span>$</span>
              <span>{takeHome}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
