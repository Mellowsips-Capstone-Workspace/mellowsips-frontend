import { Form, Formik } from "formik"
import { AuthenticateServiceHelper } from "helpers/services"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import { Link, useNavigate } from "react-router-dom"
import { object, string } from "yup"

const LoginForm = () => {
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={
                {
                    username: "",
                    password: "",
                    remember: true
                }
            }
            validationSchema={
                object(
                    {
                        username: string().required("Tên đăng nhập là bắt buộc"),
                        password: string().required("Mật khẩu là bắt buộc"),
                    }
                )
            }
            onSubmit={
                async ({ username, password }) => {
                    await AuthenticateServiceHelper.login({ username, password }, navigate)
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
                                <FormikTextField.Label label="Mật khẩu" />
                                <FormikTextField.Input type="password" name="password" placeholder="Mật khẩu" />
                            </div>
                            <div className="flex justify-between">
                                <label className="flex items-center space-x-2">
                                    <FormikTextField.Checkbox name="remember" />
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>
                                <Link to={"/forgot"} className="font-semibold hover:text-main-primary transition-colors" >Quên mật khẩu?</Link>
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
                            <span>Đăng nhập</span>
                        </button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default LoginForm