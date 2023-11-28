import { IDENTITY } from "enums/application.ts";
import { isEmpty } from "lodash";
import EnterpriseBusinessInformationForm from "modules/Common/Application/components/EnterpriseBusinessInformationForm";
import HouseholdBusinessInformationForm from "modules/Common/Application/components/HouseholdBusinessInformationForm";
import MerchantInformation from "modules/Common/Application/components/MerchantInformation";
import OrganizationType from "modules/Common/Application/components/OrganizationType";
import OthersInformation from "modules/Common/Application/components/OthersInformation";
import PersonalBusinessInformationForm from "modules/Common/Application/components/PersonalBusinessInformationForm";
import CreateApplicationBusinessContext from "modules/Common/Application/context";
import FormikStepper from "modules/Common/FormikStepper";
import { FC, useContext } from "react";
import REGEX from "validations/regex";
import { array, mixed, object, string } from "yup";

type ApplicationFormProps = {
    onSubmit: (values: object) => void
    showSubmit?: boolean
    onSubmitDraft?: (values: object) => void
}

const ApplicationForm: FC<ApplicationFormProps> = ({ onSubmit, onSubmitDraft, showSubmit = true }) => {
    const { initialValues, type } = useContext(CreateApplicationBusinessContext.Context)!

    return (
        <FormikStepper.Container
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnMount={true}
            enableReinitialize={true}
            onSubmitDraft={onSubmitDraft}
            showSubmit={showSubmit}
        >
            <FormikStepper.Step
                stepLabel="Thông tin doanh nghiệp"
                validationSchema={
                    type === "PERSONAL" ? object().shape(
                        {
                            organization: object().shape(
                                {
                                    name: string().matches(REGEX.notBlank, "Họ và tên không hợp lệ.").required("Họ và tên không được để trống."),
                                    identityType: string().oneOf(Object.keys(IDENTITY)).required("Trường này không được để trống."),
                                    identityNumber: string().required("Trường này không được để trống."),
                                    identityIssueDate: string().required("Trường này là bắt buộc"),
                                    address: string().required("Trường này không được để trống."),
                                    phone: string().max(11, "Số điện thoại không hợp lệ.").required("Trường này không được để trống.").matches(REGEX.phoneNumber, "Số điện thoại không hợp lệ"),
                                    email: string().email("Vui lòng cung cấp địa chỉ email hợp lệ").required("Trường này không được để trống."),
                                    businessType: string().required("Trường này không được để trống."),
                                    identityFrontImage: mixed().required("Trường này không được để trống."),
                                    identityBackImage: mixed().required("Trường này không được để trống."),
                                }
                            )
                        }
                    ) : type === "HOUSEHOLD" ? object().shape(
                        {
                            organization: object().shape(
                                {
                                    name: string().matches(REGEX.notBlank, "Họ và tên không hợp lệ.").required("Họ và tên không được để trống."),
                                    identityType: string().oneOf(Object.keys(IDENTITY)).required("Trường này không được để trống."),
                                    identityNumber: string().required("Trường này không được để trống."),
                                    identityIssueDate: string().required("Trường này không được để trống."),
                                    address: string().required("Trường này không được để trống."),
                                    phone: string().max(11, "Số điện thoại không hợp lệ.").required("Trường này không được để trống.").matches(REGEX.phoneNumber, "Số điện thoại không hợp lệ"),
                                    email: string().email("Vui lòng cung cấp địa chỉ email hợp lệ").required("Trường này không được để trống."),
                                    businessType: string().required("Trường này không được để trống."),
                                    businessName: string().required("Trường này không được để trống."),
                                    taxCode: string().required("Trường này không được để trống."),
                                    businessCode: string().required("Trường này không được để trống."),
                                    businessIdentityImages: array().of(string()).required("Trường này không được để trống."),
                                }
                            )
                        }
                    ) : type === "ENTERPRISE" ? object().shape(
                        {
                            organization: object().shape(
                                {
                                    name: string().required("Trường này không được để trống."),
                                    identityType: string().oneOf(Object.keys(IDENTITY)).required("Trường này không được để trống."),
                                    identityNumber: string().required("Trường này không được để trống."),
                                    identityIssueDate: string().required("Trường này không được để trống."),
                                    address: string().required("Trường này không được để trống."),
                                    phone: string().max(11, "Số điện thoại không hợp lệ.").required("Trường này không được để trống.").matches(REGEX.phoneNumber, "Số điện thoại không hợp lệ"),
                                    email: string().email("Vui lòng cung cấp địa chỉ email hợp lệ").required("Trường này không được để trống."),
                                    businessType: string().required("Trường này không được để trống."),
                                    businessName: string().required("Trường này không được để trống."),
                                    taxCode: string().required("Trường này không được để trống."),
                                    businessCode: string().required("Trường này không được để trống."),
                                    businessIdentityIssueDate: string().required("Trường này không được để trống."),
                                    businessIdentityImages: array().of(string()).required("Trường này không được để trống."),
                                }
                            )
                        }
                    ) : null
                }
            >
                <OrganizationType />
                {
                    type === "PERSONAL" ? (
                        <PersonalBusinessInformationForm />
                    ) : type === "HOUSEHOLD" ? (
                        <HouseholdBusinessInformationForm />
                    ) : type === "ENTERPRISE" ? (
                        <EnterpriseBusinessInformationForm />
                    ) : null
                }
            </FormikStepper.Step>

            <FormikStepper.Step
                stepLabel="Thông tin cửa hàng"
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
                <MerchantInformation />
            </FormikStepper.Step>

            <FormikStepper.Step
                stepLabel="Các thông tin khác"
                validationSchema={

                    object().shape(
                        {
                            controller: object().shape(
                                {
                                    name: string().test(
                                        "name",
                                        "Tên không được bỏ trống.",
                                        function (value) {
                                            if (isEmpty(this.parent.phone) && isEmpty(this.parent.email) && isEmpty(value)) {
                                                return true
                                            }

                                            return !isEmpty(value)
                                        }
                                    ).notRequired(),
                                    phone: string().test(
                                        "phone",
                                        "Phone không được bỏ trống.",
                                        function (value) {
                                            if (isEmpty(this.parent.email) && isEmpty(this.parent.name) && isEmpty(value)) {
                                                return true
                                            }

                                            return !isEmpty(value)
                                        }
                                    ).notRequired(),
                                    email: string().test(
                                        "email",
                                        "Email không được bỏ trống.",
                                        function (value) {
                                            if (isEmpty(this.parent.phone) && isEmpty(this.parent.name) && isEmpty(value)) {
                                                return true
                                            }

                                            return !isEmpty(value)
                                        }
                                    ).email("Email không hợp lệ.").notRequired()
                                }
                            ),
                            bankAccount: object().shape(
                                {
                                    bankName: string().required("Trường này là bắt buộc."),
                                    bankBranch: string().required("Trường này là bắt buộc."),
                                    accountName: string().required("Trường này là bắt buộc."),
                                    accountNumber: string().required("Trường này là bắt buộc."),
                                    identityImages: mixed().required("Trường này là bắt buộc.")
                                }
                            )
                        }
                    )
                }
            >
                <OthersInformation />
            </FormikStepper.Step>
        </FormikStepper.Container>
    )
}

export default ApplicationForm