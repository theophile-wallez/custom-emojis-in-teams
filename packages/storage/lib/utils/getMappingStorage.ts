import { settingsStorage } from '../impl/settings';
import { externalMappingStorage } from '../impl/external.mapping.storage';
import { userMappingStorage } from '../impl/user.mapping.storage';

export const getMappingStorage = async () => {
  const mergeMode = await settingsStorage.getProperty('mergeMode');
  const userMapping = await userMappingStorage.get();
  const externalMapping = await externalMappingStorage.get();

  if (mergeMode === 'sourceFirst') {
    return {
      ...userMapping,
      ...externalMapping,
    };
  }

  return {
    ...externalMapping,
    ...userMapping,
  };
};
