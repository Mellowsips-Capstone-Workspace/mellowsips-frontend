import { Widget } from 'modules/Layout/Dashboard'
import Menus from 'modules/Manager/components/Menus'
import { FC } from 'react'

const MenuManage: FC = () => {

    return (
        <Widget className='space-y-5'>
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Quản lý menu</h2>
                <p>Quản lý thông tin các menu</p>
            </div>
            <Menus />
        </Widget>
    )
}

export default MenuManage