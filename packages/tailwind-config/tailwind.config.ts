import type { Config } from 'tailwindcss/types/config';

export default {
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Omit<Config, 'content'>;
