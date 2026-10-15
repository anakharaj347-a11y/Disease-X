import { useState, useMemo } from 'react';
import { alertService } from '../services/alertService';

export function useAlerts() {
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const alerts = useMemo(() => alertService.getBySeverity(selectedSeverity), [selectedSeverity]);
  const unreadCount = alertService.getUnreadCount();
  return { alerts, selectedSeverity, setSelectedSeverity, unreadCount };
}
