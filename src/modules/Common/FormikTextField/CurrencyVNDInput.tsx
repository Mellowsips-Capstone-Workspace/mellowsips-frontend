import { useField } from "formik";
import { isEmpty, isNumber, isString } from "lodash";
import { nanoid } from "nanoid";
import { ChangeEvent, FC, useCallback, useEffect } from "react";
import { toCurrency } from "utils/text";
import REGEX from "validations/regex";

type CurrencyVNDInputProps = {
    name: string
    placeholder?: string
    className?: string
    labelClassName?: string
    label: string
}

const CurrencyVNDInput: FC<CurrencyVNDInputProps> = ({ className, labelClassName, label, name, placeholder }) => {
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

        if (REGEX.textNumber.test(value)) {
            setValue(value)
        }

    }, [setValue])


    return (
        <div className={className}>
            <label key={nanoid()} className={labelClassName}>
                <span>{label}</span>
                {
                    (isNumber(value) || (isString(value) && REGEX.number.test(value))) ? (
                        <span className="px-0.5 font-normal">({toCurrency(value)})</span>
                    ) : null
                }
            </label>
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
        </div>
    )
}

export default CurrencyVNDInput