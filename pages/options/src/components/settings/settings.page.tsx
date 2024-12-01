import { useStorage } from '@extension/shared';
import type { SettingsData } from '@extension/storage';
import { fetchDataAndStoreIt, settingsStorage } from '@extension/storage';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SettingsForm } from './settings.form';
import { FileDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadMapping } from '@src/utils/downloadMapping';

export const SettingsPage = () => {
  const settings = useStorage(settingsStorage);
  const onChange = (value: SettingsData) => {
    settingsStorage.set(value);
    onSync();
  };

  const onExport = async () => {
    await downloadMapping();
  };

  const onSync = async () => {
    await fetchDataAndStoreIt(false);
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
              <FileDown /> Export
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
