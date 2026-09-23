import React, { useState } from 'react';
import { X, Printer, QrCode, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { ChemicalItem } from '../../types';
import { GHSPictogram } from '../common/GHSPictogram';

interface PrintLabelModalProps {
  chemical?: ChemicalItem | null;
  initialType?: 'ghs' | 'quarantine';
  onClose: () => void;
}

export const PrintLabelModal: React.FC<PrintLabelModalProps> = ({
  chemical,
  initialType = 'ghs',
  onClose
}) => {
  const [labelType, setLabelType] = useState<'ghs' | 'quarantine'>(initialType);
  const [printed, setPrinted] = useState(false);

  const targetChem = chemical || {
    name: 'Hydrazine Hydrate 55% Boiler Dosing',
    commonName: 'Hydrazine Hydrate 55% (Oxygen Scavenger)',
    chemId: 'CHEM000088',
    sku: 'CHEM-HYD-055',
    casNumber: '7803-57-8',
    department: 'Boiler House',
    dedicatedStorage: 'Chemical Stores Bay 3',
    signalWord: 'DANGER' as const,
    hazards: [
      {
        type: 'acute_toxicity' as const,
        label: 'Acute Toxicity',
        code: 'H300',
        signalWord: 'DANGER' as const,
        hCodes: ['H300', 'H310', 'H330'],
        hStatements: ['Fatal if swallowed, in contact with skin or if inhaled.']
      },
      {
        type: 'corrosive' as const,
        label: 'Corrosives',
        code: 'H314',
        signalWord: 'DANGER' as const,
        hCodes: ['H314'],
        hStatements: ['Causes severe skin burns and eye damage.']
      }
    ],
    mandatoryPPE: ['Full Hazmat SCBA Suit', 'Level A Protective Gear'],
    lotReference: 'LOT-2023-4112'
  };

  const handlePrint = () => {
    setPrinted(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-blue-400" />
            <h3 className="font-extrabold text-sm tracking-tight">
              Industrial Chemical Label Generator
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Label Selector Tabs */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLabelType('ghs')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                labelType === 'ghs'
                  ? 'bg-blue-900 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Standard GHS Container Label
            </button>
            <button
              onClick={() => setLabelType('quarantine')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                labelType === 'quarantine'
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
              }`}
            >
              RED QUARANTINE WARNING LABEL
            </button>
          </div>

          <span className="text-[10px] text-slate-500 font-mono">Format: 4" x 6" Thermal Direct</span>
        </div>

        {/* Printable Label Canvas Area */}
        <div className="p-6 bg-slate-100 flex items-center justify-center">
          {labelType === 'ghs' ? (
            /* Standard GHS Container Label */
            <div className="w-full max-w-md bg-white border-4 border-black p-4 rounded-sm shadow-md text-slate-950 font-sans select-none">
              {/* Top Banner */}
              <div className="border-b-2 border-black pb-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase block">
                    ABC INDUSTRIES LTD • UNIT IV CHENNAI
                  </span>
                  <h2 className="text-lg font-black leading-tight">
                    {targetChem.commonName || targetChem.name}
                  </h2>
                  <div className="text-[11px] font-mono font-bold mt-0.5">
                    CAS: {targetChem.casNumber} | SKU: {targetChem.sku || targetChem.chemId}
                  </div>
                </div>

                <div className="w-14 h-14 border border-black flex flex-col items-center justify-center p-1 shrink-0">
                  <QrCode className="w-10 h-10" />
                  <span className="text-[7px] font-mono font-bold mt-0.5">EHS-SYNC</span>
                </div>
              </div>

              {/* Middle Section: Pictograms & Signal Word */}
              <div className="grid grid-cols-12 gap-3 py-3 border-b-2 border-black">
                {/* Pictograms */}
                <div className="col-span-5 flex flex-wrap items-center justify-center gap-2 p-1 bg-slate-50 border border-slate-300">
                  {targetChem.hazards.map((h, i) => (
                    <GHSPictogram key={i} type={h.type} size="md" showDiamond={true} />
                  ))}
                </div>

                {/* Signal Word & Directives */}
                <div className="col-span-7 flex flex-col justify-center">
                  <div className="bg-red-600 text-white font-black text-center py-1 text-sm tracking-wider uppercase">
                    {targetChem.signalWord}
                  </div>

                  <div className="mt-1.5 space-y-1 text-[9.5px] font-bold text-slate-900 leading-tight">
                    {targetChem.hazards.flatMap((h) =>
                      h.hStatements.slice(0, 2).map((stmt, idx) => (
                        <div key={idx}>• {stmt}</div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Mandatory PPE & Storage */}
              <div className="py-2 border-b border-black text-[10px] font-bold">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 uppercase">Mandatory PPE:</span>
                  <span>{targetChem.mandatoryPPE.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5 font-mono text-[9.5px]">
                  <span className="text-slate-500 uppercase">Storage Bay:</span>
                  <span>{targetChem.dedicatedStorage}</span>
                </div>
              </div>

              {/* Footer Barcode */}
              <div className="pt-2 flex items-end justify-between">
                <div>
                  <div className="text-[9px] font-mono text-slate-500 font-bold">
                    BATCH REF: {targetChem.lotReference || 'LOT-2024-8841'}
                  </div>
                  {/* Simulated barcode */}
                  <div className="flex items-center gap-[2px] h-6 mt-1">
                    {[3,1,4,2,1,3,2,1,4,1,2,3,1,2,4,2,1,3,2,1,3,4,1,2,1,3].map((w, i) => (
                      <div key={i} className="bg-black h-full" style={{ width: `${w}px` }}></div>
                    ))}
                  </div>
                </div>

                <div className="text-right text-[8px] font-mono text-slate-500">
                  <span>PRINTED: {new Date().toLocaleDateString('en-GB')}</span>
                  <div className="font-bold text-slate-800">RLS CERT: ABC-UNIT-4</div>
                </div>
              </div>
            </div>
          ) : (
            /* RED QUARANTINE WARNING LABEL (Matches Image 2 Quarantine Directive) */
            <div className="w-full max-w-md bg-red-600 border-4 border-black p-4 rounded-sm shadow-md text-white font-sans select-none">
              {/* Header */}
              <div className="border-b-2 border-white pb-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <AlertOctagon className="w-6 h-6 text-white" />
                  <h1 className="text-xl font-black tracking-widest uppercase">
                    QUARANTINE ENFORCED
                  </h1>
                  <AlertOctagon className="w-6 h-6 text-white" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-100">
                  DO NOT DISPENSE • IMMEDIATE DESTRUCTION MANDATED
                </p>
              </div>

              {/* Body */}
              <div className="bg-white text-slate-950 p-3 my-3 border-2 border-black rounded-xs space-y-2">
                <div>
                  <span className="text-[9px] font-black text-red-600 uppercase block">
                    Restricted Chemical Formulation
                  </span>
                  <h3 className="text-base font-black leading-tight">
                    {targetChem.commonName || targetChem.name}
                  </h3>
                  <div className="text-xs font-mono font-bold text-slate-700">
                    CAS: {targetChem.casNumber} | LOT: {targetChem.lotReference || 'LOT-2023-4112'}
                  </div>
                </div>

                <div className="p-2 bg-red-50 border border-red-200 text-[10px] font-bold text-red-900">
                  REASON: Statutory 30-Day Batch Shelf Life Exceeded & Active Degradation. Dispensing solenoids physically locked at Chemical Stores Bay 3.
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-semibold pt-1 border-t border-slate-200">
                  <div>ISOLATION: Stores Bay 3</div>
                  <div>OFFICER: Dr. S. Mehta (EHS)</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-[9px] font-mono text-red-100 font-bold">
                <span>SEVERITY CODE: CRITICAL-1</span>
                <span>PLC INTERLOCK: ARMED</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            {printed && (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Print sent to Zebra Industrial Thermal Printer (Bay 4)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-md transition-colors"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className={`px-5 py-2 font-bold text-xs rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                labelType === 'quarantine'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-900 hover:bg-blue-800 text-white'
              }`}
            >
              <Printer className="w-4 h-4" />
              Print Label (4"x6")
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
