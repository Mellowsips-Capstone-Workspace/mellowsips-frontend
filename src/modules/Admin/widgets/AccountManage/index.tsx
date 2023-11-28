import Accounts from 'modules/Admin/components/Accounts'
import { Widget } from 'modules/Layout/Dashboard'
import { FC } from 'react'

const AccountManage: FC = () => {
    return (
        <Widget className='space-y-5'>
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Quản lý tài khoản</h2>
                <p>Quản lý các tài khoản trên hệ thống.</p>
            </div>
            <Accounts />
        </Widget>
    )
}

export default AccountManage