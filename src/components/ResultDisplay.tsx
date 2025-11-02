// ResultDisplay.tsx
type ResultDisplayProps = {
  label: string;
  value: number;
};

const ResultDisplay = ({ label, value }: ResultDisplayProps) => {
  return (
    <div className="w-full flex justify-between items-center text-2xl">
      <div className="w-[45%] md:w-[32%]">{label}</div>
      <div
        className={`w-[55%] md:w-[67%] flex justify-between ${label.includes('Tax') && 'bg-sky-900 text-white'} px-4 py-2 rounded-[10px]`}
      >
        <span>$</span>
        <span>{value.toLocaleString('en')}</span>
      </div>
    </div>
  );
};

export default ResultDisplay;
