import { withErrorBoundary, withSuspense } from '@extension/shared';
import '@src/Options.css';
import { SettingsPage } from './components/settings/settings.page';

const Options = () => {
  return (
    <div className="flex h-screen w-screen justify-center overflow-auto p-8">
      <SettingsPage />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
