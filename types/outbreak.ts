import { SeverityLevel, VerificationStatus, TrendDirection } from './disease';

export interface Outbreak {
  id: string;
  disease: string;
  diseaseId: string;
  cluster: string;
  region: string;
  district: string;
  status: OutbreakStatus;
  severity: SeverityLevel;
  demoCaseCount: number;
  transmissionIndex: number;
  vector?: string;
  dateReported: string;
  lastUpdated: string;
  verificationStatus: VerificationStatus;
  trendDirection: TrendDirection;
  trendPercentage: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  reportingOrganizations: number;
  relatedAlerts: string[];
}

export type OutbreakStatus = 'Critical' | 'Elevated' | 'Monitoring' | 'Contained' | 'Resolved';

export interface OutbreakCluster {
  id: string;
  name: string;
  disease: string;
  diseaseId: string;
  status: OutbreakStatus;
  severity: SeverityLevel;
  demoCaseCount: number;
  transmissionIndex: number;
  vector?: string;
  region: string;
  district: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  trendDirection: TrendDirection;
  trendPercentage: number;
  lastRecorded: string;
  incidents: string[];
}

export interface OutbreakIncident {
  id: string;
  incidentId: string;
  disease: string;
  diseaseId: string;
  cluster: string;
  clusterId: string;
  severity: SeverityLevel;
  region: string;
  district: string;
  dateReported: string;
  status: 'Active' | 'Under Investigation' | 'Resolved' | 'Archived';
  verificationStatus: VerificationStatus;
  demoCaseCount: number;
  description: string;
  reviewed: boolean;
}

export interface ForecastData {
  horizon: '24h' | '3d' | '7d' | '14d';
  region: string;
  riskLevel: number;
  confidence: number;
  predictedCases: number;
  trendDirection: TrendDirection;
  dataCompleteness: number;
  indicators: string[];
}
