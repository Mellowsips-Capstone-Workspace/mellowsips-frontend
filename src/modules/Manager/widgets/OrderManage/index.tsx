import { Widget } from 'modules/Layout/Dashboard'
import Orders from 'modules/Manager/components/Orders'
import { FC } from 'react'

const OrderManage: FC = () => {
    return (
        <Widget className='space-y-5'>
            <div className="bg-white rounded px-5 py-2 shadow">
                <h2 className="text-xl font-semibold">Quản lý đơn hàng</h2>
            </div>
            <Orders />
        </Widget>
    )
}

export default OrderManage