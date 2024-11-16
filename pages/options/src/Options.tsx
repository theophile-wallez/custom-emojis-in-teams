import { withErrorBoundary, withSuspense } from '@extension/shared';
import '@src/Options.css';
import { SyncSettings } from './components/SyncSettings';

const Options = () => {
  return (
    <div className="flex h-screen w-screen justify-center p-8">
      <section className="flex size-full w-2/3 flex-col items-center gap-4 overflow-auto">
        <SyncSettings />
        <SyncSettings />
      </section>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
