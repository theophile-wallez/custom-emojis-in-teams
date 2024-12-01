import { getMappingStorage } from '@extension/storage';

export const downloadMapping = async () => {
  try {
    const data = await getMappingStorage();
    if (!data || Object.keys(data).length === 0) {
      return;
    }

    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const fileName = `emojis-${Date.now()}.json`;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error(error);
  }
};
