import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import MerchantInformation from "modules/Common/Application/components/MerchantInformation";
import Breadcrumbs from "modules/Common/Breadcrumbs";
import Button from "modules/Common/Button";
import { WidgetSkeleton } from "modules/Common/Skeleton";
import showToast from "modules/Common/Toast";
import { Widget } from "modules/Layout/Dashboard";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManageApplicationService from "services/ManageApplicationService";
import { Application } from "types/application.ts";
import { array, mixed, object, string } from "yup";

const EditCreateStoreApplication = () => {
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


        const { status, body } = await ManageApplicationService.edit(id, { jsonData: values })

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
                            <Formik
                                onSubmit={onSubmit}
                                initialValues={application.jsonData}
                                validationSchema={
                                    object().shape(
                                        {
                                            merchant: array().of(
                                                object().shape(
                                                    {
                                                        name: string().required("Trường này là bắt buộc"),
                                                        phone: string().required("Trường này là bắt buộc"),
                                                        email: string().email("Email không hợp lệ").required("Trường này là bắt buộc"),
                                                        address: string().required("Trường này là bắt buộc."),
                                                        merchantImages: array().of(mixed()).min(1, "Trường này là bắt buộc").required("Trường này là bắt buộc"),
                                                        menuImages: array().of(mixed()).min(1, "Trường này là bắt buộc").required("Trường này là bắt buộc")
                                                    }
                                                )
                                            )
                                        }
                                    )
                                }
                            >
                                {
                                    ({ isSubmitting, setSubmitting, values }) => (
                                        <Form>
                                            <MerchantInformation />
                                            <div className="flex space-x-5">
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    disabled={isSubmitting}
                                                >
                                                    <span className='font-semibold'>Gửi</span>
                                                </Button>
                                                <Button
                                                    disabled={isSubmitting}
                                                    type="button"
                                                    variant="default"
                                                    data-submitting={isSubmitting}
                                                    className='flex-none space-x-1 data-submitting:invisible'
                                                    onClick={
                                                        async () => {
                                                            setSubmitting(true)
                                                            await onSubmit(values)
                                                            setSubmitting(false)
                                                        }
                                                    }
                                                >
                                                    <span className='font-semibold' >Lưu thay đổi</span>
                                                </Button>
                                            </div>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                ) : null
            }
        </Widget>
    )
}

export default EditCreateStoreApplication