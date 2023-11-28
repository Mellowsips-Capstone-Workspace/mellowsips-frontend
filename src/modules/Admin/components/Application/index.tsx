import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { APPLICATION_EVENT, APPLICATION_STATUS } from 'enums/application'
import useBoolean from 'hooks/useBoolean'
import { isEmpty } from 'lodash'
import Button from 'modules/Common/Button'
import Loading from 'modules/Common/Loading'
import Modal from 'modules/Common/Modal/Modal'
import showToast from 'modules/Common/Toast'
import { FC, memo, useCallback, useRef } from 'react'
import AdminApplicationService from 'services/AdminApplicationService'
import { Application } from 'types/application'

type ChangeStatusProps = {
    application: Application
    setApplication: (application: Application) => void
}
const ChangeStatus: FC<ChangeStatusProps> = ({ application, setApplication }) => {
    const buttonEvent = useRef<HTMLButtonElement>(null)
    const { id: applicationId } = application

    const [displayApprove, setDisplayApprove] = useBoolean(false)
    const [displayReject, setDisplayReject] = useBoolean(false)
    const { off: offModalApprove } = setDisplayApprove
    const { off: offModalReject } = setDisplayReject

    const handleTransition = useCallback(async () => {
        const buttonElement = buttonEvent.current!
        const transitionEvent = buttonElement.dataset.event as (typeof APPLICATION_EVENT.APPROVE | typeof APPLICATION_EVENT.REJECT)
        buttonElement.disabled = true
        const { status, body } = await AdminApplicationService.transition(applicationId, transitionEvent)
        buttonElement.disabled = false

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            showToast(
                {
                    type: "warning",
                    title: "Cảnh báo",
                    message: "Chuyển trạng thái đang xử lý đơn thất bại."
                }
            )
            return
        }

        if (transitionEvent === APPLICATION_EVENT.APPROVE) {
            offModalApprove()
            setApplication({ ...body.data, status: APPLICATION_STATUS.APPROVED })
        }

        if (transitionEvent === APPLICATION_EVENT.REJECT) {
            offModalReject()
            setApplication({ ...body.data, status: APPLICATION_STATUS.REJECTED })
        }

        showToast(
            {
                type: "success",
                title: "Thành công",
                message: "Chuyển trạng thái đơn thành công."
            }
        )

    }, [applicationId, offModalApprove, offModalReject, setApplication])

    return (
        <div className="w-fit flex space-x-5 items-center">
            <Button
                type="button"
                variant="indigo"
                onClick={setDisplayApprove.on}
                className='space-x-1'
            >
                <span>
                    <CheckIcon />
                </span>
                <span>Chấp thuận</span>
            </Button>
            <Button
                type="button"
                variant="primary"
                className='space-x-1'
                onClick={setDisplayReject.on}
            >
                <span>
                    <Cross2Icon />
                </span>
                <span>Từ chối</span>
            </Button>
            <Modal
                flag={displayApprove}
                closeModal={setDisplayApprove.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-2 shadow border-b truncate font-medium">Xác nhận chuyển đổi trạng thái</p>
                    <div className='space-y-5'>
                        <p className='px-5'><span className='font-medium text-green-500'>Chấp thuận đối tác </span>trên hệ thống của Mellow Sips</p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <Button
                                type="button"
                                variant="indigo"
                                ref={buttonEvent}
                                onClick={handleTransition}
                                data-event={APPLICATION_EVENT.APPROVE}
                                className="group"
                            >
                                <span className='hidden group-disabled:block mr-2'>
                                    <Loading.Circle size={14} />
                                </span>
                                <span>Chấp thuận</span>
                            </Button>
                            <Button
                                type="button"
                                variant="default"
                                onClick={setDisplayApprove.off}
                            >
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                flag={displayReject}
                closeModal={setDisplayReject.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-1 shadow border-b truncate font-medium">Xác nhận chuyển đổi trạng thái</p>
                    <div className='space-y-5'>
                        <p className='px-5'>Xác nhận <span className='text-red-500 font-semibold'>từ chối đối tác</span> trên hệ thống của Mellow Sips</p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <Button
                                type="button"
                                variant="red"
                                ref={buttonEvent}
                                onClick={handleTransition}
                                data-event={APPLICATION_EVENT.REJECT}
                                className="group"
                            >
                                <span className='hidden group-disabled:block mr-2'>
                                    <Loading.Circle size={14} />
                                </span>
                                <span>Từ chối</span>
                            </Button>
                            <Button
                                type="button"
                                variant="default"
                                onClick={offModalReject}
                            >
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default memo(ChangeStatus)