export async function EncryptMessage(message,publicKey){
    const aeskey =  await window.crypto.subtle.generateKey(
        {name:'AES-GCM',length:256},
        true,
        ['encrypt','decrypt']
    )

    const encoder = new TextEncoder()
    const iv  = window.crypto.getRandomValues(new Uint8Array(12))
    const encyptMesage =await  window.crypto.subtle.encrypt(
        {name:'AES-GCM',iv},
        aeskey,
        encoder.encode(message)
    )
    const exportAesKey =await window.crypto.subtle.exportKey('raw',aeskey)
    const encryptedAesKey =await encryptAesKey(exportAesKey,publicKey)
    return {
        encryptedMessage : btoa(String.fromCharCode(...new Uint8Array(encyptMesage))),
        encryptedAesKey,
        iv : btoa(String.fromCharCode(...iv))
    }
}

async function encryptAesKey(aeskey,publicKey){
    const base64String = publicKey
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\n/g, "")
    .trim(); 

    const keyBuffer = Uint8Array.from(atob(base64String),(c)=>c.charCodeAt(0))

    const importKey =await  window.crypto.subtle.importKey(
        "spki",
        keyBuffer,
        {name:"RSA-OAEP",hash:"SHA-256"},
        false,
        ["encrypt"]
    )
   const encryptedkey =await window.crypto.subtle.encrypt(
    {name: "RSA-OAEP"},
    importKey,
    aeskey
   )

   return btoa(String.fromCharCode(...new Uint8Array(encryptedkey)))
}