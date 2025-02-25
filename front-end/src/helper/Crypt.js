import CryptoJs from 'crypto-js'

const secretKey = import.meta.env.VITE_CRYPTO 

export function EncryptMessage(message){
   return CryptoJs.AES.encrypt(message,secretKey).toString()
}

export function DecryptMessage(message){
const bytes =  CryptoJs.AES.decrypt(message,secretKey)
return bytes.toString
}