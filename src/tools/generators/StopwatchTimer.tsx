'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function StopwatchTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef<number>(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      startRef.current = performance.now() - elapsed;
      const update = () => {
        setElapsed(performance.now() - startRef.current);
        animRef.current = requestAnimationFrame(update);
      };
      animRef.current = requestAnimationFrame(update);
    } else if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(2, '0')}`;
  };

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleLap = () => setLaps([elapsed, ...laps]);
  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
  };

  return (
    <div className="space-y-6 text-center">
      {/* Big Stopwatch Display */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <span className="font-mono text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
          {formatTime(elapsed)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleStartStop}
          className={`inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm text-white transition-all shadow-md ${
            isRunning ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors"
        >
          <Flag className="w-4 h-4" />
          <span>Lap</span>
        </button>

        <button
          onClick={handleReset}
          disabled={elapsed === 0}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Laps List */}
      {laps.length > 0 && (
        <div className="max-w-md mx-auto space-y-2 pt-4 text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Recorded Laps
          </span>
          <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-h-48 overflow-y-auto">
            {laps.map((lap, idx) => (
              <div key={idx} className="flex justify-between p-3 font-mono text-xs">
                <span className="text-slate-400 font-bold">Lap {laps.length - idx}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{formatTime(lap)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
