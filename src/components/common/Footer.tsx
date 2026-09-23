import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-9 bg-slate-100 border-t border-slate-200 px-4 flex items-center justify-between text-[11px] text-slate-500 font-mono select-none">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>RLS Protected: ABC-UNIT-4</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span>Plant Sync Engine: Online (Latency 14ms)</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-500 text-[10px]">
        <span>ChemSafe CMS Build: 2024.11.08</span>
        <span className="text-slate-300">•</span>
        <span>© 2024 ABC Industries Ltd. EHS Compliance Protocol</span>
      </div>
    </footer>
  );
};
