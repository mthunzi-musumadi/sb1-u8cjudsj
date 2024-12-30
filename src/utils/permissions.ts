export type Permission = 'storage' | 'time';

export interface PermissionState {
  storage: boolean;
  time: boolean;
}

const PERMISSIONS_KEY = 'trackerThon_permissions';

export const requestPermissions = async (): Promise<PermissionState> => {
  const permissions: PermissionState = {
    storage: false,
    time: false
  };

  try {
    // Request storage permission
    if ('persist' in navigator.storage) {
      const storagePersisted = await navigator.storage.persist();
      permissions.storage = storagePersisted;
    }

    // Time permission is implicitly granted in modern browsers
    permissions.time = true;

    // Save permission state
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
    return permissions;
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return permissions;
  }
};

export const loadPermissions = (): PermissionState | null => {
  try {
    const stored = localStorage.getItem(PERMISSIONS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading permissions:', error);
    return null;
  }
};