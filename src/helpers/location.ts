import axios from "axios";
import { requestApiHelper } from "helpers/api";
import { isUndefined } from "lodash";
const API_KEY = import.meta.env.VITE_APP_GOONG_API_KEY

class LocationHelper {

    static findAddress(address: string, abortController?: AbortController) {
        type body = {
            status: string
            predictions: {
                description: string
            }[]
        }

        return requestApiHelper<body>(
            axios.get(
                "https://rsapi.goong.io/Place/AutoComplete",
                {
                    params: {
                        api_key: API_KEY,
                        input: address
                    },
                    signal: isUndefined(abortController) ? undefined : abortController.signal
                }
            )
        )
    }
}

export default LocationHelper