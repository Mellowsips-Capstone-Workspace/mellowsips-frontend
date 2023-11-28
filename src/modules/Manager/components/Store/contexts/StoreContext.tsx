import { FC, ReactNode, createContext } from "react"
import Store from "types/store"

export type StoreContextType = {
    store: Store
    updateStore: (filed: string, data: any) => void
} | undefined

export const StoreContext = createContext<StoreContextType>(undefined)

type StoreProviderProps = {
    children: ReactNode
    store: Store
    updateStore: (filed: string, data: object) => void
}

const StoreProvider: FC<StoreProviderProps> = ({ children, store, updateStore }) => {
    return (
        <StoreContext.Provider
            value={{ store, updateStore }}
        >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider