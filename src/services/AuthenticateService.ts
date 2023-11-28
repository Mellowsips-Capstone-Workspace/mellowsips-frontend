import interceptor from "apis/interceptor";
import { requestApiHelper } from "helpers/api";
import { Credential, Principle } from "types/authenticate.ts";

class AuthenticateService {

    static ERROR_CODE = {
        INVALID_CREDENTIAL: "auth/invalid-credentials",
        UN_CONFIRMED: "auth/user-not-confirmed",
        CODE_MISMATCH: "auth/code-mismatch",
        CODE_EXPIRED: "auth/code-expired"
    }

    static resendConfirmationCode(username: string) {
        type body = {
            statusCode: number
            message: null | string
        }
        return requestApiHelper<body>(
            interceptor.post(
                "auth/resend-confirmation-code",
                { username }
            )
        )
    }

    static me() {
        type body = {
            message: null | string
            statusCode: number
            data: Principle
        }

        return requestApiHelper<body>(
            interceptor.get("auth/me/profile")
        )
    }

    static login(username: string, password: string) {
        type body = {
            message: null | string
            statusCode: number
            errorCode: string
            data: Credential
        }

        return requestApiHelper<body>(
            interceptor.post(
                "auth/login",
                { username, password }
            )
        )
    }

    static verify(username: string, confirmationCode: string) {
        type body = {
            message: null | string
            statusCode: number
            errorCode: string
            data: Credential
        }

        return requestApiHelper<body>(
            interceptor.post(
                "auth/verify",
                { username, confirmationCode }
            )
        )
    }

    static register(account: { username: string, password: string, displayName: string, email: string }) {
        type body = {
            message: null | string
            statusCode: number
            data: Credential
        }

        return requestApiHelper<body>(
            interceptor.post(
                "auth/register",
                account
            )
        )
    }
}

export default AuthenticateService