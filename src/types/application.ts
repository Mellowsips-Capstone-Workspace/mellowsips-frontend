import { APPLICATION_STATUS, IDENTITY, ORGANIZATION } from "enums/application.ts";
import Base from "types/base";

export type Organization = {
    name: string
    identityType: typeof IDENTITY[keyof typeof IDENTITY]
    identityNumber: string
    identityIssueDate: string
    address: string
    phone: string
    email: string
}

type OrganizationPersonal = Organization & {
    businessType: typeof ORGANIZATION.PERSONAL
    identityFrontImage: string
    identityBackImage: string
}

type OrganizationHouseHold = Organization & {
    businessType: typeof ORGANIZATION.HOUSEHOLD
    businessName: string
    taxCode: string
    businessCode: string
    businessIdentityIssueDate: string
    businessIdentityImages: string[]
}

type OrganizationEnterprise = Organization & {
    businessType: typeof ORGANIZATION.ENTERPRISE
    identityIssueDate: string
    businessName: string
    taxCode: string
    businessCode: string
    businessIdentityIssueDate: string
    businessIdentityImages: string[]
}

export type OrganizationModel = Organization & (OrganizationPersonal | OrganizationHouseHold | OrganizationEnterprise)

export type MerchantModel = {
    name: string
    phone: string
    email: string
    address: string
    merchantImages: string[]
    menuImages: string[]
}

export const MAX_ALLOWED_NUMBER_STORES = 5

export type ControllerModel = {
    name: string
    phone: string
    email: string
}

export type BankAccountModel = {
    bankName: string
    bankBranch: string
    accountName: string
    accountNumber: string
    identityImages: string[]
}

type ApplicationModel = {
    organization: OrganizationModel,
    merchant: MerchantModel[]
    controller: ControllerModel
    bankAccount: BankAccountModel
}

export type Application = {
    id: string
    approvedAt: string | null
    approvedBy: string | null
    jsonData: ApplicationModel
    status: typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS]
    type: "CREATE_ORGANIZATION" | "UPDATE_ORGANIZATION" | "DELETE_ORGANIZATION"
    partnerId: string | null
    rejectReason?: string
} & Base

export default ApplicationModel