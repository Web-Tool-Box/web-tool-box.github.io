'use client';

import React, { useState, useMemo } from 'react';
import { Landmark, PieChart, Calendar, DollarSign } from 'lucide-react';

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const { emi, totalInterest, totalPayment, schedule } = useMemo(() => {
    const P = principal;
    const r = interestRate / 12 / 100; // monthly rate
    const n = tenureYears * 12; // total months

    if (P <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
    }

    const emiCalc = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiCalc * n;
    const totalInt = totalPay - P;

    // Year-wise schedule
    let balance = P;
    const yearSchedule = [];

    for (let y = 1; y <= tenureYears; y++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        const intForMonth = balance * r;
        const princForMonth = emiCalc - intForMonth;
        yearlyInterest += intForMonth;
        yearlyPrincipal += princForMonth;
        balance = Math.max(0, balance - princForMonth);
      }

      yearSchedule.push({
        year: y,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(balance),
      });
    }

    return {
      emi: Math.round(emiCalc),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
      schedule: yearSchedule,
    };
  }, [principal, interestRate, tenureYears]);

  return (
    <div className="space-y-6">
      {/* Sliders Input Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Loan Amount</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">${principal.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={10000}
            max={2000000}
            step={5000}
            value={principal}
            onChange={(e) => setPrincipal(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Interest Rate (%)</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{interestRate}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Tenure (Years)</span>
            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{tenureYears} Years</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={tenureYears}
            onChange={(e) => setTenureYears(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Monthly EMI
          </span>
          <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">
            ${emi.toLocaleString()}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Total Interest
          </span>
          <span className="text-3xl font-black text-slate-800 dark:text-slate-200 mt-1 block">
            ${totalInterest.toLocaleString()}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Total Payment
          </span>
          <span className="text-3xl font-black text-slate-800 dark:text-slate-200 mt-1 block">
            ${totalPayment.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Amortization Table */}
      {schedule.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Year-by-Year Amortization Schedule
          </span>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto bg-slate-50 dark:bg-slate-950">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 font-bold uppercase text-slate-500">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Principal Paid</th>
                  <th className="p-3">Interest Paid</th>
                  <th className="p-3">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{row.year}</td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400">${row.principal.toLocaleString()}</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400">${row.interest.toLocaleString()}</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">${row.balance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
