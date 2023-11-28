import { CheckIcon, Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons'
import { APPLICATION_EVENT, APPLICATION_STATUS } from 'enums/application'
import useBoolean from 'hooks/useBoolean'
import { isEmpty } from 'lodash'
import Button from 'modules/Common/Button'
import Loading from 'modules/Common/Loading'
import Modal from 'modules/Common/Modal/Modal'
import showToast from 'modules/Common/Toast'
import { FC, memo, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import ManageApplicationService from 'services/ManageApplicationService'
import { Application } from 'types/application'

type ChangeStatusProps = {
    application: Application
    setApplication: (application: Application) => void
}
const ChangeStatus: FC<ChangeStatusProps> = ({ application, setApplication }) => {
    const { id: applicationId, status } = application
    const buttonEvent = useRef<HTMLButtonElement>(null)

    const [displaySubmit, setDisplaySubmit] = useBoolean(false)
    const [displayAmend, setDisplayAmend] = useBoolean(false)
    const { off: offModalSubmit } = setDisplaySubmit
    const { off: offModalAmend } = setDisplayAmend

    const handleTransition = useCallback(async () => {
        const buttonElement = buttonEvent.current!
        const transitionEvent = buttonElement.dataset.event as (typeof APPLICATION_EVENT.SUBMIT | typeof APPLICATION_EVENT.AMEND)
        buttonElement.disabled = true
        const { status, body } = await ManageApplicationService.transition(applicationId, transitionEvent)
        buttonElement.disabled = false

        if (status === 400) {
            showToast(
                {
                    type: "warning",
                    title: "Cảnh báo",
                    message: "Thông tin trong đơn chưa hợp lệ. Vui lòng cập nhật lại nội dung đơn và thử lại sau."
                }
            )
            return
        }

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

        if (transitionEvent === APPLICATION_EVENT.SUBMIT) {
            offModalSubmit()
        }

        if (transitionEvent === APPLICATION_EVENT.AMEND) {
            offModalAmend()
        }

        showToast(
            {
                type: "success",
                title: "Thành công",
                message: "Chuyển trạng thái đơn thành công."
            }
        )

        setApplication(body.data)
    }, [applicationId, offModalSubmit, offModalAmend, setApplication])

    return (
        <div className="w-fit flex space-x-5 items-center">
            {
                status === APPLICATION_STATUS.DRAFT ? (
                    <>
                        <Link
                            to="/applications/edit"
                            state={application}
                            onClick={setDisplaySubmit.on}
                            className="flex space-x-1 items-center border rounded px-3 py-1 bg-indigo-500 text-white"
                        >
                            <span>
                                <Pencil2Icon />
                            </span>
                            <span>Chỉnh sửa</span>
                        </Link>
                        <button
                            type="button"
                            onClick={setDisplaySubmit.on}
                            className="flex space-x-1 items-center border rounded px-3 py-1 bg-green-500 text-white"
                        >
                            <span>
                                <CheckIcon />
                            </span>
                            <span>Nạp đơn</span>
                        </button>
                    </>
                ) : null
            }

            {
                status === APPLICATION_STATUS.WAITING ? (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={setDisplayAmend.on}
                        className="space-x-1"
                    >
                        <span>
                            <Cross2Icon />
                        </span>
                        <span>Chuyển về bản nháp</span>
                    </Button>
                ) : null
            }

            <Modal
                flag={displaySubmit}
                closeModal={setDisplaySubmit.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-1 shadow border-b truncate font-medium">Xác nhận chuyển đổi trạng thái</p>
                    <div className='space-y-5'>
                        <p className='px-5'><span className='font-medium text-green-500'>Đồng ý</span> nạp đơn lên hệ thống của Mellow Sips</p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <button
                                type="button"
                                ref={buttonEvent}
                                onClick={handleTransition}
                                data-event={APPLICATION_EVENT.SUBMIT}
                                className="group flex items-center group border rounded px-3 py-1 bg-green-500 text-white"
                            >
                                <span className='hidden group-disabled:block mr-2'>
                                    <Loading.Circle size={14} />
                                </span>
                                <span>Đồng ý</span>
                            </button>
                            <Button
                                type="button"
                                variant="default"
                                onClick={setDisplaySubmit.off}
                            >
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                flag={displayAmend}
                closeModal={setDisplayAmend.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-20 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <div className='space-y-5'>
                    <p className="px-5 py-1 shadow border-b truncate font-medium">Xác nhận chuyển đổi trạng thái</p>
                    <div className='space-y-5'>
                        <p className='px-5'>Xác nhận <span className='font-medium text-red-500'>chuyển đơn về bản nháp</span></p>
                        <div className="border-t py-2 px-5 flex justify-end space-x-5">
                            <Button
                                type="button"
                                ref={buttonEvent}
                                variant='orange'
                                onClick={handleTransition}
                                data-event={APPLICATION_EVENT.AMEND}
                                className="space-x-1"
                            >
                                <span className='hidden group-disabled:block mr-2'>
                                    <Loading.Circle size={14} />
                                </span>
                                <span>Xác nhận</span>
                            </Button>
                            <Button
                                type="button"
                                onClick={offModalAmend}
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