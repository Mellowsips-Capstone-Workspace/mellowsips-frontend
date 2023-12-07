import { Widget } from 'modules/Layout/Dashboard'
import StoreQRCodeManage from 'modules/Manager/components/StoreQRCodeManage'
import { FC } from 'react'

const QRCodeManage: FC = () => {
    return (
        <Widget className='space-y-5'>
            <div className="bg-white p-5 shadow rounded">
                <h2 className="font-medium text-lg">Quản lý mã QR</h2>
                <p>Quản lý mã QR của cửa hàng</p>
            </div>
            <StoreQRCodeManage />
        </Widget>
    )
}

export default QRCodeManage