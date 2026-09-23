import React, { useState } from 'react';
import {
  ActiveView,
  UserRole,
  ChemicalItem,
  FloorConsumptionLogItem
} from './types';
import {
  INITIAL_CHEMICALS,
  INITIAL_CONSUMPTION_LOGS,
  SYSTEM_NOTIFICATIONS
} from './data/mockData';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { ChemicalMaster } from './components/chemical-master/ChemicalMaster';
import { SDSVaultView } from './components/views/SDSVaultView';
import { StockInventoryView } from './components/views/StockInventoryView';
import { AuditLogView } from './components/views/AuditLogView';
import { QuickFloorLogModal } from './components/modals/QuickFloorLogModal';
import { RegisterChemicalModal } from './components/modals/RegisterChemicalModal';
import { PrintLabelModal } from './components/modals/PrintLabelModal';
import { QuarantineModal } from './components/modals/QuarantineModal';
import { BatchSignoffModal } from './components/modals/BatchSignoffModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';

export const App: React.FC = () => {
  // Navigation & Role State
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Primary Data State
  const [chemicals, setChemicals] = useState<ChemicalItem[]>(INITIAL_CHEMICALS);
  const [consumptionLogs, setConsumptionLogs] = useState<FloorConsumptionLogItem[]>(INITIAL_CONSUMPTION_LOGS);
  const [selectedChemicalId, setSelectedChemicalId] = useState<string | null>('CHEM000014');
  const [notifications, setNotifications] = useState(SYSTEM_NOTIFICATIONS);

  // Modals & Drawers State
  const [quickLogOpen, setQuickLogOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [quarantineOpen, setQuarantineOpen] = useState(false);
  const [batchSignoffOpen, setBatchSignoffOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  // Label Modal State
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printChem, setPrintChem] = useState<ChemicalItem | null>(null);
  const [printType, setPrintType] = useState<'ghs' | 'quarantine'>('ghs');

  // Handle Log Submission from floor
  const handleAddConsumptionLog = (newLog: FloorConsumptionLogItem) => {
    setConsumptionLogs(prev => [newLog, ...prev]);

    // Decrement stock in matching chemical
    setChemicals(prev =>
      prev.map(c => {
        if (c.chemId === newLog.code || c.casNumber === newLog.casNumber) {
          const updatedStock = Math.max(0, c.currentStock - newLog.dosageQty);
          return {
            ...c,
            currentStock: updatedStock,
            auditTrail: [
              {
                id: `aud-${Date.now()}`,
                action: `Floor Consumption: ${newLog.dosageQty} ${newLog.uom} dosed to ${newLog.department}`,
                timestamp: 'Just now',
                actor: newLog.operatorName,
                type: 'validation'
              },
              ...c.auditTrail
            ]
          };
        }
        return c;
      })
    );
  };

  // Handle New Chemical Registration
  const handleRegisterChemical = (newChem: ChemicalItem) => {
    setChemicals(prev => [newChem, ...prev]);
    setSelectedChemicalId(newChem.chemId);
    setActiveView('chemical_master');
  };

  // Open Label Printer
  const handleOpenPrintLabel = (chem?: ChemicalItem | null, type: 'ghs' | 'quarantine' = 'ghs') => {
    setPrintChem(chem || chemicals[0]);
    setPrintType(type);
    setPrintModalOpen(true);
  };

  // Audit Signoff single chemical
  const handleAuditSignoff = (chem: ChemicalItem) => {
    setChemicals(prev =>
      prev.map(c => {
        if (c.chemId === chem.chemId) {
          return {
            ...c,
            verification: {
              ...c.verification,
              verified: true,
              verifier: currentRole === 'SUPER_ADMIN' ? 'Rajesh Kumar (Super Admin)' : 'S. Murugan (Plant Lead)',
              verifiedDate: new Date().toLocaleDateString('en-GB'),
              status: 'verified'
            },
            auditTrail: [
              {
                id: `aud-${Date.now()}`,
                action: `Digital Audit Signoff Authorized & Scope Approved`,
                timestamp: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                actor: currentRole === 'SUPER_ADMIN' ? 'Rajesh Kumar (Super Admin)' : 'S. Murugan (Plant Lead)',
                type: 'batch_signoff'
              },
              ...c.auditTrail
            ]
          };
        }
        return c;
      })
    );
    alert(`Audit Signoff verified for ${chem.chemId} - ${chem.name}. Cryptographic stamp attached.`);
  };

  // Batch Signoff complete
  const handleBatchSignoffComplete = () => {
    setChemicals(prev =>
      prev.map(c => ({
        ...c,
        verification: {
          ...c.verification,
          verified: true,
          verifier: 'Rajesh Kumar (Super Admin)',
          verifiedDate: new Date().toLocaleDateString('en-GB'),
          status: 'verified'
        }
      }))
    );
  };

  // Quick jump from dashboard to specific chemical dossier
  const handleOpenDossier = (chemId?: string) => {
    if (chemId) {
      setSelectedChemicalId(chemId);
    }
    setActiveView('chemical_master');
  };

  // Global search trigger
  const handleSearchChange = (query: string) => {
    setGlobalSearch(query);
    if (query && activeView === 'dashboard') {
      setActiveView('chemical_master');
    }
  };

  const quarantinedChemicals = chemicals.filter(c => c.isLocked);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Universal Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        searchQuery={globalSearch}
        onSearchChange={handleSearchChange}
        onOpenNotifications={() => setNotifDrawerOpen(true)}
        unreadCount={notifications.length}
      />

      {/* Main Layout (Sidebar + Viewport Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar matching Image 2 & 7 */}
        <Sidebar
          activeView={activeView}
          onNavigate={(view) => {
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          pendingSignoffsCount={9}
          quarantineCount={quarantinedChemicals.length}
        />

        {/* Dynamic Center Main Canvas */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-3.5rem-2.25rem)]">
          {activeView === 'dashboard' && (
            <OverviewDashboard
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
              onOpenRegisterChemical={() => setRegisterOpen(true)}
              onOpenQuickLog={() => setQuickLogOpen(true)}
              onOpenQuarantineModal={() => setQuarantineOpen(true)}
              onOpenPrintRedLabels={() => handleOpenPrintLabel(quarantinedChemicals[0], 'quarantine')}
              onOpenBatchReview={() => setBatchSignoffOpen(true)}
              onOpenSDSVault={() => setActiveView('sds_vault')}
              onOpenDossier={handleOpenDossier}
              consumptionLogs={consumptionLogs}
              onRefreshLogs={() => {
                // simulated refresh
              }}
            />
          )}

          {activeView === 'chemical_master' && (
            <ChemicalMaster
              chemicals={chemicals}
              selectedChemicalId={selectedChemicalId}
              onSelectChemical={setSelectedChemicalId}
              onOpenAddModal={() => setRegisterOpen(true)}
              onOpenBatchSignoff={() => setBatchSignoffOpen(true)}
              onPrintLabel={(chem) => handleOpenPrintLabel(chem, 'ghs')}
              onAuditSignoff={handleAuditSignoff}
            />
          )}

          {activeView === 'sds_vault' && (
            <SDSVaultView
              chemicals={chemicals}
              onOpenDossier={handleOpenDossier}
            />
          )}

          {(activeView === 'stock_inventory' || activeView === 'stock_ledger') && (
            <StockInventoryView
              chemicals={chemicals}
              onOpenDossier={handleOpenDossier}
            />
          )}

          {(activeView === 'daily_log' || activeView === 'consumption_analysis') && (
            <div className="p-6 max-w-7xl mx-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Daily Plant Consumption & PLC Telemetry</h2>
                  <p className="text-xs text-slate-500">Live operational dosing events from shop-floor PLC solenoid terminals</p>
                </div>
                <button
                  onClick={() => setQuickLogOpen(true)}
                  className="px-4 py-2 bg-blue-900 text-white font-bold text-xs rounded-md shadow-xs"
                >
                  + Add Floor Log Entry
                </button>
              </div>
              <OverviewDashboard
                currentRole={currentRole}
                onRoleChange={setCurrentRole}
                onOpenRegisterChemical={() => setRegisterOpen(true)}
                onOpenQuickLog={() => setQuickLogOpen(true)}
                onOpenQuarantineModal={() => setQuarantineOpen(true)}
                onOpenPrintRedLabels={() => handleOpenPrintLabel(quarantinedChemicals[0], 'quarantine')}
                onOpenBatchReview={() => setBatchSignoffOpen(true)}
                onOpenSDSVault={() => setActiveView('sds_vault')}
                onOpenDossier={handleOpenDossier}
                consumptionLogs={consumptionLogs}
                onRefreshLogs={() => {}}
              />
            </div>
          )}

          {(activeView === 'immutable_audit_log' || activeView === 'regulatory_audits' || activeView === 'master_register_report' || activeView === 'expiry_matrix' || activeView === 'user_roles' || activeView === 'factory_thresholds') && (
            <AuditLogView chemicals={chemicals} />
          )}
        </main>
      </div>

      {/* System Status Footer matching Image 2 & 7 */}
      <Footer />

      {/* Interactive Modals */}
      {quickLogOpen && (
        <QuickFloorLogModal
          chemicals={chemicals}
          onClose={() => setQuickLogOpen(false)}
          onSubmitLog={handleAddConsumptionLog}
        />
      )}

      {registerOpen && (
        <RegisterChemicalModal
          onClose={() => setRegisterOpen(false)}
          onAddChemical={handleRegisterChemical}
        />
      )}

      {quarantineOpen && (
        <QuarantineModal
          quarantineChemicals={quarantinedChemicals}
          onClose={() => setQuarantineOpen(false)}
          onPrintRedLabels={() => {
            setQuarantineOpen(false);
            handleOpenPrintLabel(quarantinedChemicals[0], 'quarantine');
          }}
          onOpenDossier={handleOpenDossier}
        />
      )}

      {printModalOpen && (
        <PrintLabelModal
          chemical={printChem}
          initialType={printType}
          onClose={() => setPrintModalOpen(false)}
        />
      )}

      {batchSignoffOpen && (
        <BatchSignoffModal
          onClose={() => setBatchSignoffOpen(false)}
          onSuccess={handleBatchSignoffComplete}
        />
      )}

      {notifDrawerOpen && (
        <NotificationDrawer
          notifications={notifications}
          onClose={() => setNotifDrawerOpen(false)}
          onClearAll={() => setNotifications([])}
          onNavigateToQuarantine={() => {
            setNotifDrawerOpen(false);
            setQuarantineOpen(true);
          }}
          onNavigateToExpiry={() => {
            setNotifDrawerOpen(false);
            setActiveView('sds_vault');
          }}
        />
      )}
    </div>
  );
};

export default App;
