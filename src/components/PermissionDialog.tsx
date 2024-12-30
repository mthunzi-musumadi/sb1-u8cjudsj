import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from './Button';

interface PermissionDialogProps {
  onRequestPermissions: () => void;
}

export function PermissionDialog({ onRequestPermissions }: PermissionDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Permission Required
          </h2>
        </div>
        
        <div className="text-gray-600 dark:text-gray-300 mb-6">
          <p className="mb-2">TrackerThon needs access to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Storage - to save your time entries</li>
            <li>Time - to track your activities accurately</li>
          </ul>
        </div>

        <Button
          onClick={onRequestPermissions}
          className="w-full p-2"
        >
          Allow Access
        </Button>
      </div>
    </div>
  );
}