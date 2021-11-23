const crypto = require('crypto');

const initVector = crypto.randomBytes(16);
const securityKey = crypto.randomBytes(32);

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(process.env.CRYPTO_ALGORITHM, securityKey, initVector)

  let encryptedData = cipher.update(text, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  return encryptedData;
}

exports.decrypt = (text) => {
  const decipher = crypto.createDecipheriv(process.env.CRYPTO_ALGORITHM, securityKey, initVector);

  let decryptedData = decipher.update(text, "hex", "utf-8");

  decryptedData += decipher.final("utf-8");

  return decryptedData;
}