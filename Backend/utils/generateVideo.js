export const generateVideo = async ({ filePath, userId }) => {
  return { filePath, userId, renderedAt: new Date() };
};
