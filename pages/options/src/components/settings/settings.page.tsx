import { useStorage } from '@extension/shared';
import type { SettingsData } from '@extension/storage';
import { settingsStorage } from '@extension/storage';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SettingsForm } from './settings.form';

export const SettingsPage = () => {
  const settings = useStorage(settingsStorage);
  console.log('settings: ', settings);
  const onChange = (value: SettingsData) => {
    console.log('onChange SettingsPage: ', value);
    settingsStorage.set(value);
  };

  return (
    <section className="flex w-2/3 flex-col items-center gap-4 ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm settings={settings} onSettingsChange={onChange} />
        </CardContent>
      </Card>
    </section>
  );
};
