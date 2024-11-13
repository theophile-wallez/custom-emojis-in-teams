import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

import { type CustomEmojisMap } from '@extension/emojis';

export type CustomEmojiStorage = BaseStorage<CustomEmojisMap> & {
  // reset: () => Promise<void>;
};

const DEFAULT_STORAGE = {
  '1f534_largeredcircle': 'https://emojis.slackmojis.com/emojis/images/1687735546/66769/smart.gif?1687735546',
  '1f7e0_orangecircle': 'https://emojis.slackmojis.com/emojis/images/1643514922/9402/conceit.png?1643514922',
  '1f7e1_yellowcircle': 'https://emojis.slackmojis.com/emojis/images/1643514897/9116/excuseme.gif?1643514897',
  '1f7e2_greencircle':
    'https://emojis.slackmojis.com/emojis/images/1643515192/12068/mild-panic-intensifies.gif?1643515192',
  '1f535_largebluecircle':
    'https://emojis.slackmojis.com/emojis/images/1692206783/67533/extreme-teamwork.gif?1692206783',
  '1f7e3_purplecircle': 'https://emojis.slackmojis.com/emojis/images/1643514588/5906/this-is-fine-fire.gif?1643514588',
  '1f7e4_browncircle': 'https://emojis.slackmojis.com/emojis/images/1643514389/3643/cool-doge.gif?1643514389',
  '26ab_mediumblackcircle': 'https://emojis.slackmojis.com/emojis/images/1643514974/10003/catjam.gif?1643514974',
  '26aa_mediumwhitecircle': 'https://emojis.slackmojis.com/emojis/images/1699659569/74744/huh.gif?1699659569',
  '1f7e5_redsquare': 'https://emojis.slackmojis.com/emojis/images/1643514066/220/bananadance.gif?1643514066',
  '1f7e7_orangesquare': 'https://emojis.slackmojis.com/emojis/images/1643515059/10896/lmao_cowboy.png?1643515059',
  '1f7e8_yellowsquare': 'https://emojis.slackmojis.com/emojis/images/1643514509/4978/surprise.gif?1643514509',
  '1f7e9_greensquare': 'https://emojis.slackmojis.com/emojis/images/1643514525/5197/party_blob.gif?1643514525',
  '1f7e6_bluesquare': 'https://emojis.slackmojis.com/emojis/images/1643514890/9036/stonks.png?1643514890',
  '1f7ea_purplesquare': 'https://emojis.slackmojis.com/emojis/images/1643514843/8558/coffin_dance.gif?1643514843',
  '1f7eb_brownsquare': 'https://emojis.slackmojis.com/emojis/images/1643514065/211/homer-disappear.gif?1643514065',
  '2b1b_blacklargesquare':
    'https://emojis.slackmojis.com/emojis/images/1660415343/60605/rolling-on-the-floor-laughing.gif?1660415343',
  '2b1c_whitelargesquare': 'https://emojis.slackmojis.com/emojis/images/1643514168/1333/kappa.png?1643514168',
} as const satisfies CustomEmojisMap;

const newCustomEmojiStorage = createStorage<CustomEmojisMap>('custom-emoji-storage', DEFAULT_STORAGE, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const customEmojiStorage: CustomEmojiStorage = {
  ...newCustomEmojiStorage,
  // reset: async () => {
  //   return await newCustomEmojiStorage.set({});
  // },
};
