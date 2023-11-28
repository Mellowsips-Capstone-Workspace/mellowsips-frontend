import { FC } from "react";

type LabelProps = {
    label: string
    required?: boolean
    description?: string
}

const Label: FC<LabelProps> = ({ label, required = false, description }) => {
    return (
        <div>
            <label><span className="font-semibold">{label}</span> {required && <span className="text-danger">*</span>}</label>
            {!!description && <p className="text-medium">{description}</p>}
        </div>
    )
}

export default Label