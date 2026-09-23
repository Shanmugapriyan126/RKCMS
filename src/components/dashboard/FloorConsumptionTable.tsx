import React, { useState } from 'react';
import { RotateCw, Filter, AlertOctagon, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { FloorConsumptionLogItem } from '../../types';

interface FloorConsumptionTableProps {
  logs: FloorConsumptionLogItem[];
  onRefresh: () => void;
  onOpenQuickLog: () => void;
  onSelectChemicalRow?: (chemicalName: string) => void;
}

export const FloorConsumptionTable: React.FC<FloorConsumptionTableProps> = ({
  logs,
  onRefresh,
  onOpenQuickLog,
  onSelectChemicalRow
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const departments = ['All Departments', 'Dyeing House', 'Washing Unit', 'ETP Plant', 'Boiler House'];

  const filteredLogs = logs.filter(log => {
    if (selectedDept === 'All Departments') return true;
    return log.department.toLowerCase().includes(selectedDept.toLowerCase().replace('house', '').replace('unit', '').trim());
  });

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[14px] text-slate-900 tracking-tight flex items-center gap-2">
              Floor Consumption Log & Stock Impact
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Direct PLC & plant operator floor logs recorded within the last 8-hour shift
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Department Filter Dropdown */}
          <div className="relative flex items-center">
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              aria-label="Filter by department"
              className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded pl-8 pr-7 py-1.5 font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleManualRefresh}
            title="Refresh live telemetry stream"
            className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 hover:text-slate-900 transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/90 text-slate-500 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200">
              <th className="py-2.5 px-4 font-semibold">Timestamp</th>
              <th className="py-2.5 px-4 font-semibold">Chemical Name & CAS #</th>
              <th className="py-2.5 px-4 font-semibold">Department</th>
              <th className="py-2.5 px-4 font-semibold text-right">Dosage / Qty</th>
              <th className="py-2.5 px-3 font-semibold">UOM</th>
              <th className="py-2.5 px-4 font-semibold">Batch / PO Ref</th>
              <th className="py-2.5 px-4 font-semibold">Operator ID</th>
              <th className="py-2.5 px-4 font-semibold">Remaining Stock</th>
              <th className="py-2.5 px-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLogs.map((log) => {
              const isLocked = log.status === 'BLOCKED' || log.stockLevelStatus === 'locked';
              const isLow = log.status === 'Low Stock';

              return (
                <tr
                  key={log.id}
                  onClick={() => onSelectChemicalRow?.(log.chemicalName)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                    isLocked ? 'bg-red-50/30' : ''
                  }`}
                >
                  {/* Timestamp */}
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    <span className={isLocked ? 'text-red-700 font-bold' : ''}>
                      {log.timestamp}
                    </span>
                  </td>

                  {/* Chemical Name & CAS */}
                  <td className="py-3 px-4 min-w-[200px]">
                    <div className="flex items-center gap-1.5">
                      {isLocked && (
                        <AlertOctagon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      )}
                      <span className={`font-bold text-[12px] group-hover:text-blue-600 transition-colors ${
                        isLocked ? 'text-red-800' : 'text-slate-900'
                      }`}>
                        {log.chemicalName}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      CAS: {log.casNumber} <span className="text-slate-300">|</span> {log.code}
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[10.5px] font-semibold rounded ${
                      log.department.includes('Dyeing')
                        ? 'bg-blue-50 text-blue-800'
                        : log.department.includes('Washing')
                        ? 'bg-indigo-50 text-indigo-800'
                        : log.department.includes('ETP')
                        ? 'bg-emerald-50 text-emerald-800'
                        : log.department.includes('Boiler')
                        ? 'bg-red-50 text-red-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {log.department}
                    </span>
                  </td>

                  {/* Dosage Qty */}
                  <td className="py-3 px-4 font-mono text-right font-bold text-[12px] text-slate-900 tabular-nums">
                    {log.dosageQty.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  {/* UOM */}
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    {log.uom}
                  </td>

                  {/* Batch / PO Ref */}
                  <td className="py-3 px-4 font-mono text-[11px] whitespace-nowrap">
                    <span className={`font-semibold ${isLocked ? 'text-red-700' : 'text-blue-700'}`}>
                      {log.batchPoRef}
                    </span>
                  </td>

                  {/* Operator ID */}
                  <td className="py-3 px-4 text-[11px] text-slate-700 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span>{log.operatorName}</span>
                    </div>
                  </td>

                  {/* Remaining Stock with Progress Level */}
                  <td className="py-3 px-4 min-w-[140px]">
                    {isLocked ? (
                      <div className="flex flex-col">
                        <span className="font-extrabold text-[11px] text-red-600 font-mono tracking-tight">
                          LOCKED (EXPIRED)
                        </span>
                        <div className="w-20 h-1.5 bg-red-200 rounded-full mt-1 overflow-hidden">
                          <div className="w-full h-full bg-red-600"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                          <span className={isLow ? 'text-amber-600' : 'text-slate-800'}>
                            {log.remainingStock.toLocaleString()} {log.uom}
                          </span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isLow
                                ? 'w-1/6 bg-amber-500'
                                : 'w-3/4 bg-emerald-600'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {log.status === 'Logged' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Logged
                      </span>
                    )}

                    {log.status === 'Low Stock' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10.5px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Low Stock
                      </span>
                    )}

                    {log.status === 'BLOCKED' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-extrabold bg-red-600 text-white tracking-wider uppercase">
                        BLOCKED
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer & Telemetry Sync Pagination */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
          <span>Showing 5 of 84 shift events</span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700 font-semibold font-sans flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            All PLC Dosing Pumps Synchronized (0 drift)
          </span>
        </div>

        {/* Pagination buttons matching Image 2 */}
        <div className="flex items-center gap-1 text-[11px] font-medium">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border border-slate-200 rounded text-slate-600 hover:bg-white disabled:opacity-40"
          >
            Prev
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
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-2 py-1 border border-slate-200 rounded text-slate-600 hover:bg-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
