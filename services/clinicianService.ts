import { clinicianProfile, telemetryData, ledgerEntries, vaultRecords, systemStatuses } from '../data/clinicians';

export const clinicianService = {
  getProfile() { return clinicianProfile; },
  getTelemetry() { return telemetryData; },
  getLedgerEntries() { return ledgerEntries; },
  getVaultRecords() { return vaultRecords; },
  getSystemStatuses() { return systemStatuses; },
};
