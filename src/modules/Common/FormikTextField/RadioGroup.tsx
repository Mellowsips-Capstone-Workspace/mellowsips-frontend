import { useField } from "formik";
import { FC } from "react";

type RadioGroupProps = {
    name: string
    direction?: "horizontal" | "vertical"
    options: {
        label: string
        value: string
    }[]
}

const RadioGroup: FC<RadioGroupProps> = ({ name, direction = "horizontal", options = [] }) => {
    const [
        { onBlur, onChange, value: fieldValue },
        { error, touched },
    ] = useField(name);

    return (
        <div>
            <div className={"gap-x-5 gap-y-2 flex " + (direction === "vertical" ? "flex-col" : "flex-row")}>
                {
                    options.map(({ label, value }) => {
                        return (
                            <label
                                key={value}
                                className="w-fit group cursor-pointer"
                            >
                                <input
                                    className="peer align-middle"
                                    type="radio"
                                    checked={value === fieldValue}
                                    name={name}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                                <span className="align-middle peer-checked:text-main-primary group-hover:text-main-primary transition-colors duration-300"> {label}</span>
                            </label>
                        )
                    }
                    )
                }
            </div>
            {Boolean(error && touched) && <span className="text-danger text-xs">{error}</span>}
        </div>
    )
}

export default RadioGroup