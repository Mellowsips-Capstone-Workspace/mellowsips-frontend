import { FC, ReactNode, createContext } from 'react'
import { Order } from 'types/order'

export type OrdersContextType = {
    updateOrder: (index: number, order: Order) => void
}

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined)
type OrdersContextProps = {
    children: ReactNode
    updateOrder: (index: number, order: Order) => void
}

const OrderContextProvider: FC<OrdersContextProps> = ({ children, updateOrder }) => {
    return (
        <OrdersContext.Provider
            value={{ updateOrder }}
        >
            {
                children
            }
        </OrdersContext.Provider>
    )
}

export default OrderContextProvider