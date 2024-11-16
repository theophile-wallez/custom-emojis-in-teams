import { useStorage } from '@extension/shared';
import type { SettingsData } from '@extension/storage';
import { settingsStorage } from '@extension/storage';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SettingsForm } from './settings.form';

export const SettingsPage = () => {
  const settings = useStorage(settingsStorage);
  const onChange = (value: SettingsData) => {
    settingsStorage.set(value);
  };

  return (
    <section className="flex w-2/3 flex-col items-center gap-4 ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>The custom emojis mapping settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm settings={settings} onSettingsChange={onChange} />
        </CardContent>
      </Card>
    </section>
  );
};
