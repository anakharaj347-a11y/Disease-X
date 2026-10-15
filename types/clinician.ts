export interface ClinicianProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  facility: string;
  clearanceLevel: string;
  lastLogin: string;
}

export interface TelemetryData {
  id: string;
  metric: string;
  value: number;
  unit: string;
  status: 'Normal' | 'Warning' | 'Critical';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export interface LedgerEntry {
  id: string;
  transactionHash: string;
  type: LedgerEntryType;
  description: string;
  actor: string;
  timestamp: string;
  verificationStatus: 'Verified' | 'Pending' | 'Failed';
  blockNumber: number;
  details: string;
}

export type LedgerEntryType =
  | 'Report Submission'
  | 'Verification'
  | 'Status Update'
  | 'Alert Generation'
  | 'Data Amendment'
  | 'Access Grant';

export interface VaultRecord {
  id: string;
  name: string;
  type: 'Certificate' | 'Key' | 'Credential' | 'Token';
  status: 'Active' | 'Expired' | 'Revoked';
  issuedAt: string;
  expiresAt: string;
  issuer: string;
}

export interface SystemStatus {
  id: string;
  name: string;
  status: 'Operational' | 'Degraded' | 'Down' | 'Maintenance';
  uptime: string;
  lastCheck: string;
  responseTime: number;
}
