import React, { useState } from 'react';
import {
  X,
  Activity,
  AlertTriangle,
  FileText,
  Download,
  Upload,
  Printer,
  CheckCircle,
  Building,
  Layers,
  Scale,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { ChemicalItem } from '../../types';

interface ActiveDossierProps {
  chemical: ChemicalItem;
  onClose: () => void;
  onPrintLabel: (chemical: ChemicalItem) => void;
  onAuditSignoff: (chemical: ChemicalItem) => void;
}

export const ActiveDossier: React.FC<ActiveDossierProps> = ({
  chemical,
  onClose,
  onPrintLabel,
  onAuditSignoff
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const fillPercentage = Math.min(
    100,
    Math.round((chemical.currentStock / chemical.maxStorageCapacity) * 100)
  );

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="bg-white border-2 border-blue-900/40 rounded-xl shadow-lg overflow-hidden select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Top Header Bar */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-blue-900 text-white font-extrabold text-[11px] rounded tracking-wider uppercase">
            ACTIVE INSPECTION DOSSIER
          </span>
          <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Synced
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
          title="Close Dossier"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Chemical Title & Identifier Lockup */}
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {chemical.commonName || chemical.name}
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Registry Code: <strong className="text-slate-800">{chemical.chemId}</strong>{' '}
            <span className="text-slate-300">|</span> Internal Plant SKU:{' '}
            <strong className="text-slate-800">{chemical.sku}</strong>
          </p>
        </div>

        {/* 4 Core Property Metrics Grid matching Image 7 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50/70 border border-slate-200 rounded-lg">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              CAS Registry
            </span>
            <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
              {chemical.casNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Dedicated Storage
            </span>
            <span className="text-sm font-extrabold text-blue-950 mt-0.5 block">
              {chemical.dedicatedStorage}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Min Re-Order Buffer
            </span>
            <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
              {chemical.minStockBuffer.toLocaleString()} {chemical.unit}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Max Storage Capacity
            </span>
            <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
              {chemical.maxStorageCapacity.toLocaleString()} {chemical.unit}
            </span>
          </div>
        </div>

        {/* Live Tank Farm Level Progress Gauge */}
        <div className="space-y-1.5 bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              Live Tank Farm Level ({chemical.liveTankBay || 'Bay B-04'})
            </span>
            <span className="font-mono font-bold text-slate-900">
              {chemical.currentStock.toLocaleString()} {chemical.unit} ({fillPercentage}.0%)
            </span>
          </div>

          {/* Progress Bar with Min Trigger and Capacity Tick Marks */}
          <div className="relative pt-1 pb-4">
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 flex">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  chemical.isLocked
                    ? 'bg-red-600'
                    : fillPercentage < 20
                    ? 'bg-amber-500'
                    : 'bg-blue-900'
                }`}
                style={{ width: `${chemical.isLocked ? 100 : fillPercentage}%` }}
              />
            </div>

            {/* Label markers beneath */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>0 {chemical.unit} (Empty)</span>
              <span className="text-red-700 font-bold">
                {chemical.minStockBuffer.toLocaleString()} {chemical.unit} (Min Trigger)
              </span>
              <span>{chemical.maxStorageCapacity.toLocaleString()} {chemical.unit} (Capacity)</span>
            </div>
          </div>
        </div>

        {/* GHS Hazard & Precautionary Directives Card */}
        <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-tight">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>GHS Hazard & Precautionary Directives</span>
          </div>

          <div className="space-y-2">
            {chemical.hazards.flatMap((h) =>
              h.hCodes.map((code, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <span className="px-1.5 py-0.5 bg-red-600 text-white font-mono font-bold text-[10px] rounded shrink-0">
                    {code}
                  </span>
                  <span className="text-slate-800 font-medium">
                    {h.hStatements[idx] || h.hStatements[0]}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Mandatory PPE */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-[11px] text-slate-500 uppercase tracking-wider">
              Mandatory PPE:
            </span>
            {chemical.mandatoryPPE.map((ppe, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded text-[11px]"
              >
                {ppe}
              </span>
            ))}
          </div>
        </div>

        {/* SDS Document Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-black text-xs font-mono shrink-0">
              PDF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900">
                  {chemical.sds.fileName}
                </span>
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                {chemical.sds.fileSize} • Updated: {chemical.sds.lastUpdated} • Ver: {chemical.sds.version}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded font-semibold text-xs text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              {downloadSuccess ? 'Downloaded!' : 'Download PDF'}
            </button>
            <button
              onClick={() => alert('SDS upload portal opened for version replacement.')}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded font-semibold text-xs text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              Replace SDS
            </button>
          </div>
        </div>

        {/* Physical Location Photo / Stylized Banner matching Image 7 */}
        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 h-44 shadow-inner flex flex-col justify-end">
          {/* Stylized Industrial Facility Backdrop with Piping, Dosing Meters and Valves */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 opacity-95">
            {/* SVG Engineering Plant Diagram overlay */}
            <svg className="w-full h-full opacity-35" viewBox="0 0 800 200" fill="none">
              {/* Overhead pipes */}
              <line x1="0" y1="40" x2="800" y2="40" stroke="#38BDF8" strokeWidth="6" />
              <line x1="0" y1="55" x2="800" y2="55" stroke="#94A3B8" strokeWidth="4" />
              <line x1="0" y1="70" x2="800" y2="70" stroke="#F59E0B" strokeWidth="5" />
              {/* Vertical feed branches */}
              <line x1="160" y1="40" x2="160" y2="160" stroke="#38BDF8" strokeWidth="4" />
              <line x1="380" y1="55" x2="380" y2="160" stroke="#94A3B8" strokeWidth="4" />
              <line x1="600" y1="70" x2="600" y2="160" stroke="#F59E0B" strokeWidth="4" />
              {/* Automated Dosing Pumps */}
              <rect x="130" y="110" width="60" height="70" rx="4" fill="#1E293B" stroke="#60A5FA" strokeWidth="2" />
              <circle cx="160" cy="140" r="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <rect x="350" y="110" width="60" height="70" rx="4" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="380" cy="140" r="14" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
              <rect x="570" y="110" width="60" height="70" rx="4" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="600" cy="140" r="14" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
              {/* Pressure gauges */}
              <circle cx="160" cy="80" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <line x1="160" y1="80" x2="166" y2="74" stroke="#DC2626" strokeWidth="2" />
              {/* Digital LED Flow meter */}
              <rect x="230" y="75" width="80" height="28" rx="2" fill="#020617" stroke="#1E293B" />
              <text x="270" y="93" fill="#22C55E" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                4.25 L/m
              </text>
            </svg>
          </div>

          {/* Location Overlay details */}
          <div className="relative p-4 flex items-end justify-between z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">
                PHYSICAL LOCATION
              </span>
              <h4 className="text-base font-extrabold text-white tracking-tight">
                Bulk Chemical Dosing Bay 04
              </h4>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-600/90 text-white font-bold text-[11px] rounded-md backdrop-blur-xs border border-blue-400/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Active Feed Line</span>
            </div>
          </div>
        </div>

        {/* Immutable Audit Trail */}
        <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
              IMMUTABLE AUDIT TRAIL
            </span>
            <button
              onClick={() => alert('Full compliance ledger opened in modal.')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900"
            >
              Full Log
            </button>
          </div>

          <div className="space-y-3 font-sans">
            {chemical.auditTrail.map((trail, index) => {
              const dotColor =
                index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-emerald-600' : 'bg-slate-400';

              return (
                <div key={trail.id} className="flex items-start gap-3 text-xs">
                  <span className={`w-2 h-2 rounded-full ${dotColor} mt-1 shrink-0`}></span>
                  <div>
                    <span className="font-bold text-slate-900">{trail.action}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {trail.timestamp} • {trail.actor}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onPrintLabel(chemical)}
            className="flex-1 py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print GHS Container Label
          </button>

          <button
            onClick={() => onAuditSignoff(chemical)}
            className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Audit Signoff
          </button>
        </div>
      </div>
    </div>
  );
};
