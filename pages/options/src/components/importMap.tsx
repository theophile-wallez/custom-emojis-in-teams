import { fetchFromGithub } from '@src/lib/fetchFromGithub';
import { useEffect, useState } from 'react';

export const ImportMap = () => {
  const [importMap, setImportMap] = useState<Record<string, string>>({});
  useEffect(() => {
    fetchFromGithub(
      'https://raw.githubusercontent.com/theophile-wallez/custom-teams-emojis/refs/heads/master/package.json',
    ).then(setImportMap);
  }, []);
  return <div>{JSON.stringify(importMap, null, 2)}</div>;
};
