import React from 'react';
import { GHSHazardType } from '../../types';
import { GHSPictogram } from '../common/GHSPictogram';
import { GHS_HAZARD_TALLIES } from '../../data/mockData';
import { CheckCircle2 } from 'lucide-react';

interface GHSHazardMatrixProps {
  onSelectHazard?: (type: GHSHazardType) => void;
}

export const GHSHazardMatrix: React.FC<GHSHazardMatrixProps> = ({ onSelectHazard }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between h-full shadow-xs">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[13px] text-slate-900 tracking-tight">
            GHS Regulatory Hazard Distribution
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded uppercase tracking-wider">
            High Risk Watch
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Global Harmonization System live tally
        </p>
      </div>

      {/* 6 Grid items matching Image 2 */}
      <div className="grid grid-cols-3 gap-2.5 my-3">
        {GHS_HAZARD_TALLIES.map((hazard) => (
          <div
            key={hazard.type}
            onClick={() => onSelectHazard?.(hazard.type)}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/30 transition-all cursor-pointer group text-center"
          >
            {/* Pictogram icon */}
            <div className="mb-1 transform group-hover:scale-110 transition-transform">
              <GHSPictogram type={hazard.type} size="md" showDiamond={false} />
            </div>

            {/* Big Count */}
            <span className="font-extrabold text-[20px] text-slate-900 font-mono tabular-nums leading-tight">
              {hazard.count < 10 ? `0${hazard.count}` : hazard.count}
            </span>

            {/* Name */}
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              {hazard.name}
            </span>

            {/* Sub category / H-statement code */}
            <span className="text-[9.5px] font-semibold text-slate-500 mt-0.5">
              {hazard.category}
            </span>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="text-slate-500 font-medium">Chemical Compatibility Matrix:</span>
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>No Incompatible Co-Locations</span>
        </div>
      </div>
    </div>
  );
};
