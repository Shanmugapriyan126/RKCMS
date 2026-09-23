import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Plus,
  Zap,
  FileText,
  FolderOpen,
  Printer,
  ChevronRight,
  FlaskConical,
  ShieldCheck,
  ClipboardCheck,
  Lock,
  Clock,
  Factory,
  CheckCircle2,
  Users
} from 'lucide-react';
import { UserRole, FloorConsumptionLogItem, GHSHazardType } from '../../types';
import { VerificationDonut } from './VerificationDonut';
import { DepartmentBarChart } from './DepartmentBarChart';
import { GHSHazardMatrix } from './GHSHazardMatrix';
import { VelocityChart } from './VelocityChart';
import { FloorConsumptionTable } from './FloorConsumptionTable';

interface OverviewDashboardProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenRegisterChemical: () => void;
  onOpenQuickLog: () => void;
  onOpenQuarantineModal: () => void;
  onOpenPrintRedLabels: () => void;
  onOpenBatchReview: () => void;
  onOpenSDSVault: () => void;
  onOpenDossier: (chemId?: string) => void;
  consumptionLogs: FloorConsumptionLogItem[];
  onRefreshLogs: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  currentRole,
  onRoleChange,
  onOpenRegisterChemical,
  onOpenQuickLog,
  onOpenQuarantineModal,
  onOpenPrintRedLabels,
  onOpenBatchReview,
  onOpenSDSVault,
  onOpenDossier,
  consumptionLogs,
  onRefreshLogs
}) => {
  return (
    <div className="space-y-4 max-w-7xl mx-auto p-4 md:p-6 select-none">
      {/* Top Breadcrumb & Facility Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-blue-900 text-white font-bold text-[10px] rounded tracking-wider uppercase">
              UNIT-IV CHENNAI
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              REAL-TIME TELEMETRY ENGINE
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            EHS Executive Compliance & Hazard Manifest
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Central statutory register, containment protocols, and chemical stock velocity tracking.
          </p>
        </div>

        {/* Primary Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Role Badges */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200">
            <button
              onClick={() => onRoleChange('SUPER_ADMIN')}
              className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
                currentRole === 'SUPER_ADMIN'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Super Admin
            </button>
            <button
              onClick={() => onRoleChange('PLANT_OPERATOR')}
              className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
                currentRole === 'PLANT_OPERATOR'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              Plant Floor Op
            </button>
          </div>

          {/* Action CTAs */}
          <button
            onClick={onOpenRegisterChemical}
            className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Register Chemical
          </button>

          <button
            onClick={onOpenQuickLog}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            Quick Floor Log
          </button>

          <button
            onClick={onOpenSDSVault}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            SDS
          </button>

          <button
            onClick={() => onOpenDossier('CHEM000014')}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
            Dossier
          </button>
        </div>
      </div>

      {/* Critical Alert 1: Quarantine Enforcement Banner */}
      <div className="p-3.5 bg-red-50/80 border border-red-200 rounded-lg flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-md bg-red-600 flex items-center justify-center text-white shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-extrabold text-[13px] text-red-900 tracking-tight uppercase">
                QUARANTINE ENFORCEMENT: 5 CHEMICALS EXPIRED
              </h4>
              <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[9px] rounded uppercase tracking-wider">
                CRITICAL SEVERITY 1
              </span>
            </div>
            <p className="text-xs text-red-800 mt-0.5">
              Physical isolation locked at Chemical Stores Bay 3. Dispensing locks triggered on ERP/PLC terminal pumps. Immediate destruction protocol mandated.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenQuarantineModal}
            className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-xs"
          >
            View Expired Items
          </button>
          <button
            onClick={onOpenPrintRedLabels}
            className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-red-300 text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Red Labels
          </button>
        </div>
      </div>

      {/* Warning Alert 2: 30-Day Expiry Notice */}
      <div className="px-4 py-2.5 bg-blue-50/70 border border-blue-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-blue-900">
          <AlertTriangle className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-medium">
            <strong className="font-bold">12 Chemicals & 4 GHS Safety Data Sheets (SDS)</strong> reaching statutory expiration threshold within 30 days.
          </span>
        </div>
        <button
          onClick={onOpenBatchReview}
          className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 hover:underline"
        >
          Schedule Batch Review <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6 Metric KPI Cards Grid matching Image 2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Chemicals */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Chemicals</span>
            <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center text-blue-700">
              <FlaskConical className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">156</span>
            <span className="text-[10px] font-bold text-emerald-600">↑+8 this mo</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-slate-700">151</span> Active
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-700">5</span> Decommissioned
          </div>
        </div>

        {/* Card 2: Verified Reg. */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Verified Reg.</span>
            <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">132</span>
            <span className="text-[9.5px] font-extrabold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
              84.6%
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span>ISO 14001 Audited</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-700 font-semibold">In Scope</span>
          </div>
        </div>

        {/* Card 3: Pending EHS Signoff */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending EHS Signoff</span>
            <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center text-blue-700">
              <ClipboardCheck className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">24</span>
            <span className="text-[9.5px] font-extrabold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
              Review
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-slate-700">18</span> New Lots
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-red-600">6</span> Discrepancies
          </div>
        </div>

        {/* Card 4: Quarantine Total */}
        <div className="bg-white border border-red-200 rounded-lg p-3 shadow-xs hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between text-red-600 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Quarantine Total</span>
            <div className="w-5 h-5 rounded bg-red-100 flex items-center justify-center text-red-700">
              <Lock className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-red-600 font-mono">05</span>
            <span className="text-[9.5px] font-extrabold px-1.5 py-0.2 bg-red-600 text-white rounded">
              LOCKED
            </span>
          </div>
          <div className="text-[10px] text-red-700 mt-1 flex items-center gap-1">
            <span className="font-semibold">Bay 3 Locked</span>
            <span className="text-red-300">·</span>
            <span className="font-bold">No Issuance</span>
          </div>
        </div>

        {/* Card 5: Expiring <30 Days */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Expiring &lt;30 Days</span>
            <div className="w-5 h-5 rounded bg-amber-50 flex items-center justify-center text-amber-700">
              <Clock className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">12</span>
            <span className="text-[9.5px] font-extrabold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
              Caution
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span>Avg 14d remaining</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-700 font-bold">Priority First</span>
          </div>
        </div>

        {/* Card 6: Monitored Depts */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Monitored Depts</span>
            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-700">
              <Factory className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">08</span>
            <span className="text-[10px] font-semibold text-slate-500">All Active</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-slate-700">100%</span> Sensors Up
            <span className="text-slate-300">·</span>
            <span className="text-emerald-700 font-semibold">ETP In Spec</span>
          </div>
        </div>
      </div>

      {/* Row 2: Verification Donut + Department Chemical Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <VerificationDonut
            verifiedCount={132}
            pendingCount={18}
            rejectedCount={6}
            onFilterStatus={() => onOpenBatchReview()}
          />
        </div>
        <div className="lg:col-span-7">
          <DepartmentBarChart onSelectDept={() => onOpenDossier('CHEM000014')} />
        </div>
      </div>

      {/* Row 3: GHS Regulatory Hazard Distribution + Velocity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <GHSHazardMatrix onSelectHazard={() => onOpenDossier('CHEM000014')} />
        </div>
        <div className="lg:col-span-7">
          <VelocityChart />
        </div>
      </div>

      {/* Row 4: Floor Consumption Log & Stock Impact Table */}
      <div>
        <FloorConsumptionTable
          logs={consumptionLogs}
          onRefresh={onRefreshLogs}
          onOpenQuickLog={onOpenQuickLog}
          onSelectChemicalRow={(name) => {
            if (name.includes('Caustic Soda') || name.includes('Sodium Hydroxide')) {
              onOpenDossier('CHEM000014');
            } else if (name.includes('Hydrazine')) {
              onOpenDossier('CHEM000088');
            } else if (name.includes('Peroxide')) {
              onOpenDossier('CHEM000008');
            } else if (name.includes('Acetic')) {
              onOpenDossier('CHEM000029');
            } else if (name.includes('Polyaluminium')) {
              onOpenDossier('CHEM000318');
            } else {
              onOpenDossier('CHEM000014');
            }
          }}
        />
      </div>
    </div>
  );
};
