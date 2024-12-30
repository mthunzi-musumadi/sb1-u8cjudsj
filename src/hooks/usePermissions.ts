import { useState, useEffect } from 'react';
import { PermissionState, loadPermissions, requestPermissions } from '../utils/permissions';

export function usePermissions() {
  const [permissions, setPermissions] = useState<PermissionState | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const stored = loadPermissions();
    if (stored) {
      setPermissions(stored);
    } else {
      setShowDialog(true);
    }
  }, []);

  const handleRequestPermissions = async () => {
    const newPermissions = await requestPermissions();
    setPermissions(newPermissions);
    setShowDialog(false);
  };

  return {
    permissions,
    showDialog,
    requestPermissions: handleRequestPermissions
  };
}