import React, { useState } from 'react';
import { DEPARTMENT_ALLOCATION_DATA } from '../../data/mockData';

interface DepartmentBarChartProps {
  onSelectDept?: (dept: string) => void;
}

export const DepartmentBarChart: React.FC<DepartmentBarChartProps> = ({ onSelectDept }) => {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const maxCount = 45; // baseline ceiling

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between h-full shadow-xs">
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[13px] text-slate-900 tracking-tight">
              Department Chemical Allocation
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              8 Live Plants
            </span>
          </div>
          <span className="text-[11px] font-medium text-blue-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Dyeing holds highest concentration
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Number of distinct active formulation matrices assigned per sector
        </p>
      </div>

      {/* Bar Chart Area */}
      <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
        {DEPARTMENT_ALLOCATION_DATA.map((item) => {
          const heightPct = (item.count / maxCount) * 100;
          const isHovered = hoveredDept === item.dept;

          return (
            <div
              key={item.dept}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredDept(item.dept)}
              onMouseLeave={() => setHoveredDept(null)}
              onClick={() => onSelectDept?.(item.dept)}
            >
              {/* Tooltip / value */}
              <div
                className={`text-[10px] font-mono font-bold mb-1 transition-opacity ${
                  isHovered ? 'opacity-100 text-blue-700' : 'opacity-0 group-hover:opacity-100 text-slate-600'
                }`}
              >
                {item.count}
              </div>

              {/* Bar */}
              <div className="w-full max-w-[34px] bg-slate-100 rounded-t-sm overflow-hidden flex flex-col justify-end h-full">
                <div
                  className="w-full rounded-t-xs transition-all duration-300 group-hover:brightness-110"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>

              {/* Department Label */}
              <span className="text-[10px] font-medium text-slate-500 mt-2 truncate w-full text-center group-hover:text-slate-900">
                {item.dept}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>Peak Sector: Dyeing (42 items - high reactivity load)</span>
        </div>
        <div className="font-semibold text-slate-800 font-mono">
          Inventory Turnover Cycle: 18.4 Days
        </div>
      </div>
    </div>
  );
};
