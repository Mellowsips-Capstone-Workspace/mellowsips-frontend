import { useField } from "formik";
import { isEmpty } from "lodash";
import { FC, useEffect } from "react";

type TextareaProps = {
    name: string
    row?: number
    placeholder?: string
}

const Textarea: FC<TextareaProps> = ({ name, placeholder, row = 1 }) => {
    const [{ onBlur, onChange, value }, { error, touched }, { setTouched }] = useField(name)

    useEffect(() => {
        setTouched(false)
    }, [setTouched])

    return (
        <div>
            <textarea
                name={name}
                value={isEmpty(value) ? "" : value}
                onBlur={onBlur}
                rows={row}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={Boolean(error && touched)}
                className="w-full outline-none py-2.5 rounded-2 border px-3 aria-invalid:border-danger transition-colors duration-300"
            />
            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )
}

export default Textarea