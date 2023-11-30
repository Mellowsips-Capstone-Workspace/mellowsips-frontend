import Partners from 'modules/Admin/components/Partners'
import { Widget } from 'modules/Layout/Dashboard'
import { FC } from 'react'

const AccountManage: FC = () => {
    return (
        <Widget className='space-y-5'>
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Quản lý đối tác</h2>
                <p>Quản lý các đối tác trên hệ thống.</p>
            </div>
            <Partners />
        </Widget>
    )
}

export default AccountManage