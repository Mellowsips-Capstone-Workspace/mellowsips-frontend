export type Principle = {
    id: string
    createdAt: string
    updatedAt: string
    createdBy: undefined | string
    updatedBy: undefined | string
    username: string
    displayName: string
    phone: undefined | string
    email: string
    isVerified: boolean
    avatar: undefined | string
    type: string
    provider: string
    partnerId?: string
    storeId?: string
}

export type Credential = {
    idToken: string
    accessToken: string
    expiresIn: number
    refreshToken: string
}

export type AuthenticateStore = {
    isLoading: boolean
} & (
        {
            logged: true
            principle: Principle
        } | {
            logged: false
            principle: undefined
        }
    )
