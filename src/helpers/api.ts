import axios, { AxiosResponse } from "axios";
import { ResponseBase } from "types/response";

export const requestApiHelper = async <T>(axiosPromise: Promise<AxiosResponse>): Promise<ResponseBase<T>> => {
    try {
        const { statusText, status, data, headers } = await axiosPromise

        return {
            errorCode: undefined,
            body: data as T,
            error: false,
            status: status,
            statusText: statusText,
            contentType: headers["content-type"],
            message: "Request success."
        }
    } catch (error) {

        if (!axios.isAxiosError(error)) {

            return {
                errorCode: undefined,
                body: undefined,
                error: true,
                message: "Request error",
                statusText: "Bad request.",
                status: 400,
                contentType: undefined
            }
        }

        const { message, code, response } = error

        return {
            error: true,
            errorCode: response?.data?.errorCode || code,
            contentType: response?.headers["content-type"],
            status: response?.status || 400,
            body: response?.data || undefined,
            statusText: response?.statusText || code || "",
            message: response?.data?.message || message
        }
    }
}


