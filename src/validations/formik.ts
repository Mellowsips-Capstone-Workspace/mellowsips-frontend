import REGEX from "validations/regex"

class FormikValidator {
    static validateUsername(username: string | undefined): boolean {
        if (!username) {
            return false
        }

        if (REGEX.email.test(username) || REGEX.username.test(username)) {
            return true
        }

        return false
    }

}

export default FormikValidator