import { SeverityLevel } from './disease';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  disease: string;
  diseaseId: string;
  region: string;
  reportingPeriod: string;
  demoCaseCount: number;
  percentageChange: number;
  status: AlertStatus;
  sourceOrganization: string;
  verificationStatus: string;
  recommendedFollowUp: string[];
  relatedOutbreakId?: string;
  auditHistory: AuditEntry[];
  createdAt: string;
  read: boolean;
}

export type AlertSeverity = 'Critical' | 'High' | 'Moderate' | 'Low' | 'Info';

export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved' | 'Expired';

export interface AuditEntry {
  timestamp: string;
  action: string;
  actor: string;
  details: string;
}
