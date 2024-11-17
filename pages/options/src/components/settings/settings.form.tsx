import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { settingsSchema, type SettingsData } from '@extension/storage';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

type Props = {
  settings: SettingsData;
  onSettingsChange: (value: SettingsData) => void;
};

export const SettingsForm = ({ settings, onSettingsChange }: Props) => {
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    values: settings,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSettingsChange)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="mergeMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Merge mode</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="merge-mode"
                    checked={field.value === 'manualFirst'}
                    onCheckedChange={v => field.onChange(v ? 'manualFirst' : 'sourceFirst')}
                  />
                  <Label htmlFor="merge-mode">Manual mapping first</Label>
                </div>
              </FormControl>
              <FormDescription>
                If enabled, the extension will prioritize manual mappings over the synchronized source.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator /> */}
        <FormField
          control={form.control}
          name="isSync"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Synchronize with an external source</FormLabel> */}
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch id="is-sync" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="is-sync">Synchronize with an external source</Label>
                </div>
              </FormControl>
              <FormDescription>
                If enabled, the extension will synchronize the mapping with an external source.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues('isSync') === true && (
          <>
            <FormField
              control={form.control}
              name="sourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mapping url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://raw.githubusercontent.com/..." {...field} />
                  </FormControl>
                  <FormDescription>The URL to the raw file containing the JSON mapping.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal access token</FormLabel>
                  <FormControl>
                    <Input placeholder="github_pat_xxxx" {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    If the source is a private GitHub repository, provide a{' '}
                    <a className="underline hover:text-black" href="https://github.com/settings/tokens?type=beta">
                      Personal Access Token
                    </a>{' '}
                    with read access to code and metadata.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="updateTimeDelta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update interval in hours</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 6 hours" {...field} type="number" min={1} max={24} step={1} />
                  </FormControl>
                  <FormDescription>The mapping will be updated every {field.value} hours.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
