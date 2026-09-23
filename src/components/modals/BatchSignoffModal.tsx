import React, { useState } from 'react';
import { X, CheckCheck, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';
import { ChemicalItem } from '../../types';

interface BatchSignoffModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const BatchSignoffModal: React.FC<BatchSignoffModalProps> = ({
  onClose,
  onSuccess
}) => {
  const [signedItems, setSignedItems] = useState<{ [key: string]: boolean }>({
    'sig-1': true,
    'sig-2': true,
    'sig-3': true,
    'sig-4': true,
    'sig-5': true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remarks, setRemarks] = useState('All batch parameters conform to ISO 14001 and ZDHC Gateway Level 3 requirements.');

  const pendingBatches = [
    { id: 'sig-1', chemId: 'CHEM000029', name: 'Glacial Acetic Acid 99%', lot: 'LOT-2024-7629', dept: 'Dyeing & Mercerizing', qty: '2,500 Ltrs' },
    { id: 'sig-2', chemId: 'CHEM000108', name: 'Hydrogen Peroxide 50% Inward', lot: 'LOT-2024-9102', dept: 'Bleaching & Washing', qty: '7,000 Kg' },
    { id: 'sig-3', chemId: 'CHEM000214', name: 'Reactive Blue P-3R Liquid', lot: 'LOT-2024-5519', dept: 'Printing', qty: '1,200 Kg' },
    { id: 'sig-4', chemId: 'CHEM000305', name: 'PAC 30% Clarifier Delivery', lot: 'LOT-2024-6512', dept: 'ETP Plant', qty: '12,000 Kg' },
    { id: 'sig-5', chemId: 'CHEM000128', name: 'Sodium Hydroxide 48% Bulk Delivery', lot: 'LOT-2024-8841', dept: 'Dyeing & Mercerizing', qty: '5,000 Kg' }
  ];

  const handleToggle = (id: string) => {
    setSignedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSignAll = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-800 flex items-center justify-center text-white">
              <CheckCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight">
                Batch Signoff & Statutory EHS Acceptance
              </h3>
              <p className="text-[11px] text-blue-200">
                Authorizing Inward Lots for Plant Issuance (Unit IV Chennai)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-blue-300 hover:text-white p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">
              Pending Batches Awaiting Executive Signoff:
            </span>
            <button
              onClick={() => {
                const all: { [key: string]: boolean } = {};
                pendingBatches.forEach(b => { all[b.id] = true; });
                setSignedItems(all);
              }}
              className="text-blue-700 font-bold hover:underline"
            >
              Select All (5)
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {pendingBatches.map((item) => (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`p-3 border rounded-lg flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors ${
                  signedItems[item.id]
                    ? 'bg-blue-50/70 border-blue-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!signedItems[item.id]}
                    onChange={() => handleToggle(item.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-blue-900 bg-white px-1.5 py-0.2 rounded border border-blue-200">
                        {item.chemId}
                      </span>
                      <span className="font-bold text-slate-900">{item.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Lot: {item.lot} • Dept: {item.dept}
                    </div>
                  </div>
                </div>

                <span className="font-mono font-bold text-slate-800">
                  {item.qty}
                </span>
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              EHS Officer Verification Remarks & Digital Signature Stamp
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Digital Key: RSA-4096 • Signatory: Rajesh Kumar (Super Admin)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSignAll}
            disabled={isSubmitting}
            className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-md shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <FileCheck className="w-4 h-4" />
            {isSubmitting ? 'Applying Digital Signature...' : 'Certify & Authorize Signoff'}
          </button>
        </div>
      </div>
    </div>
  );
};
