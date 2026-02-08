import crypto from 'crypto';

export const encryptToken = (token) => {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.TOKEN_SECRET);
  let encrypted = cipher.update(token,'utf8','hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decryptToken = (encrypted) => {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.TOKEN_SECRET);
  let decrypted = decipher.update(encrypted,'hex','utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
