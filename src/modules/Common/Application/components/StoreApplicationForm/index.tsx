import { APPLICATION_STATUS, APPLICATION_TYPE, ORGANIZATION } from "enums/application"
import { Form, Formik } from "formik"
import { isEmpty } from "lodash"
import MerchantInformation from "modules/Common/Application/components/MerchantInformation"
import Button from "modules/Common/Button"
import showToast from "modules/Common/Toast"
import { FC, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import ManageApplicationService from "services/ManageApplicationService"
import { array, mixed, object, string } from "yup"


const StoreApplicationForm: FC = () => {
    console.log("STore");

    const navigate = useNavigate()
    const onSubmit = useCallback(async (values: object) => {
        const payload = {
            type: APPLICATION_TYPE.ADD_STORE,
            status: APPLICATION_STATUS.WAITING,
            jsonData: values
        }

        const { status, body } = await ManageApplicationService.create(payload)

        if (status === 409) {
            showToast(
                {
                    type: "warning",
                    title: "Thất bại",
                    message: "Đơn đăng ký thành lập tổ chức của bạn đã tồn tại."
                }
            )

            return
        }

        if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
            showToast(
                {
                    type: "success",
                    title: "Thành công",
                    message: "Đơn đăng ký của bạn đã được tạo thành công."
                }
            )
            navigate("/applications")
            return
        }

        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: "Đơn đăng ký của bạn tạo không thành công."
            }
        )
    }, [navigate])

    const onSubmitDraft = useCallback(async (values: object) => {

        const payload = {
            type: APPLICATION_TYPE.ADD_STORE,
            status: APPLICATION_STATUS.DRAFT,
            jsonData: values
        }

        const { status, body } = await ManageApplicationService.create(payload)

        if (status === 409) {
            showToast(
                {
                    type: "warning",
                    title: "Thất bại",
                    message: "Đơn đăng ký thành lập tổ chức của bạn đã tồn tại."
                }
            )

            return
        }

        if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
            showToast(
                {
                    type: "success",
                    title: "Thành công",
                    message: "Lưu nháp đơn thành công."
                }
            )
            navigate("/applications/edit", { state: body.data })
            return
        }

        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: "Lưu nháp không thành công."
            }
        )
    }, [navigate])
    return (
        <Formik
            initialValues={
                {
                    merchant: [
                        {
                            name: "",
                            phone: "",
                            email: "",
                            address: "",
                            merchantImages: [],
                            menuImages: []
                        }
                    ],
                    organization: { businessType: ORGANIZATION.ENTERPRISE }
                }
            }

            onSubmit={onSubmit}

            validationSchema={
                object().shape(
                    {
                        merchant: array().of(
                            object().shape(
                                {
                                    name: string().required("Trường này là bắt buộc"),
                                    phone: string().required("Trường này là bắt buộc"),
                                    email: string().email("Email không hợp lệ").required("Trường này là bắt buộc"),
                                    address: string().required("Trường này là bắt buộc."),
                                    merchantImages: array().of(mixed()).min(1, "Trường này là bắt buộc").required("Trường này là bắt buộc"),
                                    menuImages: array().of(mixed()).min(1, "Trường này là bắt buộc").required("Trường này là bắt buộc")
                                }
                            )
                        )
                    }
                )
            }
        >
            {
                ({ isSubmitting, setSubmitting, values }) => (
                    <Form>
                        <MerchantInformation />
                        <div className="flex space-x-5">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSubmitting}
                            >
                                <span className='font-semibold'>Gửi</span>
                            </Button>
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
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}

export default StoreApplicationForm