export type Department = 
  | 'Dyeing & Mercerizing' 
  | 'Bleaching & Washing' 
  | 'Printing' 
  | 'ETP Plant' 
  | 'Fabric Wash' 
  | 'Maintenance' 
  | 'Chemical Stores' 
  | 'Boiler House';

export type GHSHazardType = 
  | 'flammable' 
  | 'corrosive' 
  | 'acute_toxicity' 
  | 'irritant' 
  | 'oxidizer' 
  | 'aquatic_toxic';

export interface GHSHazardInfo {
  type: GHSHazardType;
  label: string;
  code: string;
  signalWord: 'DANGER' | 'WARNING';
  hCodes: string[];
  hStatements: string[];
}

export interface SDSInfo {
  version: string;
  status: 'valid' | 'expiring_soon' | 'expired';
  expiryDate: string;
  lastUpdated: string;
  fileSize: string;
  fileName: string;
  pdfUrl?: string;
}

export interface AuditTrailItem {
  id: string;
  action: string;
  timestamp: string;
  actor: string;
  details?: string;
  type?: 'validation' | 'batch_signoff' | 'compliance' | 'lock';
}

export interface ChemicalItem {
  id: string;
  chemId: string; // e.g. CHEM000014
  sku: string; // e.g. CHEM-NAOH-048
  name: string;
  commonName: string;
  casNumber: string;
  supplier: string;
  department: Department;
  useCase: string;
  hazards: GHSHazardInfo[];
  signalWord: 'DANGER' | 'WARNING';
  sds: SDSInfo;
  verification: {
    verified: boolean;
    verifier: string;
    verifiedDate: string;
    status: 'verified' | 'pending' | 'rejected';
  };
  complianceTags: string[]; // e.g. ZDHC L3, GOTS Approved, MRSL Pass
  currentStock: number; // in kg or ltrs
  unit: 'Kg' | 'Ltrs';
  minStockBuffer: number;
  maxStorageCapacity: number;
  dedicatedStorage: string; // e.g. Tank Farm Bay B
  liveTankBay?: string; // e.g. Bay B-04
  mandatoryPPE: string[];
  incompatibleMaterials: string[];
  isLocked?: boolean;
  quarantineReason?: string;
  lotReference?: string;
  auditTrail: AuditTrailItem[];
}

export interface FloorConsumptionLogItem {
  id: string;
  timestamp: string;
  chemicalName: string;
  casNumber: string;
  code: string;
  department: string;
  dosageQty: number;
  uom: 'Kg' | 'Ltrs';
  batchPoRef: string;
  operatorId: string;
  operatorName: string;
  remainingStock: number;
  remainingStockMax?: number;
  stockLevelStatus: 'optimal' | 'low' | 'locked';
  status: 'Logged' | 'Low Stock' | 'BLOCKED';
  isAutoPlc?: boolean;
}

export type ActiveView = 
  | 'dashboard' 
  | 'chemical_master' 
  | 'sds_vault' 
  | 'stock_inventory' 
  | 'daily_log' 
  | 'master_register_report' 
  | 'stock_ledger' 
  | 'consumption_analysis' 
  | 'expiry_matrix' 
  | 'regulatory_audits' 
  | 'user_roles' 
  | 'immutable_audit_log' 
  | 'factory_thresholds';

export type UserRole = 'SUPER_ADMIN' | 'PLANT_OPERATOR';
