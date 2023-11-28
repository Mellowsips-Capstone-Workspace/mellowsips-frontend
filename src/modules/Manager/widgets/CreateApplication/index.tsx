import { APPLICATION_STATUS, APPLICATION_TYPE } from "enums/application";
import { every, isEmpty } from "lodash";
import ApplicationForm from "modules/Common/Application/components/ApplicationForm";
import ApplicationBusinessContext from "modules/Common/Application/context";
import Breadcrumbs from "modules/Common/Breadcrumbs";
import ErrorBoundary from "modules/Common/ErrorBoundary/ErrorBoundary";
import showToast from "modules/Common/Toast";
import { Widget } from "modules/Layout/Dashboard";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ManageApplicationService from "services/ManageApplicationService";
import ApplicationModel from "types/application.ts";

const CreateApplication = () => {
    const navigate = useNavigate()
    const onSubmit = useCallback(async (values: object) => {
        const { organization, bankAccount, merchant, controller } = values as ApplicationModel

        let jsonData: object = { organization, bankAccount, merchant }

        if (!every(controller, isEmpty)) {
            jsonData = {
                ...jsonData,
                controller
            }
        }

        const payload = {
            type: APPLICATION_TYPE.CREATE_ORGANIZATION,
            status: APPLICATION_STATUS.WAITING,
            jsonData
        }

        const { status, body } = await ManageApplicationService.create(payload)

        if (status === 409) {
            showToast(
                {
                    type: "warning",
                    title: "Thất bại",
                    message: "Đơn đăng ký thành lập tổ chức của bạn đã tồn tại."
                }
            )

            return
        }

        if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
            showToast(
                {
                    type: "success",
                    title: "Thành công",
                    message: "Đơn đăng ký của bạn đã được tạo thành công."
                }
            )
            navigate("/applications")
            return
        }

        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: "Đơn đăng ký của bạn tạo không thành công."
            }
        )
    }, [navigate])

    const onSubmitDraft = useCallback(async (values: object) => {
        const { organization, bankAccount, merchant, controller } = values as ApplicationModel

        let jsonData: object = { organization, bankAccount, merchant }

        if (!every(controller, isEmpty)) {
            jsonData = {
                ...jsonData,
                controller
            }
        }

        const payload = {
            type: "CREATE_ORGANIZATION",
            status: APPLICATION_STATUS.DRAFT,
            jsonData
        }

        const { status, body } = await ManageApplicationService.create(payload)

        if (status === 409) {
            showToast(
                {
                    type: "warning",
                    title: "Thất bại",
                    message: "Đơn đăng ký thành lập tổ chức của bạn đã tồn tại."
                }
            )

            return
        }

        if (status === 200 && !isEmpty(body) && body.statusCode === 200) {
            showToast(
                {
                    type: "success",
                    title: "Thành công",
                    message: "Lưu nháp đơn thành công."
                }
            )
            navigate("/applications/edit", { state: body.data })
            return
        }

        showToast(
            {
                type: "error",
                title: "Thất bại",
                message: "Lưu nháp không thành công."
            }
        )
    }, [navigate])

    return (
        <Widget className="space-y-5">
            <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                <Breadcrumbs
                    breadcrumbs={["Quản lý đơn", "Tạo đơn"]}
                />
                <h2 className="text-xl font-semibold">Điền thông tin</h2>
                <p >Cung cấp thông tin về cửa hàng của bạn để đăng ký trở thành đối tác của Mellow Sips! </p>
            </div>
            <div className="w-full p-5 bg-white rounded shadow">
                <ErrorBoundary>
                    <ApplicationBusinessContext.Container>
                        <ApplicationForm
                            onSubmit={onSubmit}
                            onSubmitDraft={onSubmitDraft}
                        />
                    </ApplicationBusinessContext.Container>
                </ErrorBoundary>
            </div>
        </Widget>
    )
}

export default CreateApplication