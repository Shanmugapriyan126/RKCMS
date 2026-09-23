import React from 'react';
import { Warehouse, AlertTriangle, CheckCircle2, Lock, Activity } from 'lucide-react';
import { ChemicalItem } from '../../types';

interface StockInventoryViewProps {
  chemicals: ChemicalItem[];
  onOpenDossier: (chemId: string) => void;
}

export const StockInventoryView: React.FC<StockInventoryViewProps> = ({ chemicals, onOpenDossier }) => {
  return (
    <div className="space-y-4 max-w-7xl mx-auto p-4 md:p-6 select-none">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
            Material Logistics Core
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Bulk Chemical Storage & Tank Farm Inventory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time level telemetry across Tank Farms A-D, Dry Dyestuff Warehouse, and Chemical Stores Bay 3.
          </p>
        </div>
      </div>

      {/* Grid of Storage Bays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chemicals.map((chem) => {
          const fill = Math.min(100, Math.round((chem.currentStock / chem.maxStorageCapacity) * 100));
          const isBelow = chem.currentStock < chem.minStockBuffer && !chem.isLocked;

          return (
            <div
              key={chem.id}
              onClick={() => onOpenDossier(chem.chemId)}
              className={`p-4 rounded-xl border bg-white shadow-xs cursor-pointer hover:border-blue-500 transition-all ${
                chem.isLocked ? 'border-red-300 bg-red-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  {chem.dedicatedStorage}
                </span>
                {chem.isLocked ? (
                  <span className="px-1.5 py-0.5 bg-red-600 text-white font-mono text-[9px] font-black rounded flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> LOCKED
                  </span>
                ) : isBelow ? (
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 font-bold text-[9px] rounded">
                    LOW BUFFER
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[9px] rounded">
                    NORMAL
                  </span>
                )}
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 mt-2 truncate">
                {chem.commonName || chem.name}
              </h4>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                {chem.chemId} • CAS: {chem.casNumber}
              </p>

              {/* Progress Level */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-800">
                    {chem.isLocked ? '0 (Locked 450 Kg)' : `${chem.currentStock.toLocaleString()} ${chem.unit}`}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {chem.maxStorageCapacity.toLocaleString()} {chem.unit} ({fill}%)
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all ${
                      chem.isLocked
                        ? 'w-full bg-red-600'
                        : isBelow
                        ? 'bg-amber-500'
                        : 'bg-blue-900'
                    }`}
                    style={{ width: chem.isLocked ? '100%' : `${fill}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Min Buffer: {chem.minStockBuffer} {chem.unit}</span>
                <span className="text-blue-700 font-bold">Telemetry Live</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
