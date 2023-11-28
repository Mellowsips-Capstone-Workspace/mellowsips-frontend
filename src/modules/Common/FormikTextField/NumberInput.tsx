import { useField } from "formik";
import { isEmpty } from "lodash";
import { ChangeEvent, FC, useCallback, useEffect } from "react";
import REGEX from "validations/regex";

type NumberInputProps = {
    name: string
    placeholder?: string
    onlyNumberFormat?: boolean
}

const NumberInput: FC<NumberInputProps> = ({ name, placeholder, onlyNumberFormat = false }) => {
    const [{ onBlur, value = "" }, { error, touched }, { setTouched, setValue }] = useField(name)

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (isEmpty(value)) {
            setValue(value)
            return
        }

        const regex = onlyNumberFormat ? REGEX.textNumber : REGEX.number

        if (regex.test(value)) {
            setValue(value)
        }

    }, [setValue, onlyNumberFormat])

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

export default NumberInput