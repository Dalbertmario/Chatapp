import { generateKeyPair } from 'crypto';
import crypto from  "crypto"
import { promisify } from 'util';

const generateKeyPairAsync = promisify(generateKeyPair);

export async function generateRsaKeyPair() {
    try {
        const { publicKey, privateKey } = await generateKeyPairAsync('rsa', {
            modulusLength: 2048, 
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });

        return { publicKey, privateKey };
    } catch (error) {
        console.error("Key generation failed:", error);
    }
}

function deriveKey(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

// Encrypt the private key using the password
export function encryptPrivateKey(privateKey, password) {
    console.log(privateKey,password)
    const salt = crypto.randomBytes(16); // Generate a unique salt
    const key = deriveKey(password, salt);
    const iv = crypto.randomBytes(16); // Generate IV (Initialization Vector)

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(privateKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        encryptedPrivateKey: encrypted,
        salt: salt.toString('hex'),
        iv: iv.toString('hex')
    };
}

// Decrypt the private key using the password
export function decryptPrivateKey(encryptedPrivateKey, password, saltHex, ivHex) {
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const key = deriveKey(password, salt);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedPrivateKey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
