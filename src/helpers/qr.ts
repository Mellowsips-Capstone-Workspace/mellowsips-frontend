import QRCode, { QRCodeToDataURLOptions } from 'qrcode'

const parser = new DOMParser()

class QRCodeHelper {

    static generateQRCode(
        prams: {
            data: string
            onSuccess?: (svg: string) => void
            onError?: (error: Error) => void
        }
    ) {
        const { data, onSuccess, onError } = prams
        QRCode.toString(
            data,
            (error: Error | null | undefined, string: string) => {
                if (error) {
                    if (onError) {
                        onError(error)
                    }

                    return
                }

                if (onSuccess) {
                    onSuccess(string)
                }
            }

        )
    }
    static toDataURL(
        prams: {
            data: string
            options?: QRCodeToDataURLOptions
            onSuccess?: (svg: string) => void
            onError?: (error: Error) => void
        }
    ) {
        const { data, onSuccess, onError, options = { type: 'image/png', margin: 1 } } = prams
        QRCode.toDataURL(
            data,
            options,
            (error: Error | null | undefined, string: string) => {
                if (error) {
                    if (onError) {
                        onError(error)
                    }
                    return
                }

                if (onSuccess) {
                    onSuccess(string)
                }
            }

        )
    }

    static appendQRCode(prams: { data: string, type?: DOMParserSupportedType }): Document {
        const { data, type = "image/svg+xml" } = prams
        return parser.parseFromString(data, type)
    }
}

export default QRCodeHelper