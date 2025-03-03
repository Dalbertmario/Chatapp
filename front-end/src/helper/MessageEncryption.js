
function toBase64(arrayBuffer) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    let urlSafeBase64 = base64.split("+").join("-").split("/").join("_").split("=").join("");
    return urlSafeBase64
}

function fromBase64(base64String) {
    let standardBase64 = base64String.split("-").join("+").split("_").join("/");
    let binaryString = atob(standardBase64);
    return Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
}

export async function EncryptMessage(message, publicKey) {
    const aesKey = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    const encoder = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encryptedMessage = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        aesKey,
        encoder.encode(message)
    );

    // Export AES Key
    const exportAesKey = await window.crypto.subtle.exportKey('raw', aesKey);

    // Encrypt AES Key with RSA
    const encryptedAesKey = await encryptAesKey(exportAesKey, publicKey);

    return {
        encryptedMessage: toBase64(encryptedMessage),
        encryptedAesKey,
        iv: toBase64(iv)
    };
}

// Encrypt AES Key using RSA-OAEP
async function encryptAesKey(aesKey, publicKey) {
    const base64String = publicKey
        .replace("-----BEGIN PUBLIC KEY-----", "")
        .replace("-----END PUBLIC KEY-----", "")
        .replace(/\n/g, "")
        .trim();

    const keyBuffer = fromBase64(base64String);

    const importedKey = await window.crypto.subtle.importKey(
        "spki",
        keyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
    );

    const encryptedKey = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        importedKey,
        aesKey
    );

    return toBase64(encryptedKey);
}
