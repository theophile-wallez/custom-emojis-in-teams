import { resolve } from 'node:path';
import { withPageConfig } from '@extension/vite-config';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const atPath = resolve(__dirname, './src');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
      '@': atPath,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'options'),
  },
});
