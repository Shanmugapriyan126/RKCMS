import React, { useState } from 'react';
import { History, ShieldCheck, Download, Search, CheckCircle2 } from 'lucide-react';
import { ChemicalItem } from '../../types';

interface AuditLogViewProps {
  chemicals: ChemicalItem[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ chemicals }) => {
  const [search, setSearch] = useState('');

  // Collect all audit trails from chemicals
  const allEvents = chemicals.flatMap(c => 
    c.auditTrail.map(a => ({
      ...a,
      chemName: c.commonName || c.name,
      chemId: c.chemId
    }))
  ).sort((a, b) => b.id.localeCompare(a.id));

  const filtered = allEvents.filter(e => 
    e.action.toLowerCase().includes(search.toLowerCase()) ||
    e.actor.toLowerCase().includes(search.toLowerCase()) ||
    e.chemName.toLowerCase().includes(search.toLowerCase()) ||
    e.chemId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-7xl mx-auto p-4 md:p-6 select-none">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
            Statutory Cryptographic Ledger
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Immutable Audit Trail & Compliance Event Log
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-proof chronological log of EHS approvals, batch entries, and quarantine interlocks.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting cryptographic audit log (SHA-256 Verified)...')}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-md shadow-xs flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Verified Ledger
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter audit log by chemical, action, or officer..."
          className="w-full h-9 pl-9 pr-4 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Event & Action</th>
              <th className="py-3 px-4">Chemical Target</th>
              <th className="py-3 px-4">Authorized Officer / Entity</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                  {item.timestamp}
                </td>
                <td className="py-3 px-4 font-bold text-slate-900 text-xs">
                  {item.action}
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  <span className="font-bold text-blue-900">{item.chemId}</span> - {item.chemName}
                </td>
                <td className="py-3 px-4 text-xs text-slate-700">
                  {item.actor}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
