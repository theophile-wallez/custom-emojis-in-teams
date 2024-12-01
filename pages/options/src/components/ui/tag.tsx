import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
}>;
export const Tag = (props: Props) => {
  return (
    <span
      className={cn(
        'absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full border bg-white text-[0.5rem] outline outline-2 outline-white',
        props.className
      )}>
      {props.children}
    </span>
  );
};
