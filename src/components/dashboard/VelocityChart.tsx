import React, { useState } from 'react';
import { MONTHLY_VELOCITY_DATA } from '../../data/mockData';

export const VelocityChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = 70; // chart scaling ceiling

  // Generate SVG points for liquids line chart
  const points = MONTHLY_VELOCITY_DATA.map((d, i) => {
    const x = 30 + i * ((420 - 60) / (MONTHLY_VELOCITY_DATA.length - 1));
    const y = 140 - (d.liquidsKL / maxVal) * 110;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between h-full shadow-xs">
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[13px] text-slate-900 tracking-tight">
              Factory Chemical Consumption Velocity
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
              6-Month Trend
            </span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#1E3A8A]"></span>
              <span>Bulk Solids (MT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Liquids (kL)</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Comparative bulk mass (Metric Tons) vs liquid volume (kL)
        </p>
      </div>

      {/* SVG Chart Visualization */}
      <div className="h-44 relative my-2">
        <svg viewBox="0 0 420 160" className="w-full h-full overflow-visible">
          {/* Subtle grid lines */}
          {[30, 65, 100, 135].map((yVal, i) => (
            <line
              key={i}
              x1="20"
              y1={yVal}
              x2="400"
              y2={yVal}
              stroke="#F1F5F9"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          ))}

          {/* Solid Mass Bars */}
          {MONTHLY_VELOCITY_DATA.map((d, i) => {
            const x = 20 + i * ((420 - 60) / (MONTHLY_VELOCITY_DATA.length - 1));
            const barWidth = 24;
            const barHeight = (d.solidsMT / maxVal) * 110;
            const y = 140 - barHeight;
            const isHovered = hoveredIdx === i;

            return (
              <g key={d.month} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <rect
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="2"
                  fill="#1E3A8A"
                  opacity={isHovered ? 1 : 0.9}
                  className="transition-all duration-200"
                />
                {/* Month label */}
                <text
                  x={x}
                  y="155"
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="9.5"
                  fontWeight={d.month.includes('OCT') ? '700' : '500'}
                  className={d.month.includes('OCT') ? 'fill-blue-900 font-bold' : ''}
                >
                  {d.month}
                </text>
              </g>
            );
          })}

          {/* Liquids Spline Path (Gradient & Stroke) */}
          <path
            d={`M 30 140 L ${points} L 390 140 Z`}
            fill="url(#liquidVelocityGradient)"
            opacity="0.15"
          />
          <polyline
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data Points on Line */}
          {MONTHLY_VELOCITY_DATA.map((d, i) => {
            const x = 30 + i * ((420 - 60) / (MONTHLY_VELOCITY_DATA.length - 1));
            const y = 140 - (d.liquidsKL / maxVal) * 110;
            const isHovered = hoveredIdx === i;

            return (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 5 : 3.5}
                  fill="#FFFFFF"
                  stroke="#059669"
                  strokeWidth="2.5"
                  className="transition-all"
                />
                {isHovered && (
                  <g>
                    <rect
                      x={x - 45}
                      y={y - 32}
                      width="90"
                      height="24"
                      rx="3"
                      fill="#0F172A"
                      opacity="0.9"
                    />
                    <text
                      x={x}
                      y={y - 17}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {d.solidsMT} MT | {d.liquidsKL} kL
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <defs>
            <linearGradient id="liquidVelocityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Aggregate KPI Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div>
          October MTD Aggregates:{' '}
          <strong className="text-slate-800">58.4 MT Solids</strong> |{' '}
          <strong className="text-slate-800">49.2 kL Reagents</strong>
        </div>
        <div className="text-emerald-700 font-semibold font-sans">
          Within ESG Cap (+2.4% vs planned)
        </div>
      </div>
    </div>
  );
};
