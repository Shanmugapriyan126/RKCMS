import React from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  FileText,
  Warehouse,
  ClipboardList,
  FileSpreadsheet,
  BookOpen,
  BarChart3,
  Clock,
  ShieldCheck,
  Users,
  History,
  Settings,
  ChevronRight
} from 'lucide-react';
import { ActiveView } from '../../types';
import { Logo } from './Logo';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  pendingSignoffsCount?: number;
  quarantineCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  pendingSignoffsCount = 9,
  quarantineCount = 5
}) => {
  const navSections = [
    {
      heading: 'OPERATIONAL MODULES',
      items: [
        { id: 'dashboard' as ActiveView, label: 'Overview Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      heading: 'CHEMICAL MANAGEMENT',
      items: [
        { id: 'chemical_master' as ActiveView, label: 'Chemical Master', icon: FlaskConical, badge: '1,248' },
        { id: 'sds_vault' as ActiveView, label: 'SDS Vault & Expiry', icon: FileText, warningCount: 4 },
        { id: 'stock_inventory' as ActiveView, label: 'Stock & Inventory', icon: Warehouse },
        { id: 'daily_log' as ActiveView, label: 'Daily Consumption Log', icon: ClipboardList }
      ]
    },
    {
      heading: 'COMPLIANCE & REPORTS',
      items: [
        { id: 'master_register_report' as ActiveView, label: 'Master Register Report', icon: FileSpreadsheet },
        { id: 'stock_ledger' as ActiveView, label: 'Stock Ledger Report', icon: BookOpen },
        { id: 'consumption_analysis' as ActiveView, label: 'Consumption Analysis', icon: BarChart3 },
        { id: 'expiry_matrix' as ActiveView, label: 'Expiry & Aging Matrix', icon: Clock },
        { id: 'regulatory_audits' as ActiveView, label: 'Regulatory & Audits', icon: ShieldCheck }
      ]
    },
    {
      heading: 'ADMINISTRATION',
      items: [
        { id: 'user_roles' as ActiveView, label: 'User Roles & Rights', icon: Users },
        { id: 'immutable_audit_log' as ActiveView, label: 'Immutable Audit Log', icon: History },
        { id: 'factory_thresholds' as ActiveView, label: 'Factory & Thresholds', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between shrink-0 select-none min-h-[calc(100vh-3.5rem)]">
      {/* Top Branding Header */}
      <div>
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/60">
          <Logo size="md" showText={false} />
          <div className="mt-2">
            <h1 className="font-extrabold text-[14px] text-white tracking-wide uppercase flex items-center gap-1.5">
              CHEMSAFE CMS
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Plant Operations Core</p>
          </div>
        </div>

        {/* Navigation Item Tree */}
        <nav className="p-2 space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar-thin">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h2 className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                {section.heading}
              </h2>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-blue-600 text-white font-semibold shadow-xs'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-1">
                        {item.warningCount && item.warningCount > 0 ? (
                          <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-semibold">
                            {item.warningCount}
                          </span>
                        ) : null}

                        {item.id === 'chemical_master' && (
                          <span className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                            {item.badge}
                          </span>
                        )}

                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* System Telemetry State at Bottom */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300">DB: Live</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 tracking-wider">
          V4.2.1-SEC
        </span>
      </div>
    </aside>
  );
};
