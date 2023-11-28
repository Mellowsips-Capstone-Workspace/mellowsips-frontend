import { useField } from "formik";
import { FC } from "react";

type ToggleCheckboxProps = {
    name: string
}

const ToggleCheckbox: FC<ToggleCheckboxProps> = ({ name }) => {
    const [{ onChange, value }] = useField(name);

    return (
        <div className="checkbox-toggle py-2.5 w-fit">
            <label>
                <input onChange={onChange} name={name} checked={value} type="checkbox" />
            </label>
        </div>
    )
}

export default ToggleCheckbox