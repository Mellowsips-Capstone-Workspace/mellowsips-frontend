import CryptoLocalStorageHelper from "helpers/storage";
import { isEmpty } from "lodash";
import showToast from "modules/Common/Toast";
import { NavigateFunction } from "react-router-dom";
import AuthenticateService from "services/AuthenticateService";
import { loadAuthenticate } from "stores/authenticate";
import { store } from "stores/root";

class AuthenticateServiceHelper {
    static async login(
        payload: { username: string, password: string },
        navigate: NavigateFunction,
        toastOnSuccess: boolean = true
    ) {
        const { username, password } = payload
        const { status, ...response } = await AuthenticateService.login(username, password)

        if (status === 406) {
            showToast(
                {
                    type: "error",
                    title: "Đăng nhập thất bại",
                    message: "Thiết bị không được hỗ trợ."
                }
            )

            return
        }

        if (status === 404) {
            showToast(
                {
                    type: "error",
                    title: "Đăng nhập thất bại",
                    message: "Tên đăng nhập không tồn tại."
                }
            )

            return
        }

        if (status === 401 && response.errorCode === AuthenticateService.ERROR_CODE.UN_CONFIRMED) {
            showToast(
                {
                    type: "info",
                    title: "Thông tin",
                    message: "Hãy xác nhận tài khoản."
                }
            )

            navigate("/verify", { state: { username, password } })
            return
        }

        if (status === 400 && response.errorCode === AuthenticateService.ERROR_CODE.INVALID_CREDENTIAL) {
            showToast(
                {
                    type: "error",
                    title: "Đăng nhập thất bại",
                    message: "Kiểm tra lại tên đăng nhập và mật khẩu."
                }
            )
            return
        }

        if (status === 500 || isEmpty(response.body)) {
            showToast(
                {
                    type: "error",
                    title: "Đăng nhập thất bại",
                    message: "Máy chủ không thể xử lý yêu cầu."
                }
            )
            return
        }

        if (toastOnSuccess) {
            showToast(
                {
                    type: "success",
                    title: "Đăng nhập thành công!",
                    message: "Chào mừng bạn đã quay lại Mellow Sips."
                }
            )
        }
        navigate("/")
        const { body: { data } } = response
        CryptoLocalStorageHelper.saveAccessToken(data.accessToken)
        store.dispatch(loadAuthenticate())
    }
}

export {
    AuthenticateServiceHelper
};

