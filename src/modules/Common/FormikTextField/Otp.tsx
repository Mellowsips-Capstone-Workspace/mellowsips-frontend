import { useField } from "formik"
import OtpInput from "modules/Common/OtpInput"
import { FC, useCallback } from "react"

const Otp: FC<{ name: string }> = ({ name }) => {
    const [, , { setValue }] = useField<string>(name)

    const setOtp = useCallback((otp: string) => {
        setValue(otp, true)

    }, [setValue])
    return (
        <OtpInput
            digits={6}
            onChange={setOtp}
        />
    )
}

export default Otp