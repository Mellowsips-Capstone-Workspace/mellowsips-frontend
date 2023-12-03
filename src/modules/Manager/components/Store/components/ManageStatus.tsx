import ROLE from "enums/role";
import { isEmpty } from "lodash";
import Button from "modules/Common/Button";
import showToast from "modules/Common/Toast";
import { StoreContext, StoreContextType } from "modules/Manager/components/Store/contexts/StoreContext";
import { FC, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StoreService from "services/StoreService";
import { useAppSelector } from "stores/root";

const StoreAction: FC = () => {
    const navigate = useNavigate()
    const { store: { id, isActive }, updateStore } = useContext<StoreContextType>(StoreContext)!
    const handleInactiveStore = useCallback(async () => {
        const { status, body } = await StoreService.inactiveStore(id)
        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Tạm dừng hoạt động cửa hàng thất bại."
                }
            )
            return
        }

        showToast(
            {
                type: "success",
                title: "Thành công",
                message: "Tạm dừng hoạt động cửa hàng thành công."
            }
        )
        updateStore("isActive", false)
    }, [id, updateStore])

    const handleActiveStore = useCallback(async () => {
        const { status, body } = await StoreService.activeStore(id)
        if (status == 200 && !isEmpty(body) && body.statusCode === 200) {
            showToast(
                {
                    type: "success",
                    title: "Thành công",
                    message: "Tạm dừng cửa hàng thành công."
                }
            )
            updateStore("isActive", true)
            return
        }

        if (body && body.statusCode === 404) {
            showToast(
                {
                    type: "error",
                    title: "Thất bại",
                    message: "Vui lòng thêm menu cho cửa hàng."
                }
            )

            navigate("/menus/create")
            return
        }

        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: body?.statusCode === 400 ? "Vui lòng thêm menu cho cửa hàng. Ở mục quản lý menu" : "Kích hoạt động cửa hàng thất bại."
            }
        )

        return

    }, [id, updateStore, navigate])
    return (
        <>
            {
                isActive ? (
                    <Button
                        className="h-fit"
                        variant="secondary"
                        onClick={handleInactiveStore}
                    >
                        Tạm ngừng hoạt động
                    </Button>
                ) : (
                    <Button
                        className="h-fit"
                        variant="indigo"
                        onClick={handleActiveStore}
                    >
                        Chuyển sang trạng thái hoạt động
                    </Button>
                )
            }
        </>
    )
}

const ManageStatus: FC = () => {
    const { type } = useAppSelector(state => state.authenticate.principle!)

    return (
        <div className="bg-white p-5 shadow rounded">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-medium text-lg">Quản lý cửa hàng</h2>
                    <p>Quản lý thông tin cửa hàng</p>

                </div>
                {
                    [ROLE.OWNER, ROLE.STORE_MANAGER].includes(type) ? <StoreAction /> : null
                }
            </div>
        </div>
    )
}

export default ManageStatus