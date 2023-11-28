import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import CryptoLocalStorageHelper, { CRYPTO_STORAGE_KEY } from "helpers/storage";

const UNAUTHENTICATED = [
    "auth/login",
    "auth/register",
    "auth/verify"
]

const interceptor = axios.create(
    {
        baseURL: import.meta.env.VITE_APP_API_URL,
        headers: {
            "Content-Type": "application/json",
            "Zone": Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }
)

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { url } = config

    const unauthenticated = url && UNAUTHENTICATED.includes(url)

    if (unauthenticated) {
        return config
    }

    const token = CryptoLocalStorageHelper.getItem(CRYPTO_STORAGE_KEY.TOKEN)


    if (token) {
        config.headers.Authorization = token
    }

    return config
}

const onErrorResponse = (error: AxiosError | Error) => {
    throw error
}

interceptor.interceptors.request.use(onRequest)
interceptor.interceptors.response.use(null, onErrorResponse)

export default interceptor 