import '@src/Options.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { allEmojis } from './data';

const Options = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  return (
    <div className={`App ${isLight ? 'bg-slate-50 text-gray-900' : 'bg-gray-800 text-gray-100'}`}>
      <div className="flex w-full flex-wrap gap-2">
        {Object.entries(allEmojis).map(([key, emoji]) => (
          <div key={key} className="flex size-10 items-center justify-center rounded-md bg-gray-200">
            <img loading="lazy" src={emoji.src} alt={emoji.name} className="size-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
