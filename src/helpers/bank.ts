import axios from "axios";
import { requestApiHelper } from "helpers/api";

class BankHelper {

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
}

export default BankHelper