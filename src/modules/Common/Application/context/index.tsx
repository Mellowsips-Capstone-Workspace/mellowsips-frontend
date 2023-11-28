import { IDENTITY, ORGANIZATION } from "enums/application.ts";
import { isEmpty } from "lodash";
import { FC, ReactNode, createContext, useCallback, useState } from 'react';
import ApplicationModel from 'types/application';

export type ApplicationBusinessContextType = {
    type: typeof ORGANIZATION[keyof typeof ORGANIZATION]
    initialValues: ApplicationModel
    setType: (type: typeof ORGANIZATION[keyof typeof ORGANIZATION], initialValues: ApplicationModel) => void
}

const Context = createContext<ApplicationBusinessContextType | undefined>(undefined)

type ContainerProps = {
    initial?: {
        type: typeof ORGANIZATION[keyof typeof ORGANIZATION],
        initialValues: ApplicationModel
    },
    children?: ReactNode
}
const Container: FC<ContainerProps> = ({ children, initial }) => {
    const [organization, setOrganization] = useState<{
        type: typeof ORGANIZATION[keyof typeof ORGANIZATION],
        initialValues: ApplicationModel
    }>(
        isEmpty(initial) ? {
            type: ORGANIZATION.PERSONAL,
            initialValues: {
                organization: {
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    identityNumber: "",
                    identityBackImage: "",
                    identityIssueDate: "",
                    identityFrontImage: "",
                    businessType: ORGANIZATION.PERSONAL,
                    identityType: IDENTITY.CITIZEN_ID_CARD
                },
                merchant: [
                    {
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        merchantImages: [],
                        menuImages: []
                    }
                ],
                controller: {
                    name: "",
                    phone: "",
                    email: ""
                },
                bankAccount: {
                    bankName: "",
                    bankBranch: "",
                    accountName: "",
                    accountNumber: "",
                    identityImages: []
                }
            }
        } : initial
    )

    const setType = useCallback((type: "PERSONAL" | "HOUSEHOLD" | "ENTERPRISE", initialValues: ApplicationModel) => {
        setOrganization({ type, initialValues })
    }, [])

    return (
        <Context.Provider
            value={
                {
                    type: organization.type,
                    initialValues: organization.initialValues,
                    setType: setType
                }
            }
        >
            {children}
        </Context.Provider>
    )
}

const ApplicationBusinessContext = {
    Context,
    Container
}

export default ApplicationBusinessContext