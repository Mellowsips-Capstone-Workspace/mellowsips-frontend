import { Form, Formik } from 'formik'
import useBoolean from 'hooks/useBoolean'
import { isEmpty } from 'lodash'
import Button from 'modules/Common/Button'
import FormikTextField from 'modules/Common/FormikTextField'
import Modal from 'modules/Common/Modal/Modal'
import showToast from 'modules/Common/Toast'
import StoreSelect from 'modules/Manager/components/Product/components/StoreSelect'
import { FC, useId } from 'react'
import ManageAccountService from 'services/ManageAccountService'
import REGEX from 'validations/regex'
import { object, string } from 'yup'

// type AddQRCodeProps = {
//     storeId: string | undefined
//     addQRCode: (qr: QRCode) => void
// }

const AddAccount: FC = () => {
    const id = useId()
    const [display, setDisplay] = useBoolean(false)

    return (
        <div>
            <Button
                variant="orange"
                className="min-h-full"
                onClick={setDisplay.on}
            >
                Thêm mới
            </Button>
            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="px-5 flex-none py-2 shadow border-b truncate font-medium">Tạo tài khoản</p>
                <Formik
                    initialValues={
                        {
                            username: "",
                            email: "",
                            displayName: "",
                            type: "STAFF",
                            storeId: "",
                            phone: ""
                        }
                    }
                    validationSchema={
                        object().shape(
                            {
                                username: string().matches(REGEX.username, "Tên đăng nhập chưa hợp lệ").required("Tên đăng nhập là bắt buộc"),
                                email: string().email("Email không hợp lệ.").required("Tên đăng nhập không hợp lệ."),
                                displayName: string().matches(REGEX.notBlank, "Tên chưa hợp lệ").required("Tên là bắt buộc"),
                                storeId: string().required("Vui lòng chọn của hàng."),
                                phone: string().matches(REGEX.personalPhone, "Số điện thoại không hợp lệ.")
                            }
                        )
                    }
                    onSubmit={
                        async (values) => {
                            const payload = {
                                ...values,
                                phone: isEmpty(values.phone) ? null : values.phone
                            }

                            const { status, body } = await ManageAccountService.create(payload)

                            if (status === 409) {
                                showToast(
                                    {
                                        type: "warning",
                                        title: "Thất bại",
                                        message: "Tên đăng nhập hoặc email đã được sử dụng."
                                    }
                                )
                                return
                            }

                            if (status === 200 && !isEmpty(body)) {
                                showToast(
                                    {
                                        type: "success",
                                        title: "Thành công",
                                        message: "Tài khoản thành công."
                                    }
                                )

                                setDisplay.off()
                                console.log(body.data)
                                return
                            }
                            showToast(
                                {
                                    type: "error",
                                    title: "Thất bại",
                                    message: "Lỗi bất định, tài khoản thất bại."
                                }
                            )
                        }
                    }
                >
                    {
                        ({ isSubmitting, isValid }) => (
                            <>
                                <Form
                                    id={id}
                                    className='p-5 grow overflow-y-auto w-220 grid grid-cols-2 gap-x-5 gap-y-2'
                                >
                                    <div className="space-y-2">
                                        <label className="text-gray-500 font-medium">Tên đăng nhập</label>
                                        <FormikTextField.Input
                                            name="username"
                                            placeholder="Ví dụ: nhanvien"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-500 font-medium">Tên</label>
                                        <FormikTextField.Input
                                            name="displayName"
                                            placeholder="Ví dụ: Nhân Viên A"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-500 font-medium">Loại tài khoản</label>
                                        <FormikTextField.DropdownInput
                                            name="type"
                                            options={
                                                [
                                                    {
                                                        label: "Nhân viên",
                                                        value: "STAFF"
                                                    },
                                                    {
                                                        label: "Quản lý cửa hàng",
                                                        value: "STORE_MANAGER"
                                                    }
                                                ]
                                            }
                                            placeholder="(84) ..."
                                        />
                                    </div>
                                    <StoreSelect />

                                    <div className="space-y-2">
                                        <label className="text-gray-500 font-medium">Email</label>
                                        <FormikTextField.Input
                                            name="email"
                                            placeholder="Ví dụ: nhanvien@gmail.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-500 font-medium">Số điện thoại (tuỳ chọn)</label>
                                        <FormikTextField.PhoneInput
                                            name="phone"
                                            startWith="84"
                                            placeholder="(84) ..."
                                        />
                                    </div>
                                </Form>
                                <div className="border-t py-2 px-5 flex justify-end space-x-5">
                                    <Button
                                        form={id}
                                        disabled={isSubmitting || !isValid}
                                        type="submit"
                                        variant="indigo"
                                        className="group"
                                    >
                                        Tạo tài khoản
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="default"
                                        onClick={setDisplay.off}
                                    >
                                        Huỷ
                                    </Button>
                                </div>
                            </>
                        )
                    }

                </Formik>
            </Modal>
        </div>
    )
}

export default AddAccount