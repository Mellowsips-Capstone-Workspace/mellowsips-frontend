import ROLE from 'enums/role'
import { Widget } from 'modules/Layout/Dashboard'
import Stores from 'modules/Manager/components/Stores'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'stores/root'
import { Principle } from 'types/authenticate'

const StoreManage: FC = () => {

    const { type, storeId } = useAppSelector<Principle>(state => state.authenticate.principle!)

    if ([ROLE.STAFF, ROLE.STORE_MANAGER].includes(type) && storeId) {
        return <Navigate to={"/stores/".concat(storeId)} />
    }

    return (
        <Widget className="space-y-5">
            <div className="bg-white rounded px-5 py-2 space-y-2 shadow">
                <h2 className="text-xl font-semibold">Quản lý cửa hàng</h2>
                <p className="hidden sm:block">Bao gồm các cửa hàng của bạn trên hệ thống Mellow Sips.</p>
            </div>
            <Stores />
        </Widget>
    )
}

export default StoreManage