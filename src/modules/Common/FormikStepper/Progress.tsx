import { useFormikContext } from 'formik';
import { FC, useCallback, useEffect, useRef } from 'react';
import ApplicationModel from 'types/application';
import * as Yup from "yup";

type ProgressProps = {
    active: number
    setStep: (step: number) => void
    stepLabels: string[]
    validationSchemas: Yup.Schema[]
}

const Progress: FC<ProgressProps> = ({ validationSchemas, stepLabels, active, setStep }) => {
    const refValid = useRef<boolean[]>(Array(validationSchemas.length).fill(true))
    const { values } = useFormikContext<ApplicationModel>()

    useEffect(() => {
        const valid = validationSchemas.map(
            (validationSchema) => {
                if (!validationSchema) {

                    return true
                }
                try {
                    validationSchema.validateSync(values, { abortEarly: true })
                    return true
                } catch {
                    return false
                }
            }
        )

        if (refValid.current.toString() === valid.toString()) {
            return
        }

        refValid.current = valid

    }, [values, validationSchemas])

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const target = event.currentTarget
        const stepIndex = parseInt(target.dataset.stepIndex ?? "0")
        const valid = target.dataset.valid === "true"
        const checked = target.dataset.checked === "true"
        if (valid || checked) {
            setStep(stepIndex)
        }
    }, [setStep])

    return (
        <ul className="step-progress">
            {
                refValid.current.map(
                    (step, index, validStatus) => (
                        <li
                            key={index}
                            className="step"
                        >
                            <div
                                className="dot"
                                aria-current={index <= active}
                                aria-checked={step || index <= validStatus.lastIndexOf(true)}
                            >
                                <div
                                    data-valid={step}
                                    data-checked={step || index <= validStatus.lastIndexOf(true)}
                                    data-step-index={index}
                                    onClick={index === active ? undefined : handleClick}
                                    aria-current={index === active}
                                    aria-checked={step || index <= validStatus.lastIndexOf(true)}
                                >
                                    {index + 1}
                                </div>
                            </div>
                            <p
                                aria-current={index === active}
                                aria-checked={step || index <= validStatus.lastIndexOf(true)}
                                data-valid={step}
                                data-step-index={index}
                                data-checked={step || index <= validStatus.lastIndexOf(true)}
                                onClick={index === active ? undefined : handleClick}
                                className="px-5 text-sm font-medium mx-auto text-center aria-current:text-main-primary whitespace-pre-wrap aria-checked:cursor-pointer cursor-not-allowed transition-colors"
                            >
                                {stepLabels.at(index)}
                            </p>
                        </li>
                    )
                )
            }
        </ul>

    )
}

export default Progress