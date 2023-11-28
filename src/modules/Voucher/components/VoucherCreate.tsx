import ROLE from "enums/role"
import { Form, Formik } from "formik"
import useBoolean from "hooks/useBoolean"
import { isDate, isEmpty, isNumber, isUndefined } from "lodash"
import Button from "modules/Common/Button"
import FormikTextField from "modules/Common/FormikTextField"
import Loading from "modules/Common/Loading"
import Modal from "modules/Common/Modal/Modal"
import showToast from "modules/Common/Toast"
import StoreSelect from "modules/Manager/components/Product/components/StoreSelect"
import { FC, useId } from "react"
import VoucherService from "services/VoucherService"
import { useAppSelector } from "stores/root"
import { Principle } from "types/authenticate"
import { VOUCHER_TYPE } from "types/voucher"
import { boolean, date, number, object, string } from "yup"

const VoucherCreate: FC<{ refetch: () => void }> = ({ refetch }) => {
    const formId = useId()
    const principle = useAppSelector<Principle>(state => state.authenticate.principle!)
    const [display, setDisplay] = useBoolean(false)

    return (
        <div>
            <Button
                variant="orange"
                onClick={setDisplay.on}
            >
                Tạo mới voucher
            </Button>
            <Modal
                flag={display}
                closeModal={setDisplay.off}
                closeOutside={false}
                className="fixed top-0 left-0 z-10 h-screen w-screen bg-slate-900/50 py-5 flex items-center"
                innerClassName="max-w-5xl flex flex-col max-h-full bg-white mx-auto overflow-auto rounded"
            >
                <p className="px-5 flex-none py-2 shadow border-b truncate font-medium">Chi tiết mã giảm giá</p>
                <Formik
                    initialValues={
                        {
                            value: 1,
                            code: "",
                            quantity: 1,
                            maxUsesPerUser: 1,
                            maxDiscountAmount: 1000,
                            minOrderAmount: 0,
                            startDate: "",
                            endDate: "",
                            isHidden: false,
                            storeId: null,
                            discountType: VOUCHER_TYPE.PERCENT
                        }
                    }
                    validationSchema={
                        object().shape(
                            {
                                value: string().test(
                                    "test-value",
                                    "Giá trị không hợp lệ 1-100(%) hoặc tối thiểu 1000đ",
                                    function (value) {

                                        const { discountType } = this.parent
                                        if (isUndefined(value) || isEmpty(value)) {
                                            return false
                                        }

                                        const floatValue = parseFloat(value)

                                        if (floatValue < 1) {
                                            return false
                                        }

                                        if (discountType === VOUCHER_TYPE.PERCENT) {
                                            return floatValue <= 100
                                        }

                                        return floatValue >= 1000
                                    }
                                ),
                                quantity: number().min(1, "Số lượng khônng hợp lệ.").required("Trường này không được để trống."),
                                maxUsesPerUser: number().min(1, "Tối thiểu là 1 lượt.").required("Trường này không được để trống."),
                                maxDiscountAmount: number().test(
                                    "test-amount",
                                    "Tối thiểu là 1000đ.",
                                    function (value) {

                                        const { discountType } = this.parent

                                        if (discountType === "CASH") {
                                            return true
                                        }

                                        return isNumber(value) && value >= 1000
                                    }
                                ),
                                minOrderAmount: number().min(0).nullable(),
                                code: string().required("Code là bắt buộc.").matches(/^[a-zA-Z]{5,9}$/, "Bao gồm 5-9 ký tự chữ."),
                                startDate: date().test(
                                    "startDate",
                                    "Ngày không hợp lệ.",
                                    function (value) {
                                        if (!isDate(value)) {
                                            return false
                                        }
                                        return value > new Date()
                                    }
                                ).required("Vui lòng chọn ngày áp dụng."),
                                endDate: date().test(
                                    "endDate",
                                    "Ngày không hợp lệ.",
                                    function (value) {
                                        if (!isDate(value) || !isDate(this.parent.startDate)) {
                                            return false
                                        }
                                        return this.parent.startDate < value
                                    }
                                ).required("Vui lòng chọn ngày hết hạn."),
                                isHidden: boolean().required(),
                                storeId: string().nullable()
                            }
                        )
                    }
                    onSubmit={
                        async (values) => {
                            const payload = {
                                ...values,
                                startDate: isDate(values.startDate) ? values.startDate.toISOString().replace(".000Z", "+07:00") : null,
                                endDate: isDate(values.endDate) ? values.endDate.toISOString().replace(".000Z", "+07:00") : null
                            }

                            const { status, body } = await VoucherService.create(payload)

                            if (status === 409) {
                                showToast(
                                    {
                                        type: "warning",
                                        title: "Thất bại",
                                        message: "Voucher code không hợp lệ vui lòng sử dụng mã khác."
                                    }
                                )
                                return
                            }

                            if (status === 200 && !isEmpty(body)) {
                                showToast(
                                    {
                                        type: "success",
                                        title: "Thành công",
                                        message: "Lưu thông tin voucher thành công."
                                    }
                                )

                                setDisplay.off()
                                refetch()
                                return
                            }
                            showToast(
                                {
                                    type: "error",
                                    title: "Thất bại",
                                    message: "Lỗi bất định, tạo voucher thất bại."
                                }
                            )
                        }
                    }
                >
                    {
                        ({ values: { discountType } }) => (
                            <>
                                <Form
                                    className="w-220 p-5 grow overflow-y-auto grid grid-cols-2 gap-5"
                                    id={formId}
                                >
                                    <div className="space-y-2">
                                        <label className="text-main-secondary font-medium">Loại</label>
                                        <FormikTextField.RadioGroup
                                            name="discountType"
                                            options={
                                                [
                                                    {
                                                        label: "Mức giảm",
                                                        value: VOUCHER_TYPE.CASH
                                                    },
                                                    {
                                                        label: "Theo phần trăm",
                                                        value: VOUCHER_TYPE.PERCENT
                                                    }
                                                ]
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-main-secondary font-medium">Hình thức</label>
                                        <FormikTextField.Checkbox
                                            name="isHidden"
                                            label="Hiển thị"
                                        />
                                    </div>
                                    {
                                        principle.type === ROLE.OWNER ? <StoreSelect /> : null
                                    }
                                    <hr className="col-span-2" />
                                    <div className="space-y-2">
                                        <label className="text-main-secondary font-medium">Mã code</label>
                                        <FormikTextField.Input
                                            name="code"
                                            placeholder="Ví dụ: EYAXWlk"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-main-secondary space-x-1 font-medium">
                                            <span>Đơn tối thiểu</span>
                                            <span className="text-xs text-gray-400">(đ)</span>
                                        </label>
                                        <FormikTextField.NumberInput
                                            name="minOrderAmount"
                                            placeholder="Ví dụ: áp dụng cho đơn từ 0đ"
                                        />
                                    </div>
                                    <hr className="col-span-2" />
                                    <div className="space-y-2">
                                        <label className="text-main-secondary font-medium">Số lượng</label>
                                        <FormikTextField.Input
                                            name="quantity"
                                            placeholder="Ví dụ: số lượt sử dụng tối đa"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-main-secondary font-medium">Số lượt sử dụng tối đa cho một người mua</label>
                                        <FormikTextField.Input
                                            name="maxUsesPerUser"
                                            placeholder="Ví dụ: 1"
                                        />
                                    </div>
                                    {
                                        discountType === VOUCHER_TYPE.CASH ? (
                                            <div className="space-y-2">
                                                <label className="text-main-secondary font-medium">Mức giảm</label>
                                                <FormikTextField.Input
                                                    name="value"
                                                    placeholder="Ví dụ: 1000 đ"
                                                />
                                            </div>
                                        ) : null
                                    }
                                    {
                                        discountType === VOUCHER_TYPE.PERCENT ? (
                                            <div className="space-y-2">
                                                <label className="text-main-secondary font-medium">Phần trăm</label>
                                                <FormikTextField.Input
                                                    name="value"
                                                    placeholder="Ví dụ: 5%"
                                                />
                                            </div>
                                        ) : null
                                    }


                                    {
                                        discountType === VOUCHER_TYPE.PERCENT ? (
                                            <div className="space-y-2">
                                                <label className="text-main-secondary space-x-1 font-medium">
                                                    <span>Mức giảm tối đa</span>
                                                    <span className="text-xs text-gray-400">(Tuỳ chọn)</span>
                                                </label>
                                                <FormikTextField.NumberInput
                                                    name="maxDiscountAmount"
                                                    placeholder="Không giới hạn"
                                                />
                                            </div>
                                        ) : null
                                    }

                                    <hr className="col-span-2"></hr>
                                    <div className="space-y-2">
                                        <label className="text-main-secondary space-x-1 font-medium">
                                            <span>Ngày bắt đầu áp dụng</span>
                                        </label>
                                        <FormikTextField.DateTimeInput
                                            name="startDate"
                                            placeholder="Chọn ngày bắt đầu"
                                            disabled={
                                                {
                                                    before: new Date()
                                                }
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-main-secondary space-x-1 font-medium">
                                            <span>Thời gian kết thúc</span>
                                        </label>
                                        <FormikTextField.DateTimeInput
                                            name="endDate"
                                            placeholder="Chọn ngày kết thúc"
                                            disabled={
                                                {
                                                    before: new Date()
                                                }
                                            }
                                        />
                                    </div>
                                </Form>
                                <div className="border-t py-2 px-5 flex justify-end space-x-5">
                                    <Button
                                        type="submit"
                                        form={formId}
                                        variant="indigo"
                                        className="group"
                                    >
                                        <span className='hidden group-disabled:block mr-2'>
                                            <Loading.Circle size={14} />
                                        </span>
                                        <span>Tạo</span>
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
            </Modal >
        </div>
    )
}

export default VoucherCreate