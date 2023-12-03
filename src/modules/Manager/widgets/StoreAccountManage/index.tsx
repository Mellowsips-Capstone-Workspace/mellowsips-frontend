import ROLE from 'enums/role'
import { Widget } from 'modules/Layout/Dashboard'
import StoreAccount from 'modules/Manager/components/StoreAccountManage'
import { FC } from 'react'
import { useAppSelector } from 'stores/root'

const StoreAccountManage: FC = () => {
    const { type } = useAppSelector(state => state.authenticate.principle!)
    return (
        <Widget className='space-y-5'>

            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Quản lý tài khoản</h2>
                <p>Quản lý mã các tài khoản của cửa hàng</p>
            </div>
            {
                [ROLE.OWNER, ROLE.STORE_MANAGER].includes(type) ? <StoreAccount /> : null
            }
        </Widget>
    )
}

export default StoreAccountManage