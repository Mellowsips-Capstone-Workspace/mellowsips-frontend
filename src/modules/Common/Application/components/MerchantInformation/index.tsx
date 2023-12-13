import { FieldArray, FieldArrayRenderProps } from 'formik';
import { isNull, isUndefined } from 'lodash';
import FormikTextField from 'modules/Common/FormikTextField';
import { FC } from 'react';
import ApplicationModel, { MAX_ALLOWED_NUMBER_STORES } from 'types/application';

type MerchantProps = (FieldArrayRenderProps | void) & {
    limitStore: boolean
}

const Merchant: FC<MerchantProps> = (props) => {

    if (isNull(props) || isUndefined(props)) {
        return
    }
    const { form, push, remove } = props as FieldArrayRenderProps
    const { limitStore } = props as MerchantProps
    const { merchant, organization: { businessType } } = form.values as ApplicationModel
    const currentNumberMerchants = merchant.length

    return (
        <>
            {
                (businessType === "ENTERPRISE" && limitStore) ? (
                    <p className="text-main-primary flex items-baseline">
                        <i className="fas fa-info-circle"></i>
                        <i className="inline-block ps-2">Cho phép tạo tối đa {MAX_ALLOWED_NUMBER_STORES} cửa hàng. Bạn có thể tạo thêm các chi nhánh mới sau khi khởi tạo doanh nghiệp thành công.</i>
                    </p>
                ) : null
            }
            {
                merchant.map(
                    (_, index) => (
                        <div
                            className='space-y-3'
                            key={index}
                        >
                            {
                                currentNumberMerchants > 1 ? (
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-main-primary text-xl font-semibold py-2">Thông tin cửa hàng {index + 1}</h2>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="flex h-7 w-7 rounded-full items-center justify-center text-main-primary border-2 hover:bg-light hover:cursor-pointer"
                                        >
                                            <i className="fas fa-trash fa-xs" title="Xóa"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <h2 className="text-main-primary text-xl font-semibold py-2">Thông tin cửa hàng</h2>
                                )
                            }
                            <div className="space-y-5">
                                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                                    <FormikTextField.Label label="Tên cửa hàng" required={true} />
                                    <FormikTextField.Input name={`merchant.${index}.name`} placeholder="Tên cửa hàng" />
                                </div>
                                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                                    <FormikTextField.Label label="Số điện thoại cửa hàng" required={true} />
                                    <FormikTextField.PhoneInput
                                        name={`merchant.${index}.phone`}
                                        placeholder="Số điện thoại cửa hàng"
                                    />
                                </div>
                                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                                    <FormikTextField.Label label="Email" required={true} />
                                    <FormikTextField.Input name={`merchant.${index}.email`} placeholder="Email" />
                                </div>
                                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                                    <FormikTextField.Label label="Địa chỉ" required={true} />
                                    <FormikTextField.AddressInput name={`merchant.${index}.address`} placeholder="Địa chỉ" />
                                </div>
                                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                                    <FormikTextField.Label label="Hình ảnh cửa hàng" required={true} description="(mặt tiền, cơ sở vật chất,...)" />
                                    <FormikTextField.UploadFile
                                        accept="image/*"
                                        multiple={true}
                                        name={`merchant.${index}.merchantImages`}
                                    />
                                </div>
                                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                                    <FormikTextField.Label label="Hình ảnh thực đơn" required={true} />
                                    <FormikTextField.UploadFile
                                        accept="image/*"
                                        multiple={true}
                                        maxFiles={5}
                                        name={`merchant.${index}.menuImages`}
                                    />
                                </div>
                            </div>

                            {
                                limitStore ? (
                                    <>
                                        {
                                            (
                                                businessType === "ENTERPRISE" &&
                                                (index === currentNumberMerchants - 1) &&
                                                ((index + 1) < MAX_ALLOWED_NUMBER_STORES)
                                            ) ? (
                                                <button
                                                    className="block w-full bg-main-primary text-white rounded-lg py-2 px-5 font-semibold"
                                                    type="button"
                                                    onClick={
                                                        () => push(
                                                            {
                                                                name: "",
                                                                phone: "",
                                                                email: "",
                                                                address: "",
                                                                images: [],
                                                                menuImages: []
                                                            }
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-plus"></i>
                                                    <span className="ms-2">Thêm mới cửa hàng</span>
                                                </button>
                                            ) : null
                                        }
                                    </>
                                ) : (
                                    <button
                                        className="block w-full bg-main-primary text-white rounded-lg py-2 px-5 font-semibold"
                                        type="button"
                                        onClick={
                                            () => push(
                                                {
                                                    name: "",
                                                    phone: "",
                                                    email: "",
                                                    address: "",
                                                    images: [],
                                                    menuImages: []
                                                }
                                            )
                                        }
                                    >
                                        <i className="fas fa-plus"></i>
                                        <span className="ms-2">Thêm mới cửa hàng</span>
                                    </button>
                                )
                            }

                        </div>
                    )
                )
            }
        </>
    )

}

type MerchantInformationProps = {
    limitStore?: boolean
}
const MerchantInformation: FC<MerchantInformationProps> = ({ limitStore = false }) => {
    return (
        <div className="space-y-5 mb-10">
            <FieldArray
                name="merchant"
                render={(props) => <Merchant {...props} limitStore={limitStore} />}
            />
        </div>
    )
}

export default MerchantInformation