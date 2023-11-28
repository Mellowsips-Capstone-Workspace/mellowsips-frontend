export type ResponseBase<T> = {
    error: boolean
    message: string
    statusText: string
    body: T | undefined
    status: number | string
    contentType: string | undefined
    errorCode: string | undefined
} 