import { Form, Formik } from 'formik'
import useBoolean from 'hooks/useBoolean'
import { isEmpty } from 'lodash'
import Button from 'modules/Common/Button'
import FormikTextField from 'modules/Common/FormikTextField'
import Modal from 'modules/Common/Modal/Modal'
import showToast from 'modules/Common/Toast'
import { FC, useId } from 'react'
import QRService from 'services/QRService'
import { QRCode } from 'types/store'
import REGEX from 'validations/regex'
import { object, string } from 'yup'

type AddQRCodeProps = {
    storeId: string | undefined
    addQRCode: (qr: QRCode) => void
}

const AddQRCode: FC<AddQRCodeProps> = ({ storeId, addQRCode }) => {
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
                <p className="px-5 flex-none py-2 shadow border-b truncate font-medium">Tạo mã QR</p>
                <div className="w-110 p-5 grow overflow-y-auto">
                    <Formik
                        initialValues={
                            {
                                name: ""
                            }
                        }
                        validationSchema={
                            object().shape(
                                {
                                    name: string().matches(REGEX.notBlank, "Tên mã").required("Tên mã là bắt buộc")
                                }
                            )
                        }
                        onSubmit={
                            async (values) => {
                                const { status, body } = await QRService.create(storeId, values)

                                if (status === 200 && !isEmpty(body)) {
                                    showToast(
                                        {
                                            type: "success",
                                            title: "Thành công",
                                            message: "Tạo mã QR thành công."
                                        }
                                    )

                                    setDisplay.off()
                                    addQRCode(body.data)
                                    return
                                }
                                showToast(
                                    {
                                        type: "error",
                                        title: "Thất bại",
                                        message: "Lỗi bất định, tạo mã QR thất bại."
                                    }
                                )
                            }
                        }
                    >
                        <Form
                            id={id}
                            className='min-w-full'
                        >
                            <div className="space-y-2">
                                <label className="text-main-secondary font-medium">Tên mã</label>
                                <FormikTextField.Input
                                    name="name"
                                    placeholder="Ví dụ: Bàn 1"
                                />
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="border-t py-2 px-5 flex justify-end space-x-5">
                    <Button
                        form={id}
                        type="submit"
                        variant="indigo"
                        className="group"
                    >
                        Tạo mã
                    </Button>
                    <Button
                        type="button"
                        variant="default"
                        onClick={setDisplay.off}
                    >
                        Huỷ
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default AddQRCode