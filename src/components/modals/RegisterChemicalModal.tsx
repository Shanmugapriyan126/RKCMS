import React, { useState } from 'react';
import { X, Plus, FlaskConical, CheckCircle2 } from 'lucide-react';
import { ChemicalItem, Department, GHSHazardInfo } from '../../types';

interface RegisterChemicalModalProps {
  onClose: () => void;
  onAddChemical: (newChem: ChemicalItem) => void;
}

export const RegisterChemicalModal: React.FC<RegisterChemicalModalProps> = ({
  onClose,
  onAddChemical
}) => {
  const [chemName, setChemName] = useState('');
  const [commonName, setCommonName] = useState('');
  const [casNumber, setCasNumber] = useState('');
  const [supplier, setSupplier] = useState('');
  const [department, setDepartment] = useState<Department>('Dyeing & Mercerizing');
  const [useCase, setUseCase] = useState('');
  const [initialStock, setInitialStock] = useState('2000');
  const [unit, setUnit] = useState<'Kg' | 'Ltrs'>('Kg');
  const [minBuffer, setMinBuffer] = useState('400');
  const [maxCapacity, setMaxCapacity] = useState('5000');
  const [storageBay, setStorageBay] = useState('Tank Farm Bay C');
  const [signalWord, setSignalWord] = useState<'DANGER' | 'WARNING'>('DANGER');
  const [compliancePills, setCompliancePills] = useState<string>('ZDHC L3, MRSL Pass');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chemName || !casNumber) return;

    const count = Math.floor(100 + Math.random() * 900);
    const newChem: ChemicalItem = {
      id: `chem-${Date.now()}`,
      chemId: `CHEM000${count}`,
      sku: `CHEM-${chemName.slice(0, 4).toUpperCase()}-0${count}`,
      name: chemName,
      commonName: commonName || chemName,
      casNumber: casNumber,
      supplier: supplier || 'Approved Vendor Group',
      department: department,
      useCase: useCase || 'Standard Processing Reagent',
      hazards: [
        {
          type: 'corrosive',
          label: 'Corrosives (Class 8)',
          code: 'H314',
          signalWord: signalWord,
          hCodes: ['H314', 'H290'],
          hStatements: ['Causes skin burns and eye damage.', 'Corrosive to metal alloys.']
        }
      ],
      signalWord: signalWord,
      sds: {
        version: 'v1.0',
        status: 'valid',
        expiryDate: '15-Dec-2027',
        lastUpdated: new Date().toLocaleDateString('en-GB'),
        fileSize: '2.5 MB',
        fileName: `SDS_${chemName.replace(/\s+/g, '_')}.pdf`
      },
      verification: {
        verified: true,
        verifier: 'Dr. S. Mehta (EHS)',
        verifiedDate: new Date().toLocaleDateString('en-GB'),
        status: 'verified'
      },
      complianceTags: compliancePills.split(',').map((s) => s.trim()),
      currentStock: parseFloat(initialStock) || 1000,
      unit: unit,
      minStockBuffer: parseFloat(minBuffer) || 300,
      maxStorageCapacity: parseFloat(maxCapacity) || 4000,
      dedicatedStorage: storageBay,
      liveTankBay: 'Bay C-01',
      mandatoryPPE: ['Safety Visor', 'Chemical Gauntlets', 'Acid Apron'],
      incompatibleMaterials: ['Combustibles', 'Organic peroxides'],
      auditTrail: [
        {
          id: `aud-${Date.now()}`,
          action: 'Initial Chemical Registration & Factory EHS Cataloging',
          timestamp: 'Just now',
          actor: 'Rajesh Kumar (Super Admin)',
          type: 'validation'
        }
      ]
    };

    onAddChemical(newChem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-blue-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-800 flex items-center justify-center text-white">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight">
                Add Chemical (CHEM-Gen Master Registration)
              </h3>
              <p className="text-[11px] text-blue-200">
                Statutory registration under ISO 14001 & ZDHC MRSL guidelines
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-blue-300 hover:text-white p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Chemical Catalog Name *</label>
              <input
                type="text"
                required
                value={chemName}
                onChange={(e) => setChemName(e.target.value)}
                placeholder="e.g. Sodium Hydrosulfite 88%"
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Common / Commercial Name</label>
              <input
                type="text"
                value={commonName}
                onChange={(e) => setCommonName(e.target.value)}
                placeholder="e.g. Hydrose Technical Flakes"
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">CAS Registry Number *</label>
              <input
                type="text"
                required
                value={casNumber}
                onChange={(e) => setCasNumber(e.target.value)}
                placeholder="e.g. 7775-14-6"
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md font-mono font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Authorized Supplier</label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="e.g. Gujarat Alkalies Ltd"
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Allocated Department *</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full h-9 px-2 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Dyeing & Mercerizing">Dyeing & Mercerizing</option>
                <option value="Bleaching & Washing">Bleaching & Washing</option>
                <option value="Printing">Printing</option>
                <option value="ETP Plant">ETP Plant</option>
                <option value="Fabric Wash">Fabric Wash</option>
                <option value="Boiler House">Boiler House</option>
                <option value="Chemical Stores">Chemical Stores</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Plant Application & Use Case</label>
            <input
              type="text"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              placeholder="e.g. Reducing agent for Vat Dyeing / Indigo solubilization"
              className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Initial Stock</label>
              <input
                type="number"
                value={initialStock}
                onChange={(e) => setInitialStock(e.target.value)}
                className="w-full h-8 px-2 bg-white border border-slate-300 rounded font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'Kg' | 'Ltrs')}
                className="w-full h-8 px-2 bg-white border border-slate-300 rounded font-bold"
              >
                <option value="Kg">Kg</option>
                <option value="Ltrs">Ltrs</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Min Buffer</label>
              <input
                type="number"
                value={minBuffer}
                onChange={(e) => setMinBuffer(e.target.value)}
                className="w-full h-8 px-2 bg-white border border-slate-300 rounded font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Max Capacity</label>
              <input
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-full h-8 px-2 bg-white border border-slate-300 rounded font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Dedicated Storage Bay</label>
              <input
                type="text"
                value={storageBay}
                onChange={(e) => setStorageBay(e.target.value)}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">GHS Signal Word</label>
              <select
                value={signalWord}
                onChange={(e) => setSignalWord(e.target.value as 'DANGER' | 'WARNING')}
                className="w-full h-9 px-2 bg-slate-50 border border-slate-300 rounded-md font-bold"
              >
                <option value="DANGER">DANGER</option>
                <option value="WARNING">WARNING</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Compliance Certifications</label>
              <input
                type="text"
                value={compliancePills}
                onChange={(e) => setCompliancePills(e.target.value)}
                placeholder="ZDHC L3, GOTS, MRSL"
                className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-md"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Register Formulation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
