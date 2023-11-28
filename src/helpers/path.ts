import { isUndefined } from "lodash";

class RouteHelper {
    static excludePath(exclude?: RegExp | RegExp[]): boolean {
        if (isUndefined(exclude)) {
            return false
        }

        if (Array.isArray(exclude)) {
            return exclude.some(regex => regex.test(window.location.pathname))
        }

        return exclude.test(window.location.pathname)
    }
}

export default RouteHelper