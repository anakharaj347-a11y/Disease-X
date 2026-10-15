import { alerts, getAlertById, getUnreadAlertCount, getAlertsBySeverity } from '../data/alerts';
import { Alert } from '../types/alert';

export const alertService = {
  getAll(): Alert[] { return alerts; },
  getById(id: string): Alert | undefined { return getAlertById(id); },
  getUnreadCount(): number { return getUnreadAlertCount(); },
  getBySeverity(severity: string): Alert[] { return getAlertsBySeverity(severity); },
};
