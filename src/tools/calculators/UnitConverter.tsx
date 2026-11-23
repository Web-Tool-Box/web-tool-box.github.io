'use client';

import React, { useState } from 'react';
import { Scale } from 'lucide-react';

export default function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight' | 'temp' | 'storage'>('length');
  const [val, setVal] = useState<number>(10);
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');

  const unitFactors: Record<string, Record<string, number>> = {
    length: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701,
    },
    weight: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      pounds: 2.20462,
      ounces: 35.274,
      metricTons: 0.001,
    },
    storage: {
      bytes: 1,
      kilobytes: 1 / 1024,
      megabytes: 1 / 1048576,
      gigabytes: 1 / 1073741824,
      terabytes: 1 / 1099511627776,
    },
  };

  const calculateResult = () => {
    if (category === 'temp') {
      if (fromUnit === toUnit) return val;
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (val * 9) / 5 + 32;
      if (fromUnit === 'celsius' && toUnit === 'kelvin') return val + 273.15;
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return ((val - 32) * 5) / 9;
      if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return ((val - 32) * 5) / 9 + 273.15;
      if (fromUnit === 'kelvin' && toUnit === 'celsius') return val - 273.15;
      if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return ((val - 273.15) * 9) / 5 + 32;
      return val;
    }

    const factors = unitFactors[category];
    if (!factors || !factors[fromUnit] || !factors[toUnit]) return val;

    // Convert to base, then to target
    const inBase = val / factors[fromUnit];
    return inBase * factors[toUnit];
  };

  const result = calculateResult();

  const handleCategoryChange = (cat: typeof category) => {
    setCategory(cat);
    if (cat === 'length') {
      setFromUnit('meters');
      setToUnit('feet');
    } else if (cat === 'weight') {
      setFromUnit('kilograms');
      setToUnit('pounds');
    } else if (cat === 'temp') {
      setFromUnit('celsius');
      setToUnit('fahrenheit');
    } else {
      setFromUnit('megabytes');
      setToUnit('gigabytes');
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap">
        {(['length', 'weight', 'temp', 'storage'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
              category === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Converter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            From
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold capitalize"
          >
            {category === 'temp'
              ? ['celsius', 'fahrenheit', 'kelvin'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))
              : Object.keys(unitFactors[category] || {}).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            To
          </label>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {typeof result === 'number' ? result.toLocaleString(undefined, { maximumFractionDigits: 4 }) : result}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold capitalize"
          >
            {category === 'temp'
              ? ['celsius', 'fahrenheit', 'kelvin'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))
              : Object.keys(unitFactors[category] || {}).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
          </select>
        </div>
      </div>
    </div>
  );
}
