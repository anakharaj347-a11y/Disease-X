import { Alert } from '../types/alert';

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Dengue activity increased in Ernakulam',
    description: 'Demonstration surveillance records show an increase in dengue cases in the Ernakulam district during the selected reporting period. Vector density index has exceeded threshold levels.',
    severity: 'High',
    disease: 'Dengue',
    diseaseId: 'dengue',
    region: 'Ernakulam, Kerala',
    reportingPeriod: 'Oct 7–14, 2026',
    demoCaseCount: 342,
    percentageChange: 28.5,
    status: 'Active',
    sourceOrganization: 'District Health Office, Ernakulam',
    verificationStatus: 'Verified',
    recommendedFollowUp: [
      'Intensify vector control operations in affected wards',
      'Activate community-level surveillance',
      'Coordinate with municipal sanitation teams',
      'Ensure adequate testing kit availability',
      'Issue public health advisory for affected areas',
    ],
    relatedOutbreakId: 'cluster-1',
    auditHistory: [
      { timestamp: '2026-10-14T12:00:00Z', action: 'Alert Generated', actor: 'System', details: 'Automated alert triggered by surveillance threshold breach' },
      { timestamp: '2026-10-14T12:05:00Z', action: 'Verification Initiated', actor: 'Dr. Arun Nair', details: 'Cross-referencing with hospital admission records' },
      { timestamp: '2026-10-14T12:30:00Z', action: 'Verified', actor: 'Dr. Arun Nair', details: 'Confirmed by multiple reporting sources' },
    ],
    createdAt: '2026-10-14T12:00:00Z',
    read: false,
  },
  {
    id: 'alert-2',
    title: 'Nipah virus surveillance advisory for Kozhikode',
    description: 'Precautionary surveillance advisory issued for Kozhikode district. Fruit bat activity detected near populated areas. No confirmed human cases.',
    severity: 'Critical',
    disease: 'Nipah',
    diseaseId: 'nipah',
    region: 'Kozhikode, Kerala',
    reportingPeriod: 'Oct 10–14, 2026',
    demoCaseCount: 0,
    percentageChange: 0,
    status: 'Active',
    sourceOrganization: 'State Institute of Virology',
    verificationStatus: 'Under Review',
    recommendedFollowUp: [
      'Enhance zoonotic surveillance in Kozhikode',
      'Issue advisory on fruit consumption safety',
      'Prepare isolation facilities',
      'Alert referral hospitals',
      'Coordinate with wildlife department',
    ],
    relatedOutbreakId: undefined,
    auditHistory: [
      { timestamp: '2026-10-14T10:00:00Z', action: 'Advisory Issued', actor: 'State Epidemiologist', details: 'Precautionary advisory based on environmental monitoring' },
    ],
    createdAt: '2026-10-14T10:00:00Z',
    read: false,
  },
  {
    id: 'alert-3',
    title: 'Influenza A hospitalization rate elevated in Fort Kochi',
    description: 'Higher than expected hospitalization rates for influenza A in the Fort Kochi area over the past 7 days.',
    severity: 'Moderate',
    disease: 'Influenza A',
    diseaseId: 'influenza-a',
    region: 'Kochi, Kerala',
    reportingPeriod: 'Oct 7–14, 2026',
    demoCaseCount: 142,
    percentageChange: 15.2,
    status: 'Acknowledged',
    sourceOrganization: 'District Medical Office, Ernakulam',
    verificationStatus: 'Verified',
    recommendedFollowUp: [
      'Review hospital bed capacity in Kochi',
      'Promote seasonal influenza vaccination',
      'Distribute informational material',
    ],
    auditHistory: [
      { timestamp: '2026-10-13T16:00:00Z', action: 'Alert Generated', actor: 'System', details: 'Threshold exceeded for influenza hospitalizations' },
      { timestamp: '2026-10-13T17:00:00Z', action: 'Acknowledged', actor: 'Dr. Sara', details: 'Alert reviewed and acknowledged' },
    ],
    createdAt: '2026-10-13T16:00:00Z',
    read: true,
  },
  {
    id: 'alert-4',
    title: 'Leptospirosis cases rising post-flooding in Kochi',
    description: 'Post-monsoon flooding has led to an uptick in leptospirosis cases in low-lying areas of Kochi.',
    severity: 'High',
    disease: 'Leptospirosis',
    diseaseId: 'leptospirosis',
    region: 'Kochi, Kerala',
    reportingPeriod: 'Oct 5–14, 2026',
    demoCaseCount: 38,
    percentageChange: 52.0,
    status: 'Active',
    sourceOrganization: 'District Health Office, Ernakulam',
    verificationStatus: 'Verified',
    recommendedFollowUp: [
      'Distribute prophylactic antibiotics',
      'Issue flood safety advisory',
      'Coordinate cleanup operations',
      'Provide protective gear for cleanup workers',
    ],
    auditHistory: [
      { timestamp: '2026-10-14T09:00:00Z', action: 'Alert Generated', actor: 'System', details: 'Leptospirosis case threshold exceeded' },
    ],
    createdAt: '2026-10-14T09:00:00Z',
    read: false,
  },
  {
    id: 'alert-5',
    title: 'COVID-19 variant monitoring update',
    description: 'Routine monitoring update. No significant change in COVID-19 variant distribution in Kerala. Current dominant variant remains under standard surveillance.',
    severity: 'Low',
    disease: 'COVID-19',
    diseaseId: 'covid-19',
    region: 'State-wide, Kerala',
    reportingPeriod: 'Oct 1–14, 2026',
    demoCaseCount: 284,
    percentageChange: -15.7,
    status: 'Active',
    sourceOrganization: 'Kerala State Health Department',
    verificationStatus: 'Verified',
    recommendedFollowUp: [
      'Continue routine genomic surveillance',
      'Monitor hospitalization metrics',
    ],
    auditHistory: [
      { timestamp: '2026-10-14T08:00:00Z', action: 'Update Published', actor: 'System', details: 'Weekly variant monitoring report' },
    ],
    createdAt: '2026-10-14T08:00:00Z',
    read: true,
  },
  {
    id: 'alert-6',
    title: 'Dengue cluster expanding in Thiruvananthapuram',
    description: 'The dengue cluster in Thiruvananthapuram has expanded to include two additional sub-wards in the past 48 hours.',
    severity: 'High',
    disease: 'Dengue',
    diseaseId: 'dengue',
    region: 'Thiruvananthapuram, Kerala',
    reportingPeriod: 'Oct 12–14, 2026',
    demoCaseCount: 156,
    percentageChange: 34.2,
    status: 'Active',
    sourceOrganization: 'Thiruvananthapuram Corporation Health Wing',
    verificationStatus: 'Pending',
    recommendedFollowUp: [
      'Deploy rapid response team to new sub-wards',
      'Conduct house-to-house surveys',
      'Establish temporary treatment centers',
    ],
    auditHistory: [
      { timestamp: '2026-10-14T11:00:00Z', action: 'Alert Generated', actor: 'System', details: 'Cluster expansion detected' },
    ],
    createdAt: '2026-10-14T11:00:00Z',
    read: false,
  },
];

export function getAlertById(id: string): Alert | undefined {
  return alerts.find(a => a.id === id);
}

export function getUnreadAlertCount(): number {
  return alerts.filter(a => !a.read).length;
}

export function getAlertsBySeverity(severity: string): Alert[] {
  if (severity === 'All') return alerts;
  return alerts.filter(a => a.severity === severity);
}
