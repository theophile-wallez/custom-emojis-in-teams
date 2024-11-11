import '@src/Options.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { Emoji } from './data/emojis';
import { allEmojis } from './data/emojis';
import { useState } from 'react';

const Options = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>(allEmojis);

  const onEmojiSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredEmojis = allEmojis.filter(emoji => emoji.id.includes(search.toLowerCase()));
    setFilteredEmojis(filteredEmojis);
  };

  return (
    <div className={`App ${isLight ? 'bg-slate-50 text-gray-900' : 'bg-gray-800 text-gray-100'}`}>
      <input type="text" onChange={onEmojiSearch} />
      <div className="flex w-full flex-wrap gap-2">
        {filteredEmojis.map(emoji => (
          <div
            key={emoji.id}
            className="flex size-10 cursor-pointer items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
            // onClick={() => {
            //   navigator.clipboard.writeText(key);
            // }}
          >
            {emoji.alt ? (
              <p>{emoji.alt}</p>
            ) : (
              <img loading="lazy" src={emoji.src} alt={emoji.alt} className="size-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
