import Badge from 'modules/Common/Badge'
import { FC } from 'react'
import { OrderStatus } from 'types/order'

type OrderBadgeProps = {
    status: string
}

const OrderBadge: FC<OrderBadgeProps> = ({ status }) => {

    return (
        <Badge
            className='capitalize px-1 text-xs print:bg-transparent print:text-black print:p-0 print:border-none'
            intent={
                status === OrderStatus.RECEIVED ? "greenBold" : status === OrderStatus.COMPLETED ? "green" : status === OrderStatus.REJECTED ? "redBold" : status === OrderStatus.PROCESSING ? "blue" : "secondaryBold"
            }
        >
            {
                status === OrderStatus.PROCESSING ? "Đang xử lý" : null
            }
            {
                status === OrderStatus.ORDERED ? "Đã đặt" : null
            }
            {
                status === OrderStatus.REJECTED ? "Từ chối" : null
            }
            {
                status === OrderStatus.CANCELED ? "Đã huỷ" : null
            }
            {
                status === OrderStatus.RECEIVED ? "Đã nhận" : null
            }
            {
                status === OrderStatus.COMPLETED ? "Hoàn thành" : null
            }
        </Badge>
    )
}

export default OrderBadge