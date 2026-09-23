import React, { useState } from 'react';
import { FileText, Download, Upload, AlertTriangle, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { ChemicalItem } from '../../types';

interface SDSVaultViewProps {
  chemicals: ChemicalItem[];
  onOpenDossier: (chemId: string) => void;
}

export const SDSVaultView: React.FC<SDSVaultViewProps> = ({ chemicals, onOpenDossier }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = chemicals.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.sds.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.casNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-4 max-w-7xl mx-auto p-4 md:p-6 select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
            Statutory Document Repository
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Safety Data Sheet (SDS) Vault & 3-Year Statutory Renewal
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            16-section GHS Safety Data Sheets repository with statutory 36-month re-validation alerts.
          </p>
        </div>

        <button
          onClick={() => alert('Opening batch SDS multi-upload parser...')}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-md shadow-xs flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload New SDS Batch
        </button>
      </div>

      {/* Expiry Warning Callout */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            <strong>4 Documents Expiring Within Statutory Window:</strong> Chemical suppliers must supply updated 16-section SDS revision before 30-day lockout.
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search SDS documents by chemical or filename..."
          className="w-full h-9 pl-9 pr-4 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
        />
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((chem) => {
          const isExpiring = chem.sds.status === 'expiring_soon';
          const isExpired = chem.sds.status === 'expired';

          return (
            <div
              key={chem.id}
              className={`p-4 rounded-xl border bg-white shadow-xs flex flex-col justify-between transition-all ${
                isExpired
                  ? 'border-red-300 bg-red-50/20'
                  : isExpiring
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-slate-200 hover:border-blue-400'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-black text-xs font-mono shrink-0">
                    PDF
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    isExpired
                      ? 'bg-red-600 text-white'
                      : isExpiring
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {isExpired ? 'EXPIRED' : isExpiring ? 'RENEWAL DUE (18D)' : 'ACTIVE VALID'}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-900 mt-2 line-clamp-1">
                  {chem.commonName || chem.name}
                </h4>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5 truncate">
                  {chem.sds.fileName}
                </p>

                <div className="mt-3 space-y-1 text-xs font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex justify-between">
                    <span>CAS:</span>
                    <strong className="text-slate-800">{chem.casNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <strong className="text-slate-800">{chem.sds.version}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiry Date:</span>
                    <strong className={isExpired ? 'text-red-700' : isExpiring ? 'text-amber-700' : 'text-slate-800'}>
                      {chem.sds.expiryDate}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenDossier(chem.chemId)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  View Dossier <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={() => alert(`Downloading statutory document: ${chem.sds.fileName}`)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  PDF ({chem.sds.fileSize})
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
