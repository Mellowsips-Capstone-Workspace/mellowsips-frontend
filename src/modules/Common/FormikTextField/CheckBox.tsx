import { useField } from "formik";
import { isEmpty } from "lodash";
import { ChangeEvent, FC, useCallback } from "react";

type CheckboxProps = {
    name: string
    label?: string
}

const Checkbox: FC<CheckboxProps> = ({ name, label }) => {
    const [, { value }, { setValue }] = useField(name);

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.checked, true)
    }, [setValue])

    return (
        <div className="w-fit">
            <label className="flex items-center space-x-2 hover:text-main-primary cursor-pointer">
                <div className="checkbox w-4 h-4">
                    <input
                        type="checkbox"
                        checked={Boolean(value)}
                        name={name}
                        onChange={handleOnChange}
                    />
                    <span className="checked rounded"></span>
                </div>
                {
                    isEmpty(label) ? null : (
                        <span
                            aria-checked={Boolean(value)}
                            className="aria-checked:text-main-primary"
                        >
                            {label}
                        </span>
                    )
                }
            </label>
        </div>
    )
}

export default Checkbox