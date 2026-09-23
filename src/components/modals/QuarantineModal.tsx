import React from 'react';
import { X, ShieldAlert, Lock, Printer, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ChemicalItem } from '../../types';

interface QuarantineModalProps {
  quarantineChemicals: ChemicalItem[];
  onClose: () => void;
  onPrintRedLabels: () => void;
  onOpenDossier: (chemId: string) => void;
}

export const QuarantineModal: React.FC<QuarantineModalProps> = ({
  quarantineChemicals,
  onClose,
  onPrintRedLabels,
  onOpenDossier
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-red-300 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-700 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-800 flex items-center justify-center text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight uppercase">
                  QUARANTINE ENFORCEMENT PROTOCOL (BAY 3)
                </h3>
                <span className="px-2 py-0.5 bg-white text-red-700 font-black text-[10px] rounded">
                  CRITICAL SEVERITY 1
                </span>
              </div>
              <p className="text-xs text-red-100 mt-0.5">
                Physical isolation locked at Chemical Stores Bay 3 • Dispensing locks active on ERP/PLC pumps
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-red-200 hover:text-white p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 p-4 border-b border-red-200 flex items-center justify-between text-xs text-red-900">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-medium">
              5 Chemical Formulations currently restricted from plant issuance. PLC Solenoids physically isolated.
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onPrintRedLabels();
            }}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Red Warning Labels
          </button>
        </div>

        {/* List of Quarantined Chemicals */}
        <div className="p-6 space-y-3 overflow-y-auto flex-1">
          {quarantineChemicals.map((chem) => (
            <div
              key={chem.id}
              className="p-4 bg-slate-50 border border-slate-200 hover:border-red-300 rounded-lg flex flex-wrap items-center justify-between gap-4 transition-colors"
            >
              <div className="flex-1 min-w-[260px]">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-red-600 text-white font-mono font-bold text-[10px] rounded">
                    {chem.chemId}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">
                    {chem.commonName || chem.name}
                  </h4>
                </div>

                <div className="text-xs text-slate-500 font-mono mt-1">
                  CAS: {chem.casNumber} | Lot: {chem.lotReference || 'LOT-2023-4112'} | Location: {chem.dedicatedStorage}
                </div>

                <div className="mt-2 text-xs font-semibold text-red-800 bg-red-100/60 p-2 rounded border border-red-200">
                  {chem.quarantineReason || 'Statutory batch life expired. Immediate destruction protocol mandated.'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenDossier(chem.chemId);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded shadow-xs"
                >
                  View Dossier
                </button>
                <button
                  onClick={() => alert(`Destruction manifest initiated for ${chem.chemId} (Bay 3 Disposal Gate).`)}
                  className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded shadow-xs"
                >
                  Initiate Destruction
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="text-slate-500 font-mono text-[11px]">
            Statutory EHS Protocol Ref: SOP-CHM-Q3-2024
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-md transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
