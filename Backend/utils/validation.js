export const validateUpload = (file) => {
  const allowedTypes = ['video/mp4', 'video/mov'];
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type');
  }
  if (file.size > 1024 * 1024 * 1024) {
    throw new Error('File too large');
  }
  return true;
};
