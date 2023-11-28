import interceptor from "apis/interceptor";
import { AxiosProgressEvent } from "axios";
import { requestApiHelper } from "helpers/api";
import { isEmpty, isUndefined } from "lodash";
import { DocumentModel } from "types/document";

class DocumentService {

    static upload(
        file: File,
        options?: {
            onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
            abortController?: AbortController
        }
    ) {
        const data = new FormData()
        data.append("file", file)
        const signal = (isEmpty(options) || isUndefined(options.abortController)) ? undefined : options.abortController.signal
        const onUploadProgress = (isEmpty(options) || isUndefined(options.onUploadProgress)) ? undefined : options.onUploadProgress

        type Body = {
            statusCode: number
            data: {
                id: string
            }
            message: string
        }

        return requestApiHelper<Body>(
            interceptor.post(
                "documents",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    signal,
                    onUploadProgress
                }
            )
        )
    }

    static get(documentId: string) {

        type Body = {
            statusCode: number
            data: DocumentModel
            message: string
        }

        return requestApiHelper<Body>(
            interceptor.get(`documents/${documentId}`)
        )
    }
}

export default DocumentService