import React, { ChangeEvent, ClipboardEvent, KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from "react"

interface OtpInputProps {
    digits: number
    inputSize?: number
    onChange?: (otp: string) => void
    placeholder?: string

}

const OtpInput: React.FC<OtpInputProps> = ({ placeholder = "_", digits, inputSize, onChange }) => {
    const [otp, setOtp] = useState<string[]>(Array(digits).fill(""))
    const inputRefs = useRef<HTMLInputElement[]>([])

    const handelOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const target = event.currentTarget
        const digitIndex = parseInt(target.dataset.digitIndex ?? "0")
        const value = target.value.split("").at(-1) ?? ""

        const isNumber = /[0-9]{1}/.test(value)

        if (!isNumber) {
            setOtp(
                currentOtp => {
                    const otp = [...currentOtp]
                    otp.splice(digitIndex, 1, "")
                    return otp
                }
            )
            return
        }

        setOtp(
            currentOtp => {
                const otp = [...currentOtp]
                otp.splice(digitIndex, 1, value)
                return otp
            }
        )

        if (digitIndex < digits - 1) {
            inputRefs.current[digitIndex + 1].focus()
        }

    }, [digits])


    const handelOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        const target = event.currentTarget
        const value = target.value
        const digitIndex = parseInt(target.dataset.digitIndex ?? "0")

        if (event.key === "Backspace" && digitIndex > 0 && !value) {
            inputRefs.current[digitIndex - 1].focus()
            return
        }

        if (event.key === "ArrowLeft" && digitIndex > 0) {
            inputRefs.current[digitIndex - 1].focus()
        }

        if (event.key === "ArrowRight" && digitIndex < digits - 1) {
            inputRefs.current[digitIndex + 1].focus()
        }
    }, [digits])

    const handelOnPaste = useCallback((event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        const text = event.clipboardData.getData('text').trim()
        const regex = new RegExp(`^[0-9]{1,${digits}}$`)

        if (!regex.test(text)) {
            return
        }

        setOtp(
            () => {
                const otp = Array(digits).fill("")
                text.split("").forEach(
                    (digit, index) => {
                        otp.splice(index, 1, digit)
                    }
                )
                return otp
            }
        )

        inputRefs.current[text.length - 1].focus()
    }, [digits])

    useEffect(() => {
        if (typeof onChange !== "function") {
            return
        }

        onChange(otp.join(""))
    }, [onChange, otp])


    return (
        <div
            className="w-fit flex sm:gap-5 gap-2"
        >
            {
                otp.map(
                    (value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onPaste={handelOnPaste}
                            data-digit-index={index}
                            placeholder={placeholder}
                            onChange={handelOnChange}
                            onKeyDown={handelOnKeyDown}
                            style={{ width: inputSize }}
                            ref={(ref) => (inputRefs.current[index] = ref as HTMLInputElement)}
                            className="w-10 sm:w-12 text-center outline-none border-2 rounded-2 aspect-square focus:border-main-primary transition-colors"
                        />
                    )
                )
            }
        </div>
    )
}

export default memo(OtpInput)