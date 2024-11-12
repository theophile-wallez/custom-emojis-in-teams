import type { EmojiShape } from '../../schemas/emoji.shape.schema';
import { activities } from './activities';
import { animals } from './animals';
import { food } from './food';
import { handGesture } from './handGesture';
import { objects } from './objects';
import { people } from './people';
import { smilies } from './smilies';
import { symbols } from './symbols';
import { travel } from './travel';

export const allEmojis = [
  ...smilies,
  ...handGesture,
  ...people,
  ...animals,
  ...food,
  ...travel,
  ...objects,
  ...activities,
  ...symbols,
] as const satisfies EmojiShape[];
