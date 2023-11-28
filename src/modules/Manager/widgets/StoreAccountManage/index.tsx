import { Widget } from 'modules/Layout/Dashboard'
import StoreAccount from 'modules/Manager/components/StoreAccountManage'
import { FC } from 'react'

const StoreAccountManage: FC = () => {
    return (
        <Widget className='space-y-5'>

            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Quản lý tài khoản</h2>
                <p>Quản lý mã các tài khoản của cửa hàng</p>
            </div>

            <StoreAccount />
        </Widget>
    )
}

export default StoreAccountManage