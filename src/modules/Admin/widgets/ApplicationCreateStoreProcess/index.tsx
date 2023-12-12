import { APPLICATION_EVENT, APPLICATION_STATUS } from "enums/application"
import { isEmpty } from "lodash"
import ChangeStatus from "modules/Admin/components/Application"
import ApplicationBadge from "modules/Common/ApplicationBadge"
import Merchant from "modules/Common/ApplicationData/Merchant"
import { WidgetSkeleton } from "modules/Common/Skeleton"
import Tab from "modules/Common/Tab"
import showToast from "modules/Common/Toast"
import { Widget } from "modules/Layout/Dashboard"
import { FC, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AdminApplicationService from "services/AdminApplicationService"
import { Application as ApplicationType } from "types/application"

const ApplicationCreateStoreProcess: FC = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState("MERCHANT")
    const [application, setApplication] = useState<ApplicationType>()

    useEffect(() => {
        if (isEmpty(state) || isEmpty(state.id)) {
            navigate("/applications")
            return
        }

        const id = state.id as string

        (
            async () => {
                setLoading(true)
                const { status, body } = await AdminApplicationService.getById(id)
                setLoading(false)

                if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
                    showToast(
                        {
                            type: "warning",
                            title: "Cảnh báo",
                            message: "Tải nội dung đơn thất bại."
                        }
                    )
                    return
                }
                setApplication(body.data)
            }
        )()
    }, [state, navigate])

    useEffect(() => {
        if (isEmpty(application) || application.status !== APPLICATION_STATUS.WAITING) {
            return
        }

        (
            async () => {
                const { status, body } = await AdminApplicationService.transition(application.id, APPLICATION_EVENT.PROCESS)
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
            }
        )()
    }, [navigate, application])


    return (
        <Widget>
            {
                loading ? (
                    <WidgetSkeleton />
                ) : application ? (
                    <div className="space-y-5">
                        <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Xử lý đơn</h2>
                                    <div className="w-fit">
                                        <ApplicationBadge.Status status={application.status} />
                                    </div>
                                </div>
                                <p className="hidden sm:block opacity-80">Bao gồm các đơn của các đối tác cửa hàng trên hệ thống Mellow Sips.</p>
                            </div>
                        </div>

                        {
                            isEmpty(application.rejectReason) ? null : (
                                <div className="p-5 space-y-2 bg-white rounded shadow">

                                    <div className="w-fit">
                                        <ApplicationBadge.Status status={application.status} />
                                    </div>
                                    <p className="font-medium space-x-1">
                                        <span className="text-gray-400">Mô tả:</span>
                                        <span className="text-main-primary italic">{application.rejectReason}</span>
                                    </p>
                                </div>
                            )
                        }

                        <div className="w-full bg-white rounded shadow">
                            <div className="px-5 space-y-5">
                                <div className="flex items-center justify-between border-b flex-wrap-reverse space-y-2">
                                    <Tab.Container
                                        defaultValue={tab}
                                        onTabChange={setTab}
                                        className="flex space-x-5 overflow-auto scrollbar-none"
                                    >

                                        <Tab.Item
                                            displayValue="Thông tin cửa hàng"
                                            value="MERCHANT"
                                            className="flex-none font-medium py-4 border-b-2 border-transparent cursor-pointer aria-checked:text-main-primary aria-checked:border-b-main-primary transition-all duration-300"
                                        />

                                    </Tab.Container>
                                    <div className="py-2">
                                        {
                                            [APPLICATION_STATUS.APPROVED, APPLICATION_STATUS.REJECTED].includes(application.status) ? null : (
                                                <ChangeStatus
                                                    application={application}
                                                    setApplication={setApplication}
                                                />
                                            )
                                        }
                                    </div>
                                </div>

                                <Merchant merchants={application.jsonData.merchant} />
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </Widget>
    )
}

export default ApplicationCreateStoreProcess