import { every, isEmpty } from "lodash";
import ApplicationForm from "modules/Common/Application/components/ApplicationForm";
import ApplicationBusinessContext from "modules/Common/Application/context";
import Breadcrumbs from "modules/Common/Breadcrumbs";
import { WidgetSkeleton } from "modules/Common/Skeleton";
import showToast from "modules/Common/Toast";
import { Widget } from "modules/Layout/Dashboard";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManageApplicationService from "services/ManageApplicationService";
import ApplicationModel, { Application } from "types/application.ts";

const EditApplicationWidget = () => {
    const { state } = useLocation()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [application, setApplication] = useState<Application>()

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
                    navigate("/applications")
                    return
                }
                setApplication(body.data)
            }
        )()
    }, [state, navigate])

    const onSubmit = useCallback(async (values: object) => {
        const id = state.id as string
        const { organization, bankAccount, merchant, controller } = values as ApplicationModel

        let jsonData: object = { organization, bankAccount, merchant }

        if (!every(controller, isEmpty)) {
            jsonData = {
                ...jsonData,
                controller
            }
        }

        const { status, body } = await ManageApplicationService.edit(id, { jsonData })

        if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
            showToast(
                {
                    type: "success",
                    title: "Thành công",
                    message: "Đơn của bạn đã được cập nhật thành công."
                }
            )
            return
        }

        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: "Cập nhật đơn thất bại."
            }
        )
    }, [state])

    return (
        <Widget>
            {
                loading ? (
                    <WidgetSkeleton />
                ) : application ? (
                    <div className="space-y-5">
                        <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                            <Breadcrumbs
                                breadcrumbs={["Quản lý đơn", "Chỉnh sửa đơn"]}
                            />
                            <h2 className="text-xl font-semibold">Chỉnh sửa thông tin</h2>
                            <p>Cập nhật thông tin để trở thành đối tác của Mellow Sips! </p>
                        </div>
                        <div className="w-full p-5 bg-white rounded shadow">
                            <ApplicationBusinessContext.Container
                                initial={
                                    {
                                        initialValues: application.jsonData,
                                        type: application.jsonData.organization.businessType
                                    }
                                }
                            >
                                <ApplicationForm
                                    onSubmit={onSubmit}
                                    onSubmitDraft={onSubmit}
                                    showSubmit={false}
                                />
                            </ApplicationBusinessContext.Container>
                        </div>
                    </div>
                ) : null
            }
        </Widget>
    )
}

export default EditApplicationWidget