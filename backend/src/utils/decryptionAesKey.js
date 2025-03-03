import crypto from "crypto"


function fromBase64(base64String) {
    return Buffer.from(base64String, "base64");
}

export async function decryptAesKey(encryptedAesKey, privateKeyPem) {
    
    const encryptedBuffer =  fromBase64(encryptedAesKey)
    try{
   
    const decryptedKey = crypto.privateDecrypt(
        {
            key: privateKeyPem,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        encryptedBuffer
    );
    return decryptedKey; 
}catch(er){
    console.log(er)
}
}


export function decryptMessage(encryptedMessage, encryptedAesKey, iv) {
    try {
        const decryptedAesKey = encryptedAesKey;
        if (!decryptedAesKey) throw new Error("Failed to decrypt AES Key");

        const ivBuffer = fromBase64(iv);
        const encryptedBuffer = fromBase64(encryptedMessage);

        
        const authTag = encryptedBuffer.slice(-16);
        const ciphertext = encryptedBuffer.slice(0, -16)

        const decipher = crypto.createDecipheriv("aes-256-gcm", decryptedAesKey, ivBuffer);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(ciphertext);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString("utf8");
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
}
