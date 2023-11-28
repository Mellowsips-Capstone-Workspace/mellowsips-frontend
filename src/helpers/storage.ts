import CryptoJS from "crypto-js";
import { isNull } from "lodash";

export const CRYPTO_STORAGE_KEY = {
    TOKEN: "token"
}

class CryptoLocalStorageHelper {
    static encodeDataURI(encodeString: string): string {
        const parseWordBase64 = CryptoJS.enc.Utf8.parse(encodeString)
        const encodedWordBase64 = CryptoJS.enc.Base64.stringify(parseWordBase64)
        const parseWordUtf8 = CryptoJS.enc.Utf8.parse(encodedWordBase64)
        return CryptoJS.enc.Base64.stringify(parseWordUtf8)
    }

    static decodeDataURI(decodeString: string): string {
        const decodeWordBase64 = CryptoJS.enc.Base64.parse(decodeString)
        const decodeWordUtf8 = CryptoJS.enc.Utf8.stringify(decodeWordBase64)
        const parseWordBase64 = CryptoJS.enc.Base64.parse(decodeWordUtf8)
        return CryptoJS.enc.Utf8.stringify(parseWordBase64)
    }

    static encode(encodeString: string): string {
        const encodedWord = CryptoJS.enc.Utf8.parse(encodeString)
        return CryptoJS.enc.Base64.stringify(encodedWord)
    }

    static decode(decodeString: string): string {
        const decodeWord = CryptoJS.enc.Base64.parse(decodeString)
        return CryptoJS.enc.Utf8.stringify(decodeWord)
    }

    static saveAccessToken(token: undefined | null | string): void {
        const itemKey = CryptoLocalStorageHelper.encode(CRYPTO_STORAGE_KEY.TOKEN)
        if (typeof token !== "string") {
            localStorage.removeItem(itemKey)
            return
        }
        const accessToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`

        localStorage.setItem(itemKey, CryptoLocalStorageHelper.encode(accessToken))
    }

    static setItem(key: string, value: object): void {
        const itemKey = CryptoLocalStorageHelper.encode(key)
        const itemValue = JSON.stringify(value)
        localStorage.setItem(itemKey, CryptoLocalStorageHelper.encode(itemValue))
    }

    static getItem(key: string): string | undefined {
        const itemKey = CryptoLocalStorageHelper.encode(key)
        const itemValue = localStorage.getItem(itemKey)
        if (isNull(itemValue)) {
            return undefined
        }
        return CryptoLocalStorageHelper.decode(itemValue)
    }

    static removeItem(key: string): void {
        const itemKey = CryptoLocalStorageHelper.encode(key)
        localStorage.removeItem(itemKey)
    }
}

export default CryptoLocalStorageHelper

