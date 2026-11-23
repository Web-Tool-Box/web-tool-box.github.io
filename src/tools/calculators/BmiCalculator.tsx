'use client';

import React, { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';

export default function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [cm, setCm] = useState(175);
  const [kg, setKg] = useState(70);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(9);
  const [lbs, setLbs] = useState(154);

  const { bmi, category, colorClass, minHealthy, maxHealthy } = useMemo(() => {
    let bmiVal = 0;
    let minH = 0;
    let maxH = 0;

    if (unit === 'metric') {
      const m = cm / 100;
      if (m > 0) {
        bmiVal = kg / (m * m);
        minH = Math.round(18.5 * m * m);
        maxH = Math.round(24.9 * m * m);
      }
    } else {
      const totalInches = feet * 12 + inches;
      if (totalInches > 0) {
        bmiVal = (703 * lbs) / (totalInches * totalInches);
        minH = Math.round((18.5 * totalInches * totalInches) / 703);
        maxH = Math.round((24.9 * totalInches * totalInches) / 703);
      }
    }

    const roundedBmi = parseFloat(bmiVal.toFixed(1));
    let cat = 'Normal weight';
    let col = 'text-emerald-500';

    if (roundedBmi < 18.5) {
      cat = 'Underweight';
      col = 'text-amber-500';
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      cat = 'Overweight';
      col = 'text-orange-500';
    } else if (roundedBmi >= 30) {
      cat = 'Obese';
      col = 'text-rose-500';
    }

    return {
      bmi: roundedBmi,
      category: cat,
      colorClass: col,
      minHealthy: minH,
      maxHealthy: maxH,
    };
  }, [unit, cm, kg, feet, inches, lbs]);

  return (
    <div className="space-y-6">
      {/* Unit Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setUnit('metric')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            unit === 'metric'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          Metric (cm, kg)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            unit === 'imperial'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          Imperial (ft/in, lbs)
        </button>
      </div>

      {/* Input Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        {unit === 'metric' ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Height</span>
                <span className="font-mono font-bold text-indigo-600">{cm} cm</span>
              </div>
              <input
                type="range"
                min={100}
                max={230}
                value={cm}
                onChange={(e) => setCm(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Weight</span>
                <span className="font-mono font-bold text-indigo-600">{kg} kg</span>
              </div>
              <input
                type="range"
                min={30}
                max={200}
                value={kg}
                onChange={(e) => setKg(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Height</span>
                <span className="font-mono font-bold text-indigo-600">{feet}ft {inches}in</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min={3}
                  max={7}
                  value={feet}
                  onChange={(e) => setFeet(parseInt(e.target.value) || 0)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs font-bold"
                />
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={inches}
                  onChange={(e) => setInches(parseInt(e.target.value) || 0)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-xs font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Weight</span>
                <span className="font-mono font-bold text-indigo-600">{lbs} lbs</span>
              </div>
              <input
                type="range"
                min={60}
                max={400}
                value={lbs}
                onChange={(e) => setLbs(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </>
        )}
      </div>

      {/* Result Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Your Calculated BMI
        </span>
        <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white">
          {bmi}
        </div>
        <p className={`text-base font-bold ${colorClass}`}>
          {category}
        </p>
        <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Healthy weight range for your height: {minHealthy} – {maxHealthy} {unit === 'metric' ? 'kg' : 'lbs'}
        </p>
      </div>
    </div>
  );
}
