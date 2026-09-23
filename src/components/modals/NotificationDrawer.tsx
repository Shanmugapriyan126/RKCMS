import React from 'react';
import { X, Bell, AlertTriangle, ShieldAlert, Info, Check, ArrowRight } from 'lucide-react';
import { SYSTEM_NOTIFICATIONS } from '../../data/mockData';

interface NotificationDrawerProps {
  notifications: typeof SYSTEM_NOTIFICATIONS;
  onClose: () => void;
  onClearAll: () => void;
  onNavigateToQuarantine: () => void;
  onNavigateToExpiry: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  notifications,
  onClose,
  onClearAll,
  onNavigateToQuarantine,
  onNavigateToExpiry
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-900" />
            <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
              EHS Telemetry & Compliance Alerts
            </h3>
            <span className="px-1.5 py-0.2 bg-red-600 text-white font-bold text-[10px] rounded-full">
              {notifications.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Alerts List */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          {notifications.map((notif) => {
            const isCritical = notif.severity === 'critical';
            const isWarning = notif.severity === 'warning';

            return (
              <div
                key={notif.id}
                className={`p-3.5 rounded-lg border text-xs transition-colors ${
                  isCritical
                    ? 'bg-red-50/70 border-red-200 text-red-900'
                    : isWarning
                    ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                    : 'bg-blue-50/70 border-blue-200 text-blue-900'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 mt-0.5">
                    {isCritical ? (
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{notif.title}</h4>
                      <span className="text-[10px] font-mono opacity-60">{notif.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed opacity-90">{notif.message}</p>

                    <div className="mt-2 flex items-center justify-end">
                      {isCritical && (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToQuarantine();
                          }}
                          className="font-bold text-[11px] text-red-700 hover:underline flex items-center gap-1"
                        >
                          Enforce Protocol <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {isWarning && (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToExpiry();
                          }}
                          className="font-bold text-[11px] text-amber-800 hover:underline flex items-center gap-1"
                        >
                          Review Expiry Matrix <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <button
            onClick={onClearAll}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            Mark all as resolved
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
