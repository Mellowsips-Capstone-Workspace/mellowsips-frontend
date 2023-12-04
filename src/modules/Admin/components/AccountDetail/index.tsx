import { Form, Formik } from 'formik'
import useBoolean from 'hooks/useBoolean'
import { isEmpty } from 'lodash'
import Button from 'modules/Common/Button'
import FormikTextField from 'modules/Common/FormikTextField'
import Modal from 'modules/Common/Modal/Modal'
import StoreSelect from 'modules/Common/Store/StoreSelect'
import showToast from 'modules/Common/Toast'
import { FC } from 'react'
import ManageAccountService from 'services/ManageAccountService'
import { Account } from 'types/account'

type AccountDetailProps = {
    account: Account & {
        updateAccount: (id: string, account: Account) => void
    }
}

const AccountDetail: FC<AccountDetailProps> = ({ account }) => {
    const { id, isActive, updateAccount } = account
    const [display, setDisplay] = useBoolean(false)

    return (
        <div>
            <span
                onClick={setDisplay.on}
                className='hover:text-main-primary transition-all cursor-pointer'
            >
                Chi tiết
            </span>
            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="px-5 flex-none py-2 shadow border-b truncate font-medium">Thông tin tài khoản</p>
                <Formik
                    initialValues={
                        {
                            ...account,
                            phone: account.phone || ""
                        }
                    }
                    onSubmit={
                        async ({ id }) => {


                            const { status, body } = isActive ? await ManageAccountService.disable(id) : await ManageAccountService.active(id)


                            if (status === 200 && !isEmpty(body)) {
                                showToast(
                                    {
                                        type: "success",
                                        title: "Thành công",
                                        message: "Lưu trạng thái tài khoản thành công."
                                    }
                                )

                                setDisplay.off()
                                updateAccount(id, body.data)
                                return
                            }
                            showToast(
                                {
                                    type: "error",
                                    title: "Thất bại",
                                    message: "Lỗi bất định, lưu thay đổi tài khoản thất bại."
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
                                    className='p-5 grow overflow-y-auto w-220 grid grid-cols-2 gap-x-5 gap-y-2 pointer-events-none'
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
                                    {
                                        isActive ? (
                                            <Button
                                                form={id}
                                                disabled={isSubmitting || !isValid}
                                                type="submit"
                                                variant="red"
                                                className="group"
                                            >
                                                Vô hiệu hoá
                                            </Button>

                                        ) : (
                                            <Button
                                                form={id}
                                                disabled={isSubmitting || !isValid}
                                                type="submit"
                                                variant="indigo"
                                                className="group"
                                            >
                                                Kích hoạt
                                            </Button>

                                        )
                                    }
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

export default AccountDetail