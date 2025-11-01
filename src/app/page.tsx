'use client';
import CalculatorForm from '@/src/components/CalculatorForm';
export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-full md:w-[500px] min-h-[500px] md:min-h-[400px] flex flex-col gap-6 items-center px-6 py-8 md:px-10 md:border-2 md:border-slate-800 rounded-2xl">
        <h1 className="text-3xl text-sky-900 font-medium">
          Tax calculator 2025/2026
        </h1>
        <CalculatorForm />
      </div>
    </main>
  );
}
