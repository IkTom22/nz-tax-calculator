'use client';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const taxBrackets = [
  { upto: 15600, rate: 0.105 },
  { upto: 53500, rate: 0.175 },
  { upto: 78100, rate: 0.3 },
  { upto: 180000, rate: 0.33 },
  { upto: Infinity, rate: 0.39 },
];
export default function Home() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [calcResult, setCalcResult] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setAnnualIncome('');
    }
    // remove all the non degit , non dot charactors form the string
    //https://nulldog.com/regex-remove-nondigit-characters
    let amount = value.replace(/[^0-9.]/g, '');
    if (amount.charAt(0) == '0') {
      // if the number starts from 0, remove the first 0
      amount = amount.slice(1);
    }
    setAnnualIncome(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let previewUpto = 0;
    let tax = 0;
    for (const bracket of taxBrackets) {
      const { upto, rate } = bracket;
      const incomeNum = parseFloat(annualIncome);
      console.log('incomeNum: ', incomeNum, ' upto: ', upto, ' rate: ', rate);
      if (incomeNum > upto) {
        // if the incomeNum is bigger than 'upto' amount
        //calculate and add the tax for the bracket, update previousUpto to upto, continue the loop
        tax += (upto - previewUpto) * rate;
        previewUpto = upto;
      } else {
        // otherwise calculate and add the tax and break the loop
        tax += (incomeNum - previewUpto) * rate;
        break;
      }
    }
    setCalcResult(parseFloat(tax.toFixed(2))); // Round to 2 decimal places
  };

  const handleClearInput = () => {
    setAnnualIncome('');
    setCalcResult(0);
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
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="annual-income"
              className="w-full text-center text-[20px]"
            >
              Enter your taxable annual income
            </label>
            <div className="relative w-full flex gap-2 items-center z-10 border-sky-800 border-2 rounded-[10px]">
              <span className="absolute left-4">$</span>
              <input
                type="text"
                id="annual-income"
                value={annualIncome}
                placeholder="0.00"
                onChange={handleAmountChange}
                className="w-full px-12 py-2 text-right rounded-[10px]"
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
            className="py-2 px-6 bg-sky-900 text-white rounded-full"
          >
            Calculate
          </button>
        </form>
        <div className="w-full rounded-2xl mt-6">
          <div className="w-full flex justify-between items-center text-2xl">
            <div className="w-[45%] md:w-[30%]">Tax to Pay:</div>
            <div className="w-[55%] md:w-[67%] flex justify-between bg-sky-900 px-4 py-2 rounded-[10px] text-white">
              <span>$</span>
              <span>{calcResult.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
