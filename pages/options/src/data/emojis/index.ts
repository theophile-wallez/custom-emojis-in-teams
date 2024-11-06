import { animalsEmoji } from './animals';
import { foodEmojis } from './food';
import { handGesturesEmojis } from './handGestures';
import { objectsEmoji } from './objects';
import { peopleEmoji } from './people';
import { smiliesEmojis } from './smilies';
import { travelEmoji } from './travel';

export const allEmojis = {
  ...smiliesEmojis,
  ...handGesturesEmojis,
  ...peopleEmoji,
  ...animalsEmoji,
  ...foodEmojis,
  ...travelEmoji,
  ...objectsEmoji,
} as const;

export type EmojiKey = keyof typeof allEmojis;
