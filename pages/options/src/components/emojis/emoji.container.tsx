import type { PropsWithChildren } from 'react';

export const EmojiContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex aspect-square size-10 flex-col items-center justify-center overflow-hidden rounded-md p-1">
      <div className="flex aspect-square size-full flex-col items-center justify-center overflow-hidden rounded-md">
        {children}
      </div>
    </div>
  );
};
