const crypto = require('crypto');

// Generate a 64-byte random key and encode it in base64
const secretKey = crypto.randomBytes(64).toString('base64');
console.log('Generated JWT Secret Key:', secretKey);
