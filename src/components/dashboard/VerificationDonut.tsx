import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface VerificationDonutProps {
  verifiedCount?: number;
  pendingCount?: number;
  rejectedCount?: number;
  onFilterStatus?: (status: string) => void;
}

export const VerificationDonut: React.FC<VerificationDonutProps> = ({
  verifiedCount = 132,
  pendingCount = 18,
  rejectedCount = 6,
  onFilterStatus
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const total = verifiedCount + pendingCount + rejectedCount;
  const verifiedPct = (verifiedCount / total) * 100;
  const pendingPct = (pendingCount / total) * 100;
  const rejectedPct = (rejectedCount / total) * 100;

  // Donut geometry: radius 64, stroke 14, circumference 2 * PI * 64 = 402.12
  const r = 62;
  const circ = 2 * Math.PI * r;

  const verifiedDash = (verifiedPct / 100) * circ;
  const pendingDash = (pendingPct / 100) * circ;
  const rejectedDash = (rejectedPct / 100) * circ;

  const verifiedOffset = 0;
  const pendingOffset = -verifiedDash;
  const rejectedOffset = -(verifiedDash + pendingDash);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between h-full shadow-xs">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-[13px] text-slate-900 tracking-tight">
              Verification Status Donut
            </h3>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:flex flex-col w-56 p-2 bg-slate-900 text-white text-[10px] rounded shadow-lg z-20">
                Statutory regulatory audits and factory floor lot acceptance against ISO 14001 and ZDHC guidelines.
              </div>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Statutory compliance & batch acceptance
        </p>
      </div>

      {/* SVG Donut Center */}
      <div className="relative flex items-center justify-center my-3">
        <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 160 160">
          {/* Base track */}
          <circle
            cx="80"
            cy="80"
            r={r}
            stroke="#F1F5F9"
            strokeWidth="15"
            fill="none"
          />

          {/* Verified Arc (Green) */}
          <circle
            cx="80"
            cy="80"
            r={r}
            stroke="#059669"
            strokeWidth={hoveredSlice === 'verified' ? '18' : '15'}
            strokeDasharray={`${verifiedDash} ${circ - verifiedDash}`}
            strokeDashoffset={verifiedOffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredSlice('verified')}
            onMouseLeave={() => setHoveredSlice(null)}
            onClick={() => onFilterStatus?.('verified')}
          />

          {/* Pending Arc (Blue) */}
          <circle
            cx="80"
            cy="80"
            r={r}
            stroke="#2563EB"
            strokeWidth={hoveredSlice === 'pending' ? '18' : '15'}
            strokeDasharray={`${pendingDash} ${circ - pendingDash}`}
            strokeDashoffset={pendingOffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredSlice('pending')}
            onMouseLeave={() => setHoveredSlice(null)}
            onClick={() => onFilterStatus?.('pending')}
          />

          {/* Rejected Arc (Red) */}
          <circle
            cx="80"
            cy="80"
            r={r}
            stroke="#DC2626"
            strokeWidth={hoveredSlice === 'rejected' ? '18' : '15'}
            strokeDasharray={`${rejectedDash} ${circ - rejectedDash}`}
            strokeDashoffset={rejectedOffset}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setHoveredSlice('rejected')}
            onMouseLeave={() => setHoveredSlice(null)}
            onClick={() => onFilterStatus?.('rejected')}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="font-extrabold text-[26px] text-slate-900 tracking-tight font-mono tabular-nums leading-none">
            {verifiedPct.toFixed(1)}%
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            COMPLIANT
          </span>
        </div>
      </div>

      {/* Legend Row matching Image 2 */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-[11px] text-center">
        <div
          onClick={() => onFilterStatus?.('verified')}
          className="cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
        >
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>{verifiedCount} Verified</span>
          </div>
          <span className="text-[10px] text-slate-500 block">84.6% ISO Safe</span>
        </div>

        <div
          onClick={() => onFilterStatus?.('pending')}
          className="cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
        >
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>{pendingCount} Pending</span>
          </div>
          <span className="text-[10px] text-slate-500 block">Lab Review</span>
        </div>

        <div
          onClick={() => onFilterStatus?.('rejected')}
          className="cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
        >
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>{rejectedCount} Rejected</span>
          </div>
          <span className="text-[10px] text-red-600 font-semibold block">Quarantined</span>
        </div>
      </div>
    </div>
  );
};
