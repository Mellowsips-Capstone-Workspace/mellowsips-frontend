import { Form, Formik } from "formik"
import { AuthenticateServiceHelper } from "helpers/services"
import { isEmpty } from "lodash"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import showToast from "modules/Common/Toast"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import AuthenticateService from "services/AuthenticateService"
import * as Yub from "yup"

const VerifyForm: FC<{ username: string, password: string }> = ({ username, password }) => {
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={
                {
                    otp: ""
                }
            }
            validationSchema={
                Yub.object(
                    {
                        otp: Yub.string()
                            .required("Mã xác thực là bắt buộc")
                    }
                )
            }
            onSubmit={
                async ({ otp }) => {

                    const { status, body } = await AuthenticateService.verify(username, otp)

                    if (status === 404) {
                        showToast(
                            {
                                type: "error",
                                title: "Thất bại",
                                message: "Tên đăng nhập không tồn tại."
                            }
                        )
                        return
                    }

                    if (status === 429) {
                        showToast(
                            {
                                type: "error",
                                title: "Thất bại",
                                message: "Bạn đã gửi quá nhiều yêu cầu xác nhận. Vui lòng đợi một lát và thử lại."
                            }
                        )
                        return
                    }

                    if (status === 410) {
                        showToast(
                            {
                                type: "warning",
                                title: "Thất bại",
                                message: "Mã xác thực không còn hiệu lực."
                            }
                        )
                        return
                    }

                    if (status === 400 && !isEmpty(body)) {
                        const { errorCode } = body
                        let message = "Xác thực bất định, vui lòng thử lại sau."

                        if (errorCode === AuthenticateService.ERROR_CODE.CODE_MISMATCH) {
                            message = "Kiểm tra lại mã xác thực."
                        }

                        if (errorCode === AuthenticateService.ERROR_CODE.CODE_EXPIRED) {
                            message = "Mã xác thực không còn hiệu lực."
                        }

                        showToast(
                            {
                                type: "error",
                                title: "Xác thực thất bại",
                                message
                            }
                        )
                        return
                    }

                    if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
                        showToast(
                            {
                                type: "success",
                                title: "Thành công",
                                message: "Xác thực tài khoản thành công."
                            }
                        )
                        await AuthenticateServiceHelper.login({ username, password }, navigate, false)
                        navigate("/applications/create")
                        return
                    }

                    showToast(
                        {
                            type: "error",
                            title: "Xác thực thất bại",
                            message: "Xác thực bất định, vui lòng thử lại sau."
                        }
                    )
                }
            }
        >
            {
                ({ isValid, isSubmitting, values }) => (
                    <Form>
                        <div className="h-fit space-y-2">
                            <FormikTextField.Label label="Mã xác thực" />
                            <FormikTextField.Otp name="otp" />
                        </div>

                        <button
                            type="submit"
                            data-value={JSON.stringify(values.otp)}
                            className="mt-10 flex space-x-2 justify-center items-center w-full bg-main-primary text-white rounded-lg py-2.5 disabled:opacity-80 disabled:cursor-not-allowed"
                            disabled={!isValid || isSubmitting}
                        >
                            {
                                isSubmitting ? <Loading.Circle size={16} /> : null
                            }
                            <span>Xác thực</span>
                        </button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default VerifyForm