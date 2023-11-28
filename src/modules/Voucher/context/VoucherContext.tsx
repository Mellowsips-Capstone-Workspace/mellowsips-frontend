import { FC, ReactNode, createContext } from 'react'
import { Voucher } from 'types/voucher'

export type VoucherContextType = {
    updateVoucher: (index: number, voucher: Voucher) => void,
    removeVoucher: (index: number) => void
} | undefined

export const VoucherContext = createContext<VoucherContextType>(undefined)

type VoucherContextProps = {
    children: ReactNode
    updateVoucher: (index: number, voucher: Voucher) => void,
    removeVoucher: (index: number) => void
}

const VoucherContextProvider: FC<VoucherContextProps> = ({ children, updateVoucher, removeVoucher }) => {
    return (
        <VoucherContext.Provider
            value={{ updateVoucher, removeVoucher }}
        >
            {
                children
            }
        </VoucherContext.Provider>
    )
}

export default VoucherContextProvider