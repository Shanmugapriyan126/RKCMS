import React, { useState } from 'react';
import {
  Search,
  Plus,
  Upload,
  Download,
  CheckCheck,
  Filter,
  Eye,
  Edit2,
  Lock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  ClipboardList,
  Sparkles,
  FileText,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { ChemicalItem, Department, GHSHazardType } from '../../types';
import { GHSPictogram } from '../common/GHSPictogram';
import { ActiveDossier } from './ActiveDossier';

interface ChemicalMasterProps {
  chemicals: ChemicalItem[];
  selectedChemicalId: string | null;
  onSelectChemical: (id: string | null) => void;
  onOpenAddModal: () => void;
  onOpenBatchSignoff: () => void;
  onPrintLabel: (chem: ChemicalItem) => void;
  onAuditSignoff: (chem: ChemicalItem) => void;
}

export const ChemicalMaster: React.FC<ChemicalMasterProps> = ({
  chemicals,
  selectedChemicalId,
  onSelectChemical,
  onOpenAddModal,
  onOpenBatchSignoff,
  onPrintLabel,
  onAuditSignoff
}) => {
  // Filter states matching Image 7 defaults
  const [searchQuery, setSearchQuery] = useState('Sodium Hydroxide');
  const [selectedDept, setSelectedDept] = useState<string>('Dyeing & Mercerizing');
  const [selectedHazard, setSelectedHazard] = useState<string>('Corrosive (Class 8)');
  const [selectedVerification, setSelectedVerification] = useState<string>('Verified by EHS');
  const [selectedSdsState, setSelectedSdsState] = useState<string>('Valid & Active');
  const [selectedStockThreshold, setSelectedStockThreshold] = useState<string>('All Stock Levels');
  const [densityMode, setDensityMode] = useState<'standard' | 'compact'>('standard');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active filter chip management
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDept('All Departments');
    setSelectedHazard('All Hazards');
    setSelectedVerification('All Verifications');
    setSelectedSdsState('All States');
    setSelectedStockThreshold('All Stock Levels');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDept !== 'All Departments' ||
    selectedHazard !== 'All Hazards' ||
    selectedVerification !== 'All Verifications';

  // Filter chemicals
  const filteredChemicals = chemicals.filter((chem) => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        chem.name.toLowerCase().includes(q) ||
        chem.commonName.toLowerCase().includes(q) ||
        chem.chemId.toLowerCase().includes(q) ||
        chem.casNumber.toLowerCase().includes(q) ||
        chem.supplier.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedDept !== 'All Departments' && selectedDept !== 'All') {
      if (!chem.department.toLowerCase().includes(selectedDept.toLowerCase().split(' ')[0])) {
        // allow flexible matching
      }
    }

    if (selectedVerification === 'Verified by EHS') {
      if (!chem.verification.verified) return false;
    }

    return true;
  });

  const selectedChemical =
    chemicals.find((c) => c.chemId === selectedChemicalId || c.id === selectedChemicalId) ||
    chemicals[0];

  return (
    <div className="space-y-4 max-w-7xl mx-auto p-4 md:p-6 select-none">
      {/* 4 Metric KPI Cards matching Image 7 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Card 1: Active Chemical Catalog */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Chemical Catalog
            </span>
            <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center text-blue-700">
              <ClipboardList className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">1,248</span>
            <span className="text-[10px] font-bold text-emerald-600">↑+12 this qtr</span>
          </div>
        </div>

        {/* Card 2: SDS Compliant Rate */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              SDS Compliant Rate
            </span>
            <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">98.4%</span>
            <span className="text-[10px] font-bold text-emerald-600">4 renewals due</span>
          </div>
        </div>

        {/* Card 3: Pending EHS Verification */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Pending EHS Verification
            </span>
            <div className="w-5 h-5 rounded bg-red-50 flex items-center justify-center text-red-600">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">9</span>
            <span className="text-[9.5px] font-extrabold px-1.5 py-0.2 bg-red-100 text-red-700 rounded uppercase">
              Requires Signoff
            </span>
          </div>
        </div>

        {/* Card 4: MRSL / ZDHC Level 3 */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              MRSL / ZDHC Level 3
            </span>
            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-600">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">842</span>
            <span className="text-[10px] font-semibold text-slate-500">67.4% eco-approved</span>
          </div>
        </div>
      </div>

      {/* Action Row & Main Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Search Input matching Image 7 */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Chemical, ID, CAS, Department..."
            className="w-full h-9 pl-9 pr-8 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="h-9 px-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-md font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Chemical (CHEM-Gen)
          </button>

          <button
            onClick={() => alert('Bulk SDS drag-and-drop batch parser opened.')}
            className="h-9 px-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-md font-semibold text-xs text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            Upload Bulk SDS
          </button>

          <button
            onClick={() => alert('Exporting statutory chemical register CSV...')}
            className="h-9 px-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-md font-semibold text-xs text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export
          </button>

          <button
            onClick={onOpenBatchSignoff}
            className="h-9 px-3.5 bg-white hover:bg-slate-50 border border-blue-300 rounded-md font-bold text-xs text-blue-900 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-blue-700" />
            Batch Signoff (9)
          </button>
        </div>
      </div>

      {/* Filter Dropdown Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Process Department
          </label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full h-8 px-2 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Departments">All Departments</option>
            <option value="Dyeing & Mercerizing">Dyeing & Mercerizing</option>
            <option value="Bleaching & Washing">Bleaching & Washing</option>
            <option value="Printing">Printing</option>
            <option value="ETP Plant">ETP Plant</option>
            <option value="Boiler House">Boiler House</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Hazard Class (GHS)
          </label>
          <select
            value={selectedHazard}
            onChange={(e) => setSelectedHazard(e.target.value)}
            className="w-full h-8 px-2 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Hazards">All Hazards</option>
            <option value="Corrosive (Class 8)">Corrosive (Class 8)</option>
            <option value="Flammables (Cat 1-3)">Flammables (Cat 1-3)</option>
            <option value="Acute Toxicity (Fatal)">Acute Toxicity (Fatal)</option>
            <option value="Oxidizers (Type B)">Oxidizers (Type B)</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Verification Status
          </label>
          <select
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value)}
            className="w-full h-8 px-2 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Verifications">All Verifications</option>
            <option value="Verified by EHS">Verified by EHS</option>
            <option value="Pending EHS Review">Pending EHS Review</option>
            <option value="Rejected / Quarantine">Rejected / Quarantine</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            SDS Document State
          </label>
          <select
            value={selectedSdsState}
            onChange={(e) => setSelectedSdsState(e.target.value)}
            className="w-full h-8 px-2 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All States">All States</option>
            <option value="Valid & Active">Valid & Active</option>
            <option value="Expiring Soon (&lt;30d)">Expiring Soon (&lt;30d)</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Stock Threshold
          </label>
          <select
            value={selectedStockThreshold}
            onChange={(e) => setSelectedStockThreshold(e.target.value)}
            className="w-full h-8 px-2 bg-white border border-slate-200 rounded text-slate-700 text-xs focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="All Stock Levels">All Stock Levels</option>
            <option value="Normal Stock (> Min)">Normal Stock (&gt; Min)</option>
            <option value="Below Min Buffer">Below Min Buffer</option>
            <option value="Locked / Zero Stock">Locked / Zero Stock</option>
          </select>
        </div>
      </div>

      {/* Active Criteria Chips Bar matching Image 7 */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Active Filters:
        </span>

        {selectedDept !== 'All Departments' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md font-medium shadow-2xs">
            Dept: {selectedDept}
            <button onClick={() => setSelectedDept('All Departments')} className="text-slate-400 hover:text-slate-700">✕</button>
          </span>
        )}

        {selectedHazard !== 'All Hazards' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md font-medium shadow-2xs">
            GHS: {selectedHazard}
            <button onClick={() => setSelectedHazard('All Hazards')} className="text-slate-400 hover:text-slate-700">✕</button>
          </span>
        )}

        {selectedVerification !== 'All Verifications' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md font-medium shadow-2xs">
            Verification: {selectedVerification}
            <button onClick={() => setSelectedVerification('All Verifications')} className="text-slate-400 hover:text-slate-700">✕</button>
          </span>
        )}

        {searchQuery && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md font-medium shadow-2xs">
            Query: "{searchQuery}"
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-700">✕</button>
          </span>
        )}

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-red-600 hover:text-red-800 ml-1 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Chemical Master Directory Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Table Subhead */}
        <div className="p-3.5 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-[13px] text-slate-900 tracking-tight">
              Chemical Master Directory
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              14 Showing of 1,248
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <button
              onClick={() => setDensityMode(densityMode === 'standard' ? 'compact' : 'standard')}
              className="flex items-center gap-1.5 font-medium hover:text-slate-900"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              Density Mode: {densityMode === 'standard' ? 'Standard Industrial' : 'Compact Industrial'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/90 text-slate-500 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200">
                <th className="py-2.5 px-3 font-semibold">Chem ID & Name</th>
                <th className="py-2.5 px-3 font-semibold">CAS & Supplier</th>
                <th className="py-2.5 px-3 font-semibold">Department & Use</th>
                <th className="py-2.5 px-3 font-semibold text-center">GHS Pictograms</th>
                <th className="py-2.5 px-3 font-semibold">SDS Status</th>
                <th className="py-2.5 px-3 font-semibold">Verification</th>
                <th className="py-2.5 px-3 font-semibold">Compliance Tags</th>
                <th className="py-2.5 px-3 font-semibold text-right">Current Stock</th>
                <th className="py-2.5 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChemicals.slice(0, 5).map((chem) => {
                const isSelected = selectedChemical?.chemId === chem.chemId;
                const isBelowMin = chem.currentStock < chem.minStockBuffer && !chem.isLocked;

                return (
                  <tr
                    key={chem.id}
                    onClick={() => onSelectChemical(chem.chemId)}
                    className={`transition-colors cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-50/50 hover:bg-blue-50/70 border-l-4 border-l-blue-900'
                        : 'hover:bg-slate-50/80'
                    } ${chem.isLocked ? 'bg-red-50/30' : ''}`}
                  >
                    {/* Chem ID & Name */}
                    <td className={`py-3 px-3 min-w-[200px] ${densityMode === 'compact' ? 'py-2' : 'py-3'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-blue-900 font-bold bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                          {chem.chemId}
                        </span>
                      </div>
                      <div className="font-bold text-[12px] text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5">
                        {chem.name}
                      </div>
                    </td>

                    {/* CAS & Supplier */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-mono text-[11px] font-bold text-slate-800">
                        {chem.casNumber}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[140px]">
                        {chem.supplier}
                      </div>
                    </td>

                    {/* Department & Use */}
                    <td className="py-3 px-3 min-w-[160px]">
                      <div className="font-semibold text-slate-900 text-[11px]">
                        {chem.department}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {chem.useCase}
                      </div>
                    </td>

                    {/* GHS Hazard Pictograms & Signal Word */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {chem.hazards.map((h, i) => (
                          <GHSPictogram key={i} type={h.type} size="sm" showDiamond={true} />
                        ))}
                      </div>
                      <span className={`inline-block text-[9.5px] font-extrabold uppercase px-1.5 py-0.2 rounded mt-1 ${
                        chem.signalWord === 'DANGER'
                          ? 'bg-red-600 text-white'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {chem.signalWord}
                      </span>
                    </td>

                    {/* SDS Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="font-mono text-[11px] font-bold text-slate-800">
                          {chem.sds.version}
                        </span>
                        <span className={`text-[10px] font-semibold px-1 py-0.2 rounded ${
                          chem.sds.status === 'valid'
                            ? 'bg-emerald-50 text-emerald-800'
                            : chem.sds.status === 'expiring_soon'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {chem.sds.status === 'valid'
                            ? 'Valid'
                            : chem.sds.status === 'expiring_soon'
                            ? 'Expiring (18d)'
                            : 'Expired'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Exp: {chem.sds.expiryDate}
                      </div>
                    </td>

                    {/* Verification */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {chem.verification.verified ? (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                          Signoff Queued
                        </div>
                      )}
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {chem.verification.verifier}
                      </div>
                    </td>

                    {/* Compliance Tags */}
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {chem.complianceTags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.2 text-[9.5px] font-bold rounded ${
                              tag.includes('L3') || tag.includes('Approved') || tag.includes('Pass')
                                ? 'bg-slate-100 text-slate-800 border border-slate-200'
                                : tag.includes('LOCKED') || tag.includes('HAZMAT')
                                ? 'bg-red-100 text-red-800 font-black'
                                : 'bg-blue-50 text-blue-800'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Current Stock */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="font-mono font-black text-[12px] text-slate-900">
                        {chem.currentStock.toLocaleString()} {chem.unit}
                      </div>
                      <div className="mt-0.5">
                        {chem.isLocked ? (
                          <span className="text-[9.5px] font-black text-red-600 uppercase">
                            LOCKED (EXPIRED)
                          </span>
                        ) : isBelowMin ? (
                          <span className="text-[9.5px] font-extrabold text-amber-600 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                            BELOW MIN ({chem.minStockBuffer} KG)
                          </span>
                        ) : (
                          <span className="text-[9.5px] font-bold text-emerald-700 uppercase">
                            OPTIMAL LEVEL
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectChemical(chem.chemId);
                          }}
                          className="p-1 rounded text-slate-500 hover:text-blue-900 hover:bg-slate-100"
                          title="Open Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Editing Chemical Registry SKU: ${chem.chemId}`);
                          }}
                          className="p-1 rounded text-slate-500 hover:text-blue-900 hover:bg-slate-100"
                          title="Edit Chemical"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Directory Pagination matching Image 7 */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs gap-3">
          <span className="text-slate-500 font-mono text-[11px]">
            Displaying record batch 1 - 5 of 1,248 registered chemicals in Unit IV Chennai
          </span>

          <div className="flex items-center gap-1 text-[11px] font-medium">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border border-slate-200 rounded text-slate-600 hover:bg-white disabled:opacity-40"
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold ${
                  currentPage === page
                    ? 'bg-blue-900 text-white'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-slate-400">...</span>
            <button
              onClick={() => setCurrentPage(250)}
              className="w-7 h-6 rounded flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200"
            >
              250
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-2 py-1 border border-slate-200 rounded text-slate-600 hover:bg-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Active Inspection Dossier Card (if chemical selected) */}
      {selectedChemical && (
        <div className="pt-2">
          <ActiveDossier
            chemical={selectedChemical}
            onClose={() => onSelectChemical(null)}
            onPrintLabel={onPrintLabel}
            onAuditSignoff={onAuditSignoff}
          />
        </div>
      )}
    </div>
  );
};
