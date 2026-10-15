export interface Disease {
  id: string;
  name: string;
  category: DiseaseCategory;
  description: string;
  causativeAgent: string;
  vector?: string;
  incubationPeriod: string;
  severity: SeverityLevel;
  transmissionMethods: string[];
  symptoms: Symptom[];
  preventiveMeasures: string[];
  treatments: string[];
  demoCaseCount: number;
  trendDirection: TrendDirection;
  trendPercentage: number;
  lastUpdated: string;
  verificationStatus: VerificationStatus;
  regions: string[];
  riskLevel: RiskLevel;
  mortalityRate: string;
  recoveryRate: string;
}

export type DiseaseCategory =
  | 'Viral'
  | 'Bacterial'
  | 'Parasitic'
  | 'Fungal'
  | 'Prion'
  | 'Vector-borne'
  | 'Respiratory'
  | 'Zoonotic';

export type SeverityLevel = 'Critical' | 'High' | 'Moderate' | 'Low' | 'Monitoring';

export type TrendDirection = 'up' | 'down' | 'stable';

export type VerificationStatus = 'Verified' | 'Pending' | 'Unverified' | 'Under Review';

export type RiskLevel = 'Critical' | 'High' | 'Elevated' | 'Moderate' | 'Low';

export interface Symptom {
  id: string;
  name: string;
  description: string;
  commonality: 'Very Common' | 'Common' | 'Occasional' | 'Rare';
}
