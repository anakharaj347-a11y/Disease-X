import { OutbreakCluster, OutbreakIncident, ForecastData } from '../types/outbreak';

export const outbreakClusters: OutbreakCluster[] = [
  {
    id: 'cluster-1',
    name: 'Kakkanad Cluster',
    disease: 'Dengue Serotype 2',
    diseaseId: 'dengue',
    status: 'Critical',
    severity: 'Critical',
    demoCaseCount: 1284,
    transmissionIndex: 1.48,
    vector: 'Aedes aegypti',
    region: 'Kochi',
    district: 'Ernakulam',
    coordinates: { latitude: 10.0159, longitude: 76.3419 },
    trendDirection: 'up',
    trendPercentage: 12.4,
    lastRecorded: '2026-10-14T12:00:00Z',
    incidents: ['INC-001', 'INC-002', 'INC-003', 'INC-004'],
  },
  {
    id: 'cluster-2',
    name: 'Fort Kochi Cluster',
    disease: 'Influenza A',
    diseaseId: 'influenza-a',
    status: 'Elevated',
    severity: 'High',
    demoCaseCount: 642,
    transmissionIndex: 1.12,
    region: 'Kochi',
    district: 'Ernakulam',
    coordinates: { latitude: 9.9639, longitude: 76.2432 },
    trendDirection: 'stable',
    trendPercentage: -2.1,
    lastRecorded: '2026-10-14T10:30:00Z',
    incidents: ['INC-005', 'INC-006', 'INC-007'],
  },
  {
    id: 'cluster-3',
    name: 'Kozhikode Urban Cluster',
    disease: 'Malaria',
    diseaseId: 'malaria',
    status: 'Monitoring',
    severity: 'Moderate',
    demoCaseCount: 318,
    transmissionIndex: 0.94,
    vector: 'Anopheles mosquito',
    region: 'Kozhikode',
    district: 'Kozhikode',
    coordinates: { latitude: 11.2588, longitude: 75.7804 },
    trendDirection: 'down',
    trendPercentage: -8.3,
    lastRecorded: '2026-10-14T09:15:00Z',
    incidents: ['INC-008', 'INC-009'],
  },
  {
    id: 'cluster-4',
    name: 'Thiruvananthapuram Cluster',
    disease: 'Dengue',
    diseaseId: 'dengue',
    status: 'Elevated',
    severity: 'High',
    demoCaseCount: 506,
    transmissionIndex: 1.21,
    vector: 'Aedes aegypti',
    region: 'Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    coordinates: { latitude: 8.5241, longitude: 76.9366 },
    trendDirection: 'up',
    trendPercentage: 7.6,
    lastRecorded: '2026-10-14T11:00:00Z',
    incidents: ['INC-010', 'INC-011', 'INC-012'],
  },
];

