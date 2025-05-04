import React from 'react';

const PriceRangeSlider = ({
  min = 0,
  max = 1000,
  step = 10,
  value = { min: 200, max: 800 },
  onChange,
}) => {
  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), value.max - step);
    onChange?.({ min: newMin, max: value.max });
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), value.min + step);
    onChange?.({ min: value.min, max: newMax });
  };

  const range = max - min;
  const leftPercent = ((value.min - min) / range) * 100;
  const rightPercent = ((value.max - min) / range) * 100;

  return (
    <div className="w-full px-2 py-4">
      <div className="flex justify-between text-sm text-gray-700">
        <span className="text-xs">OMR {value.min}</span>
        <span className="text-xs">OMR {value.max}</span>
      </div>

      <div className="relative h-4">
        {/* Inactive track */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-full -translate-y-1/2" />

        {/* Active range track */}
        <div
          className="absolute top-1/2 h-1 bg-red-500 rounded-full -translate-y-1/2"
          style={{
            left: `${leftPercent}%`,
            width: `${rightPercent - leftPercent}%`,
          }}
        />

        {/* Range inputs */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.min}
          onChange={handleMinChange}
          className="absolute w-full h-4 bg-transparent appearance-none pointer-events-none z-30"
          style={{ zIndex: value.min === value.max ? 40 : 50 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.max}
          onChange={handleMaxChange}
          className="absolute w-full h-4 bg-transparent appearance-none pointer-events-none z-40"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
