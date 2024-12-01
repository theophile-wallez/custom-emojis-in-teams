import { settingsStorage } from '../impl/settings';
import { externalMappingStorage } from '../impl/external.mapping.storage';
import { userMappingStorage } from '../impl/user.mapping.storage';

export const getFullMappingStorageWithProvider = async () => {
  const mergeMode = await settingsStorage.getProperty('mergeMode');
  const userMapping = await userMappingStorage.getWithProvider();
  const externalMapping = await externalMappingStorage.getWithProvider();

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
