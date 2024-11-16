import { useStorage } from '@extension/shared';
import { settingsStorage } from '@extension/storage';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export const SyncSettings = () => {
  const settings = useStorage(settingsStorage);

  console.log('settings: ', settings);
  // const settings = {};
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
