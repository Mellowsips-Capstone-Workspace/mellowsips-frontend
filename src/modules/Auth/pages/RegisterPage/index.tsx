import SignupForm from "modules/Auth/components/SignupForm"
import ErrorBoundary from "modules/Common/ErrorBoundary/ErrorBoundary"
import LogoFull from "modules/Common/LogoFull"
import { FC } from "react"
import { Link } from "react-router-dom"

const RegisterPage: FC = () => {
    return (
        <div className="flex justify-center items-center overflow-auto bg-app-gradient py-5" style={{ minHeight: "100vh" }}>
            <div className="mx-2 w-full border rounded sm:mx-0 sm:w-110 sm:rounded-2xl py-10 px-7 space-y-5 bg-white">
                <div className="w-fit mx-auto">
                    <LogoFull height={32} />
                </div>
                <h2 className="text-black text-xl font-semibold text-center py-2">Đăng ký tài khoản</h2>
                <ErrorBoundary>
                    <SignupForm />
                </ErrorBoundary>
                <div className="space-y-0">
                    <p className="text-center">Bạn đã có tài khoản? <Link to={"/login"} className="font-semibold text-main-primary">Đăng nhập ngay</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage