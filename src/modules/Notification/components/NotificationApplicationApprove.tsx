import ROLE from "enums/role"
import useBoolean from "hooks/useBoolean"
import { isEmpty } from "lodash"
import Button from "modules/Common/Button"
import Modal from "modules/Common/Modal/Modal"
import { FC, memo, useCallback, useEffect } from "react"
import StompClientService, { StompMessage } from "services/StompClientService"
import { loadAuthenticate } from "stores/authenticate"
import { useAppDispatch, useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"

const NotificationApplicationApprove: FC = () => {
    const { type } = useAppSelector<Principle>(state => state.authenticate.principle!)

    const dispatch = useAppDispatch()
    const [display, { on, off }] = useBoolean(false)
    const fetchCredential = useCallback(() => {
        dispatch(loadAuthenticate())
    }, [dispatch])

    useEffect(() => {

        if (type === ROLE.ADMIN) {
            return
        }

        const subscribe = (message: StompMessage) => {
            if (isEmpty(message)) {
                return
            }

            if (message.key === "APPROVE_CREATE_ORGANIZATION_APPLICATION_SUCCESS") {
                on()
            }
        }

        StompClientService.subscribe(
            StompClientService.PRIVATE_CHANNEL,
            subscribe
        )

        return () => {
            StompClientService.unsubscribe(
                StompClientService.PRIVATE_CHANNEL,
                subscribe
            )
        }
    }, [on, type])
    return (
        <Modal
            flag={display}
            closeModal={off}
            closeOutside={false}
            className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
            innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
        >
            <div className='space-y-5'>
                <p className="px-5 py-1 shadow border-b truncate font-medium">Thông báo từ hệ thống</p>
                <div className='space-y-5'>
                    <div className="space-y-1">
                        <p className='px-5 text-center text-gray-500'>Yêu cầu tạo doanh nghiệp đã được chấp nhận. </p>
                        <p className='px-5'>Vui lòng xác nhận <span className="font-medium text-green-500">tải lại</span> để sử dụng các tính năng khác.</p>
                    </div>

                    <div className="border-t py-2 px-5 flex justify-end space-x-5">
                        <Button
                            type="button"
                            variant="indigo"
                            onClick={fetchCredential}
                        >
                            <span>Tải lại</span>
                        </Button>
                        <Button
                            type="button"
                            variant="default"
                            onClick={off}
                        >
                            Vẫn ở lại
                        </Button>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default memo(NotificationApplicationApprove)