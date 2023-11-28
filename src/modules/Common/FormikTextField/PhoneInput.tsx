import { useField } from "formik";
import { isEmpty, isUndefined } from "lodash";
import { ChangeEvent, FC, useCallback, useEffect } from "react";
import REGEX from "validations/regex";

type PhoneInputProps = {
    name: string
    placeholder?: string
    startWith?: string
}

const PhoneInput: FC<PhoneInputProps> = ({ name, placeholder, startWith }) => {
    const [{ onBlur, value = "" }, { error, touched }, { setTouched, setValue }] = useField<string>(name)

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value

        if (isEmpty(value)) {
            setValue("", true)
            return
        }

        if (!REGEX.phoneNumber.test(value)) {
            return
        }

        if (isEmpty(startWith) || isUndefined(startWith)) {
            setValue(value, true)
            return
        }

        if (value.startsWith("0")) {
            setValue(startWith.replace("0", startWith), true)
            return
        }

        if (!value.startsWith(startWith) && value.length >= 2) {
            setValue(`${startWith}${value}`, true)
            return
        }

        setValue(value, true)
    }, [setValue, startWith])

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    return (
        <div>
            <input
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={handleOnChange}
                placeholder={placeholder}
                aria-invalid={Boolean(error && touched)}
                className="w-full outline-none py-2.5 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
            />
            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )
}

export default PhoneInput