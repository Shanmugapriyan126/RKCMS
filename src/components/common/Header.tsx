import React, { useState } from 'react';
import { Search, Bell, RotateCw, CheckCircle2, Shield, LogOut, ChevronDown, UserCheck } from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  unreadCount
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [factoryMenuOpen, setFactoryMenuOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Unit IV Chennai');

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left: System Title & Facility Scope */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs shrink-0">
          <Shield className="w-4 h-4 fill-blue-600/20 text-blue-700" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-[13px] tracking-tight truncate">
              Chemical Management System
            </span>
          </div>
          <span className="text-[11px] text-slate-500 truncate">
            Internal Factory Chemical Management Portal - ABC Industries ({selectedUnit})
          </span>
        </div>
      </div>

      {/* Middle: Universal Search Bar */}
      <div className="flex-1 max-w-xl mx-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Chemical, ID, CAS, Department..."
            className="w-full h-8 pl-9 pr-8 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Action Clusters */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Factory Online Selector */}
        <div className="relative">
          <button
            onClick={() => setFactoryMenuOpen(!factoryMenuOpen)}
            className="h-8 px-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 text-[11px] font-medium flex items-center gap-1.5 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="flex flex-col text-left leading-none">
              <span className="font-semibold text-[10px] text-slate-800">Factory</span>
              <span className="text-[9px] text-emerald-600 font-bold">Online</span>
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
          </button>

          {factoryMenuOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50 text-xs">
              <div className="px-3 py-1.5 font-semibold text-[10px] text-slate-400 uppercase tracking-wider">
                Select Manufacturing Unit
              </div>
              {['Unit IV Chennai', 'Unit II Tirupur', 'Unit I Surat', 'Unit V Cuddalore'].map((unit) => (
                <button
                  key={unit}
                  onClick={() => {
                    setSelectedUnit(unit);
                    setFactoryMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between ${
                    selectedUnit === unit ? 'font-semibold text-blue-700 bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  {unit}
                  {selectedUnit === unit && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Plant Sync Active Badge */}
        <div className="h-8 px-2.5 bg-blue-50/80 border border-blue-200/80 rounded text-blue-800 text-[11px] font-medium flex items-center gap-1.5">
          <RotateCw className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
          <div className="flex flex-col text-left leading-none">
            <span className="font-bold text-[10px] text-blue-900">Plant</span>
            <span className="text-[9px] text-blue-600 font-semibold">Sync Active</span>
          </div>
        </div>

        {/* Switch Role Button */}
        <button
          onClick={() => onRoleChange(currentRole === 'SUPER_ADMIN' ? 'PLANT_OPERATOR' : 'SUPER_ADMIN')}
          title="Switch Active Operator Persona"
          className="h-8 px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded text-slate-700 text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-semibold text-[11px]">
            {currentRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Plant Floor Op'}
          </span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative h-8 w-8 rounded flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="System Hazard & Expiry Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white font-extrabold text-[9px] flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Block with RK Monogram Avatar (from Image 3) */}
        <div className="relative pl-1 border-l border-slate-200">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded hover:bg-slate-50 transition-colors"
          >
            <div className="flex flex-col text-right leading-none">
              <span className="text-[11px] font-bold text-slate-900">
                {currentRole === 'SUPER_ADMIN' ? 'Rajesh Kumar' : 'S. Murugan'}
              </span>
              <span className="text-[9px] font-extrabold text-blue-700 tracking-wider">
                {currentRole === 'SUPER_ADMIN' ? 'SUPER ADMIN' : 'PLANT FLOOR OP'}
              </span>
            </div>

            {/* RK Monogram Avatar Badge (matches Image 3) */}
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white font-black text-xs tracking-tighter border border-slate-800 shadow-xs shrink-0 select-none">
              {currentRole === 'SUPER_ADMIN' ? (
                <span className="font-serif italic font-extrabold text-white text-[13px] tracking-tight">
                  RK
                </span>
              ) : (
                <span className="font-sans font-bold text-white text-[11px]">
                  SM
                </span>
              )}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-xl py-2 z-50 text-xs">
              <div className="px-3 pb-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">
                  {currentRole === 'SUPER_ADMIN' ? 'Rajesh Kumar' : 'S. Murugan'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {currentRole === 'SUPER_ADMIN' ? 'rajesh.kumar@abc-ind.com' : 's.murugan@abc-ind.com'}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  EHS Statutory Signoff Authorized
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    onRoleChange(currentRole === 'SUPER_ADMIN' ? 'PLANT_OPERATOR' : 'SUPER_ADMIN');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  Switch Persona
                  <span className="text-[10px] font-bold text-blue-600">
                    {currentRole === 'SUPER_ADMIN' ? 'Switch to Operator' : 'Switch to Admin'}
                  </span>
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  EHS Statutory Credential Log
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  Plant Bay Authorizations
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out of Console
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
