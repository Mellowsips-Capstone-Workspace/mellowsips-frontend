import CryptoLocalStorageHelper, { CRYPTO_STORAGE_KEY } from "helpers/storage.ts"
import { isEmpty } from "lodash"
import LoginForm from "modules/Auth/components/LoginForm"
import ErrorBoundary from "modules/Common/ErrorBoundary/ErrorBoundary"
import LogoFull from "modules/Common/LogoFull"
import { FC, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loadAuthenticate } from "stores/authenticate"
import { useAppDispatch, useAppSelector } from "stores/root.ts"
import { AuthenticateStore } from "types/authenticate"

const LoginPage: FC = () => {
    const { logged } = useAppSelector<AuthenticateStore>(state => state.authenticate)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {

        if (logged) {
            navigate("/", { replace: true })
            return
        }

        const token = CryptoLocalStorageHelper.getItem(CRYPTO_STORAGE_KEY.TOKEN)

        if (isEmpty(token)) {
            return
        }

        return () => {
            dispatch(loadAuthenticate())
        }
    }, [navigate, logged, dispatch])

    return (
        <div
            style={{ minHeight: "100vh" }}
            className="flex justify-center items-center overflow-auto bg-app-gradient py-5"
        >
            <div className="mx-2 w-full border rounded sm:mx-0 sm:w-110 sm:rounded-2xl py-10 px-7 space-y-5 bg-white">
                <div className="w-fit mx-auto">
                    <LogoFull height={32} />
                </div>
                <h2 className="text-black text-xl font-semibold text-center py-2">Đăng nhập quản lý cửa hàng</h2>
                <ErrorBoundary>
                    <LoginForm />
                </ErrorBoundary>
                <div className="space-y-0">
                    <p className="text-center">Bạn chưa có tài khoản? <Link to={"/register"}
                        className="font-semibold text-main-primary">Đăng kí ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage