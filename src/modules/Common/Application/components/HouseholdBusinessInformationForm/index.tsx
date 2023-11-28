import FormikTextField from "modules/Common/FormikTextField"
import { FC, useMemo } from "react"

const HouseholdBusinessInformationForm: FC = () => {
    const identityTypes = useMemo(() => [
        {
            label: "Căn cước công dân",
            value: "CITIZEN_ID_CARD",
        },
        {
            label: "Chứng minh nhân dân",
            value: "IDENTITY_CARD",
        },
        {
            label: "Hộ chiếu",
            value: "PASSPORT",
        },
    ], [])

    return (
        <>
            <h2 className="text-main-primary text-xl font-semibold py-2">Thông tin chủ hộ kinh doanh</h2>
            <div className="space-y-5 pt-3">
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Họ và tên" required={true} />
                    <FormikTextField.Input name="organization.name" placeholder="Họ và tên" />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Loại giấy tờ tùy thân" required={true} />
                    <FormikTextField.RadioGroup name="organization.identityType" options={identityTypes} direction="vertical" />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Số CCCD/CMND/Hộ chiếu" required={true} />
                    <FormikTextField.Input name="organization.identityNumber" placeholder="Số CCCD/CMND/Hộ chiếu" />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Ngày cấp" required={true} />
                    <FormikTextField.DateInput
                        name="organization.identityIssueDate"
                        disabled={
                            {
                                after: new Date()
                            }
                        }
                    />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Địa chỉ thường trú" required={true} />
                    <FormikTextField.AddressInput name="organization.address" placeholder="Địa chỉ thường trú" />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Số điện thoại" required={true} />
                    <FormikTextField.PhoneInput
                        name="organization.phone"
                        placeholder="84"
                        startWith="84"
                    />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Email" required={true} />
                    <FormikTextField.Input name="organization.email" placeholder="Email" />
                </div>
            </div>
            <h2 className="text-main-primary text-xl font-semibold py-2 mt-5">Thông tin hộ kinh doanh</h2>
            <div className="space-y-5 pt-3">
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Tên hộ kinh doanh" required={true} />
                    <FormikTextField.Input name="organization.businessName" placeholder="Tên hộ kinh doanh" />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Mã số thuế" required={true} />
                    <FormikTextField.Input name="organization.taxCode" placeholder="Mã số thuế" />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Mã số hộ kinh doanh" required={true} />
                    <FormikTextField.Input name="organization.businessCode" placeholder="Mã số hộ kinh doanh" />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Ngày cấp Giấy chứng nhận đăng kí Hộ kinh doanh" required={true} />
                    <FormikTextField.DateInput
                        name="organization.businessIdentityIssueDate"
                        disabled={
                            {
                                after: new Date()
                            }
                        }
                    />
                </div>
                <div className="h-fit grid grid-cols-1 sm:grid-cols-2 gap-y-2 py-1">
                    <FormikTextField.Label label="Hình ảnh đầy đủ Giấy chứng nhận đăng kí Hộ kinh doanh" required={true} />
                    <FormikTextField.UploadFile
                        name="organization.businessIdentityImages"
                        multiple={true}
                        accept="image/*"
                    />
                </div>
            </div>
        </>
    )
}

export default HouseholdBusinessInformationForm