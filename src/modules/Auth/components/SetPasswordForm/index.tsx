import { Form, Formik } from "formik"
import { AuthenticateServiceHelper } from "helpers/services"
import { isEmpty } from "lodash"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import showToast from "modules/Common/Toast"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import AuthenticateService from "services/AuthenticateService"
import REGEX from "validations/regex"
import { object, ref, string } from "yup"

const SetPasswordForm: FC<{ username: string, password: string }> = ({ username, password }) => {
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={
                {
                    newPassword: "",
                    confirmPassword: ""
                }
            }
            validationSchema={
                object().shape(
                    {
                        newPassword: string().required("Mật khẩu là bắt buộc").matches(REGEX.password, "Mật khẩu phải dài ít nhất 8 kí tự, chứa số, kí tự in hoa, kí tự thường, và kí tự đặc biệt"),
                        confirmPassword: string().oneOf([ref("newPassword")], "Xác nhận mật khẩu không trùng khớp").required("Nhập lại mật khẩu là bắt buộc")
                    }
                )
            }
            onSubmit={
                async ({ newPassword }) => {
                    const payload = {
                        username,
                        password,
                        newPassword
                    }

                    const { status, body } = await AuthenticateService.setPassword(payload)

                    if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
                        showToast(
                            {
                                type: "success",
                                title: "Thành công",
                                message: "Đặt mật khẩu thành công."
                            }
                        )
                        await AuthenticateServiceHelper.login({ username, password: newPassword }, navigate, false)
                        navigate("/")
                        return
                    }

                    showToast(
                        {
                            type: "error",
                            title: "Thất bại",
                            message: "Đặt mật khẩu thất bại, vui lòng thử lại sau."
                        }
                    )
                }
            }
        >
            {
                ({ isValid, isSubmitting }) => (
                    <Form>
                        <div className="space-y-5">
                            <div className="h-fit space-y-1">
                                <FormikTextField.Label label="Mật khẩu" />
                                <FormikTextField.Input name="newPassword" type="password" placeholder="Mật khẩu" />
                            </div>
                            <div className="h-fit space-y-1">
                                <FormikTextField.Label label="Nhập lại mật khẩu" />
                                <FormikTextField.Input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-10 flex space-x-2 justify-center items-center w-full bg-main-primary text-white rounded-lg py-2.5 disabled:opacity-80 disabled:cursor-not-allowed"
                            disabled={!isValid || isSubmitting}
                        >
                            {
                                isSubmitting ? <Loading.Circle size={16} /> : null
                            }
                            <span>Lưu</span>
                        </button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default SetPasswordForm