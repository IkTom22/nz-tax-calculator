'use client';

import CalculatorForm from '@/src/components/CalculatorForm';
import { useState } from 'react';
import ResultDisplay from '@/src/components/ResultDisplay';
export default function Home() {
  const [calcResult, setCalcResult] = useState(0);
  const [takeHome, setTakeHome] = useState(0);
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-full md:w-[500px] min-h-[500px] md:min-h-[400px] flex flex-col gap-6 items-center px-6 py-8 md:px-10 md:border-2 md:border-slate-800 rounded-2xl">
        <h1 className="text-3xl text-sky-900 font-medium">
          Tax calculator 2025/2026
        </h1>
        <CalculatorForm
          setCalcResult={setCalcResult}
          setTakeHome={setTakeHome}
        />
        {/* Tax display */}
        <ResultDisplay label="Tax to Pay:" value={calcResult} />
        <hr className="w-full text-slate-400 mt-2 mb-2" />
        {/* Take home display */}
        <ResultDisplay label="Take Home:" value={takeHome} />
      </div>
    </main>
  );
}
