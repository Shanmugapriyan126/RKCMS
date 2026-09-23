import React, { useState } from 'react';
import { X, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { ChemicalItem, FloorConsumptionLogItem } from '../../types';

interface QuickFloorLogModalProps {
  chemicals: ChemicalItem[];
  onClose: () => void;
  onSubmitLog: (log: FloorConsumptionLogItem) => void;
}

export const QuickFloorLogModal: React.FC<QuickFloorLogModalProps> = ({
  chemicals,
  onClose,
  onSubmitLog
}) => {
  const [selectedChemId, setSelectedChemId] = useState<string>(chemicals[0]?.chemId || '');
  const [department, setDepartment] = useState<string>('Dyeing House');
  const [dosage, setDosage] = useState<string>('150.00');
  const [uom, setUom] = useState<'Kg' | 'Ltrs'>('Kg');
  const [batchRef, setBatchRef] = useState<string>(`LOT-2024-${Math.floor(1000 + Math.random() * 9000)}`);
  const [operatorId, setOperatorId] = useState<string>('OP-104');
  const [operatorName, setOperatorName] = useState<string>('S. Murugan');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  const selectedChem = chemicals.find(c => c.chemId === selectedChemId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(dosage);
    if (isNaN(qty) || qty <= 0) {
      setError('Please specify a valid dosage quantity.');
      return;
    }

    if (!selectedChem) {
      setError('Please select a valid chemical.');
      return;
    }

    if (selectedChem.isLocked) {
      setError('CANNOT LOG: This chemical is under Quarantine Lockout (Severity 1). Dispensing is physically interlocked.');
      return;
    }

    const remaining = Math.max(0, selectedChem.currentStock - qty);
    const isLow = remaining < selectedChem.minStockBuffer;

    const newLog: FloorConsumptionLogItem = {
      id: `log-${Date.now()}`,
      timestamp: `Today, ${new Date().toLocaleTimeString('en-GB')}`,
      chemicalName: selectedChem.commonName || selectedChem.name,
      casNumber: selectedChem.casNumber,
      code: selectedChem.chemId,
      department: department,
      dosageQty: qty,
      uom: selectedChem.unit || uom,
      batchPoRef: batchRef,
      operatorId: operatorId,
      operatorName: `${operatorName} (${operatorId})`,
      remainingStock: remaining,
      remainingStockMax: selectedChem.maxStorageCapacity,
      stockLevelStatus: isLow ? 'low' : 'optimal',
      status: isLow ? 'Low Stock' : 'Logged'
    };

    onSubmitLog(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight">
                Quick Floor Consumption Log
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct PLC Terminal & Shift Operator Entry (Unit IV Chennai)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Chemical Select */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Select Active Chemical Formulation *
            </label>
            <select
              value={selectedChemId}
              onChange={(e) => {
                setSelectedChemId(e.target.value);
                setError('');
              }}
              className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {chemicals.map((chem) => (
                <option key={chem.chemId} value={chem.chemId}>
                  {chem.chemId} - {chem.name} ({chem.casNumber}) {chem.isLocked ? '[LOCKED BAY 3]' : ''}
                </option>
              ))}
            </select>
            {selectedChem && (
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Current Stock: <strong className="text-slate-800">{selectedChem.currentStock.toLocaleString()} {selectedChem.unit}</strong></span>
                <span>Storage: <strong className="text-blue-900">{selectedChem.dedicatedStorage}</strong></span>
              </div>
            )}
          </div>

          {/* Department & Dosage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Target Department *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Dyeing House">Dyeing House</option>
                <option value="Washing Unit">Washing Unit</option>
                <option value="Printing Department">Printing Department</option>
                <option value="ETP Plant">ETP Plant</option>
                <option value="Fabric Wash">Fabric Wash</option>
                <option value="Boiler House">Boiler House</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Dose Quantity & UOM *
              </label>
              <div className="flex">
                <input
                  type="number"
                  step="0.01"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 h-9 px-3 bg-slate-50 border border-slate-300 rounded-l-md text-xs font-bold font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <select
                  value={selectedChem?.unit || uom}
                  onChange={(e) => setUom(e.target.value as 'Kg' | 'Ltrs')}
                  className="w-16 h-9 px-2 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md text-xs font-bold text-slate-700"
                >
                  <option value="Kg">Kg</option>
                  <option value="Ltrs">Ltrs</option>
                </select>
              </div>
            </div>
          </div>

          {/* Batch Ref & Operator */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Batch / Lot / PO Reference *
              </label>
              <input
                type="text"
                value={batchRef}
                onChange={(e) => setBatchRef(e.target.value)}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Operator ID / Name
              </label>
              <input
                type="text"
                value={`${operatorName} (${operatorId})`}
                onChange={(e) => setOperatorName(e.target.value)}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Floor Notes / PLC Interlock Station
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Dosing automated via Solenoid Pump 4B for Batch Scour-08"
              className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-md shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Commit Dosing Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
