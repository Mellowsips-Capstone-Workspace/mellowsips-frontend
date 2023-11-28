import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { isUndefined } from 'lodash';
import Button from 'modules/Common/Button';
import Progress from 'modules/Common/FormikStepper/Progress';
import Step, { StepProps } from 'modules/Common/FormikStepper/Step';
import { FC, ReactElement, useCallback, useMemo, useState } from 'react';

type ContainerProps = FormikConfig<FormikValues> & {
    showSubmit: boolean
    onSubmitDraft?: (values: object) => void
}
const Container: FC<ContainerProps> = ({ children, onSubmitDraft, showSubmit, ...props }) => {


    const childSteps = useMemo<ReactElement<StepProps>[]>(() => {
        if (Array.isArray(children)) {
            return children
        }
        return [children] as ReactElement<StepProps>[]
    }, [children])

    const [step, setStep] = useState(0)
    const currentChild = childSteps[step]

    const isLastStep = useCallback((stepIndex: number) => {
        return stepIndex === childSteps.length - 1;
    }, [childSteps])

    const nextStep = useCallback(() => {
        setStep(step => Math.min(step + 1, childSteps.length))
    }, [childSteps])

    const backStep = useCallback(() => {
        setStep(step => Math.max(step - 1, 0))
    }, [])


    const validationSchemas = childSteps.map(
        step => step.props.validationSchema
    )

    const stepLabels = childSteps.map(
        step => step.props.stepLabel
    )

    const someInvalid = (values: object) => {
        return validationSchemas.some(
            (validationSchema) => {
                if (!validationSchema) {
                    return false
                }
                try {
                    validationSchema.validateSync(values, { abortEarly: true })
                    return false
                } catch {
                    return true
                }
            }
        )
    }

    return (
        <div className="space-y-4">
            <Formik
                {...props}
                validationSchema={currentChild.props.validationSchema}
                enableReinitialize={true}
                onSubmit={
                    async (values, helpers) => {
                        if (isLastStep(step)) {
                            await props.onSubmit(values, helpers);
                        } else {
                            nextStep()
                        }
                    }
                }
            >
                {
                    ({ isSubmitting, values, setSubmitting, isValid }) => (
                        <>
                            <Progress
                                setStep={setStep}
                                active={step}
                                stepLabels={stepLabels}
                                validationSchemas={validationSchemas}
                            />
                            <Form data-in={isValid} className='space-y-5'>
                                {currentChild}
                                <div className='flex gap-5 flex-wrap'>
                                    {
                                        step > 0 ? (
                                            <Button
                                                type="button"
                                                variant="primary"
                                                onClick={backStep}
                                                className='flex-none space-x-1'
                                            >
                                                <i className="fas fa-arrow-left"></i>
                                                <span className='font-semibold'>Quay lại</span>
                                            </Button>
                                        ) : null
                                    }
                                    {
                                        isLastStep(step) ? (
                                            <>
                                                {
                                                    showSubmit ? (
                                                        <Button
                                                            type="submit"
                                                            variant="primary"
                                                            disabled={isSubmitting || someInvalid(values)}
                                                            data-submitting={isSubmitting}
                                                            className='data-submitting:invisible'

                                                        >
                                                            <span className='font-semibold'>Gửi</span>
                                                        </Button>
                                                    ) : null
                                                }
                                            </>
                                        ) : (
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="primary"
                                                className='flex-none space-x-1'
                                            >
                                                <span className='font-semibold'>Tiếp tục</span>
                                                <i className="fas fa-arrow-right ms-3"></i>
                                            </Button>
                                        )
                                    }

                                    {
                                        isUndefined(onSubmitDraft) ? null : (
                                            <Button
                                                disabled={isSubmitting}
                                                type="button"
                                                variant="default"
                                                data-submitting={isSubmitting}
                                                className='flex-none space-x-1 data-submitting:invisible'
                                                onClick={
                                                    async () => {
                                                        setSubmitting(true)
                                                        await onSubmitDraft(values)
                                                        setSubmitting(false)
                                                    }
                                                }
                                            >
                                                <span className='font-semibold' >Lưu thay đổi</span>
                                            </Button>
                                        )
                                    }
                                </div>
                            </Form>
                        </>
                    )
                }
            </Formik>
        </div>
    )
}

const FormikStepper = { Step, Container }

export default FormikStepper