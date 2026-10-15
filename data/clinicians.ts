import { TelemetryData, LedgerEntry, VaultRecord, SystemStatus } from '../types/clinician';

export const clinicianProfile = {
  id: 'clin-001',
  name: 'Dr. Sara Menon',
  role: 'Public Health Epidemiologist',
  department: 'Disease Surveillance Unit',
  facility: 'Kerala State Health Services',
  clearanceLevel: 'Level 3 — Regional Access',
  lastLogin: '2026-10-14T08:00:00Z',
  email: 'sara.menon@khsd.demo',
  phone: '+91 XXXXX XXXXX',
};

export const telemetryData: TelemetryData[] = [
  { id: 'tel-1', metric: 'API Response Time', value: 142, unit: 'ms', status: 'Normal', lastUpdated: '2026-10-14T12:00:00Z', trend: 'stable' },
  { id: 'tel-2', metric: 'Data Pipeline Latency', value: 2.4, unit: 's', status: 'Normal', lastUpdated: '2026-10-14T12:00:00Z', trend: 'down' },
  { id: 'tel-3', metric: 'Report Processing Queue', value: 8, unit: 'items', status: 'Normal', lastUpdated: '2026-10-14T12:00:00Z', trend: 'up' },
  { id: 'tel-4', metric: 'Blockchain Sync Status', value: 99.8, unit: '%', status: 'Normal', lastUpdated: '2026-10-14T12:00:00Z', trend: 'stable' },
  { id: 'tel-5', metric: 'Node Health Score', value: 94, unit: '%', status: 'Normal', lastUpdated: '2026-10-14T12:00:00Z', trend: 'stable' },
  { id: 'tel-6', metric: 'Alert Processing Time', value: 340, unit: 'ms', status: 'Warning', lastUpdated: '2026-10-14T12:00:00Z', trend: 'up' },
];

export const ledgerEntries: LedgerEntry[] = [
  { id: 'led-1', transactionHash: '0x7f3a...b24e', type: 'Report Submission', description: 'Dengue case report submitted from Ernakulam DHO', actor: 'Dr. Arun Nair', timestamp: '2026-10-14T12:30:00Z', verificationStatus: 'Verified', blockNumber: 18429356, details: 'Case report for dengue cluster in Kakkanad ward, Ernakulam district' },
  { id: 'led-2', transactionHash: '0x2c8d...e91f', type: 'Verification', description: 'Outbreak report verification completed', actor: 'State Verification Node', timestamp: '2026-10-14T12:05:00Z', verificationStatus: 'Verified', blockNumber: 18429342, details: 'Cross-validated against hospital admission records and lab confirmations' },
  { id: 'led-3', transactionHash: '0x9a1b...c73d', type: 'Alert Generation', description: 'High-priority alert generated for Ernakulam dengue cluster', actor: 'Automated System', timestamp: '2026-10-14T12:00:00Z', verificationStatus: 'Verified', blockNumber: 18429338, details: 'Threshold-based alert triggered by surveillance data aggregation' },
  { id: 'led-4', transactionHash: '0x5e4f...a28c', type: 'Status Update', description: 'Kakkanad cluster status upgraded to Critical', actor: 'Dr. Sara Menon', timestamp: '2026-10-14T11:30:00Z', verificationStatus: 'Verified', blockNumber: 18429325, details: 'Status change based on transmission index exceeding 1.4 threshold' },
  { id: 'led-5', transactionHash: '0x1d7e...f45a', type: 'Data Amendment', description: 'Malaria case count corrected for Kozhikode cluster', actor: 'Data Quality Team', timestamp: '2026-10-14T10:00:00Z', verificationStatus: 'Pending', blockNumber: 18429298, details: 'Amendment to correct duplicate entries identified in data reconciliation' },
  { id: 'led-6', transactionHash: '0x8b2c...d67e', type: 'Access Grant', description: 'Level 3 access granted to new epidemiologist', actor: 'Admin Node', timestamp: '2026-10-14T09:00:00Z', verificationStatus: 'Verified', blockNumber: 18429275, details: 'Regional access credentials issued for Kozhikode district operations' },
];

export const vaultRecords: VaultRecord[] = [
  { id: 'vault-1', name: 'Surveillance API Certificate', type: 'Certificate', status: 'Active', issuedAt: '2026-07-01T00:00:00Z', expiresAt: '2027-07-01T00:00:00Z', issuer: 'Kerala Health Authority CA' },
  { id: 'vault-2', name: 'Blockchain Node Key', type: 'Key', status: 'Active', issuedAt: '2026-05-15T00:00:00Z', expiresAt: '2027-05-15T00:00:00Z', issuer: 'DiseaseX Network Authority' },
  { id: 'vault-3', name: 'Data Encryption Key', type: 'Key', status: 'Active', issuedAt: '2026-08-01T00:00:00Z', expiresAt: '2027-02-01T00:00:00Z', issuer: 'System Generated' },
  { id: 'vault-4', name: 'HMIS Access Token', type: 'Token', status: 'Active', issuedAt: '2026-10-01T00:00:00Z', expiresAt: '2026-12-31T00:00:00Z', issuer: 'Health Management Information System' },
  { id: 'vault-5', name: 'Legacy API Credential', type: 'Credential', status: 'Expired', issuedAt: '2025-10-01T00:00:00Z', expiresAt: '2026-09-30T00:00:00Z', issuer: 'State Health Portal' },
];

export const systemStatuses: SystemStatus[] = [
  { id: 'sys-1', name: 'Surveillance API', status: 'Operational', uptime: '99.97%', lastCheck: '2026-10-14T12:00:00Z', responseTime: 142 },
  { id: 'sys-2', name: 'Blockchain Network', status: 'Operational', uptime: '99.99%', lastCheck: '2026-10-14T12:00:00Z', responseTime: 380 },
  { id: 'sys-3', name: 'Data Pipeline', status: 'Operational', uptime: '99.85%', lastCheck: '2026-10-14T12:00:00Z', responseTime: 2400 },
  { id: 'sys-4', name: 'Alert Engine', status: 'Degraded', uptime: '98.50%', lastCheck: '2026-10-14T12:00:00Z', responseTime: 890 },
  { id: 'sys-5', name: 'GIS Service', status: 'Operational', uptime: '99.92%', lastCheck: '2026-10-14T12:00:00Z', responseTime: 210 },
  { id: 'sys-6', name: 'Authentication Service', status: 'Operational', uptime: '99.99%', lastCheck: '2026-10-14T12:00:00Z', responseTime: 95 },
];
