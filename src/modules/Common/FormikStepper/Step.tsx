import { FormikConfig, FormikValues } from "formik";
import { FC } from "react";

export type StepProps = Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> & {
    stepLabel: string
}

const Step: FC<StepProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default Step