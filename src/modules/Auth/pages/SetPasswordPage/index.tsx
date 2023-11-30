import { isEmpty, isUndefined } from "lodash"
import SetPasswordForm from "modules/Auth/components/SetPasswordForm"
import ErrorBoundary from "modules/Common/ErrorBoundary/ErrorBoundary"
import LogoFull from "modules/Common/LogoFull"
import showToast from "modules/Common/Toast"
import { FC, MouseEvent, useCallback, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AuthenticateService from "services/AuthenticateService"

const SetPasswordPage: FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const username = (isEmpty(state) || isEmpty(state.username)) ? undefined : state.username
    const password = (isEmpty(state) || isEmpty(state.password)) ? undefined : state.password

    useEffect(() => {
        if (isUndefined(username) || isUndefined(password)) {
            navigate("/")
        }
    }, [username, password, navigate])

    const handleResendCode = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
        const element = event.currentTarget
        element.setAttribute("aria-disabled", "true")
        const { status, body } = await AuthenticateService.resendConfirmationCode(username)
        element.setAttribute("aria-disabled", "false")

        if (status === 200 && !isEmpty(body)) {
            showToast(
                {
                    type: "success",
                    title: "Thành công",
                    message: "Yêu cầu gửi lại mã xác nhận thành công."
                }
            )
            return
        }

        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: "Yêu cầu gửi lại mã xác nhận thất bại."
            }
        )

    }, [username])

    return (
        <div className="flex justify-center items-center overflow-auto bg-app-gradient py-5" style={{ minHeight: "100vh" }}>
            <div className="mx-2 overflow-hidden w-full border rounded sm:w-110 sm:rounded-2xl py-10 px-7 space-y-5 bg-white">
                <div className="w-fit mx-auto">
                    <LogoFull height={32} />
                </div>
                <div className="flex items-center">
                    <Link
                        to="/login"
                        className="p-0.5 rounded-full hover:bg-main-primary hover:text-white transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <h2 className="grow text-black text-xl font-semibold text-center py-2">Quay về màn hình đăng nhập</h2>
                </div>
                <ErrorBoundary>
                    <SetPasswordForm username={username} password={password} />
                </ErrorBoundary>
                <div className="w-fit mx-auto space-x-1 space-y-0">
                    <span className="text-center">Chưa nhận được mã đăng nhập?</span>
                    <button
                        type="button"
                        onClick={handleResendCode}
                        className="font-semibold text-main-primary aria-disabled:opacity-30 aria-disabled:cursor-wait"
                    >
                        Gửi lại
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SetPasswordPage