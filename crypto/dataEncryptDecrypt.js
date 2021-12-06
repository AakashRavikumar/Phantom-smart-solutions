// 4. Encryption decryption (AES)sample :

// crypto module
const crypto = require("crypto");

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// encrypting 
const encryptDate = (req,res)=>{

let message = req.body.message; 

const cipher = crypto.createCipheriv("aes-256-cbc", Securitykey, initVector); // the cipher function, which is used to encrypt the given data or message

let encryptedData = cipher.update(message, "utf-8", "hex"); // encrypt the message

encryptedData += cipher.final("hex"); //  final to stop the encryption

res.json({Message:"Decrypt Data",Result:"Success",Response:{EncryptedDate:encryptedData}})

}

// decrypting
const decryptDate = (req,res)=>{

let encryptedData = req.body.message;

const decipher = crypto.createDecipheriv("aes-256-cbc", Securitykey, initVector); // the decipher function, which is used to decrypt the given encrypted data or message

let decryptedData = decipher.update(encryptedData, "hex", "utf-8"); 

decryptedData += decipher.final("utf8"); // final to stop the decryption

console.log("Decrypted message: " + decryptedData);

res.json({Message:"Decrypt Data",Result:"Success",Response:{DecryptedDate:decryptedData}})
}

exports.encryptDate = encryptDate;
exports.decryptDate = decryptDate;

