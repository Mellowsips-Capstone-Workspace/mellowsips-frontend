import axios from "axios";
import { requestApiHelper } from "helpers/api";
import { isUndefined } from "lodash";

class VietQRHelper {

    static getBankList() {
        type body = {
            code: string
            desc: string
            data: {
                id: number
                name: string
                code: string
                bin: string
                shortName: string
                logo: string
                transferSupported: boolean
                lookupSupported: boolean
                short_name: string
                support: number
                isTransfer: boolean
                swift_code: string
            }[]
        }

        return requestApiHelper<body>(
            axios.get("https://api.vietqr.io/v2/banks")
        )
    }

    static findTaxCode(taxCode: string, abortController?: AbortController) {
        type body = {
            code: string
            desc: string
            data: {
                id: string
                name: string
                address: string
            } | null
        }

        return requestApiHelper<body>(
            axios.get(
                "https://api.vietqr.io/v2/business/".concat(taxCode),
                { signal: isUndefined(abortController) ? undefined : abortController.signal }
            )
        )
    }

    static findAccountName(payload: any) {
        type body = {
            code: string
            desc: string
            data: {
                accountName: string
            } | null
        }
        // ONLY for demo
        if (import.meta.env.VITE_APP_VIET_QR_ENVIRONMENT === "DEMO" && payload.accountNumber === "79447988" && payload.bin === 970416) {
            return Promise.resolve(
                {
                    status: 200,
                    body: {
                        code: "00",
                        desc: "Success - Thành công",
                        data: {
                            "accountName": "CTY TNHH CASSO"
                        }
                    }
                }
            )
        }

        return requestApiHelper<body>(
            axios.post(
                "https://api.vietqr.io/v2/lookup",
                payload,
                {
                    headers: {
                        "x-api-key": import.meta.env.VITE_APP_VIET_QR_API_KEY,
                        "x-client-id": import.meta.env.VITE_APP_VIET_QR_CLIENT_ID
                    }
                }

            )
        )
    }
}

export default VietQRHelper