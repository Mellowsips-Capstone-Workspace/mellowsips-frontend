import { Form, Formik } from "formik"
import { isEmpty } from "lodash"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import showToast from "modules/Common/Toast"
import { useNavigate } from "react-router-dom"
import AuthenticateService from "services/AuthenticateService"
import REGEX from "validations/regex"
import { object, ref, string } from "yup"


// .test({
//     message: "Xác nhận mật khẩu không trùng khớp",
//     test: (value, context) => value === context.parent.password
// })
// .required("Nhập lại mật khẩu là bắt buộc")
const SignupForm = () => {
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={
                {
                    username: "",
                    displayName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }
            }
            validationSchema={
                object().shape(
                    {
                        username: string().matches(REGEX.username, "Tên đăng nhập chỉ bao gồm chữ và số.").required("Tên đăng nhập là bắt buộc"),
                        displayName: string().matches(REGEX.notBlank, "Tên hiện thị không hợp lệ.").required("Tên hiện thị là bắt buộc"),
                        email: string().email("Email chưa hợp lệ").required("Email là bắt buộc"),
                        password: string().required("Mật khẩu là bắt buộc").matches(REGEX.password, "Mật khẩu phải dài ít nhất 8 kí tự, chứa số, kí tự in hoa, kí tự thường, và kí tự đặc biệt"),
                        confirmPassword: string().oneOf([ref("password")], "Xác nhận mật khẩu không trùng khớp").required("Nhập lại mật khẩu là bắt buộc")
                    }
                )
            }
            onSubmit={
                async ({ username, password, displayName, email }) => {
                    const { status, body } = await AuthenticateService.register({ username, password, displayName, email })
                    if (status === 409) {

                        showToast(
                            {
                                type: "error",
                                title: "Thất bại",
                                message: "Tên đăng nhập đã tồn tại."
                            }
                        )
                        return
                    }

                    if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
                        navigate("/verify", { state: { username, password } })
                        showToast(
                            {
                                type: "success",
                                title: "Thành công",
                                message: "Kiểm tra email và xác thực tài khoản."
                            }
                        )
                        return
                    }

                    showToast(
                        {
                            type: "error",
                            title: "Thất bại",
                            message: "Đăng ký tài khoản thất bại."
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
                                <FormikTextField.Label label="Tên đăng nhập" />
                                <FormikTextField.Input name="username" placeholder="Tên đăng nhập" />
                            </div>
                            <div className="h-fit space-y-1">
                                <FormikTextField.Label label="Tên hiện thị" />
                                <FormikTextField.Input name="displayName" placeholder="Ví dụ: Mellow Sips" />
                            </div>
                            <div className="h-fit space-y-1">
                                <FormikTextField.Label label="Email" />
                                <FormikTextField.Input name="email" placeholder="Email" />
                            </div>
                            <div className="h-fit space-y-1">
                                <FormikTextField.Label label="Mật khẩu" />
                                <FormikTextField.Input name="password" type="password" placeholder="Mật khẩu" />
                            </div>
                            <div className="h-fit space-y-1">
                                <FormikTextField.Label label="Nhập lại mật khẩu" />
                                <FormikTextField.Input name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-10 flex justify-center items-center space-x-2 w-full bg-main-primary text-white rounded-lg py-2.5 disabled:opacity-80 disabled:cursor-not-allowed"
                            disabled={!isValid || isSubmitting}
                        >
                            {
                                isSubmitting ? <Loading.Circle size={16} /> : null
                            }
                            <span>Tạo tài khoản</span>
                        </button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default SignupForm