export const outbreakIncidents: OutbreakIncident[] = [
  {
    id: 'inc-1', incidentId: 'INC-001', disease: 'Dengue', diseaseId: 'dengue',
    cluster: 'Kakkanad Cluster', clusterId: 'cluster-1', severity: 'Critical',
    region: 'Kochi', district: 'Ernakulam', dateReported: '2026-10-14T08:00:00Z',
    status: 'Active', verificationStatus: 'Verified', demoCaseCount: 342,
    description: 'Significant increase in dengue cases reported in Kakkanad ward. Multiple breeding sites identified.',
    reviewed: false,
  },
  {
    id: 'inc-2', incidentId: 'INC-002', disease: 'Dengue', diseaseId: 'dengue',
    cluster: 'Kakkanad Cluster', clusterId: 'cluster-1', severity: 'High',
    region: 'Kochi', district: 'Ernakulam', dateReported: '2026-10-13T14:00:00Z',
    status: 'Active', verificationStatus: 'Verified', demoCaseCount: 228,
    description: 'Continued dengue transmission in residential areas near Kakkanad.',
    reviewed: true,
  },
  {
    id: 'inc-3', incidentId: 'INC-003', disease: 'Dengue', diseaseId: 'dengue',
    cluster: 'Kakkanad Cluster', clusterId: 'cluster-1', severity: 'High',
    region: 'Kochi', district: 'Ernakulam', dateReported: '2026-10-12T10:00:00Z',
    status: 'Under Investigation', verificationStatus: 'Pending', demoCaseCount: 186,
    description: 'New dengue cases in previously unaffected sub-ward in Kakkanad region.',
    reviewed: false,
  },
  {
    id: 'inc-4', incidentId: 'INC-004', disease: 'Dengue', diseaseId: 'dengue',
    cluster: 'Kakkanad Cluster', clusterId: 'cluster-1', severity: 'Moderate',
    region: 'Kochi', district: 'Ernakulam', dateReported: '2026-10-11T09:00:00Z',
    status: 'Active', verificationStatus: 'Verified', demoCaseCount: 128,
    description: 'Dengue cases reported near construction sites in Kakkanad.',
    reviewed: true,
  },
  {
    id: 'inc-5', incidentId: 'INC-005', disease: 'Influenza A', diseaseId: 'influenza-a',
    cluster: 'Fort Kochi Cluster', clusterId: 'cluster-2', severity: 'High',
    region: 'Kochi', district: 'Ernakulam', dateReported: '2026-10-14T06:00:00Z',
    status: 'Active', verificationStatus: 'Verified', demoCaseCount: 245,
    description: 'Influenza A outbreak in Fort Kochi area with increased hospitalizations.',
    reviewed: false,
  },
  {
    id: 'inc-6', incidentId: 'INC-006', disease: 'Influenza A', diseaseId: 'influenza-a',
    cluster: 'Fort Kochi Cluster', clusterId: 'cluster-2', severity: 'Moderate',
    region: 'Kochi', district: 'Ernakulam', dateReported: '2026-10-13T11:00:00Z',
    status: 'Active', verificationStatus: 'Verified', demoCaseCount: 198,
    description: 'Influenza cases spreading in school and workplace environments.',
    reviewed: true,
  },
  {
    id: 'inc-7', incidentId: 'INC-007', disease: 'Influenza A', diseaseId: 'influenza-a',
    cluster: 'Fort Kochi Cluster', clusterId: 'cluster-2', severity: 'Moderate',
    region: 'Kochi', district: 'Ernakulam', dateReported: '2026-10-12T15:00:00Z',
    status: 'Under Investigation', verificationStatus: 'Pending', demoCaseCount: 99,
    description: 'New influenza cluster identified in Fort Kochi residential area.',
    reviewed: false,
  },
  {
    id: 'inc-8', incidentId: 'INC-008', disease: 'Malaria', diseaseId: 'malaria',
    cluster: 'Kozhikode Urban Cluster', clusterId: 'cluster-3', severity: 'Moderate',
    region: 'Kozhikode', district: 'Kozhikode', dateReported: '2026-10-13T09:00:00Z',
    status: 'Active', verificationStatus: 'Verified', demoCaseCount: 186,
    description: 'Malaria cases in urban Kozhikode linked to stagnant water near construction sites.',
    reviewed: true,
  },
  {
    id: 'inc-9', incidentId: 'INC-009', disease: 'Malaria', diseaseId: 'malaria',
    cluster: 'Kozhikode Urban Cluster', clusterId: 'cluster-3', severity: 'Low',
    region: 'Kozhikode', district: 'Kozhikode', dateReported: '2026-10-12T07:00:00Z',
    status: 'Resolved', verificationStatus: 'Verified', demoCaseCount: 42,
    description: 'Previous malaria cluster in outer Kozhikode successfully contained.',
    reviewed: true,
  },
  {
    id: 'inc-10', incidentId: 'INC-010', disease: 'Dengue', diseaseId: 'dengue',
    cluster: 'Thiruvananthapuram Cluster', clusterId: 'cluster-4', severity: 'High',
    region: 'Thiruvananthapuram', district: 'Thiruvananthapuram', dateReported: '2026-10-14T07:00:00Z',
    status: 'Active', verificationStatus: 'Verified', demoCaseCount: 234,
    description: 'Dengue outbreak in Thiruvananthapuram city with multiple hospitalized cases.',
    reviewed: false,
  },
  {
    id: 'inc-11', incidentId: 'INC-011', disease: 'Dengue', diseaseId: 'dengue',
    cluster: 'Thiruvananthapuram Cluster', clusterId: 'cluster-4', severity: 'Moderate',
    region: 'Thiruvananthapuram', district: 'Thiruvananthapuram', dateReported: '2026-10-13T16:00:00Z',
    status: 'Active', verificationStatus: 'Pending', demoCaseCount: 156,
    description: 'Rising dengue cases in suburban areas around Thiruvananthapuram.',
    reviewed: false,
  },
  {
    id: 'inc-12', incidentId: 'INC-012', disease: 'Dengue', diseaseId: 'dengue',
    cluster: 'Thiruvananthapuram Cluster', clusterId: 'cluster-4', severity: 'Moderate',
    region: 'Thiruvananthapuram', district: 'Thiruvananthapuram', dateReported: '2026-10-12T12:00:00Z',
    status: 'Under Investigation', verificationStatus: 'Under Review', demoCaseCount: 116,
    description: 'Suspected dengue cluster in newly developed residential area.',
    reviewed: false,
  },
];

