import { withErrorBoundary, withSuspense } from '@extension/shared';
import '@src/Options.css';
import { SettingsPage } from './components/settings/settings.page';
import { Mapping } from './components/mapping/mapping';

const Options = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-auto p-8">
      <section className="flex w-2/3 flex-col items-center gap-4 ">
        <Mapping />
        <SettingsPage />
      </section>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
