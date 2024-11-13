import { fetchFromGithub } from '@src/lib/fetchFromGithub';
import { useEffect, useState } from 'react';

export const ImportMap = () => {
  const [importMap, setImportMap] = useState<Record<string, string>>({});
  useEffect(() => {
    fetchFromGithub(
      'https://raw.githubusercontent.com/theophile-wallez/Emoji-mapping-repo/refs/heads/master/emojiMap.json',
    ).then(setImportMap);
  }, []);
  return <div>{JSON.stringify(importMap, null, 2)}</div>;
};
