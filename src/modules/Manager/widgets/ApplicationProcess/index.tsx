import { APPLICATION_STATUS } from "enums/application"
import { isEmpty } from "lodash"
import ApplicationBadge from "modules/Common/ApplicationBadge"
import Merchant from "modules/Common/ApplicationData/Merchant"
import Organization from "modules/Common/ApplicationData/Organization"
import OtherInfo from "modules/Common/ApplicationData/OtherInfo"
import { WidgetSkeleton } from "modules/Common/Skeleton"
import Tab from "modules/Common/Tab"
import showToast from "modules/Common/Toast"
import { Widget } from "modules/Layout/Dashboard"
import ChangeStatus from "modules/Manager/components/Application"
import { FC, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ManageApplicationService from "services/ManageApplicationService"
import { Application as ApplicationType } from "types/application"

const ApplicationProcess: FC = () => {
    const { state } = useLocation()
    const [tab, setTab] = useState("ORGANIZATION")
    const [loading, setLoading] = useState(false)
    const [application, setApplication] = useState<ApplicationType>()

    useEffect(() => {
        if (isEmpty(state) || isEmpty(state.id)) {
            return
        }

        const id = state.id as string

        (
            async () => {
                setLoading(true)
                const { status, body } = await ManageApplicationService.getById(id)
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
    }, [state])

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

                        <div className="w-full bg-white rounded shadow">
                            <div className="px-5 space-y-5">
                                <div className="flex border-b items-center justify-between flex-wrap-reverse">
                                    <Tab.Container
                                        defaultValue={tab}
                                        onTabChange={setTab}
                                        className="flex space-x-5 overflow-auto scrollbar-none"
                                    >
                                        <Tab.Item
                                            displayValue="Thông tin doanh nghiệp"
                                            value="ORGANIZATION"
                                            className="flex-none font-medium py-4 border-b-2 border-transparent cursor-pointer aria-checked:text-main-primary aria-checked:border-b-main-primary transition-all duration-300"
                                        />
                                        <Tab.Item
                                            displayValue="Thông tin cửa hàng"
                                            value="MERCHANT"
                                            className="flex-none font-medium py-4 border-b-2 border-transparent cursor-pointer aria-checked:text-main-primary aria-checked:border-b-main-primary transition-all duration-300"
                                        />
                                        <Tab.Item
                                            displayValue="Các thông tin khác"
                                            value="OTHER"
                                            className="flex-none font-medium py-4 border-b-2 border-transparent cursor-pointer aria-checked:text-main-primary aria-checked:border-b-main-primary transition-all duration-300"
                                        />
                                    </Tab.Container>
                                    <div className="py-2">
                                        {
                                            [APPLICATION_STATUS.APPROVED, APPLICATION_STATUS.REJECTED, APPLICATION_STATUS.PROCESSING].includes(application.status) ? null : (
                                                <ChangeStatus
                                                    application={application}
                                                    setApplication={setApplication}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    tab === "ORGANIZATION" ? <Organization organization={application.jsonData.organization} /> : null
                                }
                                {
                                    tab === "MERCHANT" ? <Merchant merchants={application.jsonData.merchant} /> : null
                                }
                                {
                                    tab === "OTHER" ? <OtherInfo bankAccount={application.jsonData.bankAccount} controller={application.jsonData.controller} /> : null
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </Widget>
    )
}

export default ApplicationProcess