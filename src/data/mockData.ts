import { ChemicalItem, FloorConsumptionLogItem } from '../types';

export const INITIAL_CHEMICALS: ChemicalItem[] = [
  {
    id: 'chem-1',
    chemId: 'CHEM000014',
    sku: 'CHEM-NAOH-048',
    name: 'Caustic Soda Flakes / Lye 48%',
    commonName: 'Sodium Hydroxide 48% (Liquid Lye)',
    casNumber: '1310-73-2',
    supplier: 'Gujarat Alkalies Ltd',
    department: 'Dyeing & Mercerizing',
    useCase: 'Alkaline Scouring / pH Buff',
    hazards: [
      {
        type: 'corrosive',
        label: 'Corrosives (Class 8)',
        code: 'H314',
        signalWord: 'DANGER',
        hCodes: ['H314', 'H290'],
        hStatements: [
          'Causes severe skin burns and serious eye damage.',
          'May be corrosive to metals (Mild Steel & Aluminum incompatible).'
        ]
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v3.2',
      status: 'valid',
      expiryDate: '14-Nov-2026',
      lastUpdated: '14-Nov-2023',
      fileSize: '3.2 MB',
      fileName: 'SDS_Sodium_Hydroxide_Rev4.pdf'
    },
    verification: {
      verified: true,
      verifier: 'Dr. S. Mehta (EHS)',
      verifiedDate: '14-Nov-2023',
      status: 'verified'
    },
    complianceTags: ['ZDHC L3', 'GOTS Approved', 'MRSL Pass'],
    currentStock: 2450,
    unit: 'Kg',
    minStockBuffer: 500,
    maxStorageCapacity: 5000,
    dedicatedStorage: 'Tank Farm Bay B',
    liveTankBay: 'Bay B-04',
    mandatoryPPE: ['Alkali Gloves', 'Face Shield', 'Rubber Apron'],
    incompatibleMaterials: ['Mild Steel', 'Aluminum', 'Strong Acids', 'Zinc'],
    auditTrail: [
      {
        id: 'aud-1',
        action: 'SDS 3-Year Re-validation Approved',
        timestamp: '14-Nov-2023 11:24 AM',
        actor: 'Dr. S. Mehta (EHS Officer)',
        type: 'validation'
      },
      {
        id: 'aud-2',
        action: 'Batch Signoff (Lot GRN-88412: 5,000 Kg)',
        timestamp: '02-Nov-2023 04:10 PM',
        actor: 'Rajesh Kumar (Super Admin)',
        type: 'batch_signoff'
      },
      {
        id: 'aud-3',
        action: 'ZDHC Gateway Level 3 Certificate Linked',
        timestamp: '18-Oct-2023 09:15 AM',
        actor: 'Compliance Bot (Auto-Sync)',
        type: 'compliance'
      }
    ]
  },
  {
    id: 'chem-2',
    chemId: 'CHEM000008',
    sku: 'CHEM-H2O2-050',
    name: 'Hydrogen Peroxide 50%',
    commonName: 'Hydrogen Peroxide 50% Technical Grade',
    casNumber: '7722-84-1',
    supplier: 'National Peroxide Ltd',
    department: 'Bleaching & Washing',
    useCase: 'Continuous Bleach Range',
    hazards: [
      {
        type: 'oxidizer',
        label: 'Oxidizers (Type B)',
        code: 'H271',
        signalWord: 'DANGER',
        hCodes: ['H271', 'H314', 'H302'],
        hStatements: [
          'May cause fire or explosion; strong oxidizer.',
          'Causes severe skin burns and eye damage.',
          'Harmful if swallowed.'
        ]
      },
      {
        type: 'corrosive',
        label: 'Corrosives (Class 8)',
        code: 'H314',
        signalWord: 'DANGER',
        hCodes: ['H314'],
        hStatements: ['Causes severe skin burns.']
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v4.1',
      status: 'valid',
      expiryDate: '02-Mar-2027',
      lastUpdated: '02-Mar-2024',
      fileSize: '2.8 MB',
      fileName: 'SDS_Hydrogen_Peroxide_50pct_Rev2.pdf'
    },
    verification: {
      verified: true,
      verifier: 'K. Balan (Safety)',
      verifiedDate: '03-Mar-2024',
      status: 'verified'
    },
    complianceTags: ['ZDHC L3', 'OEKO-TEX 100'],
    currentStock: 6800,
    unit: 'Kg',
    minStockBuffer: 1200,
    maxStorageCapacity: 10000,
    dedicatedStorage: 'Tank Farm Bay A',
    liveTankBay: 'Bay A-02',
    mandatoryPPE: ['Nitrile Long Gloves', 'Face Shield', 'Chemical Splash Suit'],
    incompatibleMaterials: ['Combustibles', 'Organic solvents', 'Iron', 'Copper'],
    auditTrail: [
      {
        id: 'aud-4',
        action: 'Safety Interlock Calibration & Tank Inspection',
        timestamp: '12-Feb-2024 10:15 AM',
        actor: 'K. Balan (Safety Officer)',
        type: 'validation'
      },
      {
        id: 'aud-5',
        action: 'Batch Inward GRN-9102 Verified (7,000 Kg)',
        timestamp: '18-Jan-2024 02:45 PM',
        actor: 'Rajesh Kumar (Super Admin)',
        type: 'batch_signoff'
      }
    ]
  },
  {
    id: 'chem-3',
    chemId: 'CHEM000029',
    sku: 'CHEM-CH3COOH-099',
    name: 'Glacial Acetic Acid 99%',
    commonName: 'Glacial Acetic Acid 99.8% Pure',
    casNumber: '64-19-7',
    supplier: 'GNFC Industrial Chem',
    department: 'Dyeing & Mercerizing',
    useCase: 'Neutralizer / Acidifier',
    hazards: [
      {
        type: 'flammable',
        label: 'Flammables (Cat 3)',
        code: 'H226',
        signalWord: 'DANGER',
        hCodes: ['H226', 'H314'],
        hStatements: [
          'Flammable liquid and vapor.',
          'Causes severe skin burns and eye damage.'
        ]
      },
      {
        type: 'corrosive',
        label: 'Corrosives (Class 8)',
        code: 'H314',
        signalWord: 'DANGER',
        hCodes: ['H314'],
        hStatements: ['Severe chemical burn risk.']
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v2.8',
      status: 'expiring_soon',
      expiryDate: '26-Nov-2024',
      lastUpdated: '26-Nov-2021',
      fileSize: '4.1 MB',
      fileName: 'SDS_Glacial_Acetic_Acid_99.pdf'
    },
    verification: {
      verified: false,
      verifier: 'Pending EHS Review',
      verifiedDate: 'Pending',
      status: 'pending'
    },
    complianceTags: ['ZDHC L2', 'REACH Annex'],
    currentStock: 380,
    unit: 'Kg',
    minStockBuffer: 500,
    maxStorageCapacity: 2500,
    dedicatedStorage: 'Chemical Stores Bay 2',
    liveTankBay: 'Bay 2-D1',
    mandatoryPPE: ['Acid Respirator (Cartridge B)', 'Butyl Gloves', 'Goggles'],
    incompatibleMaterials: ['Strong Bases', 'Oxidizing Agents', 'Metals'],
    auditTrail: [
      {
        id: 'aud-6',
        action: 'Statutory 30-Day Expiry Flag Raised',
        timestamp: '27-Oct-2024 08:00 AM',
        actor: 'Compliance Engine (Automated)',
        type: 'compliance'
      },
      {
        id: 'aud-7',
        action: 'Low Stock Trigger: 380 Kg < 500 Kg Buffer',
        timestamp: 'Today 12:15 PM',
        actor: 'PLC Telemetry Mon-04',
        type: 'validation'
      }
    ]
  },
  {
    id: 'chem-4',
    chemId: 'CHEM000102',
    sku: 'CHEM-DYE-BLK133',
    name: 'Reactive Black B-133 Granular',
    commonName: 'Reactive Black 5 (Formulation B-133)',
    casNumber: '17095-24-9',
    supplier: 'Dystar Chemicals India',
    department: 'Dyeing & Mercerizing',
    useCase: 'Dark Shade Reactive Dye',
    hazards: [
      {
        type: 'irritant',
        label: 'Irritant / Skin Sensitizer',
        code: 'H317',
        signalWord: 'WARNING',
        hCodes: ['H317', 'H319'],
        hStatements: [
          'May cause an allergic skin reaction.',
          'Causes serious eye irritation.'
        ]
      }
    ],
    signalWord: 'WARNING',
    sds: {
      version: 'v2.0',
      status: 'valid',
      expiryDate: '19-Jan-2028',
      lastUpdated: '19-Jan-2023',
      fileSize: '1.9 MB',
      fileName: 'SDS_Reactive_Black_B133.pdf'
    },
    verification: {
      verified: true,
      verifier: 'Dr. S. Mehta (EHS)',
      verifiedDate: '20-Jan-2023',
      status: 'verified'
    },
    complianceTags: ['ZDHC L3', 'Bluesign Approved', 'GOTS v7'],
    currentStock: 1120,
    unit: 'Kg',
    minStockBuffer: 300,
    maxStorageCapacity: 3000,
    dedicatedStorage: 'Dyestuff Dry Warehouse Bay D',
    liveTankBay: 'Rack D-12',
    mandatoryPPE: ['P3 Particulate Respirator', 'Nitrile Gloves', 'Lab Coat'],
    incompatibleMaterials: ['Strong Oxidizing Agents'],
    auditTrail: [
      {
        id: 'aud-8',
        action: 'Bluesign & GOTS v7 Scope Verification',
        timestamp: '15-Feb-2023 11:30 AM',
        actor: 'Dr. S. Mehta (EHS Officer)',
        type: 'compliance'
      }
    ]
  },
  {
    id: 'chem-5',
    chemId: 'CHEM000318',
    sku: 'CHEM-PAC-030',
    name: 'Poly Aluminium Chloride (PAC 30%)',
    commonName: 'Polyaluminium Chloride 30% Liquid Coagulant',
    casNumber: '1327-41-9',
    supplier: 'Grasim Industries Ltd',
    department: 'ETP Plant',
    useCase: 'Coagulant / Clarification',
    hazards: [
      {
        type: 'corrosive',
        label: 'Corrosives (Class 8)',
        code: 'H290',
        signalWord: 'DANGER',
        hCodes: ['H290', 'H318'],
        hStatements: [
          'May be corrosive to metals.',
          'Causes serious eye damage.'
        ]
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v2.5',
      status: 'valid',
      expiryDate: '09-Aug-2026',
      lastUpdated: '09-Aug-2023',
      fileSize: '2.4 MB',
      fileName: 'SDS_PAC_30_Liquid_Clarifier.pdf'
    },
    verification: {
      verified: true,
      verifier: 'R. Sundaram (ETP Lead)',
      verifiedDate: '10-Aug-2023',
      status: 'verified'
    },
    complianceTags: ['ETP Grade-A', 'ZDHC Discharge Ok'],
    currentStock: 12400,
    unit: 'Kg',
    minStockBuffer: 2000,
    maxStorageCapacity: 20000,
    dedicatedStorage: 'ETP Bulk Silo Area',
    liveTankBay: 'Silo ETP-01',
    mandatoryPPE: ['PVC Chemical Apron', 'Safety Visor', 'Acid Resistant Boots'],
    incompatibleMaterials: ['Bases', 'Chlorites', 'Hypochlorites'],
    auditTrail: [
      {
        id: 'aud-9',
        action: 'ETP Regulatory Compliance Inspection - Clean Pass',
        timestamp: '10-Aug-2023 03:00 PM',
        actor: 'R. Sundaram (ETP Lead)',
        type: 'compliance'
      }
    ]
  },
  {
    id: 'chem-6',
    chemId: 'CHEM000088',
    sku: 'CHEM-HYD-055',
    name: 'Hydrazine Hydrate 55% Boiler Dosing',
    commonName: 'Hydrazine Hydrate 55% (Oxygen Scavenger)',
    casNumber: '7803-57-8',
    supplier: 'Gujarat Fluorochem Ltd',
    department: 'Boiler House',
    useCase: 'High-Pressure Boiler Water Conditioning',
    hazards: [
      {
        type: 'acute_toxicity',
        label: 'Acute Toxicity (Fatal Inhalation/Oral)',
        code: 'H300',
        signalWord: 'DANGER',
        hCodes: ['H300', 'H310', 'H330', 'H314', 'H350', 'H410'],
        hStatements: [
          'Fatal if swallowed, in contact with skin or if inhaled.',
          'Causes severe skin burns and eye damage.',
          'May cause cancer.',
          'Very toxic to aquatic life with long lasting effects.'
        ]
      },
      {
        type: 'corrosive',
        label: 'Corrosives (Class 8)',
        code: 'H314',
        signalWord: 'DANGER',
        hCodes: ['H314'],
        hStatements: ['Severe chemical burns.']
      },
      {
        type: 'aquatic_toxic',
        label: 'Aquatic Toxic (H410)',
        code: 'H410',
        signalWord: 'DANGER',
        hCodes: ['H410'],
        hStatements: ['Very toxic to aquatic life with long lasting effects.']
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v1.9',
      status: 'expired',
      expiryDate: '01-Sep-2024',
      lastUpdated: '01-Sep-2021',
      fileSize: '5.2 MB',
      fileName: 'SDS_Hydrazine_Hydrate_55.pdf'
    },
    verification: {
      verified: false,
      verifier: 'QUARANTINE ENFORCED',
      verifiedDate: '01-Sep-2024',
      status: 'rejected'
    },
    complianceTags: ['RESTRICTED', 'HAZMAT SEV-1'],
    currentStock: 0,
    unit: 'Ltrs',
    minStockBuffer: 100,
    maxStorageCapacity: 1000,
    dedicatedStorage: 'Chemical Stores Bay 3 (Locked)',
    liveTankBay: 'Quarantine Bay 3-L01',
    mandatoryPPE: ['Full Hazmat SCBA Suit', 'Level A Protective Gear'],
    incompatibleMaterials: ['Oxidants', 'Heavy Metal Catalysts', 'Oxygen'],
    isLocked: true,
    quarantineReason: 'SDS Expired & Statutory Batch Life Exceeded > 30 Days. Physical isolation locked at Chemical Stores Bay 3.',
    lotReference: 'LOT-2023-4112',
    auditTrail: [
      {
        id: 'aud-10',
        action: 'QUARANTINE LOCKOUT: PLC Dispensing Solenoid Isolated',
        timestamp: '01-Sep-2024 00:01 AM',
        actor: 'Statutory Safety Interlock Engine',
        type: 'lock'
      },
      {
        id: 'aud-11',
        action: 'Red Label Affixed & Physical Stores Bay 3 Sealed',
        timestamp: '01-Sep-2024 09:30 AM',
        actor: 'Rajesh Kumar (Super Admin)',
        type: 'lock'
      }
    ]
  },
  {
    id: 'chem-7',
    chemId: 'CHEM000045',
    sku: 'CHEM-NAOCL-012',
    name: 'Sodium Hypochlorite 12%',
    commonName: 'Sodium Hypochlorite 12% Industrial Bleach',
    casNumber: '7681-52-9',
    supplier: 'Kanoria Chemicals',
    department: 'Bleaching & Washing',
    useCase: 'Antimicrobial & Disinfection Treatment',
    hazards: [
      {
        type: 'corrosive',
        label: 'Corrosives (Class 8)',
        code: 'H314',
        signalWord: 'DANGER',
        hCodes: ['H314', 'H400'],
        hStatements: ['Causes severe skin burns and eye damage.', 'Very toxic to aquatic life.']
      },
      {
        type: 'aquatic_toxic',
        label: 'Aquatic Toxic',
        code: 'H400',
        signalWord: 'DANGER',
        hCodes: ['H400'],
        hStatements: ['Toxic to aquatic life.']
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v3.0',
      status: 'expired',
      expiryDate: '15-Aug-2024',
      lastUpdated: '15-Aug-2021',
      fileSize: '3.1 MB',
      fileName: 'SDS_Sodium_Hypochlorite_12.pdf'
    },
    verification: {
      verified: false,
      verifier: 'QUARANTINE ENFORCED',
      verifiedDate: '16-Aug-2024',
      status: 'rejected'
    },
    complianceTags: ['EXPIRED BATCH', 'HAZMAT SEV-1'],
    currentStock: 0,
    unit: 'Ltrs',
    minStockBuffer: 400,
    maxStorageCapacity: 4000,
    dedicatedStorage: 'Chemical Stores Bay 3 (Locked)',
    liveTankBay: 'Quarantine Bay 3-L02',
    mandatoryPPE: ['Rubber Apron', 'Chlorine Gas Mask', 'PVC Boots'],
    incompatibleMaterials: ['Acids', 'Ammonia', 'Organic materials'],
    isLocked: true,
    quarantineReason: 'Active Chlorine Degradation below statutory 10% threshold. Immediate destruction protocol mandated.',
    lotReference: 'LOT-2023-3882',
    auditTrail: [
      {
        id: 'aud-12',
        action: 'Quarantine Isolation Bay 3 Applied',
        timestamp: '16-Aug-2024 10:00 AM',
        actor: 'K. Balan (Safety Officer)',
        type: 'lock'
      }
    ]
  },
  {
    id: 'chem-8',
    chemId: 'CHEM000072',
    sku: 'CHEM-KMN-098',
    name: 'Potassium Permanganate Technical',
    commonName: 'Potassium Permanganate Pure Crystals',
    casNumber: '7722-64-7',
    supplier: 'Universal Starch & Chem',
    department: 'Printing',
    useCase: 'Denim Spray Discharge & Oxidation',
    hazards: [
      {
        type: 'oxidizer',
        label: 'Oxidizers (Type B)',
        code: 'H272',
        signalWord: 'DANGER',
        hCodes: ['H272', 'H302', 'H361d', 'H410'],
        hStatements: ['May intensify fire; oxidizer.', 'Suspected of damaging the unborn child.']
      },
      {
        type: 'aquatic_toxic',
        label: 'Aquatic Toxic (H410)',
        code: 'H410',
        signalWord: 'DANGER',
        hCodes: ['H410'],
        hStatements: ['Very toxic to aquatic life with long lasting effects.']
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v2.1',
      status: 'expired',
      expiryDate: '10-Jul-2024',
      lastUpdated: '10-Jul-2021',
      fileSize: '3.6 MB',
      fileName: 'SDS_Potassium_Permanganate.pdf'
    },
    verification: {
      verified: false,
      verifier: 'QUARANTINE ENFORCED',
      verifiedDate: '11-Jul-2024',
      status: 'rejected'
    },
    complianceTags: ['EXPIRED BATCH', 'HAZMAT SEV-1'],
    currentStock: 0,
    unit: 'Kg',
    minStockBuffer: 150,
    maxStorageCapacity: 1500,
    dedicatedStorage: 'Chemical Stores Bay 3 (Locked)',
    liveTankBay: 'Quarantine Bay 3-L03',
    mandatoryPPE: ['Full Face Shield', 'Nitrile Gauntlets', 'Chemical Smock'],
    incompatibleMaterials: ['Flammables', 'Glycerol', 'Hydrochloric Acid'],
    isLocked: true,
    quarantineReason: 'Controlled substance audit gap & expired batch record.',
    lotReference: 'LOT-2023-2901',
    auditTrail: [
      {
        id: 'aud-13',
        action: 'Bay 3 Dispensing Lock Triggered',
        timestamp: '11-Jul-2024 02:00 PM',
        actor: 'Dr. S. Mehta (EHS Officer)',
        type: 'lock'
      }
    ]
  },
  {
    id: 'chem-9',
    chemId: 'CHEM000091',
    sku: 'CHEM-CH2O-037',
    name: 'Formaldehyde Solution 37%',
    commonName: 'Formaldehyde 37% Stabilized (Formalin)',
    casNumber: '50-00-0',
    supplier: 'Balaji Formalin Ltd',
    department: 'Fabric Wash',
    useCase: 'Resin Finishing Cross-linker (Restricted)',
    hazards: [
      {
        type: 'acute_toxicity',
        label: 'Acute Toxicity & Carcinogen',
        code: 'H350',
        signalWord: 'DANGER',
        hCodes: ['H350', 'H301', 'H311', 'H331', 'H314', 'H317'],
        hStatements: ['May cause cancer.', 'Toxic if swallowed, in contact with skin or inhaled.']
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v2.4',
      status: 'expired',
      expiryDate: '20-Jun-2024',
      lastUpdated: '20-Jun-2021',
      fileSize: '4.8 MB',
      fileName: 'SDS_Formaldehyde_37pct.pdf'
    },
    verification: {
      verified: false,
      verifier: 'QUARANTINE ENFORCED',
      verifiedDate: '21-Jun-2024',
      status: 'rejected'
    },
    complianceTags: ['MRSL BANNED OVER-LIMIT', 'HAZMAT SEV-1'],
    currentStock: 0,
    unit: 'Ltrs',
    minStockBuffer: 100,
    maxStorageCapacity: 1200,
    dedicatedStorage: 'Chemical Stores Bay 3 (Locked)',
    liveTankBay: 'Quarantine Bay 3-L04',
    mandatoryPPE: ['Vapor Respirator (Formaldehyde Filter)', 'Chemical Splash Hood'],
    incompatibleMaterials: ['Oxidizers', 'Alkalies', 'Phenol'],
    isLocked: true,
    quarantineReason: 'MRSL Zero Discharge non-compliance flag. Bay 3 destruction transfer pending.',
    lotReference: 'LOT-2023-1490',
    auditTrail: [
      {
        id: 'aud-14',
        action: 'MRSL Discrepancy Lock Mandated',
        timestamp: '21-Jun-2024 11:15 AM',
        actor: 'Rajesh Kumar (Super Admin)',
        type: 'lock'
      }
    ]
  },
  {
    id: 'chem-10',
    chemId: 'CHEM000109',
    sku: 'CHEM-CRO3-099',
    name: 'Chromium Trioxide Flakes',
    commonName: 'Chromic Acid Anhydride (CrO3)',
    casNumber: '1333-82-0',
    supplier: 'Sudarshan Chemical Ind',
    department: 'Maintenance',
    useCase: 'Passivation & Anti-corrosion Bath',
    hazards: [
      {
        type: 'oxidizer',
        label: 'Oxidizers (Type B)',
        code: 'H271',
        signalWord: 'DANGER',
        hCodes: ['H271', 'H350', 'H340', 'H361f', 'H330', 'H314', 'H410'],
        hStatements: ['May cause fire or explosion.', 'May cause cancer and genetic defects.']
      }
    ],
    signalWord: 'DANGER',
    sds: {
      version: 'v2.0',
      status: 'expired',
      expiryDate: '18-May-2024',
      lastUpdated: '18-May-2021',
      fileSize: '3.9 MB',
      fileName: 'SDS_Chromium_Trioxide_99.pdf'
    },
    verification: {
      verified: false,
      verifier: 'QUARANTINE ENFORCED',
      verifiedDate: '19-May-2024',
      status: 'rejected'
    },
    complianceTags: ['REACH AUTHORIZATION EXPIRED', 'HAZMAT SEV-1'],
    currentStock: 0,
    unit: 'Kg',
    minStockBuffer: 50,
    maxStorageCapacity: 500,
    dedicatedStorage: 'Chemical Stores Bay 3 (Locked)',
    liveTankBay: 'Quarantine Bay 3-L05',
    mandatoryPPE: ['Full Hazmat SCBA', 'Heavy Duty Neoprene Suit'],
    incompatibleMaterials: ['Organic matter', 'Flammable materials', 'Alcohol'],
    isLocked: true,
    quarantineReason: 'REACH Authorisation expired. Disposal manifests prepared.',
    lotReference: 'LOT-2023-0912',
    auditTrail: [
      {
        id: 'aud-15',
        action: 'Sealed in Chemical Stores Bay 3 vault',
        timestamp: '19-May-2024 04:00 PM',
        actor: 'Dr. S. Mehta (EHS Officer)',
        type: 'lock'
      }
    ]
  }
];

export const INITIAL_CONSUMPTION_LOGS: FloorConsumptionLogItem[] = [
  {
    id: 'log-1',
    timestamp: 'Today, 14:28:10',
    chemicalName: 'Sodium Hydroxide (Caustic Soda 48%)',
    casNumber: '1310-73-2',
    code: 'CHE-00128',
    department: 'Dyeing House',
    dosageQty: 450.00,
    uom: 'Kg',
    batchPoRef: 'LOT-2024-8841',
    operatorId: 'OP-104',
    operatorName: 'S. Murugan',
    remainingStock: 3250,
    remainingStockMax: 5000,
    stockLevelStatus: 'optimal',
    status: 'Logged'
  },
  {
    id: 'log-2',
    timestamp: 'Today, 13:45:02',
    chemicalName: 'Hydrogen Peroxide 50% Tech',
    casNumber: '7722-84-1',
    code: 'CHE-00042',
    department: 'Washing Unit',
    dosageQty: 180.00,
    uom: 'Ltrs',
    batchPoRef: 'LOT-2024-9102',
    operatorId: 'OP-088',
    operatorName: 'R. Vignesh',
    remainingStock: 820,
    remainingStockMax: 1000,
    stockLevelStatus: 'optimal',
    status: 'Logged'
  },
  {
    id: 'log-3',
    timestamp: 'Today, 12:15:33',
    chemicalName: 'Glacial Acetic Acid 99.8%',
    casNumber: '64-19-7',
    code: 'CHE-00219',
    department: 'Dyeing House',
    dosageQty: 75.00,
    uom: 'Ltrs',
    batchPoRef: 'LOT-2024-7629',
    operatorId: 'OP-115',
    operatorName: 'A. Karthik',
    remainingStock: 125,
    remainingStockMax: 2500,
    stockLevelStatus: 'low',
    status: 'Low Stock'
  },
  {
    id: 'log-4',
    timestamp: 'Today, 11:30:19',
    chemicalName: 'Polyaluminium Chloride (PAC 30%)',
    casNumber: '1327-41-9',
    code: 'CHE-00305',
    department: 'ETP Plant',
    dosageQty: 1200.00,
    uom: 'Kg',
    batchPoRef: 'LOT-2024-6512',
    operatorId: 'OP-042',
    operatorName: 'M. Selvan',
    remainingStock: 9400,
    remainingStockMax: 20000,
    stockLevelStatus: 'optimal',
    status: 'Logged'
  },
  {
    id: 'log-5',
    timestamp: 'Today, 09:12:44',
    chemicalName: 'Hydrazine Hydrate 55% Boiler Dosing',
    casNumber: '7803-57-8',
    code: 'CHE-00088',
    department: 'Boiler House',
    dosageQty: 0.00,
    uom: 'Ltrs',
    batchPoRef: 'LOT-2023-4112',
    operatorId: 'Auto',
    operatorName: 'PLC Interlock (Auto)',
    remainingStock: 0,
    remainingStockMax: 1000,
    stockLevelStatus: 'locked',
    status: 'BLOCKED',
    isAutoPlc: true
  }
];

export const DEPARTMENT_ALLOCATION_DATA = [
  { dept: 'Dyeing', count: 42, color: '#1E40AF', activeLabel: '42 items' },
  { dept: 'Washing', count: 30, color: '#2563EB', activeLabel: '30 items' },
  { dept: 'Printing', count: 24, color: '#3B82F6', activeLabel: '24 items' },
  { dept: 'ETP', count: 20, color: '#475569', activeLabel: '20 items' },
  { dept: 'Fab.Wash', count: 14, color: '#64748B', activeLabel: '14 items' },
  { dept: 'Maint.', count: 12, color: '#94A3B8', activeLabel: '12 items' },
  { dept: 'Stores', count: 10, color: '#475569', activeLabel: '10 items' },
  { dept: 'Boiler', count: 6, color: '#CBD5E1', activeLabel: '6 items' }
];

export const MONTHLY_VELOCITY_DATA = [
  { month: 'MAY', solidsMT: 48.2, liquidsKL: 41.5, plannedLimit: 52 },
  { month: 'JUN', solidsMT: 52.8, liquidsKL: 43.1, plannedLimit: 55 },
  { month: 'JUL', solidsMT: 49.5, liquidsKL: 45.8, plannedLimit: 53 },
  { month: 'AUG', solidsMT: 55.1, liquidsKL: 47.2, plannedLimit: 57 },
  { month: 'SEP', solidsMT: 57.0, liquidsKL: 48.9, plannedLimit: 59 },
  { month: 'OCT (MTD)', solidsMT: 58.4, liquidsKL: 49.2, plannedLimit: 60 }
];

export const GHS_HAZARD_TALLIES = [
  {
    type: 'flammable' as const,
    name: 'Flammables',
    category: 'Cat 1-3 (H224)',
    count: 28,
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FEE2E2'
  },
  {
    type: 'corrosive' as const,
    name: 'Corrosives',
    category: 'Class 8 (H314)',
    count: 34,
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FEE2E2'
  },
  {
    type: 'acute_toxicity' as const,
    name: 'Acute Toxicity',
    category: 'Fatal Oral (H300)',
    count: 14,
    color: '#B91C1C',
    bgColor: '#FEF2F2',
    borderColor: '#FEE2E2'
  },
  {
    type: 'irritant' as const,
    name: 'Irritant / Skin',
    category: 'Cat 2 (H315)',
    count: 48,
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE'
  },
  {
    type: 'oxidizer' as const,
    name: 'Oxidizers',
    category: 'Type B (H271)',
    count: 9,
    color: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#E0F2FE'
  },
  {
    type: 'aquatic_toxic' as const,
    name: 'Aquatic Toxic',
    category: 'Aquatic (H410)',
    count: 22,
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#D1FAE5'
  }
];

export const SYSTEM_NOTIFICATIONS = [
  {
    id: 'notif-1',
    severity: 'critical',
    title: 'QUARANTINE ENFORCEMENT: 5 CHEMICALS EXPIRED',
    message: 'Physical isolation locked at Chemical Stores Bay 3. Immediate destruction protocol mandated.',
    time: '8m ago',
    unread: true
  },
  {
    id: 'notif-2',
    severity: 'warning',
    title: 'Statutory 30-Day SDS Expiry Trigger',
    message: '12 Chemicals & 4 GHS Safety Data Sheets (SDS) reaching statutory threshold within 30 days.',
    time: '24m ago',
    unread: true
  },
  {
    id: 'notif-3',
    severity: 'info',
    title: 'Low Stock Alert: Glacial Acetic Acid 99%',
    message: 'Current stock 380 Kg below min buffer threshold of 500 Kg in Bay 2.',
    time: '1h ago',
    unread: true
  }
];
