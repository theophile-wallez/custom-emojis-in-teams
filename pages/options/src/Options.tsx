import { withErrorBoundary, withSuspense } from '@extension/shared';
import '@src/Options.css';
import { SettingsPage } from './components/settings/settings.page';
import { Toaster } from 'sonner';
import { CurrentEmojis } from './components/currentEmojis/currentEmojis';

const Options = () => {
  return (
    <>
      <Toaster />
      <div className="flex h-screen w-screen flex-col items-center overflow-auto p-8">
        <section className="flex w-2/3 flex-col items-center gap-4 ">
          <CurrentEmojis />
          <SettingsPage />
        </section>
      </div>
    </>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
