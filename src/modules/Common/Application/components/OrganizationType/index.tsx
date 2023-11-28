import {useFormikContext} from "formik"
import FormikTextField from "modules/Common/FormikTextField"
import {useContext, useEffect, useRef} from "react"
import ApplicationModel, {OrganizationModel} from "types/application"
import {ORGANIZATION} from "enums/application.ts";
import CreateApplicationBusinessContext from "modules/Common/Application/context";

const OrganizationType = () => {
    const {values} = useFormikContext<ApplicationModel>()!
    const {type, setType} = useContext(CreateApplicationBusinessContext.Context)!
    const currentType = useRef<typeof ORGANIZATION[keyof typeof ORGANIZATION]>(type)
    useEffect(() => {
        const {organization: {businessType}} = values
        if (businessType === currentType.current) {
            return
        }

        currentType.current = businessType

        const {organization, controller, merchant, bankAccount} = values

        let baseBusiness: object = {
            name: organization.name,
            businessType: organization.businessType,
            identityType: organization.identityType,
            identityNumber: organization.identityNumber,
            identityIssueDate: organization.identityIssueDate,
            address: organization.address,
            phone: organization.phone,
            email: organization.email
        }

        if (organization.businessType === ORGANIZATION.PERSONAL) {
            baseBusiness = Object.assign(
                baseBusiness,
                {
                    identityFrontImage: organization.identityFrontImage || "",
                    identityBackImage: organization.identityBackImage || ""
                }
            )
        }

        if (organization.businessType === "HOUSEHOLD") {
            baseBusiness = Object.assign(
                baseBusiness,
                {
                    businessName: organization.businessName || "",
                    taxCode: organization.taxCode || "",
                    businessCode: organization.businessCode || "",
                    businessIdentityImages: organization.businessIdentityImages || []
                }
            )
        }

        if (organization.businessType === "ENTERPRISE") {
            baseBusiness = Object.assign(
                baseBusiness,
                {
                    identityIssueDate: organization.identityIssueDate || "",
                    businessName: organization.businessName || "",
                    taxCode: organization.taxCode || "",
                    businessCode: organization.businessCode || "",
                    businessIdentityIssueDate: organization.businessIdentityIssueDate || "",
                    businessIdentityImages: organization.businessIdentityImages || ""
                }
            )
        }

        const reinitialize: ApplicationModel = {
            merchant,
            controller,
            bankAccount,
            organization: baseBusiness as OrganizationModel
        }

        setType(businessType, reinitialize)

    }, [values, setType])

    return (
        <div className="h-fit grid grid-cols-2">
            <FormikTextField.Label
                label="Hình thức kinh doanh"
                required={true}
            />
            <FormikTextField.RadioGroup
                name="organization.businessType"
                options={
                    [
                        {
                            label: "Cá nhân",
                            value: ORGANIZATION.PERSONAL,
                        },
                        {
                            label: "Hộ kinh doanh",
                            value: ORGANIZATION.HOUSEHOLD,
                        },
                        {
                            label: "Công ty",
                            value: ORGANIZATION.ENTERPRISE
                        }
                    ]
                }
                direction="vertical"
            />
        </div>
    )
}

export default OrganizationType