export const forecastData: Record<string, ForecastData[]> = {
  '24h': [
    { horizon: '24h', region: 'Kochi', riskLevel: 72, confidence: 85, predictedCases: 45, trendDirection: 'up', dataCompleteness: 92, indicators: ['Vector density', 'Rainfall', 'Historical pattern'] },
    { horizon: '24h', region: 'Ernakulam', riskLevel: 58, confidence: 80, predictedCases: 28, trendDirection: 'stable', dataCompleteness: 88, indicators: ['Case velocity', 'Population density'] },
    { horizon: '24h', region: 'Kozhikode', riskLevel: 34, confidence: 78, predictedCases: 12, trendDirection: 'down', dataCompleteness: 85, indicators: ['Containment measures', 'Treatment access'] },
    { horizon: '24h', region: 'Thiruvananthapuram', riskLevel: 61, confidence: 82, predictedCases: 32, trendDirection: 'up', dataCompleteness: 90, indicators: ['Urban density', 'Vector index'] },
  ],
  '3d': [
    { horizon: '3d', region: 'Kochi', riskLevel: 76, confidence: 75, predictedCases: 128, trendDirection: 'up', dataCompleteness: 88, indicators: ['Monsoon forecast', 'Vector breeding'] },
    { horizon: '3d', region: 'Ernakulam', riskLevel: 62, confidence: 72, predictedCases: 82, trendDirection: 'up', dataCompleteness: 84, indicators: ['Transmission index', 'Contact tracing'] },
    { horizon: '3d', region: 'Kozhikode', riskLevel: 30, confidence: 70, predictedCases: 28, trendDirection: 'down', dataCompleteness: 80, indicators: ['Intervention impact', 'Weather'] },
    { horizon: '3d', region: 'Thiruvananthapuram', riskLevel: 65, confidence: 73, predictedCases: 96, trendDirection: 'up', dataCompleteness: 86, indicators: ['Case acceleration', 'Hospital capacity'] },
  ],
  '7d': [
    { horizon: '7d', region: 'Kochi', riskLevel: 80, confidence: 65, predictedCases: 312, trendDirection: 'up', dataCompleteness: 82, indicators: ['Seasonal trend', 'Infrastructure'] },
    { horizon: '7d', region: 'Ernakulam', riskLevel: 68, confidence: 62, predictedCases: 198, trendDirection: 'up', dataCompleteness: 78, indicators: ['Population movement', 'Sanitation'] },
    { horizon: '7d', region: 'Kozhikode', riskLevel: 28, confidence: 60, predictedCases: 56, trendDirection: 'stable', dataCompleteness: 75, indicators: ['Vector control efficacy'] },
    { horizon: '7d', region: 'Thiruvananthapuram', riskLevel: 70, confidence: 63, predictedCases: 224, trendDirection: 'up', dataCompleteness: 80, indicators: ['Climate model', 'Mobility data'] },
  ],
  '14d': [
    { horizon: '14d', region: 'Kochi', riskLevel: 82, confidence: 52, predictedCases: 580, trendDirection: 'up', dataCompleteness: 76, indicators: ['Long-range weather', 'Historical baseline'] },
    { horizon: '14d', region: 'Ernakulam', riskLevel: 72, confidence: 50, predictedCases: 386, trendDirection: 'up', dataCompleteness: 72, indicators: ['Vaccination coverage', 'Immunity waning'] },
    { horizon: '14d', region: 'Kozhikode', riskLevel: 26, confidence: 48, predictedCases: 94, trendDirection: 'stable', dataCompleteness: 68, indicators: ['Sustained containment'] },
    { horizon: '14d', region: 'Thiruvananthapuram', riskLevel: 74, confidence: 51, predictedCases: 412, trendDirection: 'up', dataCompleteness: 74, indicators: ['Urbanization trends'] },
  ],
};

export function getClusterById(id: string): OutbreakCluster | undefined {
  return outbreakClusters.find(c => c.id === id);
}

export function getIncidentsByCluster(clusterId: string): OutbreakIncident[] {
  return outbreakIncidents.filter(i => i.clusterId === clusterId);
}

export function getIncidentById(id: string): OutbreakIncident | undefined {
  return outbreakIncidents.find(i => i.id === id);
}
