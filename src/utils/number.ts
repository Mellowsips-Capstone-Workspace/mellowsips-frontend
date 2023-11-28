import { isInteger } from "lodash";

export const calculatePercentage = (amount: number, total: number, toFixed = 2) => {
    if (total <= 0) {
        return 0
    }
    const result = (amount / total)

    return isInteger(result) ? (result * 100) : parseFloat(result.toFixed(toFixed)) * 100
}