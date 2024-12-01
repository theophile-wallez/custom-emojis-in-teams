import { useStorage } from '@extension/shared';
import type { SettingsData } from '@extension/storage';
import { fetchDataAndStoreIt, settingsStorage } from '@extension/storage';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SettingsForm } from './settings.form';
import { FileDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadMapping } from '@src/utils/downloadMapping';
import { toast } from 'sonner';

export const SettingsPage = () => {
  const settings = useStorage(settingsStorage);
  const onChange = async (value: SettingsData) => {
    await settingsStorage.set(value);
    await onSync();
  };

  const onExport = async () => {
    toast.promise(downloadMapping(), {
      loading: 'Exporting emojis...',
      success: 'Emojis exported successfully!',
      error: 'Error exporting emojis'
    });
  };

  const onSync = async () => {
    await toast.promise(fetchDataAndStoreIt(false), {
      loading: 'Syncing emojis...',
      success: 'Emojis synced successfully!',
      error: error => {
        if (error instanceof Error) return error.message;
        return 'Unknown error while syncing emojis';
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Settings</CardTitle>
            <CardDescription>The custom emojis mapping settings.</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onSync}>
              <RefreshCw /> Sync
            </Button>
            <Button variant="outline" onClick={onExport}>
              <FileDown /> Export emojis
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <SettingsForm settings={settings} onSettingsChange={onChange} />
      </CardContent>
    </Card>
  );
};
